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
    Process.spawn(fn -> save_minutely_metrics() end, [])

    conn |> json(%{success: true, message: "minutely_schedule done"})
  end

  # by hour
  def hourly_schedule(conn, _params) do
    Process.spawn(fn -> cancel_mall_order() end, [])
    Process.spawn(fn -> save_hourly_metrics() end, [])

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
  defp save_minutely_metrics() do 
    now = %{Timex.local | second: 0, microsecond: {0, 0}} 
    label = Timex.format!(now, "{h24}:{0m}")
    ts = Timex.to_unix(now)
    today = Timex.to_date(now)

    for app_id <- AcsStats.list_online_apps() do 
      PubSub.broadcast(AcsWeb.PubSub, "admin.app:#{app_id}", %{
        event: "realtime_metrics", 
        payload: %{
          online: AcsStats.update_online_chart(ts, label, app_id),
          metrics: AcsStats.get_realtime_metrics(app_id, today),
      }})
    end
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
    Malls.cancel_mall_order()
  end

  # hour
  defp save_hourly_metrics() do 
    now = %{Timex.local | minute: 0, second: 0, microsecond: {0, 0}}
    beginning = now |> Timex.shift(hours: -1) |> Timex.to_unix  
    ending = now |> Timex.to_unix
    label = Timex.format!(now, "{0M}-{D} {h24}:00")

    for app_id <- AcsStats.list_online_apps() do 
      PubSub.broadcast(AcsWeb.PubSub, "admin.app:#{app_id}", %{
        event: "hourly_metrics", 
        payload: %{
          online: AcsStats.update_historic_online_chart(beginning, ending, label, app_id),
      }})
    end
  end

  # day
  defp finish_mall_order() do 
    Malls.finish_mall_order()
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
