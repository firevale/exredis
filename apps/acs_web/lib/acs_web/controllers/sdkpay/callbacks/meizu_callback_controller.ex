defmodule AcsWeb.SdkPay.MeizuCallbackController do
  use     AcsWeb, :controller
  require SDKMeizu
  alias   Acs.Apps
  alias   Acs.Apps.AppSdkBinding

  def purchase_callback(%Plug.Conn{private: %{acs_app: %App{} = app}} = conn, 
                        %{"cp_order_id" => order_id, 
                          "order_id" => trans_no, 
                          "total_price" => amount} = params) do

    resp_fail = fn(msg) ->
                  conn |> json(%{"code" => "900000", "message" => msg, "value" => "", "redirect" => ""})
                end

    resp_success = fn() ->
                     conn |> json(%{"code" => "200", "message" => "", "value" => "", "redirect" => ""})
                   end

    case Apps.get_app_sdk_binding(app.id, "meizu") do
      %AppSdkBinding{binding: %{"app_secret" => app_secret}} ->
        if SDKMeizu.validate_payment(app_secret, params) do
          case Repo.get(AppOrder, order_id) do 
            order = %AppOrder{} ->
              {:ok, order} = AppOrder.changeset(order, %{
                status: AppOrder.Status.paid,
                paid_at: DateTime.utc_now(),
                transaction_id: "meizu." <> trans_no,
                fee: round(String.to_float(amount |> to_string) * 100)
              }) |> Repo.update

              PaymentHelper.notify_cp(order)
              resp_success.()
           _ -> 
              Logger.error "order is not found, params: #{inspect params, pretty: true}"
              resp_fail.("invalid gameExtend value")
          end 
        else 
          Logger.error "verify tbt payment signature failed, params: #{inspect params, pretty: true}"
          resp_fail.("invalid signature")
        end
      _ -> 
        Logger.error "receive invalid tbt payment notifications, params: #{inspect params, pretty: true}"
        resp_fail.("invalid client id")
    end
  end
end