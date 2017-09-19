defmodule AcsWeb.Admin.StatsController do
  use AcsWeb, :controller
  use Timex
  require AcsStats

  def onlines(conn, %{"app_id" => app_id}) do 
    conn |> json(%{
      success: true, 
      chart: AcsStats.get_online_chart(app_id)
    })
  end

  def realtime_metrics(conn, %{"app_id" => app_id}) do 
    today = Timex.local() |> Timex.to_date()

    conn |> json(%{
      success: true,
      metrics: AcsStats.get_realtime_metrics(today, app_id) 
    })  
  end

  def historic_onlines(conn, %{"app_id" => app_id}) do 
    conn |> json(%{
      success: true, 
      chart: AcsStats.get_hourly_online_chart(app_id)
    })
  end

  def get_stats_by_date(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, params) do
    dt = params["date"]
    {:ok, reports, date} = Reports.get_stats_by_date(app_id, dt)
    conn |> json(%{success: true, reports: reports, date: date})
  end

  def get_user_timing_by_date(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, params) do
    dt = params["date"]
    {:ok, timing, date} = Reports.get_user_timing_by_date(app_id, dt)
    conn |> json(%{success: true, timing: timing, date: date})
  end

  def get_stats_retention(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, 
                        %{"platform" => platform, "start_date" => start_date, "end_date" => end_date}) do
    reports = Reports.get_stats_retention(app_id, platform, start_date, end_date)
    conn |> json(%{success: true, reports: reports})
  end

  def get_stats_device(%Plug.Conn{private: %{acs_app_id: _app_id}} = conn, 
                        %{"platform" => platform, "stats_type" => stats_type, "start_date" => start_date, "end_date" => end_date}) do
    {:ok, platform_reports, reports} = Reports.get_stats_device(platform, stats_type, start_date, end_date)
    conn |> json(%{success: true, platforms: platform_reports, reports: reports})
  end

  def get_stats_device_details(%Plug.Conn{private: %{acs_app_id: _app_id}} = conn, 
     %{"platform" => platform , "stats_type" => stats_type, "mem_size" => mem_size, "order_by" => order_bys,
      "start_date" => start_date, "end_date" => end_date, "page" => page , "records_per_page" => records_per_page}) do
    {:ok, total_page, reports} = Reports.get_stats_device_details(platform , stats_type, mem_size, order_bys, start_date, end_date, page , records_per_page)
    conn |> json(%{success: true, total: total_page, reports: reports})
  end
  
end
