defmodule Wcp do
  @moduledoc """
  Assemble config and provide access to access_token.
  """

  require Redis
  require Cachex
  require Poison

  def access_token(app_id) do
    token_info = 
      Cachex.get!(:default, key(app_id), fallback: fn(redis_key) -> 
        case Redis.get(redis_key) do 
          :undefined -> 
            case refresh_access_token(app_id) do 
              nil -> {:ignore, nil}
              v -> {:commit, v}
            end
          
          binary ->
            {:commit, Poison.decode!(binary, keys: :atoms)}
        end  
      end) 

    token_info =
      case access_token_expired?(token_info) do
        true -> 
          Cachex.del(:default, key(app_id))
          refresh_access_token(app_id)
        false -> 
          token_info
      end

    token_info.access_token
  end

  defp refresh_access_token(app_id) do
    now = DateTime.to_unix(DateTime.utc_now)
    case Wcp.AccessToken.get_token(app_id) do 
      %{access_token: _} = token_info ->
        token_info = Map.merge(token_info, %{refreshed_at: now})
        Redis.set(key(app_id), Poison.encode!(token_info))
        token_info

      _ -> 
        nil
    end
  end

  defp access_token_expired?(nil), do: true
  defp access_token_expired?(token_info) do
    now = DateTime.utc_now |> DateTime.to_unix
    now >= (token_info.refreshed_at + token_info.expires_in)
  end

  defp key(app_id) do 
    "wcp.access_token.#{app_id}"    
  end
end
