defmodule AcsWeb.WechatController do
  use     AcsWeb, :controller
  require SDKWechat

  alias   Acs.Malls
  alias   Acs.Apps
  alias   Acs.Apps.AppOrder
  alias   Acs.Apps.AppSdkBinding

  plug :fetch_app_id
  plug :fetch_app
  plug :fetch_access_token

  # prepay
  def prepay(%Plug.Conn{private: %{acs_app: app}} = conn,
             %{"payment_order_id" => order_id} = _params) do
    with %AppSdkBinding{binding: %{} = wechat_info} <- Apps.get_app_sdk_binding(app.id, "wechat"),
         %AppOrder{} = order <- Apps.get_app_order(order_id)
    do 
      notify_url = "#{url(conn)}/api/pay/wechat/notify"

      ip_address = case Plug.Conn.get_req_header(conn, "x-forwarded-for") do
        [val | _] -> val
        _ -> conn.remote_ip |> :inet_parse.ntoa |> to_string
      end

      case SDKWechat.prepay(order, wechat_info.app_id, wechat_info.partnerid, wechat_info.sign_key, ip_address, notify_url) do
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
    else
      _ ->
        conn |> json(%{success: false, message: "invalid request params"})
    end
  end
  def prepay(conn, _params) do
    conn |> json(%{success: false, message: "invalid request params"})
  end

  # mallprepay
  def mallprepay(%Plug.Conn{private: %{acs_app: app}} = conn,
                 %{"payment_order_id" => order_id} = _params) do

    with %AppSdkBinding{binding: %{} = wechat_info} <- Apps.get_app_sdk_binding(app.id, "wechat"),
         %MallOrder{} = order <- Malls.get_mall_order(order_id) 
    do 
      notify_url = "#{url(conn)}/api/pay/wechat/mallnotify"

      # handling request via nginx reverse proxy
      ip_address = case Plug.Conn.get_req_header(conn, "x-forwarded-for") do
        [val | _] -> val
        _ -> conn.remote_ip |> :inet_parse.ntoa |> to_string
      end
      case SDKWechat.mallprepay(order, wechat_info.app_id, wechat_info.partnerid, wechat_info.sign_key, ip_address, notify_url) do
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
    else
      _ ->
        conn |> json(%{success: false, message: "invalid request params"})
    end
  end
  def mallprepay(conn, _params) do
    conn |> json(%{success: false, message: "invalid request params"})
  end

  # notify
  def notify(conn, _params) do
    with {:ok, body, _} <- read_body(conn),
         notify_params <- Xml.convert(body),
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
      }) |> Repo.update! |> AcsWeb.PaymentHelper.notify_cp

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

  # mallnotify
  def mallnotify(conn, _params) do
    with {:ok, body, _} <- read_body(conn),
         notify_params <- Xml.convert(body),
         "SUCCESS" <- notify_params[:return_code],
         %MallOrder{} = order <- Repo.get(MallOrder, notify_params[:out_trade_no]),
         {:ok, sign_key} <- get_mall_wechat_sign_key(order),
         :ok <- SDKWechat.check_sign(notify_params, sign_key)
    do
      MallOrder.changeset(order, %{
        status: MallOrder.Status.paid(),
        paid_at: DateTime.utc_now(),
        transaction_id: "wechat." <> notify_params[:transaction_id],
        paid_type: "wechat",
        fee: notify_params[:total_fee],
        transaction_currency: notify_params[:fee_type]
      }) |> Repo.update!

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
    case Apps.get_app_sdk_binding(app_id, "wechat") do
      nil -> {:error, "app not found"}
      %{binding: %{"sign_key" => key}} -> {:ok, key}
      _ -> {:error, "wechat configuration not found"}
    end
  end

  defp get_mall_wechat_sign_key(%MallOrder{app_id: app_id}) do
    case Apps.get_app_sdk_binding(app_id, "wechat") do
      nil -> {:error, "app not found"}
      %{binding: %{"sign_key" => key}} -> {:ok, key}
      _ -> {:error, "wechat configuration not found"}
    end
  end

  # xml_response
  def xml_response(code, msg) do
    """
      <xml>
        <return_code><![CDATA[#{code}]]></return_code>
        <return_msg><![CDATA[#{msg}]]></return_msg>
      </xml>
    """
  end
end
