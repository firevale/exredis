defmodule AcsWeb.CronController do
  use     AcsWeb, :controller

  alias   Exsm.MeishengService
  alias   Phoenix.PubSub
  alias   AcsWeb.LazyTinypng
  alias   Exservice.Tinypng
  use     Timex

  require Exredis

  # by minute
  def minutely_schedule(conn, _params) do
    Process.spawn(fn -> notify_cp() end, [])
    Process.spawn(fn -> tinify_images() end, [])
    Process.spawn(fn -> save_online_counter() end, [])

    conn |> json(%{success: true, message: "minutely_schedule done"})
  end

  # by hour
  def hourly_schedule(conn, _params) do
    Process.spawn(fn -> cancel_mall_order() end, [])
    Process.spawn(fn -> save_hourly_online_counter() end, [])

    conn |> json(%{success: true, message: "hourly_schedule done"})
  end
  
  # by day
  def daily_schedule(conn, _params) do
    Process.spawn(fn -> finish_mall_order() end, [])
    Process.spawn(fn -> clear_realtime_metrics() end, [])
    Process.spawn(fn -> generate_daily_report() end, [])

    conn |> json(%{success: true, message: "daily_schedule done"})
  end

  def report_sms_amount(conn, _params) do 
    {:ok, amount} = MeishengService.get_amount()
    {:ok, now} = Timex.local |> Timex.format("%Y-%m-%d %H:%M:%S", :strftime)
    Chaoxin.send_text_msg("截止#{now}, 美圣短信剩余用量为#{amount}条")
    conn |> text("ok")
  end

  # minute
  defp tinify_images() do
    if LazyTinypng.count() > 0 do
      Enum.each(LazyTinypng.list_files(), fn(image_path) -> 
        try do 
          :ok = Tinypng.tinify(image_path)
          LazyTinypng.remove_from_list(image_path)
        catch
          :error, _e ->
            nil
        end
      end) 
    end
  end

  # minute
  @n_mins 180 
  defp save_online_counter() do 
    now = %{Timex.local | second: 0, microsecond: {0, 0}} 
    label = Timex.format!(now, "{h24}:{0m}")
    ts = Timex.to_unix(now)
    today = Timex.to_date(now)
    #yesterday = now |> Timex.shift(days: -1) |> Timex.to_date

    Enum.each(Exredis.smembers("online_apps"), fn(app_id) -> 
      n_all = Enum.reduce(Exredis.keys("acs.online_counter.#{app_id}.*"), 0, fn(key, n) ->
        n + Exredis.hlen(key)
      end)  

      n_ios = Enum.reduce(Exredis.keys("acs.ponline_counter.#{app_id}.ios.*"), 0, fn(key, n) ->
        n + Exredis.hlen(key)
      end)   

      n_android = Enum.reduce(Exredis.keys("acs.ponline_counter.#{app_id}.android.*"), 0, fn(key, n) ->
        n + Exredis.hlen(key)
      end)   

      Exredis.lpush("_onlines.#{app_id}", "#{ts}.#{n_all}") 
      Exredis.ltrim("_onlines.#{app_id}", 0, @n_mins) 
      Exredis.lpush("_ponlines.#{app_id}.ios", "#{ts}.#{n_ios}") 
      Exredis.ltrim("_ponlines.#{app_id}.ios", 0, @n_mins) 
      Exredis.lpush("_ponlines.#{app_id}.android", "#{ts}.#{n_android}") 
      Exredis.ltrim("_ponlines.#{app_id}.android", 0, @n_mins) 

      cache_key = "onlines_chart.#{app_id}" 

      %{
        labels: labels,
        datasets: [
          %{ data: all }, %{data: ios}, %{data: android}
        ]
      } = 
        case Exredis.get(cache_key) do 
          nil ->
            %{
              labels: [],
              datasets: [
                %{
                  label: "同时在线",
                  data: [],
                },
                %{
                  label: "同时在线(IOS)",
                  data: [],
                },
                %{
                  label: "同时在线(ANDROID)",
                  data: [],
                }
              ]
            }
          raw ->
            raw |> Base.decode64! |> :erlang.binary_to_term
        end

      {labels, _} = Enum.split([label | Enum.reverse(labels)], @n_mins)
      {all, _} = Enum.split([n_all | Enum.reverse(all)], @n_mins)
      {ios, _} = Enum.split([n_ios | Enum.reverse(ios)], @n_mins)
      {android, _} = Enum.split([n_android | Enum.reverse(android)], @n_mins)
      
      chart =
        %{
          labels: Enum.reverse(labels),
          datasets: [
            %{
              label: "同时在线",
              data: Enum.reverse(all),
            },
            %{
              label: "同时在线(IOS)",
              data: Enum.reverse(ios),
            },
            %{
              label: "同时在线(ANDROID)",
              data: Enum.reverse(android),
            }
          ]          
        }

      Exredis.set(cache_key, chart |> :erlang.term_to_binary |> Base.encode64)
      Excache.del(cache_key)

      PubSub.broadcast(AcsWeb.PubSub, "admin.app:#{app_id}", %{
        event: "new_online_data", 
        payload: %{
          online: %{
            label: label,
            data: [ n_all, n_ios, n_android ],
          },
          metrics: AcsStats.get_realtime_metrics(app_id, today)
      }})
    end)
  end

  # hour
  defp notify_cp() do
    now = DateTime.utc_now()

    Acs.Apps.list_undelivered_app_orders() |> Enum.each(fn(order) ->
      elapsed = case order.try_deliver_at do
        nil -> Timex.diff(now, order.paid_at, :seconds)
        %DateTime{} -> Timex.diff(now, order.try_deliver_at, :seconds)
      end

      if Timex.diff(now, order.paid_at, :seconds) < 604800 do
        cond do
          order.try_deliver_counter < 5 and elapsed <= 80 ->
            async_notify_cp(order)
          order.try_deliver_counter < 10 and elapsed >= 180 ->
            async_notify_cp(order)
          order.try_deliver_counter < 20 and elapsed >= 360 ->
            async_notify_cp(order)
          order.try_deliver_counter < 50 and elapsed >= 720 ->
            async_notify_cp(order)
          elapsed > 1200 and elapsed <= 604800 ->
            async_notify_cp(order)
          true ->
            :ok
        end
      end
    end)
  end

  defp async_notify_cp(order) do
    Task.Supervisor.async(AcsWeb.TaskSupervisor, fn ->
      PaymentHelper.notify_cp(order)
    end)
  end

  # hour
  defp cancel_mall_order() do 
    AcsWeb.MallOrderController.cancel_mall_order()
  end

  # hour
  @n_hours 7*24
  defp save_hourly_online_counter() do 
    now = %{Timex.local | minute: 0, second: 0, microsecond: {0, 0}}
    begining = now |> Timex.shift(hours: -1) |> Timex.to_unix  
    ending = now |> Timex.to_unix
    label = Timex.format!(now, "{0M}-{D} {h24}:00")

    Enum.each(Exredis.smembers("online_apps"), fn(app_id) -> 
      max = Exredis.lrange("_onlines.#{app_id}", 0, 90) |> Enum.filter_map(fn(x) ->
        [ts, _counter] = String.split(x, ".", trim: true)  
        ts = String.to_integer(ts)
        ts >= begining && ts < ending
      end, fn(x) -> 
        [_, counter] = String.split(x, ".", trim: true)  
        String.to_integer(counter)
      end) |> Enum.max(fn -> 0 end)

      ios_max = Exredis.lrange("_ponlines.#{app_id}.ios", 0, 90) |> Enum.filter_map(fn(x) ->
        [ts, _counter] = String.split(x, ".", trim: true)  
        ts = String.to_integer(ts)
        ts >= begining && ts < ending
      end, fn(x) -> 
        [_, counter] = String.split(x, ".", trim: true)  
        String.to_integer(counter)
      end) |> Enum.min_max(fn -> 0 end)

      android_max = Exredis.lrange("_ponlines.#{app_id}.android", 0, 90) |> Enum.filter_map(fn(x) ->
        [ts, _counter] = String.split(x, ".", trim: true)  
        ts = String.to_integer(ts)
        ts >= begining && ts < ending
      end, fn(x) -> 
        [_, counter] = String.split(x, ".", trim: true)  
        String.to_integer(counter)
      end) |> Enum.min_max(fn -> 0 end)

      cache_key = "hourly_onlines_chart.#{app_id}" 

      %{
        labels: labels,
        datasets: [
          %{ data: all }, %{data: ios}, %{data: android}
        ]
      } = 
        case Exredis.get(cache_key) do 
          nil ->
            %{
              labels: [],
              datasets: [
                %{
                  label: "同时在线",
                  data: [],
                },
                %{
                  label: "同时在线(IOS)",
                  data: [],
                },
                %{
                  label: "同时在线(ANDROID)",
                  data: [],
                }
              ]
            }
          raw ->
            raw |> Base.decode64! |> :erlang.binary_to_term
        end

      {labels, _} = Enum.split([label | Enum.reverse(labels)], @n_hours)
      {all, _} = Enum.split([max | Enum.reverse(all)], @n_hours)
      {ios, _} = Enum.split([ios_max | Enum.reverse(ios)], @n_hours)
      {android, _} = Enum.split([android_max | Enum.reverse(android)], @n_hours)
      
      chart =
        %{
          labels: Enum.reverse(labels),
          datasets: [
            %{
              label: "同时在线",
              data: Enum.reverse(all),
            },
            %{
              label: "同时在线(IOS)",
              data: Enum.reverse(ios),
            },
            %{
              label: "同时在线(ANDROID)",
              data: Enum.reverse(android),
            }
          ]          
        }

      Exredis.set(cache_key, chart |> :erlang.term_to_binary |> Base.encode64)
      Excache.del(cache_key)
      Excache.set(cache_key, ttl: :timer.hours(1))

      PubSub.broadcast(AcsWeb.PubSub, "admin.app:#{app_id}", %{
        event: "new_hourly_online_data", 
        payload: %{
          label: label,
          data: [ max, ios_max, android_max ]
      }})
    end)
  end

  # day
  defp finish_mall_order() do 
    AcsWeb.MallOrderController.finish_mall_order()
  end

  # day
  defp clear_realtime_metrics() do 
    date = Timex.local |> Timex.shift(days: -15) |> Timex.to_date
    AcsStats.clear_realtime_metrics(date)
  end

  # day
  defp generate_daily_report() do 
    {:ok, date} = Timex.local |> Timex.shift(days: -1) |> Timex.to_date |> Timex.format("{YYYY}-{0M}-{0D}")
    Enum.each(Exredis.smembers("online_apps"), fn(app_id) -> 
      Reports.generate(app_id, date)
    end)
  end



end
