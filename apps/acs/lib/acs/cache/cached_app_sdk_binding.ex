defmodule Acs.Cache.CachedAppSdkBinding do
  require Exredis
  require Excache

  alias   Acs.Repo
  alias   Acs.Apps.AppSdkBinding

  @key_base     "acs.app.sdkbinding"

  def get(app_id, sdk) do
    Excache.get!(key(app_id, sdk), fallback: fn(redis_key) ->    
      case Exredis.get(redis_key) do
        nil -> 
          case refresh(app_id, sdk) do 
            nil -> {:ignore, nil}
            v -> {:commit, v}
          end

        raw ->
          {:commit, AppSdkBinding.from_redis(raw)}
      end
    end)
  end

  def refresh(app_id, sdk) do
    case Repo.get_by(AppSdkBinding, app_id: app_id, sdk: sdk) do 
      %AppSdkBinding{} = sdk_binding ->
        refresh(sdk_binding)
      _ -> nil
    end
  end
  def refresh(%AppSdkBinding{sdk: sdk, app_id: app_id} = sdk_binding) do
    Exredis.set(key(app_id, sdk), AppSdkBinding.to_redis(sdk_binding))
    key(app_id, sdk) |> Excache.del
    sdk_binding
  end

  defp key(app_id, sdk), do: "#{@key_base}.#{app_id}.#{sdk}" 

end
