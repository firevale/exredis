defmodule Acs.RedisUser do

  require Redis
  require Utils
  require Logger

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
  defmodule KeyInUse do 
    defexception message: "user key not found"
  end
  defmodule KeyNotFound do 
    defexception message: "user key not found"
  end
  defmodule KeyInvalid do 
    defexception message: "user key is not valid"
  end


  @user_base_key       "acs.user."
  @email_index_key     "acs.indexes.user_email."
  @binding_index_key   "acs.indexes.sdk_binding."
  @mobile_index_key    "acs.indexes.user_mobile."
  @device_index_key    "acs.indexes.user_device."


  def create!(key, password) when is_bitstring(key) and is_bitstring(password) do
    if not exists?(key) do
      case parse_key(key) do 
        :email ->
          [[_, nickname, _]] = Regex.scan(~r/(\w+)@(.*)/, key)
          %__MODULE__{email: String.downcase(key), 
                      encrypted_password: Utils.hash_password(password), 
                      nickname: nickname}

        :mobile ->
          %__MODULE__{mobile: key, 
                      encrypted_password: Utils.hash_password(password)}

        _ ->
          raise KeyInvalid, message: "invalid user key #{key}"
      end
    else
      raise KeyInUse, message: "user key #{key} is already used by other user"
    end
  end

  def create!(key, password, device_id) when is_bitstring(key) and is_bitstring(password) and is_bitstring(device_id) do 
    # find anonymouse user
    case find(device_id) do 
      nil ->
        create!(key, password)

      %{email: nil, mobile: nil, nickname: "anonymous"} = user ->
        case parse_key(key) do 
          :email ->
            [[_, nickname, _]] = Regex.scan(~r/(\w+)@(.*)/, key)
            %{user | email: String.downcase(key), device_id: nil, nickname: nickname, encrypted_password: Utils.hash_password(password)}

          :mobile ->
            %{user | mobile: key, device_id: nil, nickname: "fvu#{user.id}", encrypted_password: Utils.hash_password(password)}

          _ ->
            raise ArgumentError, message: "invalid user key #{key}"
        end
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

  def save(%__MODULE__{} = user) do
    user = %{user | id: if user.id <= 100_000 do
                          gen_user_id()
                        else
                          user.id 
                        end,
                    email: case user.email do 
                             nil -> nil
                             v when is_bitstring(v) -> String.downcase(user.email)
                           end}

    Repo.transaction(fn -> 
      # ecto's upset is not stable for now
      case Repo.get(User, user.id) do 
        nil ->
          User.changeset(%User{}, Map.from_struct(user)) |> Repo.insert!
          "ok" = Scripts.save_user([], [to_json(user), user.id, user.email, user.mobile, user.device_id])
        %User{} = old_user ->
          User.changeset(old_user, Map.from_struct(user)) |> Repo.update!
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
        [sdk, app_id] = String.split(k, ".", parts: 2, trim: true)
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
    case Redis.get(@user_base_key <> id) do 
      :undefined -> refresh(id)
      json -> from_json(json)
    end
  end
  def find(key) when is_bitstring(key) do
    case parse_key(key) do 
      :unknown -> nil
      type ->
        case Scripts.find_user([type |> to_string], [key]) do 
          "undefined" -> refresh(type, key)
          result -> result |> from_json
        end
    end
  end
  def find!(id) when is_integer(id) do
    case find(id) do
      nil ->
        raise KeyNotFound, message: "user by id #{id} not found"
      user ->
        user
    end
  end
  def find!(key) when is_bitstring(key) do
    case find(key) do
      nil ->
        raise KeyNotFound, message: "user by key #{key} not found"
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

  def refresh(:email, key) do 
    query = from user in User,
            left_join: bindings in assoc(user, :sdk_bindings), 
            where: user.email == ^key,
            select: user,
            preload: [sdk_bindings: bindings]

    case Repo.one(query) do 
      nil -> nil
      %User{} = user -> _refresh(user)
    end
  end

  def refresh(:mobile, key) do 
    query = from user in User,
            left_join: bindings in assoc(user, :sdk_bindings), 
            where: user.mobile == ^key,
            select: user,
            preload: [sdk_bindings: bindings]

    case Repo.one(query) do 
      nil -> nil
      %User{} = user -> _refresh(user)
    end
  end

  def refresh(:device, key) do 
    query = from user in User,
            left_join: bindings in assoc(user, :sdk_bindings), 
            where: user.device_id == ^key,
            select: user,
            preload: [sdk_bindings: bindings]

    case Repo.one(query) do 
      nil -> nil
      %User{} = user -> _refresh(user)
    end
  end

  def refresh(:sdk, key) do 
    [sdk, app_id, sdk_user_id] = String.split(key, ".")
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
              bindings: sdk_bindings
          }
    save_cache(cache)
    cache
  end

  def authenticate(key, password) when is_bitstring(key) and is_bitstring(password) do
    case find(key) do
      :undefined -> {:error, :notfound}
      user ->
        if Utils.check_password(password, user.encrypted_password) do
          {:ok, user}
        else
          {:error, :password_dismatch}
        end
    end
  end

  def exists?(key) when is_bitstring(key) do
    case parse_key(key) do 
      :email -> Redis.exists(@email_index_key <> String.downcase(key)) > 0
      :mobile -> Redis.exists(@mobile_index_key <> key) > 0
      :id -> Redis.exists(@user_base_key <> key) > 0
      :device -> Redis.exists(@device_index_key <> key) > 0
      :sdk -> Redis.exists(@binding_index_key <> key) > 0
      :unknown -> false
    end
  end

  # key: email, mobile phone nunmber, id, device_id
  def delete(key) when is_bitstring(key) do
    case parse_key(key) do 
      :unknown ->
        :error 
      type ->
        case Scripts.del_user([type |> to_string], [key]) do 
          "ok" ->
            if type in [:email, :mobile] do 
              case Repo.get_by(User, [{type, key}]) do 
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
  def delete!(key) when is_bitstring(key) do 
    case delete(key) do 
      :ok -> :ok
      {:ok, _} -> :ok
      _ ->
        raise OpException, message: "can not delete user by key #{key}"
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

  def parse_key(key) when is_bitstring(key) do
    cond do 
      Regex.match?(~r/^yyh\.([a-zA-Z0-9\-_]+)\.yyh@([^@]+)/, key) -> :sdk
      Regex.match?(~r/([^@]+)@([^@]+)/, key) -> :email
      Regex.match?(~r/^(idfa|idfv|android_id)\.(.*)/, key) -> :device
      Regex.match?(~r/^1\d{10}$/, key) -> :mobile
      Regex.match?(~r/^\d+$/, key) -> :id
      Regex.match?(~r/([a-zA-Z0-9\-_]+)\.([a-zA-Z0-9]+)\.([^\.]+)/, key) -> :sdk
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