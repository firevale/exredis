defmodule Acs.Web.SdkPay.DownjoyCallbackController do
  use     Acs.Web, :controller
  require SDKDownjoy

  def purchase_callback(%Plug.Conn{private: %{acs_app: %RedisApp{} = app}} = conn, 
                         %{"ext" => order_id, "order" => trans_no, "money" => amount} = params) do
    case app.sdk_bindings.downjoy do 
      %{"app_secret" => app_secret}->
        if SDKDownjoy.validate_payment(app_secret, params) do
          case Repo.get(AppOrder, order_id) do 
            order = %AppOrder{} ->
              {:ok, order} = AppOrder.changeset(order, %{
                status: AppOrder.Status.paid,
                paid_at: DateTime.utc_now(),
                transaction_id: "downjoy." <> trans_no, 
                fee: round(String.to_float(amount) * 100)
              }) |> Repo.update

              PaymentHelper.notify_cp(order)
              conn |> text("success")  
           _ -> 
              Logger.error "order is not found, params: #{inspect params, pretty: true}"
              conn |> text("failure") 
          end 
        else 
          Logger.error "verify downjoy payment signature failed, params: #{inspect params, pretty: true}"
          conn |> text("failure")  
        end
      _ -> 
        Logger.error "receive invalid downjoy payment notifications, params: #{inspect params, pretty: true}"
        conn |> text("failure") 
    end
  end
  def purchase_callback(conn, _), do: conn |> text("failure") 

end