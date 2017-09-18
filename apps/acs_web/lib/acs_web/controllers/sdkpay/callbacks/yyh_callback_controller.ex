defmodule AcsWeb.SdkPay.YYHCallbackController do
  use     AcsWeb, :controller
  require SDKYYH
  alias   Acs.Apps
  alias   Acs.Apps.AppSdkBinding

  def purchase_callback(%Plug.Conn{private: %{acs_app: %App{} = app}} = conn, 
                        %{"transdata" => transdata, "sign" => sign} = params) do
    case Apps.get_app_sdk_binding(app.id, "yyh") do
      %AppSdkBinding{binding: %{"pay_key" => pay_key}} ->
        if SDKYYH.validate_payment(pay_key, transdata, sign) do    
          %{"exorderno" => order_id, 
            "transid" => trans_no, 
            "money" => amount} = JSON.decode!(transdata)
          case Repo.get(AppOrder, order_id) do 
            order = %AppOrder{} ->
              {:ok, order} = AppOrder.changeset(order, %{
                status: AppOrder.Status.paid,
                paid_at: DateTime.utc_now(),
                transaction_id: "yyh." <> (trans_no |> to_string), 
                fee: String.to_integer(amount |> to_string)
              }) |> Repo.update

              PaymentHelper.notify_cp(order)
              conn |> text("SUCCESS") 
            _ -> 
              error "order is not found, params: #{inspect params, pretty: true}"
              conn |> text("FAILURE") 
          end 
        else 
          error "verify wdj payment signature failed, params: #{inspect params, pretty: true}"
          conn |> text("FAILURE")  
        end
      _ -> 
        error "receive invalid yyh payment notifications, params: #{inspect params, pretty: true}"
        conn |> text("FAILURE") 
    end
  end
  def purchase_callback(conn, _), do: conn |> text("FAILURE") 
end