defmodule AcsWeb.SdkPay.MumayiCallbackController do
  use     AcsWeb, :controller
  require SDKMumayi

  def purchase_callback(%Plug.Conn{private: %{acs_app: %RedisApp{} = app}} = conn, 
                         %{"productPrice" => price,
                           "productDesc" => order_id,
                           "orderID" => trade_no} = params) do
    case app.sdk_bindings.mumayi do
      %{"app_key" => app_key} ->
        if SDKMumayi.validate_payment(app_key, params) do
          case Repo.get(AppOrder, order_id) do 
            order = %AppOrder{} ->
              {:ok, order} = AppOrder.changeset(order, %{
                status: AppOrder.Status.paid,
                paid_at: DateTime.utc_now(),
                transaction_id: "mumayi." <> trade_no, 
                fee: round(String.to_float(price) * 100)
              }) |> Repo.update

              PaymentHelper.notify_cp(order)
              conn |> text("success")               

           _ -> 
              Logger.error "order is not found, params: #{inspect params, pretty: true}"
              conn |> text("failure") 
          end 
        else 
          Logger.error "verify tbt payment signature failed, params: #{inspect params, pretty: true}"
          conn |> text("failure")  
        end
      _ -> 
        Logger.error "receive invalid mumayi payment notifications, params: #{inspect params, pretty: true}"
        conn |> text("failure") 
    end
  end

  def purchase_callback(conn, params) do 
    Logger.error "receive invalid mumayi payment notifications, params: #{inspect params, pretty: true}"
    conn |> text("failure") 
  end
end