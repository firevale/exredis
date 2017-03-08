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
      elapsed = case order.try_deliver_at do
        nil -> NaiveDateTime.diff(now, order.paid_at)
        %NaiveDateTime{} -> NaiveDateTime.diff(now, order.try_deliver_at)
      end

      if NaiveDateTime.diff(now, order.paid_at) < 604800 do
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
end
