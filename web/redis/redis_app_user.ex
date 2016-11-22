defmodule Acs.RedisAppUser do
  require Redis

  alias   Acs.Repo
  # import  Ecto
  # import  Ecto.Query

  alias   Acs.AppUser

  @app_user_cache_key     "fvac.app_user_cache"

  def find(app_id, user_id) do 
    redis_key = "#{@app_user_cache_key}.#{app_id}.#{user_id}"

    case Redis.get(redis_key) do 
      :undefined ->
        case Repo.get_by(AppUser, app_id: app_id, user_id: user_id) do 
          nil ->  
            {:ok, appUser} = AppUser.changeset(%AppUser{}, %{app_id: app_id, user_id: user_id}) |> Repo.insert
            Redis.set(redis_key, appUser |> :erlang.term_to_binary |> Base.encode64)
            appUser

          %AppUser{} = appUser ->
            Redis.set(redis_key, appUser |> :erlang.term_to_binary |> Base.encode64)
            appUser
        end
      raw -> 
        raw |> Base.decode64! |> :erlang.binary_to_term
    end
  end
end