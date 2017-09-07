defmodule Acs.Cache.CachedUser do
  require Exredis
  require Excache

  alias   Acs.Repo
  import  Ecto.Query

  alias   Acs.Accounts.User
  alias   Acs.Accounts.UserSdkBinding


  @key_base       "acs.user"

  def get(user_id) when is_integer(user_id) do
    Excache.get!(key(user_id), fallback: fn(redis_key) ->    
      case Exredis.get(redis_key) do
        nil -> 
          case refresh(app_id) do 
            nil -> {:ignore, nil}
            user -> {:commit, user}
          end

        raw ->
          {:commit, raw |> User.from_redis}
      end
    end)
  end

  def get!(user_id) do 
    case get(user_id) do 
      nil -> raise "user: #{user_id} not found"
      v -> v
    end
  end

  def get_by(:email, email) do 
    Excache.get!(email_key(email), fallback: fn(redis_key) ->    
      case Exredis.get(redis_key) do
        nil -> 
          case Repo.get_by(User, email: email) do 
            nil -> {:ignore, nil} 
            %User{} = user ->
              Exredis.set(email_key(email), user.id)
              {:commit, user}
            end

        user_id ->
          {:commit, get(String.to_integer(user_id))}
      end
    end)    
  end

  def get_by(:mobile, mobile) do 
    Excache.get!(mobile_key(mobile), fallback: fn(redis_key) ->    
      case Exredis.get(redis_key) do
        nil -> 
          case Repo.get_by(User, mobile: mobile) do 
            nil -> {:ignore, nil} 
            %User{} = user ->
              Exredis.set(mobile_key(mobile), user.id)
              {:commit, user}
            end
            
        user_id ->
          {:commit, get(String.to_integer(user_id))}
      end
    end)    
  end

  def get_by(:device, device_id) do 
    Excache.get!(device_key(device_id), fallback: fn(redis_key) ->    
      case Exredis.get(redis_key) do
        nil -> 
          case Repo.get_by(User, device_id: device_id) do 
            nil -> {:ignore, nil} 
            %User{} = user ->
              Exredis.set(device_key(device_id), user.id)
              {:commit, user}
            end
            
        user_id ->
          {:commit, get(String.to_integer(user_id))}
      end
    end)    
  end

  def get_by(:sdk, sdk, sdk_user_id) do 
    Excache.get!(sdk_key(sdk, sdk_user_id), fallback: fn(redis_key) ->    
      case Exredis.get(redis_key) do
        nil -> 
          case Repo.get_by(UserSdkBinding, sdk: sdk, sdk_user_id: sdk_user_id) do 
            nil -> {:ignore, nil} 
            %UserSdkBinding{user_id: user_id} ->
              Exredis.set(sdk_key(sdk, sdk_user_id), user_id)
              {:commit, get(user_id)}
            end
            
        user_id ->
          {:commit, get(String.to_integer(user_id))}
      end
    end)    
  end

  def get_by!(type, account_id) do 
    case get_by(type, account_id) do 
      nil -> raise "account: #{account_id} not found"
      v -> v
    end
  end

  def refresh(id) when is_integer(id) do
    case Repo.get(User, id) do
      nil -> nil
      %User{} = user -> 
        refresh(user)
    end
  end

  def refresh(user = %User{}) do 
    Excache.del(key(user.id))
    Exredis.set(key(user.id), User.to_redis(user))
  end

  def del_device_index(device_id) do 
    Exredis.del(device_key(device_id))
    Excache.del(device_key(device_id))
  end

  defp key(user_id), do: "#{@key_base}.#{user_id}" 
  defp device_key(device_id), do: "#{@key_base}.device.#{device_id}" 
  defp email_key(email), do: "#{@key_base}.email.#{email}" 
  defp mobile_key(mobile), do: "#{@key_base}.mobile.#{email}" 
  defp sdk_key(sdk, sdk_user_id), do: "#{@key_base}.sdk.#{sdk}.#{sdk_user_id}" 

end
