defmodule Acs.Cache.CachedPMallUserPoints do
  require Exredis
  require Excache

  alias   Acs.Repo
  alias   Acs.PMalls.UserPoints

  def get(app_id, wcs_user_id) do
    Excache.get!(key(app_id, wcs_user_id), fallback: fn(redis_key) ->    
      case Exredis.get(redis_key) do
        nil -> 
          case refresh(app_id, wcs_user_id) do 
            nil -> {:ignore, nil}
            user_points -> {:commit, user_points}
          end

        raw ->
          {:commit, UserPoints.from_redis(raw)}
      end
    end)
  end

  def refresh(%UserPoints{app_id: app_id, wcs_user_id: wcs_user_id} = user_points) do 
    Exredis.setex(key(app_id, wcs_user_id), 7200, UserPoints.to_redis(user_points))
    Excache.del(key(app_id, wcs_user_id))
    user_points
  end

  def refresh(app_id, wcs_user_id) do 
    case Repo.get_by(UserPoints, app_id: app_id, wcs_user_id: wcs_user_id) do 
      %UserPoints{} = user_points ->
        refresh(user_points)

      nil -> 
        user_points = UserPoints.changeset(%UserPoints{}, %{
          app_id: app_id,
          wcs_user_id: wcs_user_id,
          point: 0
        }) |> Repo.insert!
        refresh(user_points)
    end
  end

  defp key(app_id, wcs_user_id) do 
    "acs.wcs_user_points.#{app_id}.#{wcs_user_id}"
  end

end