defmodule AcsWeb.SdkPay.VivoCallbackController do
  use     AcsWeb, :controller
  require SDKVivo
  alias   Acs.Apps
  alias   Acs.Apps.AppSdkBinding

  def purchase_callback(%Plug.Conn{private: %{acs_app: %App{} = app}} = conn, 
                         %{"cpOrderNumber" => order_id, 
                           "orderNumber" => trans_no, 
                           "orderAmount" => amount} = params) do
    case Apps.get_app_sdk_binding(app.id, "vivo") do
      %AppSdkBinding{binding: %{"cp_key" => cp_key}} ->
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
              error "order is not found, params: #{inspect params, pretty: true}"
              conn |> text("405") 
          end 
        else 
          error "verify tbt payment signature failed, params: #{inspect params, pretty: true}"
          conn |> text("403")  
        end
      _ -> 
        error "receive invalid  payment notifications, params: #{inspect params, pretty: true}"
        conn |> text("500") 
    end
  end

  def purchase_callback(conn, _), do: conn |> text("404") 
  
end