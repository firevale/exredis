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

  def report_activity(conn, params) do 
    conn |> json(%{success: true}) 
  end

end
