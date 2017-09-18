defmodule AcsWeb.SdkPay.UCCallbackController do
  use     AcsWeb, :controller
  require SDKUC
  alias   Acs.Apps
  alias   Acs.Apps.AppSdkBinding

  @success "SUCCESS"
  @failure "FAILURE"
  
  def purchase_callback(%Plug.Conn{private: %{acs_app: %App{} = app}} = conn, 
                        %{"data" => %{"orderStatus" => order_status, 
                                      "callbackInfo" => order_id,
                                      "trans_no" => trans_no,
                                      "amount" => amount}} = params) do  
    case Apps.get_app_sdk_binding(app.id, "uc") do
      %AppSdkBinding{binding: %{"app_key" => app_key}} ->
        if SDKUC.validate_payment(app_key, params) do
          case order_status do
            "S" ->
              case Repo.get(AppOrder, order_id) do 
                order = %AppOrder{} ->             
                  {:ok, order} = AppOrder.changeset(order, %{
                    status: AppOrder.Status.paid,
                    paid_at: DateTime.utc_now(),
                    transaction_id: "uc." <> trans_no, 
                    fee: round(String.to_float(amount |> to_string) * 100)
                  }) |> Repo.update

                  PaymentHelper.notify_cp(order)
                  conn |> text(@success) 

                _ -> 
                  Logger.error "order is not found, params: #{inspect params, pretty: true}"
                  conn |> text(@failure)
              end

            "F" -> 
              Logger.info "receive payment failed notification, #{inspect params, pretty: true}"
              conn |> text(@success)
              
            _ ->
              Logger.info "receive unknown payment status notification, #{inspect params, pretty: true}"
              conn |> text(@failure)
          end
        else 
          Logger.error "verify uc payment signature failed, params: #{inspect params, pretty: true}"
          conn |> text(@failure)
        end
      _ ->
        Logger.error "uc binding not found in client: #{inspect app, pretty: true}"
        conn |> text(@failure)
    end 
  end

  def purchase_callback(conn, _), do: conn |> text(@failure)
  
end

