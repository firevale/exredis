defmodule Acs.Plugs do 
  import Plug.Conn
  require Logger

  alias   Acs.RedisApp
  alias   Acs.RedisUser

  def no_cache(%Plug.Conn{} = conn, _options) do 
    conn |> delete_resp_header("cache-control")
         |> put_resp_header("cache-control", "no-cache, no-store, must-revalidate")
  end

  def allow_origin(%Plug.Conn{} = conn, options) do 
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

  def parse_user_agent(%Plug.Conn{} = conn, _options) do 
    case get_req_header(conn, "user-agent") do 
      nil -> conn
      [] -> conn
      [user_agent | _] when is_bitstring(user_agent) ->
        Logger.debug "user_agent: #{user_agent}"

        conn = cond do 
          user_agent =~ ~r/windows phone 8/iu  ->
            conn |> put_private(:acs_platform, "wp8")
          user_agent =~ ~r/android/iu  ->
            conn |> put_private(:acs_platform, "android")
          user_agent =~ ~r/iphone/iu  ->
            conn |> put_private(:acs_platform, "ios")
          user_agent =~ ~r/mac os x/iu  ->
            conn |> put_private(:acs_platform, "macos")
          true ->
            conn |> put_private(:acs_platform, "unknown")
        end

        cond do 
          user_agent =~ ~r/fvacwebview/iu -> 
            conn |> put_private(:acs_browser, "webview")
          user_agent =~ ~r/micromessenger/iu -> 
            conn |> put_private(:acs_browser, "weixin")
          user_agent =~ ~r/QQ/iu -> 
            conn |> put_private(:acs_browser, "qq")
          user_agent =~ ~r/IEMobile\/11/iu -> 
            conn |> put_private(:acs_browser, "ie11")
          user_agent =~ ~r/IEMobile\/10/iu -> 
            conn |> put_private(:acs_browser, "ie10")
          user_agent =~ ~r/IEMobile/iu -> 
            conn |> put_private(:acs_browser, "ie")
          user_agent =~ ~r/Chrome/iu -> 
            conn |> put_private(:acs_browser, "chrome")
          user_agent =~ ~r/Safari/iu -> 
            conn |> put_private(:acs_browser, "safari")
          true -> 
            conn |> put_private(:acs_browser, "unknown")
        end
    end
  end

  def detect_account_id(%Plug.Conn{} = conn, _options) do 
    case conn.params["account_id"] do 
      "" -> conn
      nil -> conn
      user_key ->
        cond do 
          Regex.match?(~r/([^@]+)@([^@]+)/, user_key) -> 
            conn |> put_private(:acs_email, user_key)
          Regex.match?(~r/1\d{10}$/, user_key) ->
            conn |> put_private(:acs_mobile, user_key)
          true ->
            conn
        end  
    end
  end

  def detect_user_id(%Plug.Conn{} = conn, _options) do 
    case fetch_session_user_id(conn) || fetch_header_user_id(conn) do 
      nil -> conn
      user_id -> 
        Logger.metadata(user_id: user_id) 
        conn |> put_private(:acs_user_id, user_id)
    end
  end

  defp fetch_session_user_id(%Plug.Conn{private: private} = conn) do 
    case Map.fetch(private, :plug_session_fetch) do 
      {:ok, :done} -> get_session(conn, :user_id) 
      _ -> nil
    end
  end

  defp fetch_header_user_id(%Plug.Conn{} = conn) do 
    case get_req_header(conn, "user-id") do 
      nil -> nil
      [] -> nil
      [user_id | _] -> user_id
    end
  end

  def detect_device_id(%Plug.Conn{} = conn, _options) do 
    case fetch_device_id(conn.params) || fetch_header_device_id(conn) do 
      nil -> conn
      device_id ->
        Logger.metadata(device_id: device_id) 
        conn |> put_private(:acs_device_id, device_id)
    end
  end

  defp fetch_device_id(%{"idfa" => idfa}) when is_bitstring(idfa) and byte_size(idfa) > 5,  do: "idfa.#{idfa}"
  defp fetch_device_id(%{"idfv" => idfv}) when is_bitstring(idfv) and byte_size(idfv) > 5,  do: "idfv.#{idfv}"
  defp fetch_device_id(%{"android_id" => android_id}) when is_bitstring(android_id) and byte_size(android_id) > 5,  do: "android_id.#{android_id}"
  defp fetch_device_id(%{}), do: nil 

  defp fetch_header_device_id(%Plug.Conn{} = conn) do 
    case get_req_header(conn, "acs-device-id") do 
      nil -> nil
      [] -> nil
      [device_id | _] -> device_id
    end
  end

  def fetch_app_id(%Plug.Conn{} = conn, _options) do 
    case _fetch_app_id(conn.params) || _fetch_header_app_id(conn) do 
      nil -> conn
      app_id ->
        Logger.metadata(app_id: app_id) 
        conn |> put_private(:acs_app_id, app_id)
    end
  end

  defp _fetch_app_id(%{"client_id" => client_id}) when is_bitstring(client_id) and byte_size(client_id) > 5,  do: client_id
  defp _fetch_app_id(%{}), do: nil 

  defp _fetch_header_app_id(%Plug.Conn{} = conn) do 
    case get_req_header(conn, "acs-app-id") do 
      nil -> nil
      [] -> nil
      [app_id | _] -> app_id
    end
  end

  def fetch_app(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, _options) do 
    case RedisApp.find(app_id) do 
      nil -> conn
      %RedisApp{} = app ->
        conn |> put_private(:acs_app, app)
    end
  end
  def fetch_app(%Plug.Conn{} = conn, _options), do: conn

  def fetch_user(%Plug.Conn{private: %{acs_user_id: user_id}} = conn, _options) do 
    case RedisUser.find(user_id |> String.to_integer) do 
      nil -> conn
      %RedisUser{} = user ->
        conn |> put_private(:acs_user, user)
    end
  end
  def fetch_user(%Plug.Conn{} = conn, _options), do: conn

  def detect_access_token(%Plug.Conn{} = conn, _options) do 
    case get_req_header(conn, "access-token") do 
      nil -> conn
      [] -> conn
      [access_token | _] -> 
        conn |> put_private(:acs_access_token, access_token)
    end
  end

end