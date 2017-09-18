defmodule AcsWeb.SdkPay.CCPlayCallbackController do
  use     AcsWeb, :controller
  require SDKCCPlay
  alias   Acs.Apps
  alias   Acs.Apps.AppSdkBinding

  def purchase_callback(%Plug.Conn{private: %{acs_app: %App{} = app}} = conn, 
                        %{"partnerTransactionNo" => order_id,
                          "transactionNo" => trade_no,
                          "orderPrice" => price} = params) do
    case Apps.get_app_sdk_binding(app.id, "cc") do 
      %AppSdkBinding{binding: %{"pay_key" => pay_key}} ->
        case Repo.get(AppOrder, order_id) do
          nil -> 
            Logger.error "order is not found, params: #{inspect params, pretty: true}"
            conn |> text("failure") 
          
          order = %AppOrder{} ->
            if SDKCCPlay.validate_payment(pay_key, params) do  
              {:ok, order} = AppOrder.changeset(order, %{
                status: AppOrder.Status.paid,
                paid_at: DateTime.utc_now(),
                transaction_id: "cc." <> trade_no, 
                fee: round(String.to_float(price) * 100)
              }) |> Repo.update

              PaymentHelper.notify_cp(order)
              conn |> text("success")  
            else 
              Logger.error "verify cc payment signature failed, params: #{inspect params, pretty: true}"
              conn |> text("failure")  
            end
        end
      _ -> 
        Logger.error "receive invalid cc payment notifications, params: #{inspect params, pretty: true}"
        conn |> text("failure")
    end
  end

  def purchase_callback(conn, params) do 
    Logger.error "receive invalid cc payment notifications, params: #{inspect params, pretty: true}"
    conn |> text("failure")
  end
end