defmodule AcsWeb.SdkPay.IIAppleCallbackController do
  use     AcsWeb, :controller
  require SDKIIApple
  alias   Acs.Apps
  alias   Acs.Apps.AppSdkBinding

  def purchase_callback(%Plug.Conn{private: %{acs_app: %App{} = app}} = conn, 
                        %{"transaction" => trans_no, 
                          "gameExtend" => order_id, 
                          "amount" => amount, 
                          "currency" => _currency, 
                          "status" => status} = params) do

    resp_fail = fn(msg) ->
                  conn |> json(%{"status" => "101", "msg" => msg, "transIDO" => trans_no})
                end

    resp_success = fn() ->
                     conn |> json(%{"status" => "0", "transIDO" => trans_no})
                   end

    case Apps.get_app_sdk_binding(app.id, "iiapple") do
      %AppSdkBinding{binding: %{"app_key" => app_key}} ->
        if SDKIIApple.validate_payment(app_key, params) do
          if status == "1" do 
             case Repo.get(AppOrder, order_id) do 
              order = %AppOrder{} ->
                {:ok, order} = AppOrder.changeset(order, %{
                  status: AppOrder.Status.paid,
                  paid_at: DateTime.utc_now(),
                  transaction_id: "iiapple." <> trans_no, 
                  fee: round(String.to_float(amount |> to_string) * 100)
                }) |> Repo.update

                PaymentHelper.notify_cp(order)
                resp_success.()

             _ ->
                Logger.error "iiapple order #{order_id} not found"
                resp_fail.("invalid gameExtend value")
            end
          else 
            Logger.error "iiapple notify invalid status: #{status} for order: #{order_id}"
            resp_fail.("invalid status: #{status}") # okay, we receive the notification but do nothing
          end
        else #{verify signature failed}
          Logger.error "verify iiapple payment signature failed, params: #{inspect params, pretty: true}"
          resp_fail.("invalid signature")
        end
      _ -> #{client_id invalid}
        Logger.error "receive invalid iiapple payment notifications, params: #{inspect params, pretty: true}"
        resp_fail.("invalid client id")
    end
  end
end

