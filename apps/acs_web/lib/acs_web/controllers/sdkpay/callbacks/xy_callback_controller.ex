defmodule AcsWeb.SdkPay.XYCallbackController do
  use     AcsWeb, :controller
  require SDKXY

  def purchase_callback(%Plug.Conn{private: %{acs_app: %RedisApp{} = app}} = conn, 
                        %{"extra" => order_id, "orderid" => trans_no, "amount" => amount} = params) do
    case app.sdk_bindings.xy do
      %{pay_key: pay_key} ->
        if SDKXY.validate_payment(pay_key, params) do
          case Repo.get(AppOrder, order_id) do 
            order = %AppOrder{} ->
              {:ok, order} = AppOrder.changeset(order, %{
                status: AppOrder.Status.paid,
                paid_at: DateTime.utc_now(),
                transaction_id: "xy." <> trans_no, 
                fee: round(String.to_float(amount |> to_string) * 100)
              }) |> Repo.update

              PaymentHelper.notify_cp(order)
              conn |> text("success") 
            _ -> 
              Logger.error "order is not found, params: #{inspect params, pretty: true}"
              conn |> text("fail") 
          end 
        else 
          Logger.error "verify xy payment signature failed, params: #{inspect params, pretty: true}"
          conn |> text("fail")  
        end
      _ -> 
        Logger.error "receive invalid xy payment notifications, params: #{inspect params, pretty: true}"
        conn |> text("fail") 
    end
  end
  def purchase_callback(conn, _), do: conn |> text("fail") 
    
end