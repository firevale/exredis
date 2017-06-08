defmodule Acs.Web.SdkPay.VivoCallbackController do
  use     Acs.Web, :controller
  require SDKVivo

  def purchase_callback(%Plug.Conn{private: %{acs_app: %RedisApp{} = app}} = conn, 
                         %{"cpOrderNumber" => order_id, 
                           "orderNumber" => trans_no, 
                           "orderAmount" => amount} = params) do
    case app.sdk_bindings.vivo do
      %{cp_key: cp_key}->
        if SDKVivo.validate_payment(cp_key, params) do
          case Repo.get(AppOrder, order_id) do 
            order = %AppOrder{} ->
              {:ok, order} = AppOrder.changeset(order, %{
                status: AppOrder.Status.paid,
                paid_at: DateTime.utc_now(),
                transaction_id: "vivo." <> trans_no, 
                fee: String.to_integer(amount)
              }) |> Repo.update

              PaymentHelper.notify_cp(order)
              conn |> text("200") 

            _ -> 
              Logger.error "order is not found, params: #{inspect params, pretty: true}"
              conn |> text("405") 
          end 
        else 
          Logger.error "verify tbt payment signature failed, params: #{inspect params, pretty: true}"
          conn |> text("403")  
        end
      _ -> 
        Logger.error "receive invalid  payment notifications, params: #{inspect params, pretty: true}"
        conn |> text("500") 
    end
  end

  def purchase_callback(conn, _), do: conn |> text("404") 
  
end