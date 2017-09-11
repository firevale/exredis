defmodule AcsWeb.SdkPay.TbtCallbackController do
  use     AcsWeb, :controller
  require SDKTBT

  def purchase_callback(%Plug.Conn{private: %{acs_app: %RedisApp{} = app}} = conn, 
                        %{"trade_no" => order_id, 
                          "tborder" => trans_no, 
                          "amount" => amount,
                          "paydes" => cp_order_id} = params) do
    case app.sdk_bindings.tbt do
      %{app_key: app_key} ->
        if SDKTBT.validate_payment(app_key, params) do
          case Repo.get(AppOrder, order_id) do 
            order = %AppOrder{} ->
              if String.starts_with?(order.cp_order_id, cp_order_id) do 
                {:ok, order} = AppOrder.changeset(order, %{
                  status: AppOrder.Status.paid,
                  paid_at: DateTime.utc_now(),
                  transaction_id: "tbt." <> trans_no, 
                  fee: String.to_integer(amount)
                }) |> Repo.update

                PaymentHelper.notify_cp(order)
                conn |> json(%{"status" => "success"})  

              else 
                Logger.error "cp_order_id mismatch, ours: #{order.cp_order_id}, theirs: #{params["paydes"]}"
                conn |> json(%{"ErrorCode" => "4"}) 
              end
            _ -> 
              Logger.error "order is not found, params: #{inspect params, pretty: true}"
              conn |> json(%{"ErrorCode" => "4"}) 
          end 
        else 
          Logger.error "verify tbt payment signature failed, params: #{inspect params, pretty: true}"
          conn |> json(%{"ErrorCode" => "5"}) 
        end
      _ -> 
        Logger.error "receive invalid tbt payment notifications, params: #{inspect params, pretty: true}"
        conn |> json(%{"ErrorCode" => "4"}) 
    end
  end
  def purchase_callback(conn, _), do: conn |> json(%{"ErrorCode" => "404", "ErrorDesc" => "invalid tbt payment callback request"}) 

end