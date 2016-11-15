defmodule Acs.Plugs do 
  import Plug.Conn
  require Logger

  def no_cache(conn, _options) do 
    conn |> delete_resp_header("cache-control")
         |> put_resp_header("cache-control", "no-cache, no-store, must-revalidate")
  end

  def allow_origin(conn, options) do 
    case get_req_header(conn, "origin") do 
      nil -> conn
      [] -> conn
      [origin | _] -> 
        case options do 
          "*" -> 
            conn |> put_resp_header("access-control-allow-origin", "*")    
                 |> put_resp_header("access-control-allow-methods", "GET,HEAD,POST,PUT,DELETE,OPTIONS")           
          check_origins when is_list(check_origins) ->
            if origin_allowed?(URI.parse(origin), Enum.map(check_origins, &parse_origin/1)) do 
              conn |> put_resp_header("access-control-allow-origin", origin)    
                   |> put_resp_header("access-control-allow-methods", "GET,HEAD,POST,PUT,DELETE,OPTIONS")           
            else 
              conn
            end

          check_origin when is_bitstring(check_origin) ->
            if origin_allowed?(URI.parse(origin), [parse_origin(check_origin)]) do 
              conn |> put_resp_header("access-control-allow-origin", origin)    
                   |> put_resp_header("access-control-allow-methods", "GET,HEAD,POST,PUT,DELETE,OPTIONS")           
            else 
              conn
            end
        end
        
      _ -> 
        conn
    end
  end

  defp parse_origin(origin) do
    case URI.parse(origin) do
      %{host: nil} ->
        raise ArgumentError,
          "invalid check_origin: #{inspect origin} (expected an origin with a host)"
      %{scheme: scheme, port: port, host: host} ->
        {scheme, host, port}
    end
  end

  defp origin_allowed?(uri, allowed_origins) do
    %{scheme: origin_scheme, host: origin_host, port: origin_port} = uri

    Enum.any?(allowed_origins, fn {allowed_scheme, allowed_host, allowed_port} ->
      compare?(origin_scheme, allowed_scheme) and 
      compare?(origin_port, allowed_port) and 
      compare_host?(origin_host, allowed_host)
    end)
  end

  defp compare?(request_val, allowed_val) do
    is_nil(allowed_val) or request_val == allowed_val
  end

  defp compare_host?(_request_host, nil),
    do: true
  defp compare_host?(request_host, "*." <> allowed_host),
    do: String.ends_with?(request_host, allowed_host)
  defp compare_host?(request_host, allowed_host),
    do: request_host == allowed_host

  def detect_platform(conn, _options) do 
    case conn.params["platform"] do 
      "android" -> conn
      "ios" -> conn
      "wp8" -> conn
      _ ->
        case get_req_header(conn, "user-agent") do 
          nil -> conn
          [] -> conn
          [user_agent | _] when is_bitstring(user_agent) ->
            if user_agent =~ ~r/windows phone 8/iu do 
              %{conn | params: Map.put(conn.params, "platform", "wp8")}
            else
              if user_agent =~ ~r/android/iu do 
                %{conn | params: Map.put(conn.params, "platform", "android")}
              else 
                if user_agent =~ ~r/iphone/iu do 
                  %{conn | params: Map.put(conn.params, "platform", "ios")}
                else 
                  conn
                end
              end
            end

            cond do 
              user_agent =~ ~r/fvacwebview/iu -> 
                %{conn | params: Map.put(conn.params, "channel", "webview")}
              user_agent =~ ~r/micromessenger/iu -> 
                %{conn | params: Map.put(conn.params, "channel", "weixin")}
              user_agent =~ ~r/QQ/iu -> 
                %{conn | params: Map.put(conn.params, "channel", "qq")}
              user_agent =~ ~r/IEMobile\/11/iu -> 
                %{conn | params: Map.put(conn.params, "channel", "ie11")}
              user_agent =~ ~r/Chrome/iu -> 
                %{conn | params: Map.put(conn.params, "channel", "chrome")}
              user_agent =~ ~r/Safari/iu -> 
                %{conn | params: Map.put(conn.params, "channel", "safari")}
              true -> conn
            end
        end
    end
  end

  def detect_user_key(conn, _options) do 
    case conn.params["user_key"] do 
      "" -> conn
      nil -> conn
      user_key ->
        cond do 
          Regex.match?(~r/([^@]+)@([^@]+)/, user_key) -> 
            %{conn | params: Map.put(conn.params, "email", user_key)}
          Regex.match?(~r/1\d{10}$/, user_key) ->
            %{conn | params: Map.put(conn.params, "mobile", user_key)}
          true ->
            conn
        end  
    end
  end

  def fetch_user_id(conn, _options) do 
    case fetch_session_user_id(conn) || fetch_header_user_id(conn) do 
      nil -> conn
      user_id -> 
        %{conn | params: Map.put(conn.params, "user_id", user_id)}
    end
  end

  defp fetch_session_user_id(%{private: private} = conn) do 
    case Map.fetch(private, :plug_session_fetch) do 
      {:ok, :done} -> get_session(conn, :user_id) 
      _ -> nil
    end
  end

  defp fetch_header_user_id(conn) do 
    case get_req_header(conn, "user-id") do 
      nil -> nil
      [] -> nil
      [user_id | _] -> user_id
    end
  end

  def log_user_id(conn, _options) do 
    case conn.params["user_id"] do 
      nil -> conn
      user_id ->
        Logger.metadata(user_id: user_id) 
        conn
    end
  end
end