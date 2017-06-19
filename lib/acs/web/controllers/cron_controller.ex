defmodule Acs.Web.CronController do
  use     Acs.Web, :controller
  alias   Acs.PaymentHelper
  alias   Acs.MeishengSmsSender
  alias   Acs.ChaoxinNotifier
  alias   Acs.RedisMall
  alias   Ecto.Adapters.SQL
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

  def save_online_counter(conn, _params) do 

  end
end
