defmodule Acs.Web.CronController do
  use     Acs.Web, :controller
  alias   Acs.PaymentHelper
  alias   Acs.MeishengSmsSender
  alias   Acs.ChaoxinNotifier
  alias   Acs.RedisMall
  alias   Ecto.Adapters.SQL
  alias   Phoenix.PubSub
  use     Timex

  require Redis

  def notify_cp(conn, _params) do
    now = DateTime.utc_now()
    query = from order in AppOrder,
              select: order,
              where: order.status == 2 and
                     order.try_deliver_counter < 100 and
                     order.inserted_at > ago(2, "week")

    Repo.all(query) |> Enum.each(fn(order) ->
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
    conn |> json(%{success: true, message: "done"})
  end

  defp async_notify_cp(order) do
    Task.Supervisor.async(Acs.TaskSupervisor, fn ->
      PaymentHelper.notify_cp(order)
    end)
  end

  def report_sms_amount(conn, _params) do 
    {:ok, amount} = MeishengSmsSender.get_amount()
    {:ok, now} = Timex.local |> Timex.format("%Y-%m-%d %H:%M:%S", :strftime)
    ChaoxinNotifier.send_text_msg("截止#{now}, 美圣短信剩余用量为#{amount}条")
    conn |> text("ok")
  end

  def cancel_mall_order(conn, _params) do 
    now = DateTime.utc_now()
    query = from order in MallOrder,
              select: order,
              where: order.status == 0 and
                order.inserted_at <= ago(20, "minute")

      Repo.all(query) |> Enum.each(fn(order) ->
        MallOrder.changeset(order, %{status: -1, close_at: now, memo: "auto close over 20 minutes"}) |> Repo.update()
        rollback_goods_stock(order.id)
    end)
    conn |> json(%{success: true, message: "done"})
  end
  defp rollback_goods_stock(order_id) do
    query = from od in MallOrderDetail,
                  select: od,
                  where: od.mall_order_id == ^order_id
    Repo.all(query) |> Enum.each(fn(detail) ->
      goods = RedisMall.find(detail.mall_goods_id) 
      MallGoods.changeset(goods, %{stock: goods.stock + detail.amount, sold: goods.sold - detail.amount}) |> Repo.update()
      RedisMall.refresh(goods)
    end)
  end

  def finish_mall_order(conn, _params) do 
    now = DateTime.utc_now()
    query = from order in MallOrder,
              select: order,
              where: order.status == 1 and
                order.inserted_at <= ago(15, "day")

      Repo.all(query) |> Enum.each(fn(order) ->
        MallOrder.changeset(order, %{status: 4, confirm_at: now, memo: "auto finish over 15 days"}) |> Repo.update()
    end)
    conn |> json(%{success: true, message: "done"})
  end

  def check_admin_users(conn, _params) do 
    {:ok, now} = Timex.local |> Timex.format("%Y-%m-%d %H:%M:%S", :strftime)

    case SQL.query(Acs.Repo, "select count(id) from admin_users") do 
      {:ok, %{rows: [[count]]}} ->
        if count <= 0 do 
          case Redis.get("_monitor.check_admin_users") do 
            :undefined -> 
              ChaoxinNotifier.send_text_msg("#{now}, admin_users 表被清空")          
              Redis.set("_monitor.check_admin_users", now)
            _ ->
              :ok
          end
        end
      _ ->
        ChaoxinNotifier.send_text_msg("#{now}, 获取admin_users大小失败")          
    end

    conn |> json(%{success: true, message: "done"})
  end

  @n_hours 7*24
  def save_hourly_online_counter(conn, _params) do 
    now = %{Timex.local | minute: 0, second: 0, microsecond: {0, 0}}
    begining = now |> Timex.shift(hours: -1) |> Timex.to_unix  
    ending = now |> Timex.to_unix
    label = Timex.format!(now, "{0M}-{D} {h24}:00")

    Enum.each(Redis.smembers("online_apps"), fn(app_id) -> 
      max = Redis.lrange("_onlines.#{app_id}", 0, 90) |> Enum.filter_map(fn(x) ->
        [ts, _counter] = String.split(x, ".", trim: true)  
        ts = String.to_integer(ts)
        ts >= begining && ts < ending
      end, fn(x) -> 
        [_, counter] = String.split(x, ".", trim: true)  
        String.to_integer(counter)
      end) |> Enum.max(fn -> 0 end)

      ios_max = Redis.lrange("_ponlines.#{app_id}.ios", 0, 90) |> Enum.filter_map(fn(x) ->
        [ts, _counter] = String.split(x, ".", trim: true)  
        ts = String.to_integer(ts)
        ts >= begining && ts < ending
      end, fn(x) -> 
        [_, counter] = String.split(x, ".", trim: true)  
        String.to_integer(counter)
      end) |> Enum.min_max(fn -> 0 end)

      android_max = Redis.lrange("_ponlines.#{app_id}.android", 0, 90) |> Enum.filter_map(fn(x) ->
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
        case Redis.get(cache_key) do 
          :undefined ->
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

      Redis.set(cache_key, chart |> :erlang.term_to_binary |> Base.encode64)
      Cachex.del(:default, cache_key)
      Cachex.set(:default, cache_key, ttl: :timer.hours(1))

      PubSub.broadcast(Acs.PubSub, "admin.app:#{app_id}", %{
        event: "new_hourly_online_data", 
        payload: %{
          label: label,
          data: [ max, ios_max, android_max ]
      }})
    end)

    conn |> json(%{success: true, message: "done"})
  end

  @n_mins 180 
  def save_online_counter(conn, _params) do 
    now = %{Timex.local | second: 0, microsecond: {0, 0}} 
    label = Timex.format!(now, "{h24}:{0m}")
    ts = Timex.to_unix(now)

    Enum.each(Redis.smembers("online_apps"), fn(app_id) -> 
      n_all = Enum.reduce(Redis.keys("online_counter.#{app_id}.*"), 0, fn(key, n) ->
        n + Redis.hlen(key)
      end)  

      n_ios = Enum.reduce(Redis.keys("ponline_counter.#{app_id}.ios.*"), 0, fn(key, n) ->
        n + Redis.hlen(key)
      end)   

      n_android = Enum.reduce(Redis.keys("ponline_counter.#{app_id}.android.*"), 0, fn(key, n) ->
        n + Redis.hlen(key)
      end)   

      Redis.lpush("_onlines.#{app_id}", "#{ts}.#{n_all}") 
      Redis.ltrim("_onlines.#{app_id}", 0, @n_mins) 
      Redis.lpush("_ponlines.#{app_id}.ios", "#{ts}.#{n_ios}") 
      Redis.ltrim("_ponlines.#{app_id}.ios", 0, @n_mins) 
      Redis.lpush("_ponlines.#{app_id}.android", "#{ts}.#{n_android}") 
      Redis.ltrim("_ponlines.#{app_id}.android", 0, @n_mins) 

      cache_key = "onlines_chart.#{app_id}" 

      %{
        labels: labels,
        datasets: [
          %{ data: all }, %{data: ios}, %{data: android}
        ]
      } = 
        case Redis.get(cache_key) do 
          :undefined ->
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

      Redis.set(cache_key, chart |> :erlang.term_to_binary |> Base.encode64)
      Cachex.del(:default, cache_key)
      Cachex.set(:default, cache_key, ttl: :timer.minutes(1))

      PubSub.broadcast(Acs.PubSub, "admin.app:#{app_id}", %{
        event: "new_online_data", 
        payload: %{
          label: label,
          data: [ n_all, n_ios, n_android ]
      }})
    end)

    conn |> json(%{success: true, message: "done"})
  end

  def refresh_login_code_chart(conn, params) do 
    case Redis.keys("login_code.daily_chart_data.*") do 
      keys when is_list(keys) ->
        Enum.each(keys, fn(key) -> 
          ["login_code", "daily_chart_data", app_id, ndays | _ ] = String.split(key, ".")
          AppLoginCode.refresh_stats_info(app_id)
          AppLoginCode.refresh_daily_chart_data(app_id, String.to_integer(ndays))
        end)

      _ ->
        info "no login code chart data find..."
    end 

    conn |> json(%{success: true, message: "done"})
  end
end
