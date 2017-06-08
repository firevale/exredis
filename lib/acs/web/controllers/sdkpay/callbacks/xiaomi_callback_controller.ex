defmodule Acs.Web.SdkPay.XiaomiCallbackController do
  use     Acs.Web, :controller
  require SDKXiaomi

  def purchase_callback(%Plug.Conn{private: %{acs_app: %RedisApp{} = app}} = conn, 
                        %{"cpOrderId" => order_id, 
                          "orderId" => trans_no, 
                          "payFee" => amount} = params) do
  
    resp_xiaomi = fn(errcode, errmsg) ->
                    conn |> text(URI.encode_query(%{errcode: errcode, errMsg: errmsg}))
                  end

    case app.sdk_bindings.xiaomi do
      %{app_id: _app_id, app_key: _app_key, app_secret: app_secret} ->
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