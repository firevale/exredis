defmodule AcsWeb.SdkPay.OppoCallbackController do
  use     AcsWeb, :controller
  require SDKOppo
  alias   Acs.Apps
  alias   Acs.Apps.AppSdkBinding
  
  def purchase_callback(%Plug.Conn{private: %{acs_app: %App{} = app}} = conn, 
                         %{"partnerOrder" => order_id, 
                           "notifyId" => trans_no, 
                           "price" => amount} = params) do
    resp_oppo = fn(result_code, message) ->
                    conn |> text(URI.encode_query(%{result: result_code, resultMsg: message}))
                end

    case Apps.get_app_sdk_binding(app.id, "oppo") do
      %AppSdkBinding{binding: %{"app_secret" => _app_secret, "app_key" => _app_key}} ->
        if SDKOppo.validate_payment(params) do
          case Repo.get(AppOrder, order_id) do 
            order = %AppOrder{} ->             
              {:ok, order} = AppOrder.changeset(order, %{
                status: AppOrder.Status.paid,
                paid_at: DateTime.utc_now(),
                transaction_id: "oppo." <> trans_no, 
                fee: String.to_integer(amount) 
              }) |> Repo.update

              PaymentHelper.notify_cp(order)
              resp_oppo.("OK", "success")

            _ -> 
              Logger.error "order is not found, params: #{inspect params, pretty: true}"
              resp_oppo.("FAIL", "order is not found")
          end
        else 
            Logger.error "verify oppo payment signature failed, params: #{inspect params, pretty: true}"
            resp_oppo.("FAIL", "verify signature failed")
        end
      _ ->
        Logger.error "there's no oppo config in app: #{inspect app, pretty: true}"
        resp_oppo.("FAIL", "oppo config not found")
    end 
  end
end