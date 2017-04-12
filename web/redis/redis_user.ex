defmodule Acs.RedisUser do

  require Redis
  require Utils
  use     LogAlias

  alias   Acs.Repo
  import  Ecto.Query

  alias   Acs.User
  alias   Acs.UserSdkBinding

  ########################################
  defstruct id: 0,
            email: nil,
            mobile: nil,
            encrypted_password: nil,
            device_id: nil,
            nickname: nil,
            resident_id: nil,    # 身份证号码, 参考<<中华人民共和国网络安全法>>
            resident_name: nil,  # 实名
            gender: "male",      # 性别 ()
            age: 1,              # 年龄
            avatar_url: nil,
            last_login_at: nil,
            inserted_at: nil,
            bindings: %{}


  ########################################
  use     Utils.Jsonable # should define after defstruct

  defmodule Scripts do
    import Redis.Script

    defredis_script :save_user, file_path: "lua/save_user.lua"
    defredis_script :find_user, file_path: "lua/find_user.lua"
    defredis_script :del_user,  file_path: "lua/delete_user.lua"
  end

  defmodule OpException do
    defexception message: "redis user operation error"
  end
  defmodule AccountIdInUse do
    defexception message: "account id is alreay in use"
  end
  defmodule AccountIdNotFound do
    defexception message: "account id not found"
  end
  defmodule InvalidAccountId do
    defexception message: "account id is not valid"
  end


  @user_base_key       "acs.user."
  @email_index_key     "acs.indexes.user_email."
  @binding_index_key   "acs.indexes.sdk_binding."
  @mobile_index_key    "acs.indexes.user_mobile."
  @device_index_key    "acs.indexes.user_device."


  def create!(account_id, password) when is_bitstring(account_id) and is_bitstring(password) do
    if not exists?(account_id) do
      %__MODULE__{email: String.downcase(account_id),
                  encrypted_password: Utils.hash_password(password),
                  nickname: "fvu#{Utils.generate_token(5) |> String.downcase}"}
    else
      raise AccountIdInUse, message: "user account_id #{account_id} is already used by other user"
    end
  end

  def create!(account_id, password, device_id) when is_bitstring(account_id) and is_bitstring(password) and is_bitstring(device_id) do
    # find anonymouse user
    case find(device_id) do
      nil ->
        create!(account_id, password)

      %{email: nil, mobile: nil, nickname: "anonymous"} = user ->
        %{user | mobile: account_id, 
                 device_id: nil, 
                 nickname: "fvu#{Utils.generate_token(5) |> String.downcase}", 
                 encrypted_password: Utils.hash_password(password)}
    end
  end

  def bind_sdk_user(%{sdk: sdk,
                      app_id: app_id,
                      sdk_user_id: sdk_user_id,
                      email: email,
                      mobile: mobile,
                      nickname: nickname,
                      device_id: device_id,
                      avatar_url: avatar_url}) do

    bkey = "#{sdk}.#{app_id}"

    nickname = case nickname do 
                 nil -> "fvu#{Utils.generate_token(5) |> String.downcase}"
                 "" -> "fvu#{Utils.generate_token(5) |> String.downcase}"
                 _ -> nickname
               end

    case find("#{bkey}.#{sdk_user_id}") || find(mobile) || find(email) || find(device_id) do
      nil ->
        user =  %__MODULE__{
                    email: email, # make email case insensitive
                    nickname: nickname,
                    mobile: mobile,
                    avatar_url: avatar_url,
                    bindings: Map.put(%{}, bkey, sdk_user_id)
                  }

        user = save!(user)
        {:ok, user}

      user ->
        user = %{user | email: email}
        user = %{user | mobile: mobile}
        user = %{user | nickname: nickname}
        user = %{user | avatar_url: avatar_url}
        user = %{user | bindings: Map.put(user.bindings, bkey, sdk_user_id)}

        user = save!(user)
        {:ok, user}
    end
  end

  def fetch_anonymous_user(device_id) do
    case find(device_id) do
      %{email: nil, mobile: nil, nickname: "anonymous"} = anonymous_user ->
        anonymous_user

      _ ->
        save!(%__MODULE__{
          nickname: "anonymous",
          device_id: device_id,
          bindings: %{}
        })
    end
  end

  def bind_anonymous_user(account_id, password, device_id, bind_user_id) do
    case find(String.to_integer(bind_user_id)) do
      %{nickname: "anonymous", device_id: ^device_id} = user ->
        new_user = %{user | email: account_id,
                            encrypted_password: Utils.hash_password(password),
                            nickname: "fvu#{Utils.generate_token(5) |> String.downcase}",
                            device_id: nil}
       save!(new_user)
      _ -> nil
    end
  end

  def save(%__MODULE__{} = user) do
    user = %{user | id: if user.id <= 100_000 do
                          gen_user_id()
                        else
                          user.id
                        end,
                    email: case user.email do
                             nil -> nil
                             v when is_bitstring(v) -> String.downcase(user.email)
                           end,
                    nickname: case user.nickname do 
                                nil -> "fvu#{Utils.generate_token(5) |> String.downcase}"
                                v when is_bitstring(v) -> v
                              end}
    
    Repo.transaction(fn ->
      # ecto's upset is not stable for now
      case Repo.get(User, user.id) do
        nil ->
          {:ok, db_user} = User.changeset(%User{}, Map.from_struct(user)) |> Repo.insert
          user = %{user | inserted_at: db_user.inserted_at}
          "ok" = Scripts.save_user([], [to_json(user), user.id, user.email, user.mobile, user.device_id])

        %User{} = old_user ->
          User.changeset(old_user, Map.from_struct(user)) |> Repo.update!
          user = %{user | inserted_at: old_user.inserted_at}
          "ok" = Scripts.save_user([], [to_json(user),
                                 user.id,
                                 user.email,
                                 user.mobile,
                                 user.device_id,
                                 old_user.email,
                                 old_user.mobile,
                                 old_user.device_id])
      end

      user.bindings |> Enum.each(fn({k, v}) ->
        Redis.set(@binding_index_key <> "#{k}.#{v}", user.id)
        [sdk, app_id] = String.split(to_string(k), ".", parts: 2, trim: true)
        case Repo.get_by(UserSdkBinding, sdk: sdk, app_id: app_id, sdk_user_id: v) do
          nil ->
            UserSdkBinding.changeset(%UserSdkBinding{}, %{sdk: sdk, sdk_user_id: v, app_id: app_id, user_id: user.id}) |> Repo.insert!
          %UserSdkBinding{} = binding ->
            UserSdkBinding.changeset(binding, %{sdk: sdk, sdk_user_id: v, app_id: app_id, user_id: user.id}) |> Repo.update!
        end
      end)

      :ok
    end)

    user
  end

  def save!(%__MODULE__{} = user) do
    case save(user) do
      {:error, reason} ->
        raise OpException, message: "save user to redis failed: #{reason}"
      result ->
        result
    end
  end

  def save_cache(%__MODULE__{} = user) do
    "ok" = Scripts.save_user([], [to_json(user), user.id, user.email, user.mobile, user.device_id])
    :ok
  end

  def find(nil), do: nil
  def find(id) when is_integer(id) do
    case Redis.get(@user_base_key <> to_string(id)) do
      :undefined -> refresh(id)
      json -> from_json(json)
    end
  end
  def find(account_id) when is_bitstring(account_id) do
    case parse_account_id(account_id) do
      :unknown -> nil
      type ->
        case Scripts.find_user([type |> to_string], [account_id]) do
          "undefined" -> refresh(type, account_id)
          result -> result |> from_json
        end
    end
  end
  def find!(id) when is_integer(id) do
    case find(id) do
      nil ->
        raise AccountIdNotFound, message: "user by id #{id} not found"
      user ->
        user
    end
  end
  def find!(account_id) when is_bitstring(account_id) do
    case find(account_id) do
      nil ->
        raise AccountIdNotFound, message: "user by account_id #{account_id} not found"
      user ->
        user
    end
  end

  def refresh(id) when is_integer(id) do
    query = from user in User,
            left_join: bindings in assoc(user, :sdk_bindings),
            where: user.id == ^id,
            select: user,
            preload: [sdk_bindings: bindings]

    case Repo.one(query) do
      nil -> nil
      %User{} = user -> _refresh(user)
    end
  end

  def refresh(:email, account_id) do
    query = from user in User,
            left_join: bindings in assoc(user, :sdk_bindings),
            where: user.email == ^account_id,
            select: user,
            preload: [sdk_bindings: bindings]

    case Repo.one(query) do
      nil -> nil
      %User{} = user -> _refresh(user)
    end
  end

  def refresh(:mobile, account_id) do
    query = from user in User,
            left_join: bindings in assoc(user, :sdk_bindings),
            where: user.mobile == ^account_id,
            select: user,
            preload: [sdk_bindings: bindings]

    case Repo.one(query) do
      nil -> nil
      %User{} = user -> _refresh(user)
    end
  end

  def refresh(:device, account_id) do
    query = from user in User,
            left_join: bindings in assoc(user, :sdk_bindings),
            where: user.device_id == ^account_id,
            select: user,
            preload: [sdk_bindings: bindings]

    case Repo.one(query) do
      nil -> nil
      %User{} = user -> _refresh(user)
    end
  end

  def refresh(:sdk, account_id) do
    [sdk, app_id, sdk_user_id] = String.split(account_id, ".")
    query = from user in User,
            left_join: binding in assoc(user, :sdk_bindings),
            where: binding.sdk == ^sdk and binding.app_id == ^app_id and binding.sdk_user_id == ^sdk_user_id,
            select: user,
            preload: [sdk_bindings: binding]

    case Repo.one(query) do
      nil -> nil
      %User{} = user -> _refresh(user)
    end
  end

  def refresh(_, _), do: nil

  def _refresh(%User{} = user) do
    sdk_bindings = user.sdk_bindings |> Enum.map(fn(%UserSdkBinding{sdk: sdk, app_id: app_id, sdk_user_id: sdk_user_id}) ->
      {"#{sdk}.#{app_id}", sdk_user_id}
    end) |> Enum.into(%{})

    d "user: #{inspect user, pretty: true}"

    cache = %__MODULE__{
              id: user.id,
              email: user.email,
              mobile: user.mobile,
              encrypted_password: user.encrypted_password,
              device_id: user.device_id,
              nickname: user.nickname,
              resident_id: user.resident_id,    # 身份证号码, 参考<<中华人民共和国网络安全法>>
              resident_name: user.resident_name,  # 实名
              gender: user.gender,      # 性别 ()
              age: user.age,              # 年龄
              avatar_url: user.avatar_url,
              inserted_at: user.inserted_at,
              bindings: sdk_bindings
          }
    save_cache(cache)
    cache
  end

  def authenticate(account_id, password) when is_bitstring(account_id) and is_bitstring(password) do
    case find(account_id) do
      nil -> {:error, :notfound}
      user ->
        if Utils.check_password(password, user.encrypted_password) do
          {:ok, user}
        else
          {:error, :password_dismatch}
        end
    end
  end

  def exists?(account_id) when is_bitstring(account_id) do
    # can we find the user?
    account_id |> find |> is_nil |> Kernel.not
  end

  # account_id: email, mobile phone nunmber, id, device_id
  def delete(account_id) when is_bitstring(account_id) do
    case parse_account_id(account_id) do
      :unknown ->
        :error
      type ->
        case Scripts.del_user([type |> to_string], [account_id]) do
          "ok" ->
            if type in [:email, :mobile] do
              case Repo.get_by(User, [{type, account_id}]) do
                %User{} = user ->
                  Repo.delete(user)
                _ ->
                  :ok
               end
            else
              :ok
            end
           _ -> :ok
        end
    end
  end
  def delete(id) when is_integer(id) do
    case Scripts.del_user(["id"], [id]) do
      "ok" ->
        case Repo.get_by(User, id: id) do
          %User{} = user ->
            Repo.delete(user)
          _ ->
            :ok
        end
      _ ->
        :error
    end
  end

  def delete!(id) when is_integer(id) do
    case delete(id) do
      :ok -> :ok
      {:ok, _} -> :ok
      _ ->
        raise OpException, message: "can not delete user by id #{id}"
    end
  end
  def delete!(account_id) when is_bitstring(account_id) do
    case delete(account_id) do
      :ok -> :ok
      {:ok, _} -> :ok
      _ ->
        raise OpException, message: "can not delete user by account_id #{account_id}"
    end
  end

  def nickname(user = %__MODULE__{}) do
    case user.nickname do
      "" ->
        [[_, name, _]] = Regex.scan(~r/(\w+)@(.*)/, user.email)
        name
      _ -> user.nickname
    end
  end

  def last_login(user = %__MODULE__{}) do
    user.last_login_at |> Timex.from_unix |> Timex.format!("%Y-%m-%d %T", :strftime)
  end

  def parse_account_id(account_id) when is_bitstring(account_id) do
    cond do
      Regex.match?(~r/^yyh\.([a-zA-Z0-9\-_]+)\.yyh@([^@]+)/, account_id) -> :sdk
      Regex.match?(~r/([^@]+)@([^@]+)/, account_id) -> :email
      Regex.match?(~r/^(idfa|idfv|android_id)\.(.*)/, account_id) -> :device
      Regex.match?(~r/^1\d{10}$/, account_id) -> :mobile
      Regex.match?(~r/^\d+$/, account_id) -> :id
      Regex.match?(~r/([a-zA-Z0-9\-_]+)\.([a-zA-Z0-9]+)\.([^\.]+)/, account_id) -> :sdk
      true -> :unknown
    end
  end

  @uid_counter_key     "fvac.counter.uid"
  defp gen_user_id() do
    case Redis.incr(@uid_counter_key) do
      uid when uid <= 100_000 ->
        Redis.set @uid_counter_key, 100_001
        100_001
      uid when uid > 100_000 -> uid
    end
  end
end
