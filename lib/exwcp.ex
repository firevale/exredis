defmodule Exwcp do
  require Excache
  require Exredis
  require Poison

  def access_token(wcp_config = %{wcp_app_id: _, wcp_app_key: _}) do
    token_info = 
      Excache.get!(key(wcp_config), fallback: fn(redis_key) -> 
        case Exredis.get(redis_key) do 
          nil -> 
            case refresh_access_token(wcp_config) do 
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
          Excache.del(key(wcp_config))
          refresh_access_token(wcp_config)
        false -> 
          token_info
      end

    token_info.access_token
  end

  defp refresh_access_token(wcp_config = %{wcp_app_id: _, wcp_app_key: _}) do
    now = DateTime.to_unix(DateTime.utc_now)
    case Exwcp.AccessToken.get_token(wcp_config) do 
      %{access_token: _} = token_info ->
        token_info = Map.merge(token_info, %{refreshed_at: now})
        Exredis.setex(key(wcp_config), max(token_info.expires_in - 10, 10), Poison.encode!(token_info))
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

  defp key(%{wcp_app_id: wcp_app_id}) do 
    "wcp.access_token.#{wcp_app_id}"    
  end
end
