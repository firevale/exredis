defmodule Acs.SdkPay.PPCallbackController do
  use     Acs.Web, :controller
  require SDKPP

  def purchase_callback(%Plug.Conn{private: %{acs_app: %RedisApp{} = app}} = conn, 
                        %{"billno" => order_id, "order_id" => trans_no, "amount" => amount} = params) do
    case app.sdk_bindings.pp do
      %{"pay_key" => pay_key} ->
        if SDKPP.validate_payment(pay_key, params) do
          case Repo.get(AppOrder, order_id) do 
            order = %AppOrder{} ->
              {:ok, order} = AppOrder.changeset(order, %{
                status: AppOrder.Status.paid,
                paid_at: DateTime.utc_now(),
                transaction_id: "pp." <> trans_no, 
                fee: round(String.to_float(amount) * 100)
              }) |> Repo.update

              PaymentHelper.notify_cp(order)
              conn |> text("success") 

            _ -> #{order other than Order%{}}
              Logger.error "order is not found, params: #{inspect params, pretty: true}"
              conn |> text("fail") 
          end 
        else #{verify signature failed}
          Logger.error "verify tbt payment signature failed, params: #{inspect params, pretty: true}"
          conn |> text("fail")  
        end
      _ -> #{client_id invalid}
        Logger.error "receive invalid tbt payment notifications, params: #{inspect params, pretty: true}"
        conn |> text("fail") 
    end
  end

  def purchase_callback(conn, _), do: conn |> text("fail") 

end