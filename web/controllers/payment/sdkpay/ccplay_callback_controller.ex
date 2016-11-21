defmodule Acs.SdkPay.CCPlayCallbackController do
  use     Acs.Web, :controller
  require SDKCCPlay

  def purchase_callback(%Plug.Conn{private: %{acs_app: %RedisApp{} = app}} = conn, 
                        %{"partnerTransactionNo" => order_id,
                          "transactionNo" => trade_no,
                          "orderPrice" => price} = params) do
    case app.bindings.cc || app.bindings.ccplay do 
      %{"pay_key" => pay_key} ->
        case Repo.get(AppOrder, order_id) do
          nil -> 
            Logger.error "order is not found, params: #{inspect params, pretty: true}"
            conn |> text("failure") 
          
          order = %AppOrder{} ->
            if SDKCCPlay.validate_payment(pay_key, params) do  
              {:ok, order} = AppOrder.changeset(order, %{
                status: AppOrder.Status.paid,
                paid_at: :calendar.local_time |> NaiveDateTime.from_erl!,
                transaction_id: "cc." <> trade_no, 
                fee: round(String.to_float(price) * 100)
              }) |> Repo.update

              PaymentHelper.notify_cp(order)
              conn |> text("success")  
            else 
              Logger.error "verify ccplay payment signature failed, params: #{inspect params, pretty: true}"
              conn |> text("failure")  
            end
        end
      _ -> 
        Logger.error "receive invalid ccplay payment notifications, params: #{inspect params, pretty: true}"
        conn |> text("failure")
    end
  end

  def purchase_callback(conn, params) do 
    Logger.error "receive invalid ccplay payment notifications, params: #{inspect params, pretty: true}"
    conn |> text("failure")
  end
end