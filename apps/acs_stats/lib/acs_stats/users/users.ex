defmodule AcsStats.Users do
  @moduledoc """
  The Users context.
  """

  import Ecto.Query, warn: false
  alias AcsStats.Repo
  use Utils.LogAlias

  alias AcsStats.Cache.CachedAppUser
  alias Acs.Search.ESAppUser
  alias AcsStats.Users.AppUser

  alias AcsStats.Users.AppUserDailyActivity
  alias AcsStats.Cache.CachedAppUserDailyActivity 

  alias AcsStats.RealtimeMetrics

  def log_app_login_user(date, app_id, user_id, platform) do 
    if RealtimeMetrics.is_new_app_user?(app_id, user_id) do 
      RealtimeMetrics.add_new_login_user(date, app_id, platform, user_id) 
    end
    RealtimeMetrics.add_login_user(date, app_id, platform, user_id) 
  end

  def log_app_user(date, app_id, zone_id, user_id, platform, sdk, game_user_id, game_user_name, game_user_level) do 
    if RealtimeMetrics.is_new_app_user?(app_id, user_id) do 
      RealtimeMetrics.add_new_active_user(date, app_id, platform, user_id) 
      RealtimeMetrics.add_app_user(app_id, user_id)
    end

    if RealtimeMetrics.is_yesterday_new_app_user?(date, app_id, user_id) do 
      RealtimeMetrics.add_retention_user(date, app_id, user_id)
    end

    if RealtimeMetrics.is_yesterday_new_app_user?(date, app_id, platform, user_id) do 
      RealtimeMetrics.add_retention_user(date, app_id, platform, user_id)
    end

    RealtimeMetrics.add_active_user(date, app_id, platform, user_id) 

    case CachedAppUser.get(app_id, zone_id, user_id) do 
      nil ->
        {:ok, app_user} = AppUser.changeset(%AppUser{}, %{
          app_id: app_id,
          zone_id: zone_id,
          user_id: user_id,
          platform: platform,
          sdk: sdk,
          reg_date: date,
          app_user_id: game_user_id,
          app_user_name: game_user_name,
          app_user_level: game_user_level,
          last_active_at: DateTime.utc_now(),
        }) |> Repo.insert()
        ESAppUser.index(app_user, user_id)
        CachedAppUser.refresh(app_user)

      app_user ->
        {:ok, app_user} = AppUser.changeset(app_user, %{
          app_user_id: game_user_id,
          app_user_name: game_user_name,
          app_user_level: game_user_level,
          last_active_at: DateTime.utc_now(),
        }) |> Repo.update()      
        ESAppUser.index(app_user, user_id)
        CachedAppUser.refresh(app_user)
    end
  end

  def log_app_user_activity(date, app_id, zone_id, user_id, active_seconds) do 
    with app_user = %AppUser{} <- CachedAppUser.get(app_id, zone_id, user_id) 
    do 
      case CachedAppUserDailyActivity.get(app_user.id, date) do
        nil ->
          {:ok, model} = AppUserDailyActivity.changeset(%AppUserDailyActivity{}, %{
            app_user_id: app_user.id,
            date: date,
            active_seconds: active_seconds
          }) |> Repo.insert()          
          CachedAppUserDailyActivity.refresh(model)
        cached ->
          {:ok, model} = AppUserDailyActivity.changeset(cached, %{
            active_seconds: cached.active_seconds + active_seconds
          }) |> Repo.update()          
          CachedAppUserDailyActivity.refresh(model)          
      end
    else 
      nil -> 
        error("app_user for #{app_id}.#{zone_id}.#{user_id} not found")
    end
  end

  def log_app_user_payment(date, app_id, zone_id, user_id, platform, fee) do 
    if RealtimeMetrics.is_new_app_paid_user?(app_id, user_id) do 
      RealtimeMetrics.add_new_paid_user(date, app_id, platform, user_id)      
    end

    RealtimeMetrics.add_app_paid_user(app_id, user_id)
    RealtimeMetrics.add_paid_user(date, app_id, platform, user_id)
    RealtimeMetrics.add_paid_fee(date, app_id, platform, fee)

    with app_user = %AppUser{} <- CachedAppUser.get(app_id, zone_id, user_id) 
    do 
      {:ok, app_user} = AppUser.changeset(app_user, %{
        pay_amount: app_user.pay_amount + fee,
        last_active_at: DateTime.utc_now(),
      }) |> Repo.update()       

      CachedAppUser.refresh(app_user)

      case CachedAppUserDailyActivity.get(app_user.id, date) do
        nil ->
          {:ok, model} = AppUserDailyActivity.changeset(%AppUserDailyActivity{}, %{
            app_user_id: app_user.id,
            date: date,
            pay_amount: fee,
          }) |> Repo.insert()          
          CachedAppUserDailyActivity.refresh(model)
        cached ->
          {:ok, model} = AppUserDailyActivity.changeset(cached, %{
            pay_amount: cached.pay_amount + fee,
          }) |> Repo.update()          
          CachedAppUserDailyActivity.refresh(model)          
      end
    else 
      nil -> 
        error("app_user for #{app_id}.#{zone_id}.#{user_id} not found")
    end
  end

  def list_app_users(app_id, user_id) do 
    query =
      from app_user in AppUser,
        where: app_user.app_id == ^app_id, 
        where: app_user.user_id == ^user_id,
        select: map(app_user, [
          :zone_id, 
          :app_user_id, 
          :app_user_name, 
          :app_user_level, 
          :active_seconds, 
          :pay_amount, 
          :last_active_at, 
          :inserted_at]),
        order_by: [asc: app_user.zone_id]
    AcsStats.Repo.all(query)
  end
end
