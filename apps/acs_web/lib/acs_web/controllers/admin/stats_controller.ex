defmodule AcsWeb.Admin.StatsController do
  use AcsWeb, :controller
  use Timex

  def onlines(conn, %{"app_id" => app_id}) do 
    chart = Excache.get!("onlines_chart.#{app_id}", fallback: fn(key) -> 
      case Exredis.get(key) do 
        nil ->
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
    now = Timex.local()
    today = Timex.to_date(now)
    yesterday = now |> Timex.shift(days: -1) |> Timex.to_date()

    yesterday_danu = Exredis.scard("acs.danu.#{yesterday}.#{app_id}") 
    u_retention = if yesterday_danu > 0 do 
      Exredis.scard("acs.da2nu.#{today}.#{app_id}") / yesterday_danu * 100
    else 
      -1
    end

    yesterday_danu_ios = Exredis.scard("acs.danu.#{yesterday}.#{app_id}.ios") 
    u_retention_ios = if yesterday_danu_ios > 0 do 
      Exredis.scard("acs.da2nu.#{today}.#{app_id}.ios") / yesterday_danu_ios * 100
    else 
      -1
    end

    yesterday_danu_android = Exredis.scard("acs.danu.#{yesterday}.#{app_id}.android") 
    u_retention_android = if yesterday_danu_android > 0 do 
      Exredis.scard("acs.da2nu.#{today}.#{app_id}.android") / yesterday_danu_android * 100
    else 
      -1
    end
  
    da2nd_ios = Exredis.scard("acs.da2nd.#{today}.#{app_id}.ios") 
    da2nd_android = Exredis.scard("acs.da2nd.#{today}.#{app_id}.android") 

    yesterday_dand = Exredis.scard("acs.dand.#{yesterday}.#{app_id}") 
    d_retention = if yesterday_dand > 0 do 
      (da2nd_ios + da2nd_android) / yesterday_dand * 100
    else 
      -1
    end

    yesterday_dand_ios = Exredis.scard("acs.dand.#{yesterday}.#{app_id}.ios") 
    d_retention_ios = if yesterday_dand_ios > 0 do 
      da2nd_ios / yesterday_dand_ios * 100
    else 
      -1
    end

    yesterday_dand_android = Exredis.scard("acs.dand.#{yesterday}.#{app_id}.android") 
    d_retention_android = if yesterday_dand_android > 0 do 
      da2nd_android / yesterday_dand_android * 100
    else 
      -1
    end

    conn |> json(%{
      success: true,
      stats: %{
        dlu: %{
          total: Exredis.scard("acs.dlu.#{today}.#{app_id}"),  
          ios: Exredis.scard("acs.dlu.#{today}.#{app_id}.ios"), 
          android: Exredis.scard("acs.dlu.#{today}.#{app_id}.android"),
        },
        dld: %{
          total: Exredis.scard("acs.dld.#{today}.#{app_id}.ios") + Exredis.scard("acs.dld.#{today}.#{app_id}.android"),
          ios: Exredis.scard("acs.dld.#{today}.#{app_id}.ios"),
          android: Exredis.scard("acs.dld.#{today}.#{app_id}.android"),
        },
        dau: %{
          total: Exredis.scard("acs.dau.#{today}.#{app_id}"),  
          ios: Exredis.scard("acs.dau.#{today}.#{app_id}.ios"), 
          android: Exredis.scard("acs.dau.#{today}.#{app_id}.android"),
        },
        dad: %{
          total: Exredis.scard("acs.dad.#{today}.#{app_id}.ios") + Exredis.scard("acs.dad.#{today}.#{app_id}.android"),
          ios: Exredis.scard("acs.dad.#{today}.#{app_id}.ios"),
          android: Exredis.scard("acs.dad.#{today}.#{app_id}.android"),
        },
        danu: %{
          total: Exredis.scard("acs.danu.#{today}.#{app_id}"),  
          ios: Exredis.scard("acs.danu.#{today}.#{app_id}.ios"), 
          android: Exredis.scard("acs.danu.#{today}.#{app_id}.android"),
        },
        dand: %{
          total: Exredis.scard("acs.dand.#{today}.#{app_id}.ios") + Exredis.scard("acs.dand.#{today}.#{app_id}.android"),
          ios: Exredis.scard("acs.dand.#{today}.#{app_id}.ios"),
          android: Exredis.scard("acs.dand.#{today}.#{app_id}.android"),
        },
        dapu: %{
          total: Exredis.scard("acs.dapu.#{today}.#{app_id}"),  
          ios: Exredis.scard("acs.dapu.#{today}.#{app_id}.ios"), 
          android: Exredis.scard("acs.dapu.#{today}.#{app_id}.android"),
        },
        u2_retention: %{
          total: u_retention,
          ios: u_retention_ios,
          android: u_retention_android,
        },
        d2_retention: %{
          total: d_retention,
          ios: d_retention_ios,
          android: d_retention_android,
        },
        fee: %{
          ios: case Exredis.get("acs.totalfee.#{today}.#{app_id}.ios") do 
                nil -> 0
                x -> String.to_integer(x)
               end,
          android: case Exredis.get("acs.totalfee.#{today}.#{app_id}.android") do 
                     nil -> 0
                     x when is_bitstring(x) -> String.to_integer(x)
                   end,
        }
      }
    })  
  end

  def historic_onlines(conn, %{"app_id" => app_id}) do 
    chart = Excache.get!("hourly_onlines_chart.#{app_id}", fallback: fn(key) -> 
      case Exredis.get(key) do 
        nil ->
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

    reports = AcsStats.Repo.all(query)
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

    all = AcsStats.Repo.all(query)
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
    reports = AcsStats.Repo.all(query)
    conn |> json(%{success: true, reports: reports})
  end

  def get_stats_device(%Plug.Conn{private: %{acs_app_id: _app_id}} = conn, 
                        %{"platform" => platform, "stats_type" => stats_type, "start_date" => start_date, "end_date" => end_date}) do
    query_platform = 
      from ad in AppDevice,
        left_join: device in assoc(ad, :device),
        select: %{ "platform" => ad.platform, "count" => count(ad.id) },
        where: ad.reg_date >= ^start_date and ad.reg_date <= ^end_date,
        group_by: ad.platform,
        order_by: [asc: count(ad.id)]
    platform_reports = AcsStats.Repo.all(query_platform)

    query = 
      from ad in AppDevice,
        left_join: device in assoc(ad, :device),
        where: ad.reg_date >= ^start_date and ad.reg_date <= ^end_date,
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

    reports = AcsStats.Repo.all(query)
    conn |> json(%{success: true, platforms: platform_reports, reports: reports})
  end

  def get_stats_device_details(%Plug.Conn{private: %{acs_app_id: _app_id}} = conn, 
     %{"platform" => platform , "stats_type" => stats_type, "mem_size" => mem_size, "order_by" => order_bys,
      "start_date" => start_date, "end_date" => end_date, "page" => page , "records_per_page" => records_per_page}) do
    query_group_by = 
      from ad in AppDevice,
        left_join: device in assoc(ad, :device),
        where: ad.reg_date >= ^start_date and ad.reg_date <= ^end_date,
        select: %{count: count(ad.id)}
    
    query_group_by = 
      case stats_type  do
        "os" ->
          group_by(query_group_by, [ad,device], device.os)
        "model" ->
          query_device_model =
            case mem_size do
              [start_size, end_size] ->
                query_group_by
                |> join(:left, [ad, device], info in DeviceInfo, device.model == info.id)
                |> where([ad, device, info], info.total_mem_size >= ^start_size and info.total_mem_size < ^end_size)
              _ ->
                query_group_by
            end
          group_by(query_device_model, [ad,device], device.model)
      end
   
    query_total = from e in subquery(query_group_by), select: count(e.count)
    total_page = round(Float.ceil(AcsStats.Repo.one(query_total) / records_per_page))
   
    query_reports =  _query_device_details([platform: platform, stats_type: stats_type, page: page, records_per_page: records_per_page,
         mem_size: mem_size, start_date: start_date, end_date: end_date, order_by: order_bys])
    reports = AcsStats.Repo.all(query_reports)
    
    conn |> json(%{success: true, total: total_page, reports: reports})
  end
  defp _query_device_details(opts \\ []) do
    page = Keyword.get(opts, :page, 1)
    records_per_page = Keyword.get(opts, :records_per_page, 10)
    platform = Keyword.get(opts, :platform, "all")
    stats_type = Keyword.get(opts, :stats_type, "model")
    start_date = Keyword.get(opts, :start_date)
    end_date = Keyword.get(opts, :end_date)
    mem_size = Keyword.get(opts, :mem_size, [])
    order_bys = Keyword.get(opts, :order_by, [])

    query = 
      from ad in AppDevice,
        left_join: device in assoc(ad, :device),
        where: ad.reg_date >= ^start_date and ad.reg_date <= ^end_date,
        offset: ^((page - 1) * records_per_page),
        limit: ^records_per_page
    
    #平台筛选
    query_platform = 
      unless platform == "all" do
        where(query, [p], p.platform == ^platform)
      else
        query
      end
    
    #机型、操作系统 统计类型筛选
    query_stats_type = 
      case stats_type do
        "os" ->  #操作系统
          query_platform
          |> group_by([ad,device], device.os) 
          |> select([ad,device], %{count: fragment(" ? as count", count(ad.id)), os: device.os})
        
        "model" -> #机型
          query_model_base =
            query_platform
            |> group_by([ad,device], device.model) 
            |> select([ad,device], %{count: count(ad.id), model: device.model})
          
          #机型 - 内存大小
          query_mem =
            case mem_size do
              [start_size, end_size] ->
                query_model_base
                |> join(:left, [ad, device], info in DeviceInfo, device.model == info.id)
                |> where([ad, device, info], info.total_mem_size >= ^start_size and info.total_mem_size < ^end_size)
              _ ->
                query_model_base
            end

          _query_model =
            query_mem
            |> subquery()
            |> join(:left, [device], info in DeviceInfo, device.model == info.id) 
            |> select([device,info], %{count: device.count, model: device.model, alias: info.alias, total_mem_size: info.total_mem_size })
      end
    
    #排序
    _query_order_by(query_stats_type, order_bys)
  end
  defp _query_order_by(query, order_bys) do
    count = Map.get(order_bys,"count")
    query_order_count =
      case count do
        "asc" ->
          order_by(query, fragment("count"))
        "desc" ->
          order_by(query, fragment("count desc"))
        _ ->
          query
      end
    
    total_mem_size = Map.get(order_bys,"total_mem_size")
    _query_order_mem =
      case total_mem_size do
        "asc" ->
          order_by(query_order_count, [ad, device], device.total_mem_size)
        "desc" ->
          order_by(query_order_count, [ad, device], desc: device.total_mem_size)
        _ ->
          query_order_count
      end
  end
  
end
