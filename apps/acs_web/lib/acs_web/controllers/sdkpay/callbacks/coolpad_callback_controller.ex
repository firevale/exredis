defmodule AcsWeb.SdkPay.CoolpadCallbackController do
  use    AcsWeb, :controller
  alias  Acs.Apps
  alias  Acs.Apps.AppSdkBinding

  def purchase_callback(%Plug.Conn{private: %{acs_app: %App{} = app}} = conn, 
                         %{"transdata" => transdata, "sign" => sign} = params) do 
    case Apps.get_app_sdk_binding(app.id, "coolpad") do 
      %AppSdkBinding{binding: %{"pay_pub_key" => pay_pub_key}} ->
        if Crypto.rsa_public_verify2(pay_pub_key, transdata, sign, :md5) do  
          pay_info = JSON.decode!(transdata)

          case Repo.get(AppOrder, pay_info["cporderid"]) do 
            order = %AppOrder{} ->
              {:ok, order} = AppOrder.changeset(order, %{
                status: AppOrder.Status.paid,
                paid_at: DateTime.utc_now(),
                transaction_id: "coolpad." <> (pay_info["transid"] |> to_string),
                fee: round(String.to_float(pay_info["money"] |> to_string) * 100)
              }) |> Repo.update

              PaymentHelper.notify_cp(order)
              conn |> text("SUCCESS")  

            _ -> 
              Logger.error "order is not found, params: #{inspect params, pretty: true}"
              conn |> text("FAILURE") 
          end 
        else 
          Logger.error "verify coolpad payment signature failed, params: #{inspect params, pretty: true}"
          conn |> text("FAILURE")  
        end
      _ -> 
        Logger.error "receive invalid coolpad payment notifications, params: #{inspect params, pretty: true}"
        conn |> text("FAILURE") 
    end
  end

  def purchase_callback(conn, _), do: conn |> text("FAILURE") 
end