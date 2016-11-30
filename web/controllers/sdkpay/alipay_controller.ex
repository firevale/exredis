defmodule Acs.AlipayController do
  use     Acs.Web, :controller
  require SDKAlipay

  # conflict with imported redirect function
  def alipay_redirect(conn, %{"payment_order_id" => order_id} = _params) do 
    case Repo.get(AppOrder, order_id) do 
      order = %AppOrder{} ->
        case SDKAlipay.direct(order.id, order.goods_name, order.price / 100, order.platform) do 
          {:ok, result} ->
            case SDKAlipay.get_request_token(result) do 
              {:ok, token} ->
                conn |> json(%{ success: true, redirect_uri: SDKAlipay.auth_and_execute(token)})
              _ ->
                conn |> json(%{success: false, message: "can't get alipay request token"})
            end
          _ -> 
            conn |> json(%{success: false, message: "alipay direct failed"})
        end
      _ -> 
        conn |> json(%{success: false, message: "order not found"})
    end
  end
  def alipay_redirect(conn, _params) do 
    conn |> json(%{success: false, message: "invalid request params"})
  end

  def notify(conn, params) do 
    case SDKAlipay.verify_notify(params) do 
      {:ok, notify_data} ->
        case Repo.get(AppOrder, notify_data.out_trade_no) do 
          order = %AppOrder{} ->
            if notify_data.trade_status == "TRADE_SUCCESS" or notify_data.trade_status == "TRADE_FINISHED" do 
              total_fee = String.to_float(notify_data.total_fee) * 100 |> Float.to_string(decimals: 0)
              {:ok, order} = AppOrder.changeset(order, %{
                status: AppOrder.Status.paid,
                paid_at: :calendar.local_time |> NaiveDateTime.from_erl!,
                transaction_id: "alipay." <> notify_data.trade_no, 
                paid_channel: :alipay,
                fee: total_fee
              }) |> Repo.update              

              PaymentHelper.notify_cp(order)
              conn |> text("success") 
            else
              Logger.info "receive alipay notification: #{inspect notify_data, pretty: true}"
              conn |> text("success") 
            end
          _ -> 
            Logger.error "payment order[#{notify_data.out_trade_no}] not found"
            conn |> text("success")
        end

      {:error, reason} ->
        Logger.error "verify alipay notify failed: #{reason}"
        conn |> text("fail")
    end
  end

  def callback(conn, params) do 
    query = URI.encode_query(%{success: (params[:result] == "success"), 
                               trade_no: params[:trade_no], 
                               order_id: params[:out_trade_no]} )
    redirect_url = "/mobile/native_bridge/#{params["platform"]}?#{query}"  
    conn |> redirect(to: redirect_url)
  end

end