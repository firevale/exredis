defmodule Acs.RedisItcApp do
  require Redis
  require Cachex

  alias   Acs.Repo
  import  Ecto.Query

  use     LogAlias
  alias   Acs.ItcApp

  @cache_key     "_acs.itc_app"

  def find(itc_app_id) do 
    key = "#{@cache_key}.#{itc_app_id}"

    Cachex.get!(:default, key, fallback: fn(redis_key) -> 
      case Redis.get(redis_key) do 
        :undefined ->
          case Repo.get_by(ItcApp, itc_app_id: itc_app_id) do 
            nil -> 
              {:ignore, nil}

            %ItcApp{} = itc_app ->
              Redis.setex(key, 3600 * 24, ItcApp.to_redis(itc_app))
              {:commit, itc_app}
          end

        raw -> 
          {:commit, ItcApp.from_redis(raw)}
      end
    end)
  end

  def active_itc_app_id_of(app_id) do 
    Cachex.get!(:default, "_acs.itc_active_app.#{app_id}", fallback: fn(_key) -> 
      itc_apps = itc_app_ids_of(app_id)
      case _active_itc_app(itc_apps) do 
        nil -> {:ignore, nil}
        itc_app_id -> 
          {:commit, itc_app_id}
      end
    end)
  end

  def _active_itc_app([]), do: nil 
  def _active_itc_app([itc_app_id | rest]) do 
    num_testers = Acs.TestFlight.Worker.num_testers!(itc_app_id)
    if num_testers < 9900 do 
      itc_app_id
    else 
      _active_itc_app(rest)  
    end
  end

  def itc_app_ids_of(app_id) do 
    Cachex.get!(:default, "_acs.itc_apps.#{app_id}", fallback: fn(_key) -> 
      query = from itc in ItcApp,
              select: itc.itc_app_id,
              where: itc.active == true,
              order_by: itc.id

      {:commit, Repo.all(query)}
    end)
  end


end