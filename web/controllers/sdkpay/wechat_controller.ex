defmodule Acs.WechatController do
  use     Acs.Web, :controller
  require SDKWechat
  require Acs.Router.Helpers

  plug :fetch_app_id
  plug :fetch_app
  plug :fetch_access_token

  def prepay(%Plug.Conn{private: %{acs_app: %RedisApp{
                        sdk_bindings: %{wechat: wechat_info}}}} = conn,
             %{"payment_order_id" => order_id} = _params) do

    notify_url = wechat_url(conn, :notify)

    ip_address = case get_req_header(conn, "x-forwarded-for") do
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

  def notify(conn, params) do
    case read_body(conn) do
      {:ok, body, _}  ->
        d "wechat notify: #{inspect body , pretty: true}"

        case SDKWechat.on_notify(body) do
          {:ok, msg} ->
            conn |> text(SDKWechat.create_xml_reply("SUCCESS", "OK"))

          {:error, return_msg} ->
            conn |> text(SDKWechat.create_xml_reply("FAIL", return_msg))
        end
      _ ->
        conn |> text(SDKWechat.create_xml_reply("FAIL", "read request body failed"))
    end
  end

end
