defmodule Acs.WechatController do
  use     Acs.Web, :controller
  require SDKWechat

  plug :fetch_access_token

  def prepay(%Plug.Conn{private: %{acs_app: %RedisApp{
                        sdk_bindings: %{wechat: wechat_info}}}} = conn, 
             %{"payment_order_id" => order_id, 
               "notify_url" => notify_url} = _params) do 

    case Repo.get(AppOrder, order_id) do 
      order = %AppOrder{} ->
        # update order info (paid channel)
        
        AppOrder.changeset(order, %{paid_channel: "wechat"}) |> Repo.update!

        case SDKWechat.prepay(order.id, order.goods_name, order.price, wechat_info.app_id, wechat_info.partnerid, wechat_info.sign_key, notify_url, conn.remote_ip) do 
          {:ok, partnerid, prepay_id, noncestr, timestamp, sign} ->
            conn |> json(%{success: true, partnerid: partnerid, prepay_id: prepay_id, noncestr: noncestr, timestamp: timestamp, sign: sign})
          _ -> 
            conn |> json(%{success: false, message: "wechat get prepay_id fail"})
        end
      _ -> 
        conn |> json(%{success: false, message: "order not found"})
    end
  end
  def prepay(conn, _params) do 
    d "req : #{inspect conn.req_headers, pretty: true}"
    conn |> json(%{success: false, message: "invalid request params"})
  end

  def notify(conn, params) do 
    # case SDKAlipay.verify_notify(params) do 
    #   {:ok, notify_data} ->
    #     case Repo.get(AppOrder, notify_data.out_trade_no) do 
    #       order = %AppOrder{} ->
    #         if notify_data.trade_status == "TRADE_SUCCESS" or notify_data.trade_status == "TRADE_FINISHED" do 
    #           total_fee = String.to_float(notify_data.total_fee) * 100 |> Float.to_string(decimals: 0)
    #           {:ok, order} = AppOrder.changeset(order, %{
    #             status: AppOrder.Status.paid,
    #             paid_at: :calendar.local_time |> NaiveDateTime.from_erl!,
    #             transaction_id: "alipay." <> notify_data.trade_no, 
    #             paid_channel: :alipay,
    #             fee: total_fee
    #           }) |> Repo.update              

    #           PaymentHelper.notify_cp(order)
    #           conn |> text("success") 
    #         else
    #           Logger.info "receive alipay notification: #{inspect notify_data, pretty: true}"
    #           conn |> text("success") 
    #         end
    #       _ -> 
    #         Logger.error "payment order[#{notify_data.out_trade_no}] not found"
    #         conn |> text("success")
    #     end

    #   {:error, reason} ->
    #     Logger.error "verify alipay notify failed: #{reason}"
    #     conn |> text("fail")
    # end
  end

  def callback(conn, params) do 
    # query = URI.encode_query(%{success: (params["result"] == "success"), 
    #                            trade_no: params["trade_no"], 
    #                            order_id: params["out_trade_no"]} )
    # redirect_url = "/mobile/native_bridge/#{params["platform"]}?#{query}"  
    # conn |> redirect(to: redirect_url)
  end

end