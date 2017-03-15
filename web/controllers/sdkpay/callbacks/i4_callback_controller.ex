defmodule Acs.SdkPay.I4CallbackController do
  use     Acs.Web, :controller
  require SDKI4

  def purchase_callback(%Plug.Conn{private: %{acs_app: %RedisApp{} = app}} = conn, 
                        %{"billno" => order_id, 
                          "order_id" => trans_no, 
                          "amount" => amount} = params) do
    case app.sdk_bindings.i4 do
      %{"rsa_key" => rsa_key} ->
        if SDKI4.validate_payment(rsa_key, params) do
          case Repo.get(AppOrder, order_id) do 
            order = %AppOrder{} ->
              {:ok, order} = AppOrder.changeset(order, %{
                status: AppOrder.Status.paid,
                paid_at: DateTime.utc_now(),
                transaction_id: "i4." <> trans_no, 
                fee: round(String.to_integer(amount |> to_string) * 100)
              }) |> Repo.update

              PaymentHelper.notify_cp(order)
              conn |> text("success")  

           _ -> 
              Logger.error "order is not found, params: #{inspect params, pretty: true}"
              conn |> text("fail") 
          end 
        else 
          Logger.error "verify i4 payment signature failed, params: #{inspect params, pretty: true}"
          conn |> text("fail")  
        end
      _ -> 
        Logger.error "receive invalid i4 payment notifications, params: #{inspect params, pretty: true}"
        conn |> text("fail") 
    end
  end

  def purchase_callback(conn, _), do: conn |> text("fail") 
  
end