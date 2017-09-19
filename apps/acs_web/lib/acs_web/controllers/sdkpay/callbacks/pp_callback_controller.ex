defmodule AcsWeb.SdkPay.PPCallbackController do
  use     AcsWeb, :controller
  require SDKPP
  alias   Acs.Apps
  alias   Acs.Apps.AppSdkBinding

  def purchase_callback(%Plug.Conn{private: %{acs_app: %App{} = app}} = conn, 
                        %{"billno" => order_id, "order_id" => trans_no, "amount" => amount} = params) do
    case Apps.get_app_sdk_binding(app.id, "pp") do
      %AppSdkBinding{binding: %{"pay_key" => pay_key}} ->
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
              error "order is not found, params: #{inspect params, pretty: true}"
              conn |> text("fail") 
          end 
        else #{verify signature failed}
          error "verify tbt payment signature failed, params: #{inspect params, pretty: true}"
          conn |> text("fail")  
        end
      _ -> #{client_id invalid}
        error "receive invalid tbt payment notifications, params: #{inspect params, pretty: true}"
        conn |> text("fail") 
    end
  end

  def purchase_callback(conn, _), do: conn |> text("fail") 

end