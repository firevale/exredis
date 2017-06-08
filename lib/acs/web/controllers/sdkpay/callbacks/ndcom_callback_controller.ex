defmodule Acs.Web.SdkPay.NdcomCallbackController do
  use     Acs.Web, :controller
  require SDKNdcom

  def purchase_callback(%Plug.Conn{private: %{acs_app: %RedisApp{} = app}} = conn, 
                        %{"PayStatus" => pay_status, 
                          "CooOrderSerial" => order_id,
                          "Note" => cp_order_id,
                          "ConsumeStreamId" => trans_no, 
                          "OrderMoney" => amount} = params) do
    case app.sdk_bindings.ndcom do
      %{"app_id" => app_id, "app_key" => app_key} ->
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
                    Logger.error "cp_order_id mismatch, ours: #{order.cp_order_id}, theirs: #{cp_order_id}"
                    conn |> json(%{"ErrorCode" => "4"}) 
                  end
                _ -> 
                  Logger.error "order is not found, params: #{inspect params, pretty: true}"
                  conn |> json(%{"ErrorCode" => "4"}) 
              end

            _ -> 
              Logger.info "receive ndcom payment fail notification, params: #{inspect params, pretty: true}"
              conn |> json(%{"ErrorCode" => "1"}) 
          end
        else 
          Logger.error "verify ndcom payment signature failed, params: #{inspect params, pretty: true}"
          conn |> json(%{"ErrorCode" => "5"}) 
        end
      _ -> 
        Logger.error "receive invalid ndcom payment notifications, params: #{inspect params, pretty: true}"
        conn |> json(%{"ErrorCode" => "4"}) 
    end
  end
  def purchase_callback(conn, _), do: conn |> json(%{"ErrorCode" => "404"}) 

end