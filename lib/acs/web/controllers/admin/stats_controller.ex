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
    {:ok, yesterday} = (Timex.local |> Timex.shift(days: -1) |> Timex.to_date |> Timex.format("{YYYY}-{0M}-{0D}")) 
    date = case params["date"] do
      nil -> yesterday
      ""  -> yesterday
      _  -> params["date"]
    end

    query = from dp in DailyReport,
            select: map(dp, [:id, :platform, :dau, :danu, :dapu, :danpu, :dad, :dand, :total_fee]),
            where: dp.date == ^date and dp.app_id == ^app_id

    reports = StatsRepo.all(query)
    conn |> json(%{success: true, reports: reports, date: date})
  end

  def get_user_timing_by_day(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, params) do
    {:ok, yesterday} = (Timex.local |> Timex.shift(days: -1) |> Timex.to_date |> Timex.format("{YYYY}-{0M}-{0D}")) 
    date = case params["date"] do
      nil -> yesterday
      ""  -> yesterday
      _  -> params["date"] 
    end
    
    query = from dut in DailyUserTiming,
            join: r in assoc(dut, :report),
            select: map(dut, [:id, :nmin, :counter, report: [:id, :platform]]),
            where: dut.report_id == r.id and r.date == ^date and r.app_id == ^app_id,
            preload: [report: r]

    all = StatsRepo.all(query)
    timing = [_calc_user_timing(all, "all"), _calc_user_timing(all, "android"), _calc_user_timing(all, "ios")]
    conn |> json(%{success: true, timing: timing, date: date})
  end

  defp _calc_user_timing(all, type) do
    uts = Enum.filter(all,&(&1.report.platform == type))
    Enum.map(uts, fn(%{counter: k}) -> k end)
  end

  def get_stats_retention(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, 
                        %{"platform" => platform, "start_date" => start_date, "end_date" => end_date}) do
    query = 
      from dp in DailyReport,
        left_join: user_retentions in assoc(dp, :user_retentions),
        select: map(dp, [:id, :date, :platform, :dau, :danu,
          user_retentions: [:id, :nday, :retention ]]),
        where:  dp.app_id == ^app_id and dp.platform == ^platform and dp.date >= ^start_date and dp.date <= ^end_date,
        order_by: [asc: dp.date],
        preload: [user_retentions: user_retentions]
    reports = StatsRepo.all(query)
    conn |> json(%{success: true, reports: reports})
  end

  def get_stats_device(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, 
                        %{"platform" => platform, "stats_type" => stats_type}) do
    query_platform = 
      from ad in AppDevice,
        left_join: device in assoc(ad, :device),
        select: %{ "platform" => ad.platform, "count" => count(ad.id) },
        group_by: ad.platform,
        order_by: [asc: count(ad.id)]
    platform_reports = StatsRepo.all(query_platform)

    query = 
      from ad in AppDevice,
        left_join: device in assoc(ad, :device),
        order_by: [desc: count(ad.id)],
        limit: 10
    query = 
      if stats_type == "model" do
        query
        |> group_by([ad,device], device.model) 
        |> select([ad,device], %{platform: ad.platform, count: count(ad.id), model: device.model})
      else
        query
        |> group_by([ad,device], device.os) 
        |> select([ad,device], %{platform: ad.platform, count: count(ad.id), os: device.os})
      end

    query = 
      unless platform == "all" do
        where(query, [p], p.platform == ^platform)
      else
        query
      end

    reports = StatsRepo.all(query)
    conn |> json(%{success: true, platforms: platform_reports, reports: reports})
  end

  def get_stats_device_details(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, 
                        %{"platform" => platform , "stats_type" => stats_type, "page" => page , "records_per_page" => records_per_page}) do
   query_group_by = 
     from ad in AppDevice,
      left_join: device in assoc(ad, :device),
      select: %{count: count(ad.id)}
    query_group_by = 
      if stats_type == "model" do
        group_by(query_group_by, [ad,device], device.model)
      else
        group_by(query_group_by, [ad,device], device.os)
      end
    query_total = from e in subquery(query_group_by), select: count(e.count)
    total_page = round(Float.ceil(StatsRepo.one(query_total) / records_per_page))
   
    query = 
      from ad in AppDevice,
        left_join: device in assoc(ad, :device),
        order_by: [desc: count(ad.id)],
        offset: ^((page - 1) * records_per_page),
        limit: ^records_per_page
    query = 
      if stats_type == "model" do
        query
        |> group_by([ad,device], device.model) 
        |> select([ad,device], %{count: count(ad.id), model: device.model})
      else
        query
        |> group_by([ad,device], device.os) 
        |> select([ad,device], %{count: count(ad.id), os: device.os})
      end

    query = 
      unless platform == "all" do
        where(query, [p], p.platform == ^platform)
      else
        query
      end

    reports = StatsRepo.all(query)
    conn |> json(%{success: true, total: total_page, reports: reports})
  end
end
