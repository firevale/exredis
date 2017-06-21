defmodule Acs.Stats.DailyReportGenerator do
  @moduledoc """
  The boundary for the Stats system.
  """

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
   try do 
    ~w(ios android all) |> Enum.each(fn(platform) -> 
      _generate(app_id, date, platform)
    end)
   catch 
     t, e ->
       ChaoxinNotifier.send_text_msg("统计日报表生成失败, app_id: #{app_id}, date: #{date}, t: #{inspect t}, e: #{inspect e}")
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

    # {:ok, %{rows: [[danu]]}} = SQL.query(Acs.StatsRepo,  
    #   "SELECT count(DISTINCT a0.`app_user_id`) FROM `app_user_daily_activities` AS a0 \
    #     LEFT OUTER JOIN `app_users` AS a1 ON a1.`id` = a0.`app_user_id` \
    #     WHERE (((a1.`app_id` = ?) AND (a1.`reg_date` = ?)) AND (a0.`date` = ?))", 
    #     ["53A993ABE3A1CB110E1DC59AE557F5C9", {2017, 6, 20}, {2017, 6, 20}])   

  end


end