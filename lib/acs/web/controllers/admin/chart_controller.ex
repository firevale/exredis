defmodule Acs.Web.Admin.ChartController do
  use Acs.Web, :controller

  def onlines(conn, %{"app_id" => app_id}) do 
    n = 3*60
    tz = Timex.Timezone.Local.lookup()

    with all <- Redis.lrange("onlines.#{app_id}", 0, n), 
         ios <- Redis.lrange("ponlines.#{app_id}.ios", 0, n),
         android <- Redis.lrange("ponlines.#{app_id}.android", 0, n) do 
      all = Enum.reverse(all)
      ios = Enum.reverse(ios)
      android = Enum.reverse(android)

      labels = Enum.map(all, fn(x) ->
        [ts, _counter] = String.split(x, ".", trim: true)
        ts |> String.to_integer |> Timex.from_unix |> Timex.Timezone.convert(tz) |> Timex.format!("{0M}-{D} {h24}:{0m}")
      end)   

      all_data = Enum.map(all, fn(x) -> 
        [_ts, counter] = String.split(x, ".", trim: true)
        String.to_integer(counter)
      end)

      ios_data = Enum.map(ios, fn(x) -> 
        [_ts, counter] = String.split(x, ".", trim: true)
        String.to_integer(counter)
      end)

      android_data = Enum.map(android, fn(x) -> 
        [_ts, counter] = String.split(x, ".", trim: true)
        String.to_integer(counter)
      end)

      conn |> json(%{
        success: true,
        chart: %{
          labels: labels,
          datasets: [
            %{
              label: "同时在线",
              data: all_data,
            },
            %{
              label: "同时在线(IOS)",
              data: ios_data,
            },
            %{
              label: "同时在线(ANDROID)",
              data: android_data,
            }
          ]
        }
      })
    end
  end

end
