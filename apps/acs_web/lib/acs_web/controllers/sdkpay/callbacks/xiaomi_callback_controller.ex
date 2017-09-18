defmodule AcsWeb.SdkPay.XiaomiCallbackController do
  use     AcsWeb, :controller
  require SDKXiaomi
  alias   Acs.Apps
  alias   Acs.Apps.AppSdkBinding

  def purchase_callback(%Plug.Conn{private: %{acs_app: %App{} = app}} = conn, 
                        %{"cpOrderId" => order_id, 
                          "orderId" => trans_no, 
                          "payFee" => amount} = params) do
  
    resp_xiaomi = fn(errcode, errmsg) ->
                    conn |> text(URI.encode_query(%{errcode: errcode, errMsg: errmsg}))
                  end

    case Apps.get_app_sdk_binding(app.id, "xiaomi") do
      %AppSdkBinding{binding: %{"app_secret" => app_secret}} ->
        if SDKXiaomi.validate_payment(params, app_secret) do
          case Repo.get(AppOrder, order_id) do 
            order = %AppOrder{} ->             
              {:ok, order} = AppOrder.changeset(order, %{
                status: AppOrder.Status.paid,
                paid_at: DateTime.utc_now(),
                transaction_id: "xiaomi." <> trans_no, 
                fee: String.to_integer(amount)
              }) |> Repo.update

              PaymentHelper.notify_cp(order)
              resp_xiaomi.("200", "success")
          _ -> 
              Logger.error "order is not found, params: #{inspect params, pretty: true}"
              resp_xiaomi.("1506", "order is not found")
          end
        else 
          Logger.error "verify xiaomi payment signature failed, params: #{inspect params, pretty: true}"
          resp_xiaomi.("1525", "verify signature failed")
        end
      _ -> 
        Logger.error "app xiaomi bindings not found, params: #{inspect params, pretty: true}"
        resp_xiaomi.("1507", "app xiaomi binding is not set")
    end 
  end
end