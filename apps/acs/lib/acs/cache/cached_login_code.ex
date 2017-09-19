defmodule Acs.Cache.CachedLoginCode do
  require Exredis
  require Excache

  alias   Acs.Repo
  import  Ecto.Query
  alias   Acs.LoginCodes.AppLoginCode

  @key_base "acs.login_codes"

  # key_field can be user_id(integer) or code(bitstring)
  def get(app_id, [{k, v}]) do 
    Excache.get!(key(app_id, [{k, v}]), fallback: fn(redis_key) ->    
      case Exredis.get(redis_key) do
        nil -> 
          case refresh(app_id, [{k, v}]) do 
            nil -> 
              {:ignore, nil}
            app_login_code -> 
              {:commit, app_login_code}
          end
        raw ->
          {:commit, raw |> AppLoginCode.from_redis()}
      end
    end)
  end

  def refresh(app_id, [{k, v}]) do
    query = from c in AppLoginCode,
              select: c,
              where: c.app_id == ^app_id

    query = case k do 
      :code ->
        query |> where([c], c.code == ^v) 
      :owner ->
        query |> where([c], c.owner == ^v) 
      :user_id ->
        query |> where([c], c.user_id == ^v) 
    end
    
    case Repo.one(query) do 
      %AppLoginCode{} = app_login_code ->
        refresh(app_login_code)
        app_login_code
      
      _ -> 
        nil
    end
  end

  def refresh(%AppLoginCode{app_id: app_id} = app_login_code) do 
    Exredis.set(key(app_id, code: app_login_code.code), AppLoginCode.to_redis(app_login_code))
    Excache.del(key(app_id, code: app_login_code.code))

    if app_login_code.user_id do 
      Exredis.set(key(app_id, user_id: app_login_code.user_id), AppLoginCode.to_redis(app_login_code))
      Excache.del(key(app_id, user_id: app_login_code.user_id))
    end

    if app_login_code.owner do 
      Exredis.set(key(app_id, owner: app_login_code.owner), AppLoginCode.to_redis(app_login_code))
      Excache.del(key(app_id, owner: app_login_code.owner))
    end
  end

  defp key(app_id, code: code) do 
    "#{@key_base}.#{app_id}.code.#{code}"
  end
  defp key(app_id, user_id: user_id) do 
    "#{@key_base}.#{app_id}.user_id.#{user_id}"
  end
  defp key(app_id, owner: owner) do 
    "#{@key_base}.#{app_id}.owner.#{owner}"
  end

end