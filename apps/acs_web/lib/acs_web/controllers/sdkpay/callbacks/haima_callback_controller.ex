defmodule AcsWeb.SdkPay.HaimaCallbackController do
  use     AcsWeb, :controller
  require SDKHaima

  def purchase_callback(%Plug.Conn{private: %{acs_app: %RedisApp{} = app}} = conn, 
                        %{"out_trade_no" => order_id, 
                          "trade_status" => trade_status, 
                          "total_fee" => total_fee} = params) do
    case app.sdk_bindings.haima do
      %{"app_key" => app_key} ->
        if SDKHaima.validate_payment(app_key, params) do
          case trade_status do 
            "1" ->
              case Repo.get(AppOrder, order_id) do 
                order = %AppOrder{} ->
                  {:ok, order} = AppOrder.changeset(order, %{
                    status: AppOrder.Status.paid,
                    paid_at: DateTime.utc_now(),
                    transaction_id: "haima." <> order_id, 
                    fee: round(String.to_float(total_fee) * 100)
                  }) |> Repo.update

                  PaymentHelper.notify_cp(order)
                  conn |> text("success")  

               _ -> 
                  Logger.error "order is not found, params: #{inspect params, pretty: true}"
                  conn |> text("fail") 
              end 
            _ ->
              Logger.error "invalid trade_status: #{trade_status}"
              conn |> text("fail")               
          end
        else 
          Logger.error "verify haima payment signature failed, params: #{inspect params, pretty: true}"
          conn |> text("fail")  
        end
      _ -> 
        Logger.error "app haima bindings not found, params: #{inspect params, pretty: true}"
        conn |> text("fail") 
    end
  end
  def purchase_callback(conn, _), do: conn |> text("fail") 
  
end