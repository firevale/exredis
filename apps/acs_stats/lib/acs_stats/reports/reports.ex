defmodule AcsStats.Reports do
  @moduledoc """
  The Stats context.
  """
  use Timex
  use Utils.LogAlias

  import Ecto.Query, warn: false
  alias AcsStats.Repo
  alias Exservice.Chaoxin
  alias AcsStats.Reports.DailyReport
  alias AcsStats.Reports.DailyUserRetention
  alias AcsStats.Reports.DailyDeviceRetention
  alias AcsStats.Reports.DailyUserTiming
  alias AcsStats.Reports.DailyDeviceTiming
  alias AcsStats.Devices.DeviceInfo
  alias AcsStats.Devices.AppDevice
  alias AcsStats.Devices.AppDeviceDailyActivity
  alias AcsStats.Users.AppUser
  alias AcsStats.Users.AppUserDailyActivity

  def generate(app_id, date) do
    try do 
     ~w(ios android all) |> Enum.each(fn(platform) -> 
       _generate(app_id, date, platform)
     end)
    catch 
      t, e ->
        Chaoxin.send_text_msg("统计日报表生成失败, app_id: #{app_id}, date: #{date}, t: #{inspect t}, e: #{inspect e}")
    end
   end
 
   defp _generate(app_id, date, platform) do 
     query = from au in AppUser,
         right_join: auda in assoc(au, :daily_activities),
         select: count(au.user_id, :distinct),
         where: au.app_id == ^app_id and auda.date == ^date
 
     query = if platform != "all" do 
       query |> where([au], au.platform == ^platform) 
     else
       query
     end
 
     dau = Repo.one(query)
 
     query = from au in AppUser,
         left_join: auda in assoc(au, :daily_activities),
         select: count(au.user_id, :distinct),
         where: au.app_id == ^app_id and au.reg_date == ^date and auda.date == ^date
 
     query = if platform != "all" do 
       query |> where([au], au.platform == ^platform) 
     else
       query
     end
 
     danu = Repo.one(query)
 
     query = from au in AppUser,
         right_join: auda in assoc(au, :daily_activities),
         select: count(au.user_id, :distinct),
         where: au.app_id == ^app_id and auda.pay_amount >0 and auda.date == ^date
 
     query = if platform != "all" do 
       query |> where([au], au.platform == ^platform) 
     else
       query
     end
 
     dapu = Repo.one(query)
 
     query = from au in AppUser,
         left_join: auda in assoc(au, :daily_activities),
         select: count(au.user_id, :distinct),
         where: au.app_id == ^app_id and au.reg_date == ^date and auda.pay_amount >0 and auda.date == ^date
 
     query = if platform != "all" do 
       query |> where([au], au.platform == ^platform) 
     else
       query
     end
 
     danpu = Repo.one(query)
 
     query = from ad in AppDevice,
         right_join: adda in assoc(ad, :daily_activities),
         select: count(ad.device_id, :distinct),
         where: ad.app_id == ^app_id and adda.date == ^date
 
     query = if platform != "all" do 
       query |> where([ad], ad.platform == ^platform) 
     else
       query
     end
 
     dad = Repo.one(query)
 
     query = from ad in AppDevice,
         left_join: adda in assoc(ad, :daily_activities),
         select: count(ad.device_id, :distinct),
         where: ad.app_id == ^app_id and ad.reg_date == ^date and adda.date == ^date
 
     query = if platform != "all" do 
       query |> where([ad], ad.platform == ^platform) 
     else
       query
     end
 
     dand = Repo.one(query)
 
     query = if platform != "all" do 
       from auda in AppUserDailyActivity,
         join: au in assoc(auda, :app_user),
         select: sum(auda.pay_amount),
         where: au.app_id == ^app_id and auda.date == ^date and au.platform == ^platform
     else
       from auda in AppUserDailyActivity,
         join: au in assoc(auda, :app_user),
         select: sum(auda.pay_amount),
         where: au.app_id == ^app_id and auda.date == ^date
     end
 
     total_fee = Repo.one(query) || 0
     total_fee =  total_fee |> to_string |> String.to_integer
 
     daily_report = %{:app_id => app_id, :date => date, :platform => platform, 
                     :dau => dau, :danu => danu, :dapu => dapu, :danpu => danpu, 
                     :dad => dad, :dand => dand, :total_fee => total_fee }
 
     report_id = case Repo.get_by(DailyReport, app_id: app_id, date: date, platform: platform) do
       %DailyReport{} = ddt ->
         DailyReport.changeset(ddt, %{dau: dau, danu: danu, dapu: dapu, danpu: danpu, dad: dad, dand: dand, total_fee: total_fee}) |> Repo.update
         ddt.id
       _ ->
         {:ok, report} = DailyReport.changeset(%DailyReport{}, daily_report) |> Repo.insert
         report.id
     end
 
     # current user retentions
     ~w(1 2 3 5 7 14 30) |> Enum.each(fn(day) ->
       calc_day_user_retentions(app_id, platform, date, day, report_id)
     end)
 
     # backdate user retentions
     {:ok, current} = Timex.parse(date, "{YYYY}-{0M}-{0D}")
     {:ok, back_date} = Timex.format(Timex.add(current, Duration.from_days(-30)), "{YYYY}-{0M}-{0D}")
     
     query = from dur in DailyUserRetention,
         join: dr in assoc(dur, :report),
         select: map(dur, [:id, :nday, :report_id, report: [:id, :date, :platform]]),
         where: dur.report_id == dr.id and dr.date < ^date and dr.date >= ^back_date and dr.app_id == ^app_id,
         preload: [report: dr]
 
     back_days = Repo.all(query)
 
     Enum.each(back_days, fn(x) -> 
       %{nday: nday, report: %{date: date, platform: platform}, report_id: report_id}  = x
       {:ok, ndate} =  Timex.format(date, "{YYYY}-{0M}-{0D}")
       calc_day_user_retentions(app_id, platform, ndate, nday, report_id)
     end)
   
     # user timings  0-5，5-10，10-15～ 55-60，60+
     Enum.each(0..12, fn(x) -> 
        calc_day_user_timings(app_id, platform, date, x, report_id)
     end)
 
     # current device retentions
     ~w(1 2 3 5 7 14 30) |> Enum.each(fn(day) ->
       calc_day_device_retentions(app_id, platform, date, day, report_id)
     end)
 
     # backdate device retentions    
     query = from ddr in DailyDeviceRetention,
         join: dr in assoc(ddr, :report),
         select: map(ddr, [:id, :nday, :report_id, report: [:id, :date, :platform]]),
         where: ddr.report_id == dr.id and dr.date < ^date and dr.date >= ^back_date and dr.app_id == ^app_id,
         preload: [report: dr]
 
     back_days = Repo.all(query)
 
     Enum.each(back_days, fn(x) -> 
       %{nday: nday, report: %{date: date, platform: platform}, report_id: report_id}  = x
       {:ok, ndate} =  Timex.format(date, "{YYYY}-{0M}-{0D}")
       calc_day_device_retentions(app_id, platform, ndate, nday, report_id)
     end)
 
     # device timings  0-5，5-10，10-15～ 55-60，60+
     Enum.each(0..12, fn(x) -> 
        calc_day_device_timings(app_id, platform, date, x, report_id)
     end)
 
     :ok
 
   end
 
   defp calc_day_user_timings(app_id, platform, date, x, report_id) do
     nmin = x*5*60
     nmax = case x do
       12 -> 24*60*60
       _ -> (x*5 + 5)*60
     end
     report_id = report_id |> to_string |> String.to_integer
     
     query = if platform != "all" do 
       from auda in AppUserDailyActivity,
         join: au in assoc(auda, :app_user),
         select: count(1),
         where: au.app_id == ^app_id and auda.date == ^date and au.platform == ^platform 
               and auda.active_seconds > ^nmin and auda.active_seconds <= ^nmax
     else
       from auda in AppUserDailyActivity,
         join: au in assoc(auda, :app_user),
         select: count(1),
         where: au.app_id == ^app_id and auda.date == ^date
               and auda.active_seconds > ^nmin and auda.active_seconds <= ^nmax
     end
 
     counter = Repo.one(query)
     user_timing = %{ :counter => counter, :nmin => x*5, :report_id => report_id }
 
     case Repo.get_by(DailyUserTiming, nmin: x*5, report_id: report_id) do
       %DailyUserTiming{} = dut ->
         DailyUserTiming.changeset(dut, %{counter: counter}) |> Repo.update
       _ ->
         DailyUserTiming.changeset(%DailyUserTiming{}, user_timing) |> Repo.insert
     end
 
   end
 
   defp calc_day_device_timings(app_id, platform, date, x, report_id) do
     nmin = x*5*60
     nmax = case x do
       12 -> 24*60*60
       _ -> (x*5 + 5)*60
     end
     report_id = report_id |> to_string |> String.to_integer
     
     query = if platform != "all" do 
       from adda in AppDeviceDailyActivity,
         join: ad in assoc(adda, :app_device),
         select: count(1),
         where: ad.app_id == ^app_id and adda.date == ^date and ad.platform == ^platform 
               and adda.active_seconds > ^nmin and adda.active_seconds <= ^nmax
     else
       from adda in AppDeviceDailyActivity,
         join: ad in assoc(adda, :app_device),
         select: count(1),
         where: ad.app_id == ^app_id and adda.date == ^date
               and adda.active_seconds > ^nmin and adda.active_seconds <= ^nmax
     end
 
     counter = Repo.one(query)
     device_timing = %{ :counter => counter, :nmin => x*5, :report_id => report_id }
 
     case Repo.get_by(DailyDeviceTiming, nmin: x*5, report_id: report_id) do
       %DailyDeviceTiming{} = ddt ->
         DailyDeviceTiming.changeset(ddt, %{counter: counter}) |> Repo.update
       _ ->
         DailyDeviceTiming.changeset(%DailyDeviceTiming{}, device_timing) |> Repo.insert
     end
 
   end
 
   defp calc_day_user_retentions(app_id, platform, reg_date, day, report_id) do
     day = day |> to_string |> String.to_integer
     report_id = report_id |> to_string |> String.to_integer
     {:ok, reg} = Timex.parse(reg_date, "{YYYY}-{0M}-{0D}")
     {:ok, date} = Timex.format(Timex.add(reg, Duration.from_days(day)), "{YYYY}-{0M}-{0D}")
 
     query = if platform != "all" do 
       from auda in AppUserDailyActivity,
         join: au in assoc(auda, :app_user),
         select: count(1),
         where: au.app_id == ^app_id and au.reg_date == ^reg_date and auda.date == ^date and au.platform == ^platform
     else
       from auda in AppUserDailyActivity,
         join: au in assoc(auda, :app_user),
         select: count(1),
         where: au.app_id == ^app_id and au.reg_date == ^reg_date and auda.date == ^date
     end
 
     retentions = Repo.one(query)
     user_retention = %{ :nday => day, :retention => retentions, :report_id => report_id }
 
     case Repo.get_by(DailyUserRetention, nday: day, report_id: report_id) do
       %DailyUserRetention{} = dur ->
         DailyUserRetention.changeset(dur, %{retention: retentions}) |> Repo.update
       _ ->
         DailyUserRetention.changeset(%DailyUserRetention{}, user_retention) |> Repo.insert
     end
   end
 
   defp calc_day_device_retentions(app_id, platform, reg_date, day, report_id) do
     day = day |> to_string |> String.to_integer
     report_id = report_id |> to_string |> String.to_integer
     {:ok, reg} = Timex.parse(reg_date, "{YYYY}-{0M}-{0D}")
     {:ok, date} = Timex.format(Timex.add(reg, Duration.from_days(day)), "{YYYY}-{0M}-{0D}")
 
     query = if platform != "all" do 
       from adda in AppDeviceDailyActivity,
         join: ad in assoc(adda, :app_device),
         select: count(1),
         where: ad.app_id == ^app_id and ad.reg_date == ^reg_date and adda.date == ^date and ad.platform == ^platform
     else
       from adda in AppDeviceDailyActivity,
         join: ad in assoc(adda, :app_device),
         select: count(1),
         where: ad.app_id == ^app_id and ad.reg_date == ^reg_date and adda.date == ^date
     end
 
     retentions = Repo.one(query)
     device_retention = %{ :nday => day, :retention => retentions, :report_id => report_id }
 
     case Repo.get_by(DailyDeviceRetention, nday: day, report_id: report_id) do
       %DailyDeviceRetention{} = ddr ->
         DailyDeviceRetention.changeset(ddr, %{retention: retentions}) |> Repo.update
       _ ->
         DailyDeviceRetention.changeset(%DailyDeviceRetention{}, device_retention) |> Repo.insert
     end
   end

   def get_stats_by_date(app_id, dt) do
    {:ok, yesterday} = (Timex.local |> Timex.shift(days: -1) |> Timex.to_date |> Timex.format("{YYYY}-{0M}-{0D}")) 
    date = case dt do
      nil -> yesterday
      ""  -> yesterday
      _  -> dt
    end

    query = from dp in DailyReport,
            select: map(dp, [:id, :platform, :dau, :danu, :dapu, :danpu, :dad, :dand, :total_fee]),
            where: dp.date == ^date and dp.app_id == ^app_id

    reports = Repo.all(query)
    {:ok, reports, date}
  end

  def get_user_timing_by_date(app_id, dt) do
    {:ok, yesterday} = (Timex.local |> Timex.shift(days: -1) |> Timex.to_date |> Timex.format("{YYYY}-{0M}-{0D}")) 
    date = case dt do
      nil -> yesterday
      ""  -> yesterday
      _  -> dt
    end
    
    query = from dut in DailyUserTiming,
            join: r in assoc(dut, :report),
            select: map(dut, [:id, :nmin, :counter, report: [:id, :platform]]),
            where: dut.report_id == r.id and r.date == ^date and r.app_id == ^app_id,
            preload: [report: r]

    all = Repo.all(query)
    timing = [_calc_user_timing(all, "all"), _calc_user_timing(all, "android"), _calc_user_timing(all, "ios")]
    {:ok, timing, date}
  end

  defp _calc_user_timing(all, type) do
    uts = Enum.filter(all,&(&1.report.platform == type))
    Enum.map(uts, fn(%{counter: k}) -> k end)
  end

  def get_stats_retention(app_id, platform, start_date, end_date) do
    query = 
      from dp in DailyReport,
        left_join: user_retentions in assoc(dp, :user_retentions),
        select: map(dp, [:id, :date, :platform, :dau, :danu,
          user_retentions: [:id, :nday, :retention ]]),
        where:  dp.app_id == ^app_id and dp.platform == ^platform and dp.date >= ^start_date and dp.date <= ^end_date,
        order_by: [asc: dp.date],
        preload: [user_retentions: user_retentions]
    Repo.all(query)
  end

  def get_stats_device(platform, stats_type, start_date, end_date) do
    query_platform = 
      from ad in AppDevice,
        left_join: device in assoc(ad, :device),
        select: %{ "platform" => ad.platform, "count" => count(ad.id) },
        where: ad.reg_date >= ^start_date and ad.reg_date <= ^end_date,
        group_by: ad.platform,
        order_by: [asc: count(ad.id)]
    platform_reports = Repo.all(query_platform)

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

    reports =Repo.all(query)
    {:ok, platform_reports, reports}
  end

  def get_stats_device_details(platform , stats_type, mem_size, order_bys, start_date, end_date, page , records_per_page) do
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
    total_page = round(Float.ceil(Repo.one(query_total) / records_per_page))
   
    query_reports =  _query_device_details([platform: platform, stats_type: stats_type, page: page, records_per_page: records_per_page,
         mem_size: mem_size, start_date: start_date, end_date: end_date, order_by: order_bys])
    reports = Repo.all(query_reports)
    {:ok, total_page, reports}
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
