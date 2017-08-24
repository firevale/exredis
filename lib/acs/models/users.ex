defmodule Acs.Users do
  import Ecto.Query, warn: false
  
  alias Acs.Repo
  alias Acs.StatsRepo

  require Redis
  require Cachex
  alias  Acs.RedisUser

  alias Acs.User
  alias Acs.Stats.AppUser

  def get_users_by_ids(app_id, id) when is_integer(id) do
    get_users_by_ids(app_id, [id])
  end
  def get_users_by_ids(app_id, ids \\ []) when is_list(ids) do
    case ids do
      [] -> 
        []
      ids_list ->
        users = Enum.map(ids, fn id -> RedisUser.find(id) end)
        users_inner_app_users = 
          Enum.map(users, fn user ->
            app_users_query =
              from app_user in AppUser,
                where: app_user.app_id == ^app_id and app_user.user_id == ^user.id,
                select: map(app_user, [:zone_id, :app_user_id, :app_user_name, :app_user_level, :active_seconds,
                  :pay_amount, :last_active_at, :inserted_at]),
                order_by: [asc: app_user.zone_id]
            app_users = StatsRepo.all(app_users_query)
            Map.put_new(%{
              id: user.id,
              email: user.email,
              mobile: user.mobile,
              gender: user.gender,
              nickname: user.nickname,
              age: user.age,
              inserted_at: user.inserted_at
              },
              :app_users, app_users)
          end)
      _ ->
        []
    end
  end

end