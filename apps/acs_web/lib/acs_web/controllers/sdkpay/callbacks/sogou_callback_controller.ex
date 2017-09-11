defmodule AcsWeb.SdkPay.SogouCallbackController do
  use     AcsWeb, :controller
  require SDKSogou

  def purchase_callback(%Plug.Conn{private: %{acs_app: %RedisApp{} = app}} = conn, 
                         %{"appdata" => order_id, 
                           "oid" => trans_no, 
                           "realAmount" => amount} = params) do
    case app.sdk_bindings.sogou do
      %{pay_key: pay_key} ->
        if SDKSogou.validate_payment(pay_key, params) do
          case Repo.get(AppOrder, order_id) do 
            order = %AppOrder{} ->
              {:ok, order} = AppOrder.changeset(order, %{
                status: AppOrder.Status.paid,
                paid_at: DateTime.utc_now(),
                transaction_id: "sogou." <> trans_no, 
                fee: round(String.to_float(amount) * 100)
              }) |> Repo.update

              PaymentHelper.notify_cp(order)
              conn |> text("OK") 
            _ -> 
              Logger.error "order is not found, params: #{inspect params, pretty: true}"
              conn |> text("ERR_100") 
          end 
        else 
          Logger.error "verify xy payment signature failed, params: #{inspect params, pretty: true}"
          conn |> text("ERR_200")  
        end
      _ -> 
        Logger.error "receive invalid sogou payment notifications, params: #{inspect params, pretty: true}"
        conn |> text("ERR_500") 
    end
  end
  def purchase_callback(conn, _), do: conn |> text("ERR_404")
  
end