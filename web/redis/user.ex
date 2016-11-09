defmodule Acs.RedisUser do

  require Redis
  require Utils
  require Logger


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
            picture_url: nil,
            last_login_at: nil,
            failed_attempts: 0,
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


  @uid_counter_key     "fvac.counter.uid"
  @user_table_key      "fvac.tables.users"
  @email_index_key     "fvac.indexes.user_email"
  @binding_index_key   "fvac.indexes.sdk_binding"
  @mobile_index_key    "fvac.indexes.user_mobile"
  @device_index_key    "fvac.indexes.user_device"

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
                      fvac_app_id: app_id, 
                      sdk_user_id: sdk_user_id, 
                      email: email,
                      mobile: mobile,
                      nickname: nickname,
                      device_id: device_id,
                      picture_url: picture_url}) do 

    bkey = "#{sdk}.#{app_id}"

    case find("#{bkey}.#{sdk_user_id}") || find(mobile) || find(email) || find(device_id) do 
      nil ->
        user =  %__MODULE__{
                    email: email, # make email case insensitive
                    nickname: nickname,
                    mobile: mobile,
                    picture_url: picture_url,
                    bindings: Map.put(%{}, bkey, sdk_user_id)
                  }

        user = save!(user)
        {:ok, user}

      user ->
        user = %{user | nickname: nickname}
        user = %{user | picture_url: picture_url}
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
    # make sure email case insensitive
    user = %{user | email: case user.email do 
                             nil -> nil
                             v when is_bitstring(v) -> String.downcase(user.email)
                           end}

    case Scripts.save_user(["json"], [to_json(user)]) do 
      ["error", reason] -> 
        Logger.error "save user: #{inspect user, pretty: true} to redis failed: #{reason}"
        {:error, reason}
      ["ok", id] -> 
        %{user | id: String.to_integer(id)}
    end
  end
  def save!(%__MODULE__{} = user) do
    case save(user) do
      {:error, reason} ->
        raise OpException, message: "save user to redis failed: #{reason}"
      result ->
        result
    end
  end

  def find(nil), do: nil
  def find(id) when is_integer(id) do
    case Redis.hget(@user_table_key, id) do 
      :undefined -> nil
      json -> from_json(json)
    end
  end
  def find(key) when is_bitstring(key) do
    case parse_key(key) do 
      :unknown -> nil
      type ->
        case Scripts.find_user([type |> to_string], [key]) do 
          "undefined" -> nil
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

  def authenticate(key, password) when is_bitstring(key) and is_bitstring(password) do
    case find(key) do
      :undefined -> {:error, :notfound}
      user ->
        if Utils.check_password(password, user.encrypted_password) do
          # update last_login_at
          user = %__MODULE__{user | last_login_at: Utils.unix_timestamp, failed_attempts: 0}
          save!(user)
          {:ok, user}
        else
          # update failed_attemps
          user = %__MODULE__{user | failed_attempts: user.failed_attempts + 1}
          save!(user)
          {:error, user.failed_attempts}
        end
    end
  end

  def exists?(key) when is_bitstring(key) do
    case parse_key(key) do 
      :email -> Redis.hexists(@email_index_key, String.downcase(key)) > 0
      :mobile -> Redis.hexists(@mobile_index_key, key) > 0
      :id -> Redis.hexists(@user_table_key, key) > 0
      :device -> Redis.hexists(@device_index_key, key) > 0
      :sdk -> Redis.hexists(@binding_index_key, key) > 0
      :unknown -> false
    end
  end

  # key: email, mobile phone nunmber, id, device_id
  def delete(key) when is_bitstring(key) do
    case parse_key(key) do 
      :unknown ->
        :error 
      type ->
         Scripts.del_user([type |> to_string], [key]) |> String.to_atom 
    end
  end
  def delete(id) when is_integer(id) do
     Scripts.del_user(["id"], [id]) |> String.to_atom 
  end

  def delete!(id) when is_integer(id) do 
    case delete(id) do 
      :ok -> :ok
      _ ->
        raise OpException, message: "can not delete user by id #{id}"
    end
  end
  def delete!(key) when is_bitstring(key) do 
    case delete(key) do 
      :ok -> :ok
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
end