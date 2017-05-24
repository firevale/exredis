defmodule Acs.RedisAccessToken do
  defstruct id: "",
            app_id: nil,
            user_id: nil,
            device_id: nil,
            ttl: 115200,
            created_at: 0,
            updated_at: 0,
            binding: %{}

  require Redis
  require Cachex
  use     Utils.Jsonable
  use     LogAlias
  

  @access_token_key          "acs.keys.access_token"
  @device_index_key          "acs.keys.access_token_index.device"
  @token_ttl                 604800

  def create(%{
      app_id: app_id,
      user_id: user_id,
      device_id: device_id,
      platform: _platform,
      ttl: ttl,
      binding: binding
    }) when is_bitstring(device_id) do

    ts = Utils.unix_timestamp
    token = %__MODULE__{id: Utils.generate_token,
                        app_id: app_id,
                        user_id: user_id,
                        device_id: device_id,
                        ttl: ttl,
                        binding: binding,
                        created_at: ts,
                        updated_at: ts}
    save(token)
    token
  end

  def save(%__MODULE__{} = token) do
    Redis.setex(key(token), token.ttl, to_json(token))
  end

  def find(nil), do: nil
  def find(token_id) when is_bitstring(token_id) do
    Cachex.get!(:mem_cache, key(token_id), fn(key) -> 
      case Redis.get(key) do
        :undefined ->
          find_fvac_token(token_id)
        json ->
          from_json(json)
      end
    end)
  end

  defp find_fvac_token(token_id) when is_bitstring(token_id) do
    case Redis.get(fvac_token_key(token_id)) do
      :undefined -> nil
      raw ->
        fvac_token = raw |> Base.decode64! |> :erlang.binary_to_term
        token = %__MODULE__{
          id: fvac_token.id,
          app_id: fvac_token.client_id,
          user_id: fvac_token.resource_owner_id,
          device_id: device_id(fvac_token.idfa, fvac_token.idfv, fvac_token.android_id),
          ttl: @token_ttl,
          binding: fvac_token.binding,
          created_at: fvac_token.created_at,
          updated_at: fvac_token.updated_at
        }
        save(token)
        Redis.del(fvac_token_key(token_id))
        Redis.hdel("fvac.keys.access_token_index.device", "#{fvac_token.client_id}.#{fvac_token.client_platform}.#{token.device_id}")
        token
    end
  end

  def exists?(token_id) when is_bitstring(token_id) do
    Redis.exists(key(token_id)) > 0 || Redis.exists(fvac_token_key(token_id)) > 0
  end

  def delete(%__MODULE__{} = token) do
    Redis.del(key(token.id))
    Redis.del(device_key(token))
  end

  def expired_at(%__MODULE__{} = token) do
    token.updated_at + token.ttl
  end

  defp key(%__MODULE__{id: token_id}) do
    "#{@access_token_key}.#{token_id}"
  end
  defp key(token_id) do
    "#{@access_token_key}.#{token_id}"
  end

  defp fvac_token_key(token_id) do
    "fvac.keys.access_token.#{token_id}"
  end

  defp device_key(%__MODULE__{} = token) do
    "#{@device_index_key}.#{token.app_id}.#{token.device_id}"
  end
  # defp device_key(app_id, device_id) do
  #   "#{@device_index_key}.#{app_id}.#{device_id}"
  # end

  defp device_id(idfa, idfv, android_id) do
    cond do
      idfa in [nil, ""] ->
        # try index by idfv
        cond do
          idfv in [nil, ""] ->
            cond do
              android_id in [nil, ""] -> nil
              true -> "android_id." <> android_id
            end
          true -> "idfv." <> idfv
        end
      true -> "idfa." <> idfa
    end
  end
end
