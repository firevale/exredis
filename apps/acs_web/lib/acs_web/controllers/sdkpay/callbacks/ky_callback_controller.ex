defmodule AcsWeb.SdkPay.KYCallbackController do
  use     AcsWeb, :controller
  require SDKKY
  alias   Acs.Apps
  alias   Acs.Apps.AppSdkBinding

  def purchase_callback(%Plug.Conn{private: %{acs_app: %App{} = app}} = conn, 
                        %{"dealseq" => order_id, "orderid" => trans_no} = params) do
    case Apps.get_app_sdk_binding(app.id, "ky") do
      %AppSdkBinding{binding: %{"rsa_key" => rsa_key}} ->
        if SDKKY.validate_payment(rsa_key, params) do
          case Repo.get(AppOrder, order_id) do 
            order = %AppOrder{} ->
              {:ok, order} = AppOrder.changeset(order, %{
                status: AppOrder.Status.paid,
                paid_at: DateTime.utc_now(),
                transaction_id: "ky." <> trans_no, 
                fee: SDKKY.get_total_fee(rsa_key, params)
              }) |> Repo.update

              PaymentHelper.notify_cp(order)
              conn |> text("success") 

            _ -> 
              Logger.error "order is not found, params: #{inspect params, pretty: true}"
              conn |> text("fail") 
          end 
        else 
          Logger.error "verify ky payment signature failed, params: #{inspect params, pretty: true}"
          conn |> text("fail")  
        end

      _ -> 
        Logger.error "receive invalid ky payment notifications, params: #{inspect params, pretty: true}"
        conn |> text("fail") 
    end
  end
  def purchase_callback(conn, _), do: conn |> text("fail") 

end