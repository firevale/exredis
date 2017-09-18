defmodule AcsWeb.SdkPay.LenovoCallbackController do
  use     AcsWeb, :controller
  require SDKLenovo
  alias   Acs.Apps
  alias   Acs.Apps.AppSdkBinding

  def purchase_callback(%Plug.Conn{private: %{acs_app: %App{} = app}} = conn, 
                        %{"transdata" => transdata, "sign" => sign} = params) do 

    case Apps.get_app_sdk_binding(app.id, "lenovo") do
      %AppSdkBinding{binding: %{"app_key" => app_key}} ->
        if Crypto.rsa_private_verify2(app_key |> to_string, transdata, sign, :sha) do 
          pay_info = JSON.decode!(transdata)

          case Repo.get(AppOrder, pay_info["exorderno"]) do 
            order = %AppOrder{} ->
              {:ok, order} = AppOrder.changeset(order, %{
                status: AppOrder.Status.paid,
                paid_at: DateTime.utc_now(),
                transaction_id: "lenovo." <> (pay_info["transid"] |> to_string), 
                fee: String.to_integer(pay_info["money"] |> to_string)
              }) |> Repo.update

              PaymentHelper.notify_cp(order)
              conn |> text("SUCCESS") 

           _ -> 
              Logger.error "order is not found, params: #{inspect params, pretty: true}"
              conn |> text("FAILURE") 
          end 
        else 
          Logger.error "verify wdj payment signature failed, params: #{inspect params, pretty: true}"
          conn |> text("FAILURE")  
        end

      _ -> 
        Logger.error "receive invalid wdj payment notifications, params: #{inspect params, pretty: true}"
        conn |> text("FAILURE") 
    end
  end

  def purchase_callback(conn, params) do 
    Logger.error "receive invalid request: #{inspect params, pretty: true}"
    conn |> text("FAILURE")
  end
end