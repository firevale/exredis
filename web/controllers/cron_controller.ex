defmodule Acs.CronController do
  use     Acs.Web, :controller
  alias   Acs.PaymentHelper

  def notify_cp(conn, params) do
    now = :calendar.local_time |> NaiveDateTime.from_erl!
    query = from order in AppOrder,
              select: order,
              where: order.status == 2 and order.try_deliver_counter < 100,
              order_by: [desc: order.paid_at]

    Repo.all(query) |> Enum.each(fn(order) ->
      elapsed = NaiveDateTime.diff(now, order.paid_at)
      cond do
        order.try_deliver_counter < 5 ->
          PaymentHelper.notify_cp(order)
        order.try_deliver_counter < 10 and elapsed >= 180 ->
          PaymentHelper.notify_cp(order)
        order.try_deliver_counter < 20 and elapsed >= 360 ->
          PaymentHelper.notify_cp(order)
        order.try_deliver_counter < 50 and elapsed >= 720 ->
          PaymentHelper.notify_cp(order)
        elapsed > 1200 ->
          PaymentHelper.notify_cp(order)
        true ->
          :ok
      end
    end)
    conn |> json(%{success: true, message: "done"})
  end
end
