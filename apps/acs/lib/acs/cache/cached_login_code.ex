defmodule Acs.Cache.RedisLoginCode do
  require Exredis
  require Excache

  alias   Acs.Repo
  alias   Acs.LoginCodes.AppLoginCode

  @app_user_cache_key "acs._login_codes.app_user"
  @code_cache_key "acs._login_codes.code"

  # key_field can be user_id(integer) or code(bitstring)
  def get(nil, _), do: nil
  def get(_, nil), do: nil
  
  def get(app_id, key_field) do 
    Excache.get!(key(app_id, key_field), fallback: fn(redis_key) ->    
      case Exredis.get(redis_key) do
        nil -> 
          case refresh(app_id, key_field) do 
            nil -> {:ignore, nil}
            app_login_code -> {:commit, app_login_code}
          end
        raw ->
          {:commit, raw |> AppLoginCode.from_redis()}
      end
    end)
  end

  def refresh(app_id, key_field) do
    redis_key = key(app_id, key_field)

    db_model = if is_integer(key_field) do 
      Repo.get_by(AppLoginCode, app_id: app_id, user_id: key_field)
    else 
      Repo.get_by(AppLoginCode, app_id: app_id, code: key_field)
    end

    case db_model do 
      %AppLoginCode{} = app_login_code ->
        Exredis.set(redis_key, app_login_code |> AppLoginCode.to_redis())
        Excache.del(redis_key)
        app_login_code
      
      _ -> 
        nil
    end
  end

  defp key(app_id, user_id) when is_integer(user_id) do 
    "#{@app_user_cache_key}.#{app_id}.#{user_id}"
  end

  defp key(app_id, code) when is_bitstring(code) do 
    "#{@code_cache_key}.#{app_id}.#{code}"
  end

end