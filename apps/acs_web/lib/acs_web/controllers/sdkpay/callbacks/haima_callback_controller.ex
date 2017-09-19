defmodule AcsWeb.SdkPay.HaimaCallbackController do
  use     AcsWeb, :controller
  require SDKHaima
  alias   Acs.Apps
  alias   Acs.Apps.AppSdkBinding

  def purchase_callback(%Plug.Conn{private: %{acs_app: %App{} = app}} = conn, 
                        %{"out_trade_no" => order_id, 
                          "trade_status" => trade_status, 
                          "total_fee" => total_fee} = params) do
    case Apps.get_app_sdk_binding(app.id, "haima") do
      %AppSdkBinding{binding: %{"app_key" => app_key}} ->
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
                  error "order is not found, params: #{inspect params, pretty: true}"
                  conn |> text("fail") 
              end 
            _ ->
              error "invalid trade_status: #{trade_status}"
              conn |> text("fail")               
          end
        else 
          error "verify haima payment signature failed, params: #{inspect params, pretty: true}"
          conn |> text("fail")  
        end
      _ -> 
        error "app haima bindings not found, params: #{inspect params, pretty: true}"
        conn |> text("fail") 
    end
  end
  def purchase_callback(conn, _), do: conn |> text("fail") 
  
end