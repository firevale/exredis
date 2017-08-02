defmodule Acs.Web.AdminStatsController do
  use Acs.Web, :controller
  use LogAlias
  use Timex

  alias Acs.StatsRepo
  alias Ecto.Adapters.SQL
  alias Acs.Stats.DailyReport
  alias Acs.Stats.DailyUserRetention
  alias Acs.Stats.DailyUserTiming
  alias Acs.Stats.DailyDeviceRetention
  alias Acs.Stats.DailyDeviceTiming

  def get_stats_by_day(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, params) do
    {:ok, date} = params["date"] || (Timex.local |> Timex.shift(days: -1) |> Timex.to_date |> Timex.format("{YYYY}-{0M}-{0D}"))

    query = from dp in DailyReport,
            select: map(dp, [:id, :platform, :dau, :danu, :dapu, :danpu, :dad, :dand, :total_fee]),
            where: dp.date == ^date and dp.app_id == ^app_id

    reports = Repo.all(query)
    conn |> json(%{success: true, reports: reports, date: date})
  end

  def get_user_timing_by_day(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, params) do
    {:ok, date} = params["date"] || (Timex.local |> Timex.shift(days: -1) |> Timex.to_date |> Timex.format("{YYYY}-{0M}-{0D}"))
    platform = params["platform"] || "all"
    
    query = from dut in DailyUserTiming,
            join: r in assoc(dut, :report),
            select: map(dut, [:id, :nmin, :counter, report: [:id, :platform]]),
            where: dut.report_id == r.id and r.date == ^date and r.app_id == ^app_id,
            preload: [report: r]

    timing = Repo.all(query)
    conn |> json(%{success: true, timing: timing, date: date, platform: platform})
  end

end
