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
        dlu: %{
          total: Redis.scard("acs.dlu.#{today}.#{app_id}"),  
          ios: Redis.scard("acs.dlu.#{today}.#{app_id}.ios"), 
          android: Redis.scard("acs.dlu.#{today}.#{app_id}.android"),
        },
        dau: %{
          total: Redis.scard("acs.dau.#{today}.#{app_id}"),  
          ios: Redis.scard("acs.dau.#{today}.#{app_id}.ios"), 
          android: Redis.scard("acs.dau.#{today}.#{app_id}.android"),
        },
        danu: %{
          total: Redis.scard("acs.danu.#{today}.#{app_id}"),  
          ios: Redis.scard("acs.danu.#{today}.#{app_id}.ios"), 
          android: Redis.scard("acs.danu.#{today}.#{app_id}.android"),
        },
        dapu: %{
          total: Redis.scard("acs.dapu.#{today}.#{app_id}"),  
          ios: Redis.scard("acs.dapu.#{today}.#{app_id}.ios"), 
          android: Redis.scard("acs.dapu.#{today}.#{app_id}.android"),
        },
        fee: %{
          ios: case Redis.get("acs.totalfee.#{today}.#{app_id}.ios") do 
                :undefined -> 0
                x -> String.to_integer(x)
                end,
          android: case Redis.get("acs.totalfee.#{today}.#{app_id}.android") do 
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
                        %{"platform" => platform, "stats_type" => stats_type, "start_date" => start_date, "end_date" => end_date}) do
    query_platform = 
      from ad in AppDevice,
        left_join: device in assoc(ad, :device),
        select: %{ "platform" => ad.platform, "count" => count(ad.id) },
        where: ad.reg_date >= ^start_date and ad.reg_date <= ^end_date,
        group_by: ad.platform,
        order_by: [asc: count(ad.id)]
    platform_reports = StatsRepo.all(query_platform)

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

    reports = StatsRepo.all(query)
    conn |> json(%{success: true, platforms: platform_reports, reports: reports})
  end

  def get_stats_device_details(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, 
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
              [start_size, end_size] = mem_size ->
                query_group_by
                |> join(:left, [ad, device], info in DeviceInfo, device.model == info.id)
                |> where([ad, device, info], info.total_mem_size >= ^start_size and info.total_mem_size < ^end_size)
              _ ->
                query_group_by
            end
          group_by(query_device_model, [ad,device], device.model)
      end
   
    query_total = from e in subquery(query_group_by), select: count(e.count)
    total_page = round(Float.ceil(StatsRepo.one(query_total) / records_per_page))
   
    query_reports =  _query_device_details([platform: platform, stats_type: stats_type, page: page, records_per_page: records_per_page,
         mem_size: mem_size, start_date: start_date, end_date: end_date, order_by: order_bys])
    reports = StatsRepo.all(query_reports)
    
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
        order_by: [desc: count(ad.id)],
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
          |> select([ad,device], %{count: count(ad.id), os: device.os})
        
        "model" -> #机型
          query_model_base =
            query_platform
            |> group_by([ad,device], device.model) 
            |> select([ad,device], %{count: count(ad.id), model: device.model})
          
          #机型 - 内存大小
          query_mem =
            case mem_size do
              [start_size, end_size] = mem_size ->
                query_model_base
                |> join(:left, [ad, device], info in DeviceInfo, device.model == info.id)
                |> where([ad, device, info], info.total_mem_size >= ^start_size and info.total_mem_size < ^end_size)
              _ ->
                query_model_base
            end

          query_model =
            query_mem
            |> subquery()
            |> join(:left, [device], info in DeviceInfo, device.model == info.id) 
            |> select([device,info], %{count: device.count, model: device.model, alias: info.alias, total_mem_size: info.total_mem_size })
      end
    
    #排序
    _query_order_by(query_stats_type, order_bys)
  end
  defp _query_order_by(query, order_bys) do
    _count = Map.get(order_bys,"count")
    query_order_count =
      case _count do
        "asc" ->
          order_by(query, [ad, device], :count)
        "desc" ->
          order_by(query, [ad, device], desc: :count)
        _ ->
          query
      end
    
      total_mem_size = Map.get(order_bys,"total_mem_size")
      query_order_mem =
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
