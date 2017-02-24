defmodule Acs.AlipayController do
  use     Acs.Web, :controller
  require SDKAlipay

  def alipay_redirect(conn, %{"payment_order_id" => order_id} = params) do
    with %AppOrder{} = order <- Repo.get(AppOrder, order_id),
         {:ok, direct_result} <- SDKAlipay.direct(order.id, order.goods_name, order.price / 100, order.platform, params),
         {:ok, token} <- SDKAlipay.get_request_token(direct_result)
    do
      conn |> json(%{success: true, redirect_uri: SDKAlipay.auth_and_execute(token)})
    else
      nil ->
        conn |> json(%{success: false, message: "order not found"})
      {:error, msg} ->
        conn |> json(%{success: false, message: to_string(msg)})
    end
  end
  def alipay_redirect(conn, _params) do
    conn |> json(%{success: false, message: "invalid request params"})
  end

  def notify(conn, params) do
    with {:ok, notify_data} <- SDKAlipay.verify_notify(params),
         %AppOrder{} = order <- Repo.get(AppOrder, notify_data.out_trade_no),
         true <- is_trade_success(notify_data)
    do
      total_fee = String.to_float(notify_data.total_fee) * 100 |> Float.to_string(decimals: 0)
      AppOrder.changeset(order, %{
        status: AppOrder.Status.paid,
        paid_at: :calendar.local_time |> NaiveDateTime.from_erl!,
        transaction_id: "alipay." <> notify_data.trade_no,
        paid_channel: "alipay",
        fee: total_fee
      }) |> Repo.update! |> PaymentHelper.notify_cp

      conn |> text("success")
    else
      nil ->
        error "alipay payment order not found when receive notify, params: #{inspect params, pretty: true}"
        conn |> text("fail")
      false ->
        error "invalid trade status"
        conn |> text("fail")
      {:error, reason} ->
        error "processing alipay notify failed: #{inspect reason}"
        conn |> text("fail")
      _ ->
        error "processing alipay notify failed"
        conn |> text("fail")
    end
  end

  defp is_trade_success(%{trade_status: "TRADE_SUCCESS"}), do: true
  defp is_trade_success(%{trade_status: "TRADE_FINISHED"}), do: true
  defp is_trade_success(_), do: false
end
