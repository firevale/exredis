defmodule Acs.FVSdkController do
  use     Acs.Web, :controller

  plug :fetch_app_id
  plug :fetch_app
  plug :fetch_api_version

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

  def default_callback(conn, params) do 
    case :rand.uniform(10) do 
      1 ->
        conn |> text("ok")
      _ ->
        conn |> text("failed")
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
                       "counter" => counter,
                       "osver" => os,
                       "channel" => sdk,
                       "zone_id" => zone_id}) do 
    {date, _} = :calendar.local_time
    today = date |> Date.from_erl!

    active_seconds = String.to_integer(counter) * 300

    app_user = case Repo.get_by(AppUser, app_id: app.id, user_id: user_id, zone_id: zone_id) do 
                  nil ->
                    AppUser.changeset(%AppUser{}, %{app_user_id: app_user_id, 
                                                    app_user_name: app_user_name,
                                                    zone_id: zone_id,
                                                    sdk: sdk,
                                                    active_seconds: active_seconds,
                                                    app_id: app.id,
                                                    user_id: user_id}) |> Repo.insert!
                  %AppUser{} = app_user ->
                    AppUser.changeset(app_user, %{app_user_name: app_user_name, 
                                                  active_seconds: app_user.active_seconds + active_seconds}) |> Repo.update!
                end
   
    case Repo.get_by(AppUserDailyActivity, app_user_id: app_user.id, date: today) do 
      nil ->
        AppUserDailyActivity.changeset(%AppUserDailyActivity{}, %{date: today, app_user_id: app_user.id, active_seconds: active_seconds}) |> Repo.insert!
      %AppUserDailyActivity{} = auda ->
        AppUserDailyActivity.changeset(auda, %{active_seconds: auda.active_seconds + active_seconds}) |> Repo.update!
    end

    case Repo.get(Device, device_id) do 
      nil ->
        Device.changeset(%Device{}, %{id: device_id, model: device_model, platform: platform, os: os}) |> Repo.insert!
      %Device{} = x -> x
    end

    app_device = case Repo.get_by(AppDevice, app_id: app.id, device_id: device_id, zone_id: zone_id) do 
                   nil ->
                     AppDevice.changeset(%AppDevice{}, %{sdk: sdk, app_id: app.id, device_id: device_id}) |> Repo.insert!
                   %AppDevice{} = app_device ->
                     AppDevice.changeset(app_device, %{active_seconds: app_device.active_seconds + active_seconds}) |> Repo.update!
                 end    

    case Repo.get_by(AppDeviceDailyActivity, app_device_id: app_device.id, date: today) do 
      nil ->
        AppDeviceDailyActivity.changeset(%AppDeviceDailyActivity{}, %{date: today, app_device_id: app_user.id, active_seconds: active_seconds}) |> Repo.insert!
      %AppDeviceDailyActivity{} = adda ->
        AppDeviceDailyActivity.changeset(adda, %{active_seconds: adda.active_seconds + active_seconds}) |> Repo.update!
    end
                                        
    conn |> json(%{success: true}) 
  end

end
