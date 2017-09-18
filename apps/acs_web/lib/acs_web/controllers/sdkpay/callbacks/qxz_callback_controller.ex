defmodule AcsWeb.SdkPay.QxzCallbackController do
  use     AcsWeb, :controller
  require SDKQxz
  alias   Acs.Apps
  alias   Acs.Apps.AppSdkBinding

  def purchase_callback(%Plug.Conn{private: %{acs_app: %App{} = app}} = conn, 
                         %{"transdata" => transdata, "sign" => signature} = params) do

    case Apps.get_app_sdk_binding(app.id, "qxz") do
      %AppSdkBinding{binding: %{"app_key" => app_key}} ->
        %{"cpprivate" => order_id, 
          "money" => total_fee, 
          "transid" => trade_no} = data = JSON.decode!(transdata)

        if SDKQxz.validate_payment(app_key, data, signature) do
          case Repo.get(AppOrder, order_id) do 
            order = %AppOrder{} ->
              {:ok, order} = AppOrder.changeset(order, %{
                status: AppOrder.Status.paid,
                paid_at: DateTime.utc_now(),
                transaction_id: "qxz." <> trade_no, 
                fee: total_fee
              }) |> Repo.update

              PaymentHelper.notify_cp(order)
              conn |> text("success")  

            _ -> 
              Logger.error "order is not found, params: #{inspect params, pretty: true}"
              conn |> text("failure") 
          end 
        else 
          Logger.error "verify qxz payment signature failed, params: #{inspect params, pretty: true}"
          conn |> text("failure")  
        end
      _ -> 
        Logger.error "receive invalid qxz payment notifications, params: #{inspect params, pretty: true}"
        conn |> text("failure") 
    end
  end

  def purchase_callback(conn, params) do 
    Logger.error "receive invalid qxz payment notifications, params: #{inspect params, pretty: true}"
    conn |> text("failure") 
  end
end