defmodule AcsWeb.SdkPay.HuaweiCallbackController do
  use     AcsWeb, :controller
  require SDKHuawei
  alias   Acs.Apps
  alias   Acs.Apps.AppSdkBinding

  plug :fetch_app_id 
  plug :fetch_app

  def purchase_callback(%Plug.Conn{private: %{acs_app: %App{} = app}} = conn, 
                        %{"result" => result, 
                          "requestId" => order_id, 
                          "orderId" => trans_no, 
                          "amount" => amount} = params) do
    case Apps.get_app_sdk_binding(app.id, "huawei") do
      %AppSdkBinding{binding: %{"pay_pub_key" => pay_pub_key}} ->
        if SDKHuawei.validate_payment(pay_pub_key, params) do
          case to_string(result) do 
            "0" ->
               case Repo.get(AppOrder, order_id) do 
                order = %AppOrder{} ->
                  {:ok, order} = AppOrder.changeset(order, %{
                    status: AppOrder.Status.paid,
                    paid_at: DateTime.utc_now(),
                    transaction_id: "huawei." <> trans_no, 
                    fee: round(String.to_float(amount |> to_string) * 100)
                  }) |> Repo.update

                  PaymentHelper.notify_cp(order)
                  conn |> json(%{"result" => "0"}) 

               _ -> 
                  Logger.error "order is not found, params: #{inspect params, pretty: true}"
                  conn |> json(%{"result" => "3"})   
              end
            _ -> 
              Logger.info "receive huawei payment fail notification, params: #{inspect params, pretty: true}"
              conn |> json(%{"ErrorCode" => "3"}) 
          end
        else 
          Logger.error "verify huawei payment signature failed, params: #{inspect params, pretty: true}"
          conn |> json(%{"ErrorCode" => "1"}) 
        end
      _ -> 
        Logger.error "receive invalid huawei payment notifications, params: #{inspect params, pretty: true}"
        conn |> json(%{"ErrorCode" => "94"}) 
    end
  end
  def purchase_callback(conn, _), do: conn |> json(%{"ErrorCode" => "404"}) 

end