defmodule Acs.SdkPay.YoukuCallbackController do
  use     Acs.Web, :controller
  require SDKYouku

  def purchase_callback(%Plug.Conn{private: %{acs_app: %RedisApp{} = app}} = conn, 
                        %{"apporderID" => order_id, "price" => amount} = params) do

    case app.sdk_bindings.youku do
      %{pay_key: pay_key} ->
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