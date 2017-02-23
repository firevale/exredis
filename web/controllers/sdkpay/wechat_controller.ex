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

    notify_url = wechat_url(conn,:notify)
    case SDKWechat.prepay(order_id, wechat_info, conn.remote_ip, notify_url) do 
        {:ok, partnerid, prepay_id, noncestr, timestamp, sign} ->
          conn |> json(%{success: true, partnerid: partnerid, prepay_id: prepay_id, 
                  noncestr: noncestr, timestamp: timestamp, sign: sign})
        _ -> 
          conn |> json(%{success: false, message: "wechat get prepay_id fail"})
    end 

  end

  def prepay(conn, _params) do 
    d "req : #{inspect conn.private.acs_app.sdk_bindings, pretty: true}"
    conn |> json(%{success: false, message: "invalid request params"})
  end

  def notify(conn, _params) do

    d "wechat notify: #{inspect conn.body, pretty: true}"

    case SDKWechat.on_notify(conn.body) do
      {:ok, msg} -> conn |> text(SDKWechat.create_xml_reply("SUCCESS","OK"))
      {:error, return_msg} -> conn |> text(SDKWechat.create_xml_reply("FAIL",return_msg))
    end

  end

  def payresult(%Plug.Conn{private: %{acs_app: %RedisApp{
                          sdk_bindings: %{wechat: wechat_info}}}} = conn, 
               %{"errcode" => errcode,
                 "order_id" => order_id} = _params) do
    case errcode do
      0 -> 
          # check order status
          case SDKWechat.on_check(order_id, wechat_info) do 
            {:ok, msg} ->  conn |> text(msg) 
            {:error, errorstr} -> conn |> text(errorstr) 
          end 

      -1 -> conn |> text("签名错误／未注册APPID／APPID不正确／其他异常等") 
      -2 -> conn |> text("用户取消了支付") 
    end
  end

end