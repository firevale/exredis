defmodule Acs.RedisLoginCode do
  require Redis
  require Cachex

  alias   Acs.Repo
  alias   Acs.AppLoginCode

  @app_user_cache_key "acs.login_codes.app_user"
  @code_cache_key "acs.login_codes.code"

  # key_field can be user_id(integer) or code(bitstring)
  def find(nil, _), do: nil
  def find(_, nil), do: nil
  
  def find(app_id, key_field) do 
    Cachex.get!(:default, key(app_id, key_field), fallback: fn(redis_key) ->    
      case Redis.get(redis_key) do
        :undefined -> 
          case refresh(app_id, key_field, false) do 
            nil -> {:ignore, nil}
            app_login_code -> {:commit, app_login_code}
          end
        raw ->
          {:commit, raw |> AppLoginCode.from_json()}
      end
    end)
  end

  def refresh(app_id, key_field, force_update \\ true) do
    redis_key = key(app_id, key_field)

    if force_update do 
      Cachex.del(:default, redis_key)
    end

    db_model = if is_integer(key_field) do 
      Repo.get_by(AppLoginCode, app_id: app_id, user_id: key_field)
    else 
      Repo.get_by(AppLoginCode, app_id: app_id, code: key_field)
    end

    case db_model do 
      %AppLoginCode{} = app_login_code ->
        Redis.set(redis_key, app_login_code |> AppLoginCode.to_json())
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