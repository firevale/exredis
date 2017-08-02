defmodule Acs.Web.Admin.StatsController do
  use Acs.Web, :controller
  use Timex

  def onlines(conn, %{"app_id" => app_id}) do 
    chart = Cachex.get!(:default, "onlines_chart.#{app_id}", fallback: fn(key) -> 
      case Redis.get(key) do 
        :undefined ->
          {:commit,  %{ labels: [],
                        datasets: [
                          %{
                            label: "同时在线",
                            data: [],
                          },
                          %{
                            label: "同时在线(IOS)",
                            data: [],
                          },
                          %{
                            label: "同时在线(ANDROID)",
                            data: [],
                          }
                        ]}}
        raw ->
          {:commit, raw |> Base.decode64! |> :erlang.binary_to_term}
      end
    end)
    conn |> json(%{ success: true, chart: chart})
  end

  def brief_stats(conn, %{"app_id" => app_id}) do 
    today = Timex.to_date(Timex.local)
    conn |> json(%{
      success: true,
      stats: %{
        dau: %{
          ios: Redis.scard("_dau.#{today}.#{app_id}.ios"), 
          android: Redis.scard("_dau.#{today}.#{app_id}.android"),
        },
        danu: %{
          ios: Redis.scard("_danu.#{today}.#{app_id}.ios"), 
          android: Redis.scard("_danu.#{today}.#{app_id}.android"),
        },
        dapu: %{
          ios: Redis.scard("_dapu.#{today}.#{app_id}.ios"), 
          android: Redis.scard("_dapu.#{today}.#{app_id}.android"),
        },
        fee: %{
          ios: case Redis.get("_totalfee.#{today}.#{app_id}.ios") do 
                :undefined -> 0
                x -> String.to_integer(x)
                end,
          android: case Redis.get("_totalfee.#{today}.#{app_id}.android") do 
                      :undefined -> 0
                      x when is_bitstring(x) -> String.to_integer(x)
                    end,
        }
      }
    })  
  end

  def historic_onlines(conn, %{"app_id" => app_id}) do 
    chart = Cachex.get!(:default, "hourly_onlines_chart.#{app_id}", fallback: fn(key) -> 
      case Redis.get(key) do 
        :undefined ->
          {:commit,  %{ labels: [],
                        datasets: [
                          %{
                            label: "同时在线",
                            data: [],
                          },
                          %{
                            label: "同时在线(IOS)",
                            data: [],
                          },
                          %{
                            label: "同时在线(ANDROID)",
                            data: [],
                          }
                        ]}}
        raw ->
          {:commit, raw |> Base.decode64! |> :erlang.binary_to_term}
      end
    end)
    conn |> json(%{ success: true, chart: chart})
  end

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
