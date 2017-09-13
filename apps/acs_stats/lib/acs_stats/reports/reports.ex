defmodule AcsStats.Reports do
  @moduledoc """
  The Stats context.
  """
  use Timex
  use Utils.LogAlias

  import Ecto.Query, warn: false
  alias AcsStats.Repo
  alias Ecto.Adapters.SQL
  alias Exservice.Chaoxin
  alias AcsStats.Reports.DailyReport
  alias AcsStats.Reports.DailyUserRetention
  alias AcsStats.Reports.DailyDeviceRetention
  alias AcsStats.Reports.DailyUserTiming
  alias AcsStats.Reports.DailyDeviceTiming
  alias AcsStats.Devices.Device
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
end
