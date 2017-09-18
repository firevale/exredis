defmodule AcsWeb.SdkPay.MumayiCallbackController do
  use     AcsWeb, :controller
  require SDKMumayi
  alias   Acs.Apps
  alias   Acs.Apps.AppSdkBinding

  def purchase_callback(%Plug.Conn{private: %{acs_app: %App{} = app}} = conn, 
                         %{"productPrice" => price,
                           "productDesc" => order_id,
                           "orderID" => trade_no} = params) do
    case Apps.get_app_sdk_binding(app.id, "mumayi") do
      %AppSdkBinding{binding: %{"app_key" => app_key}} ->
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
              error "order is not found, params: #{inspect params, pretty: true}"
              conn |> text("failure") 
          end 
        else 
          error "verify tbt payment signature failed, params: #{inspect params, pretty: true}"
          conn |> text("failure")  
        end
      _ -> 
        error "receive invalid mumayi payment notifications, params: #{inspect params, pretty: true}"
        conn |> text("failure") 
    end
  end

  def purchase_callback(conn, params) do 
    error "receive invalid mumayi payment notifications, params: #{inspect params, pretty: true}"
    conn |> text("failure") 
  end
end