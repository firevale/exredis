defmodule Acs.WechatController do
  use     Acs.Web, :controller
  require SDKWechat
  require Acs.Router.Helpers

  plug :fetch_app_id when action in [:prepay]
  plug :fetch_app when action in [:prepay]
  plug :fetch_access_token

  # prepay(for in app purchase only)
  def prepay(%Plug.Conn{private: %{acs_app: %RedisApp{
                        sdk_bindings: %{wechat: wechat_info}}}} = conn,
             %{"payment_order_id" => order_id} = _params) do

    notify_url = "#{url(conn)}/api/pay/wechat/notify"

    # handling request via nginx reverse proxy
    ip_address = case Plug.Conn.get_req_header(conn, "x-forwarded-for") do
      [val | _] -> val
      _ -> conn.remote_ip |> :inet_parse.ntoa |> to_string
    end

    case SDKWechat.prepay(order_id, wechat_info, ip_address, notify_url) do
      {:ok, partnerid, prepay_id, noncestr, timestamp, sign} ->
        conn |> json(%{
          success: true,
          partnerid: partnerid,
          prepay_id: prepay_id,
          noncestr: noncestr,
          timestamp: timestamp,
          sign: sign
        })
      _ ->
        conn |> json(%{success: false, message: "wechat get prepay_id fail"})
    end
  end
  def prepay(conn, _params) do
    d "req : #{inspect conn.private.acs_app.sdk_bindings, pretty: true}"
    conn |> json(%{success: false, message: "invalid request params"})
  end

  # mall_prepay
  def mall_prepay(conn, %{"mall_order_id" => order_id} = _params) do

    notify_url = "#{url(conn)}/api/pay/wechat/notify"

    # handling request via nginx reverse proxy
    ip_address = case Plug.Conn.get_req_header(conn, "x-forwarded-for") do
      [val | _] -> val
      _ -> conn.remote_ip |> :inet_parse.ntoa |> to_string
    end

    # case SDKWechat.prepay(order_id, wechat_info, ip_address, notify_url) do
    #   {:ok, partnerid, prepay_id, noncestr, timestamp, sign} ->
    #     conn |> json(%{
    #       success: true,
    #       partnerid: partnerid,
    #       prepay_id: prepay_id,
    #       noncestr: noncestr,
    #       timestamp: timestamp,
    #       sign: sign
    #     })
    #   _ ->
    #     conn |> json(%{success: false, message: "wechat get prepay_id fail"})
    # end
  end
  def mall_prepay(conn, _params) do
    conn |> json(%{success: false, i18n_message: "admin.serverError.badRequestParams"})
  end

  def notify(conn, _params) do
    with {:ok, body, _} <- read_body(conn),
         notify_params <- XmlUtils.convert(body),
         "SUCCESS" <- notify_params[:return_code],
         %AppOrder{} = order <- Repo.get(AppOrder, notify_params[:out_trade_no]),
         {:ok, sign_key} <- get_wechat_sign_key(order),
         :ok <- SDKWechat.check_sign(notify_params, sign_key)
    do
      AppOrder.changeset(order, %{
        status: AppOrder.Status.paid(),
        paid_at: DateTime.utc_now(),
        transaction_id: "wechat." <> notify_params[:transaction_id],
        paid_channel: "wechat",
        fee: notify_params[:total_fee],
        transaction_currency: notify_params[:fee_type]
      }) |> Repo.update! |> Acs.PaymentHelper.notify_cp

      conn |> text(xml_response("SUCCESS", "OK"))
    else
      nil ->
        conn |> text(xml_response("FAIL", "order not found"))
      {:error, msg} ->
        conn |> text(xml_response("FAIL", msg))
      _ ->
        conn |> text(xml_response("FAIL", "unknown error"))
    end
  end

  defp get_wechat_sign_key(%AppOrder{app_id: app_id}) do
    case RedisApp.find(app_id) do
      nil -> {:error, "app not found"}
      %{sdk_bindings: %{wechat: %{sign_key: key}}} -> {:ok, key}
      _ -> {:error, "wechat configuration not found"}
    end
  end

  def xml_response(code, msg) do
    """
      <xml>
        <return_code><![CDATA[#{code}]]></return_code>
        <return_msg><![CDATA[#{msg}]]></return_msg>
      </xml>
    """
  end
end
