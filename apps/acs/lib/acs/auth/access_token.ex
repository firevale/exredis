defmodule Acs.Auth.AccessToken do
  defstruct id: "",
            app_id: nil,
            user_id: nil,
            device_id: nil,
            login_code: nil,
            anonymous: false,
            ttl: 115200,
            created_at: 0,
            updated_at: 0,
            binding: %{}

  require Exredis
  require Excache
  use     Utils.Jsonable
  use     Utils.LogAlias

  @access_token_key          "acs.keys.access_token"
  @token_ttl                 604800

  def create(%{
    app_id: _app_id,
    user_id: _user_id,
    device_id: device_id,
    platform: _platform,
    ttl: _ttl,
    binding: _binding
  } = params) when is_bitstring(device_id) do
    ts = Utils.unix_timestamp
    token = Map.merge(%__MODULE__{
      id: Utils.generate_token,
      created_at: ts,
      updated_at: ts}, params)
    save(token)
    token
  end

  def save(%__MODULE__{} = token) do
    Exredis.setex(key(token), token.ttl, to_json(token))
  end

  def find(nil), do: nil
  def find(token_id) when is_bitstring(token_id) do
    Excache.get!(key(token_id), fallback: fn(key) -> 
      case Exredis.get(key) do
        nil -> {:ignore, nil}
        json -> {:commit, from_json(json)}
      end
    end)
  end

  def exists?(token_id) when is_bitstring(token_id) do
    Exredis.exists(key(token_id)) > 0 
  end

  def delete(%__MODULE__{} = token) do
    Exredis.del(key(token.id))
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
end
