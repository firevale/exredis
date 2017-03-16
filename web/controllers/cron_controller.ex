defmodule Acs.CronController do
  use     Acs.Web, :controller
  alias   Acs.PaymentHelper

  use     Timex

  def notify_cp(conn, params) do
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

      if Times.diff(now, order.paid_at, :seconds) < 604800 do
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
