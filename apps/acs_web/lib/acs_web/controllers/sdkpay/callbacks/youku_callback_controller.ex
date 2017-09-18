defmodule AcsWeb.SdkPay.YoukuCallbackController do
  use     AcsWeb, :controller
  require SDKYouku
  alias   Acs.Apps
  alias   Acs.Apps.AppSdkBinding

  def purchase_callback(%Plug.Conn{private: %{acs_app: %App{} = app}} = conn, 
                        %{"apporderID" => order_id, "price" => amount} = params) do

    case Apps.get_app_sdk_binding(app.id, "youku") do
      %AppSdkBinding{binding: %{"pay_key" => pay_key}} ->
        if SDKYouku.validate_payment(pay_key, params) do
           case Repo.get(AppOrder, order_id) do 
            order = %AppOrder{} ->
              {:ok, order} = AppOrder.changeset(order, %{
                status: AppOrder.Status.paid,
                paid_at: DateTime.utc_now(),
                transaction_id: "youku." <> order_id, 
                fee: String.to_integer(amount)
              }) |> Repo.update

              PaymentHelper.notify_cp(order)
              conn |> json(%{status: "success", desc: "received"})

            _ -> 
              Logger.error "order is not found, params: #{inspect params, pretty: true}"
              conn |> json(%{status: "failed", desc: "invalid apporderID"})
          end 
        else 
          Logger.error "verify youku payment signature failed, params: #{inspect params, pretty: true}"
          conn |> json(%{status: "failed", desc: "invalid sign"})
        end
      _ -> 
        Logger.error "receive invalid youku payment notifications, params: #{inspect params, pretty: true}"
        conn |> json(%{status: "failed", desc: "invalid client id"})
    end
  end
  def purchase_callback(conn, _), do: conn |> json(%{status: "failed", desc: "invalid payment callback request"})

end