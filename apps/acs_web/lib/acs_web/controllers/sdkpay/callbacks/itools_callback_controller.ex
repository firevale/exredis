defmodule AcsWeb.SdkPay.ItoolsCallbackController do
  use    AcsWeb, :controller
  alias  Acs.Apps
  alias  Acs.Apps.AppSdkBinding

  def purchase_callback(%Plug.Conn{private: %{acs_app: %App{} = app}} = conn, 
                        %{"notify_data" => notify_data, "sign" => sign} = params) do
    case Apps.get_app_sdk_binding(app.id, "itools") do
      %AppSdkBinding{binding: %{"rsa_key" => rsa_key}} ->
        notify_data = Crypto.rsa_pubseg_decrypt2(rsa_key, notify_data)

        if Crypto.rsa_public_verify2(rsa_key, notify_data, sign) do  
          %{"order_id_com" => order_id, "order_id" => sdk_order_id, "amount" => amount} = JSON.decode!(notify_data)
          case Repo.get(AppOrder, order_id) do 
            order = %AppOrder{} ->
              {:ok, order} = AppOrder.changeset(order, %{
                status: AppOrder.Status.paid,
                paid_at: DateTime.utc_now(),
                transaction_id: "itools." <> sdk_order_id, 
                fee: round(String.to_float(amount |> to_string) * 100)
              }) |> Repo.update

              PaymentHelper.notify_cp(order)
              conn |> text("success")   

           _ ->
              Logger.error "itools order #{order_id} not found"
              conn |> text("fail")
          end
        else #{verify signature failed}
          Logger.error "verify itools payment signature failed, params: #{inspect params, pretty: true}"
          conn |> text("fail")
        end
      _ -> #{client_id invalid}
        Logger.error "receive invalid itools payment notifications, params: #{inspect params, pretty: true}"
        conn |> text("fail")
    end
  end
  def purchase_callback(conn, _), do: conn |> text("fail")

end

