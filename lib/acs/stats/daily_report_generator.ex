defmodule Acs.Stats.DailyReportGenerator do
  @moduledoc """
  The boundary for the Stats system.
  """
  use Timex
  use LogAlias
  import Ecto.Query, warn: false

  alias Acs.StatsRepo
  alias Ecto.Adapters.SQL
  alias Acs.ChaoxinNotifier
  alias Acs.Stats.DailyReport

  alias Acs.Stats.AppUser
  alias Acs.Stats.AppUserDailyActivity
  alias Acs.Stats.AppDevice
  alias Acs.Stats.AppDeviceDailyActivity

  def generate(app_id, date) do
    ~w(ios android all) |> Enum.each(fn(platform) -> 
      _generate(app_id, date, platform)
    end) 
  #  try do 
  #   ~w(ios android all) |> Enum.each(fn(platform) -> 
  #     _generate(app_id, date, platform)
  #   end)
  #  catch 
  #    t, e ->
  #      ChaoxinNotifier.send_text_msg("统计日报表生成失败, app_id: #{app_id}, date: #{date}, t: #{inspect t}, e: #{inspect e}")
  #  end
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

    dau = Acs.StatsRepo.one(query)

    query = from au in AppUser,
        left_join: auda in assoc(au, :daily_activities),
        select: count(au.user_id, :distinct),
        where: au.app_id == ^app_id and au.reg_date == ^date and auda.date == ^date

    query = if platform != "all" do 
      query |> where([au], au.platform == ^platform) 
    else
      query
    end

    danu = Acs.StatsRepo.one(query)

    query = from au in AppUser,
        right_join: auda in assoc(au, :daily_activities),
        select: count(au.user_id, :distinct),
        where: au.app_id == ^app_id and auda.pay_amount >0 and auda.date == ^date

    query = if platform != "all" do 
      query |> where([au], au.platform == ^platform) 
    else
      query
    end

    dapu = Acs.StatsRepo.one(query)

    query = from au in AppUser,
        left_join: auda in assoc(au, :daily_activities),
        select: count(au.user_id, :distinct),
        where: au.app_id == ^app_id and au.reg_date == ^date and auda.pay_amount >0 and auda.date == ^date

    query = if platform != "all" do 
      query |> where([au], au.platform == ^platform) 
    else
      query
    end

    danpu = Acs.StatsRepo.one(query)

    query = from ad in AppDevice,
        right_join: adda in assoc(ad, :daily_activities),
        select: count(ad.device_id, :distinct),
        where: ad.app_id == ^app_id and adda.date == ^date

    query = if platform != "all" do 
      query |> where([ad], ad.platform == ^platform) 
    else
      query
    end

    dad = Acs.StatsRepo.one(query)

    query = from ad in AppDevice,
        left_join: adda in assoc(ad, :daily_activities),
        select: count(ad.device_id, :distinct),
        where: ad.app_id == ^app_id and ad.reg_date == ^date and adda.date == ^date

    query = if platform != "all" do 
      query |> where([ad], ad.platform == ^platform) 
    else
      query
    end

    dand = Acs.StatsRepo.one(query)

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

    total_fee = Acs.StatsRepo.one(query) || 0
    total_fee =  total_fee |> to_string |> String.to_integer

    daily_report = %{:app_id => app_id, :date => date, :platform => platform, 
                    :dau => dau, :danu => danu, :dapu => dapu, :danpu => danpu, 
                    :dad => dad, :dand => dand, :total_fee => total_fee }

    {:ok, report} = DailyReport.changeset(%DailyReport{}, daily_report) |> Acs.StatsRepo.insert

    # user retentions
    ~w(1 2 3 5 7 14 30) |> Enum.each(fn(day) -> 
      
    end)

    # # user timings
    # query = from au in AppUser,
    #     right_join: auda in assoc(au, :daily_activities),
    #     select: auda.active_seconds div 300 as idx, count(au.device_id, :distinct),
    #     where: au.app_id == ^app_id and auda.date == ^date,
    #     group_by: auda.active_seconds div 300

    # query = if platform != "all" do 
    #   query |> where([au], au.platform == ^platform) 
    # else
    #   query
    # end

    # user_timings = Acs.StatsRepo.all(query)


    # {:ok, %{rows: [[danu]]}} = SQL.query(Acs.StatsRepo,  
    #   "SELECT count(DISTINCT a0.`app_user_id`) FROM `app_user_daily_activities` AS a0 \
    #     LEFT OUTER JOIN `app_users` AS a1 ON a1.`id` = a0.`app_user_id` \
    #     WHERE (((a1.`app_id` = ?) AND (a1.`reg_date` = ?)) AND (a0.`date` = ?))", 
    #     ["53A993ABE3A1CB110E1DC59AE557F5C9", {2017, 6, 20}, {2017, 6, 20}])   

  end

  defp calc_day_retentions(app_id, platform, reg_date, day) do
    {:ok, reg} = Timex.parse(reg_date, "{YYYY}-{0M}-{0D}")
    {:ok, date} = Timex.format(Timex.add(reg, Duration.from_days(day)), "{YYYY}-{0M}-{0D}")

    query = from auda in AppUserDailyActivity,
        join: au in assoc(auda, :app_user),
        select: count(1),
        where: au.app_id == ^app_id and au.reg_date == ^reg_date and auda.date == ^date

    query = if platform != "all" do 
      query |> where([au], au.platform == ^platform) 
    else
      query
    end

    retentions = Acs.StatsRepo.one(query)
    # user_Retention = Map.put(user_Retention, :nday, day) |> Map.put(:retention, retentions) |> Map.put(:retention, retentions)
    
    # case DailyUserRetention.changeset(%DailyUserRetention{}, product_id_info) |> Repo.insert do
    #   {:ok, new_product_id_info} ->
    #       RedisApp.refresh(app_id)
    #     conn |> json(%{success: true, product_id_info: new_product_id_info})

    #   {:error, %{errors: errors}} ->
    #     conn |> json(%{success: false, message: translate_errors(errors)})
    # end

  end


end