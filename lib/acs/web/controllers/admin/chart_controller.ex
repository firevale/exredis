defmodule Acs.Web.Admin.ChartController do
  use Acs.Web, :controller

  def onlines(conn, %{"app_id" => app_id}) do 
    n = 3*60
    tz = Timex.Timezone.Local.lookup()

    with all <- Redis.lrange("onlines.#{app_id}", 0, n), 
         ios <- Redis.lrange("ponlines.#{app_id}.ios", 0, n),
         android <- Redis.lrange("ponlines.#{app_id}.android", 0, n) do 

      {labels, keys} = Enum.reduce(all, {[], []}, fn(x, {l, k}) ->
        [ts, _counter] = String.split(x, ".", trim: true)
        label = ts |> String.to_integer |> Timex.from_unix |> Timex.Timezone.convert(tz) |> Timex.format!("{0M}-{D} {h24}:{0m}")
        {[label | l], [ts | k]}
      end)   

      all = Enum.map(all |> Enum.reverse, fn(x) -> 
        [k, v] = String.split(x, ".", trim: true)  
        {k, String.to_integer(v)}
      end) |> Enum.into(%{})

      ios = Enum.map(ios |> Enum.reverse, fn(x) -> 
        [k, v] = String.split(x, ".", trim: true)  
        {k, String.to_integer(v)}
      end) |> Enum.into(%{})

      android = Enum.map(android |> Enum.reverse, fn(x) -> 
        [k, v] = String.split(x, ".", trim: true)  
        {k, String.to_integer(v)}
      end) |> Enum.into(%{})

      all_data = Enum.map(keys, fn(k) -> 
        Map.get(all, k, 0)
      end)

      ios_data = Enum.map(keys, fn(k) -> 
        Map.get(ios, k, 0)
      end)

      android_data = Enum.map(keys, fn(k) -> 
        Map.get(android, k, 0)
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
