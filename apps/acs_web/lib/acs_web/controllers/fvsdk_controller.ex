defmodule AcsWeb.FVSdkController do
  use     AcsWeb, :controller
  use     Timex

  alias   Acs.Apps

  plug :fetch_app_id
  plug :fetch_app
  plug :fetch_api_version
  plug :log_device_info when action == :get_app_info

  defp log_device_info(%Plug.Conn{private: %{
    acs_device_id: device_id, 
    acs_platform: platform}} = conn, _options) do
    with [os_ver | _] <- get_req_header(conn, "acs-os-ver"),
         [device_model | _] <- get_req_header(conn, "acs-device-model")
    do
      AcsStats.log_device_info(device_id, platform, device_model, os_ver, List.first(get_req_header(conn, "acs-device-memory")))
    end

    conn
  end
  defp log_device_info(conn, _options), do: conn

  def get_app_info(%Plug.Conn{private: %{acs_app: %App{} = app,
                                         acs_platform: "ios",
                                         acs_api_version: "3"}} = conn,
                    %{"sdk" => sdk}) do
    conn |> render("app_info.ios.3.json", %{app: Apps.get_fat_app(app.id), sdk: sdk})
  end
  def get_app_info(%Plug.Conn{private: %{acs_app: %App{} = app,
                                         acs_platform: "android",
                                         acs_api_version: "3"}} = conn,
                    %{"sdk" => sdk}) do
    conn |> render("app_info.android.3.json", %{app: Apps.get_fat_app(app.id), sdk: sdk})
  end

  # 兼容旧版本sdk
  def get_app_info(%Plug.Conn{private: %{acs_app: %App{} = app}} = conn,
                   %{"platform" => "ios"}) do
    conn |> render("app_info.ios.json", %{app: Apps.get_fat_app(app.id)})
  end
  def get_app_info(%Plug.Conn{private: %{acs_app: %App{} = app}} = conn,
                   %{"platform" => "android"}) do
    conn |> render("app_info.android.json", %{app: Apps.get_fat_app(app.id)})
  end
  def get_app_info(conn, _params) do
    error "bad request headers: #{inspect conn.req_headers, pretty: true}"
    conn |> json(%{success: false, message: "bad request params"})
  end

  # default payment callback,
  def default_callback(conn, _params) do
    conn |> text("ok")
  end

  # 兼容旧版fvsdk, 客户端每5分钟汇报一次
  def report_activity(%Plug.Conn{private: %{acs_app: %App{} = _app,
                                            acs_device_id: _device_id,
                                            acs_platform: _platform}} = conn,
                     %{"user_id" => _user_id,
                       "device_model" => _device_model,
                       "app_user_id" => _app_user_id,
                       "app_user_name" => _app_user_name,
                       "osver" => _os,
                       "channel" => _sdk,
                       "zone_id" => _zone_id}) do
    # not supported 
    conn |> json(%{success: true})
  end
  def report_activity(conn, _params) do
    conn |> json(%{success: true})
  end

end
