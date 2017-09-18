defmodule AcsWeb.SdkPay.NdcomCallbackController do
  use     AcsWeb, :controller
  require SDKNdcom
  alias   Acs.Apps
  alias   Acs.Apps.AppSdkBinding

  def purchase_callback(%Plug.Conn{private: %{acs_app: %App{} = app}} = conn, 
                        %{"PayStatus" => pay_status, 
                          "CooOrderSerial" => order_id,
                          "Note" => cp_order_id,
                          "ConsumeStreamId" => trans_no, 
                          "OrderMoney" => amount} = params) do
    case Apps.get_app_sdk_binding(app.id, "ndcom") do
      %AppSdkBinding{binding: %{"app_id" => app_id, "app_key" => app_key}} ->
        if SDKNdcom.validate_payment(app_id, app_key, params) do
          case pay_status do 
            "1" ->
               case Repo.get(AppOrder, order_id) do 
                order = %AppOrder{} ->
                  if String.starts_with?(order.cp_order_id, cp_order_id) do 
                    {:ok, order} = AppOrder.changeset(order, %{
                      status: AppOrder.Status.paid,
                      paid_at: DateTime.utc_now(),
                      transaction_id: "ndcom." <> trans_no, 
                      fee: round(String.to_float(amount) * 100)
                    }) |> Repo.update

                    PaymentHelper.notify_cp(order)
                    conn |> json(%{"ErrorCode" => "1"}) 

                 else 
                    error "cp_order_id mismatch, ours: #{order.cp_order_id}, theirs: #{cp_order_id}"
                    conn |> json(%{"ErrorCode" => "4"}) 
                  end
                _ -> 
                  error "order is not found, params: #{inspect params, pretty: true}"
                  conn |> json(%{"ErrorCode" => "4"}) 
              end

            _ -> 
              info "receive ndcom payment fail notification, params: #{inspect params, pretty: true}"
              conn |> json(%{"ErrorCode" => "1"}) 
          end
        else 
          error "verify ndcom payment signature failed, params: #{inspect params, pretty: true}"
          conn |> json(%{"ErrorCode" => "5"}) 
        end
      _ -> 
        error "receive invalid ndcom payment notifications, params: #{inspect params, pretty: true}"
        conn |> json(%{"ErrorCode" => "4"}) 
    end
  end
  def purchase_callback(conn, _), do: conn |> json(%{"ErrorCode" => "404"}) 

end