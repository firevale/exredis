defmodule Acs.Cache.CachedAppSdkPaymentCallback do
  require Exredis
  require Excache

  alias   Acs.Repo
  alias   Acs.Apps.AppSdkPaymentCallback

  @key_base     "acs.app.sdkpaymentcallback"

  def get(app_id, platform, sdk) do
    Excache.get!(key(app_id, platform, sdk), fallback: fn(redis_key) ->    
      case Exredis.get(redis_key) do
        nil -> 
          case refresh(app_id, platform, sdk) do 
            nil -> {:ignore, nil}
            url -> {:commit, url}
          end

        url ->
          {:commit, url}
      end
    end)
  end

  def refresh(app_id, platform, sdk) do
    case Repo.get_by(AppSdkPaymentCallback, app_id: app_id, platform: platform, sdk: sdk) do 
      %AppSdkPaymentCallback{payment_callback: url} ->
        Exredis.set(key(app_id, platform, sdk), url)
        key(app_id, platform, sdk) |> Excache.del
        url
      _ -> nil
    end
  end

  defp key(app_id, platform, sdk), do: "#{@key_base}.#{app_id}.#{platform}.#{sdk}" 

end
