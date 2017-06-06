defmodule Acs.FVSdkController do
  use     Acs.Web, :controller
  use     Timex

  alias   Acs.StatsRepo 
  alias   Acs.RedisDevice 
  alias   Acs.Device

  plug :fetch_app_id
  plug :fetch_app
  plug :fetch_api_version
  plug :record_device_info when action == :get_app_info

  defp record_device_info(%Plug.Conn{private: %{
    acs_device_id: device_id, 
    acs_platform: platform}} = conn, _options) do
    os_ver = case get_req_header(conn, "acs-os-ver") do 
      [] -> nil
      [v | _] -> v
    end

    case RedisDevice.find(device_id) do 
      nil -> 
        device_model = case get_req_header(conn, "acs-device-model") do 
          [] -> nil
          [v | _] -> v
        end

        Device.changeset(%Device{}, %{id: device_id, 
          model: device_model, 
          platform: platform, 
          os: os_ver}) |> StatsRepo.insert(on_conflict: :replace_all)  
      
      device -> 
        Device.changeset(device, %{os: os_ver}) |> StatsRepo.update
    end

    conn
  end
  defp record_device_info(conn, _options), do: conn

  def get_app_info(%Plug.Conn{private: %{acs_app: %RedisApp{} = app,
                                         acs_platform: "ios",
                                         acs_api_version: "3"}} = conn,
                    %{"sdk" => sdk}) do
    conn |> render("app_info.ios.3.json", %{app: app, sdk: sdk})
  end
  def get_app_info(%Plug.Conn{private: %{acs_app: %RedisApp{} = app,
                                         acs_platform: "android",
                                         acs_api_version: "3"}} = conn,
                    %{"sdk" => sdk}) do
    conn |> render("app_info.android.3.json", %{app: app, sdk: sdk})
  end

  # 兼容旧版本sdk
  def get_app_info(%Plug.Conn{private: %{acs_app: %RedisApp{} = app}} = conn,
                   %{"platform" => "ios"}) do
    conn |> render("app_info.ios.json", %{app: app})
  end
  def get_app_info(%Plug.Conn{private: %{acs_app: %RedisApp{} = app}} = conn,
                   %{"platform" => "android"}) do
    conn |> render("app_info.android.json", %{app: app})
  end
  def get_app_info(conn, _params) do
    error "bad request headers: #{inspect conn.req_headers, pretty: true}"
    conn |> json(%{success: false, message: "bad request params"})
  end

  def default_callback(conn, _params) do
    case :rand.uniform(10) do
      1 -> conn |> text("ok")
      _ -> conn |> text("failed")
    end
  end

  # 兼容旧版fvsdk, 客户端每5分钟汇报一次
  def report_activity(%Plug.Conn{private: %{acs_app: %RedisApp{} = app,
                                            acs_device_id: device_id,
                                            acs_platform: platform}} = conn,
                     %{"user_id" => user_id,
                       "device_model" => device_model,
                       "app_user_id" => app_user_id,
                       "app_user_name" => app_user_name,
                       "osver" => os,
                       "channel" => _sdk,
                       "zone_id" => zone_id} = params) do
    today = Timex.today

    # oops, counter params only exists in android fvsdk
    active_seconds = String.to_integer(params["counter"] || "1") * 300

    app_user = case StatsRepo.get_by(AppUser, 
                  app_id: app.id,
                  user_id: user_id,
                  zone_id: zone_id) do
                  nil ->
                    AppUser.changeset(%AppUser{}, %{
                      app_user_id: app_user_id,
                      app_user_name: app_user_name,
                      zone_id: zone_id,
                      create_date: today,
                      app_id: app.id,
                      user_id: user_id
                    }) |> StatsRepo.insert!

                  %AppUser{} = app_user ->
                    AppUser.changeset(app_user, %{
                      app_user_name: app_user_name,
                      active_seconds: app_user.active_seconds + active_seconds
                    }) |> StatsRepo.update!
                end

    case StatsRepo.get_by(AppUserDailyActivity, app_user_id: app_user.id, date: today) do
      nil ->
        AppUserDailyActivity.changeset(%AppUserDailyActivity{}, %{
          date: today,
          app_user_id: app_user.id
        }) |> StatsRepo.insert!

      %AppUserDailyActivity{} = auda ->
        AppUserDailyActivity.changeset(auda, %{
          active_seconds: auda.active_seconds + active_seconds
        }) |> StatsRepo.update!
    end

    case StatsRepo.get(Device, device_id) do
      nil ->
        Device.changeset(%Device{}, %{
          id: device_id,
          model: device_model,
          platform: platform,
          os: os,
        }) |> StatsRepo.insert!

      %Device{} = x -> x
    end

    app_device = case StatsRepo.get_by(AppDevice, app_id: app.id,
                   device_id: device_id,
                   zone_id: zone_id) do
                   nil ->
                     AppDevice.changeset(%AppDevice{}, %{
                       app_id: app.id,
                       create_date: today,
                       device_id: device_id,
                       zone_id: zone_id
                     }) |> StatsRepo.insert!

                   %AppDevice{} = app_device ->
                     AppDevice.changeset(app_device, %{
                       active_seconds: app_device.active_seconds + active_seconds
                     }) |> StatsRepo.update!
                 end

    case StatsRepo.get_by(AppDeviceDailyActivity, app_device_id: app_device.id, date: today) do
      nil ->
        AppDeviceDailyActivity.changeset(%AppDeviceDailyActivity{}, %{
          date: today,
          app_device_id: app_device.id
        }) |> StatsRepo.insert!

      %AppDeviceDailyActivity{} = adda ->
        AppDeviceDailyActivity.changeset(adda, %{
          active_seconds: adda.active_seconds + active_seconds
        }) |> StatsRepo.update!
    end

    conn |> json(%{success: true})
  end
  def report_activity(conn, _params) do
    conn |> json(%{success: true})
  end

end
