defmodule AcsWeb.SdkPay.AnzhiCallbackController do
  use    AcsWeb, :controller
  alias  Acs.Apps
  alias  Acs.Apps.AppSdkBinding

  def purchase_callback(%Plug.Conn{private: %{acs_app: %App{} = app}} = conn, 
                        %{"data" => notify_data} = params) do 
    case Apps.get_app_sdk_binding(app.id, "anzhi") do 
      nil ->
        error "can't get app anzhi binding info for app: #{inspect app, pretty: true}"
        conn |> text("anzhi settings not found ")

      %AppSdkBinding{binding: %{"app_key" => _app_key, "app_secret" => app_secret}} ->
        case DesEcb3.decrypt(app_secret, notify_data |> Base.decode64!) do
          nil -> 
            error "anzhi DesEcb3 fail"
            conn |> text("decrypt notify data failed")

          ""  -> 
            error "anzhi DesEcb3 fail"
            conn |> text("decrypt notify data failed")

          notify_data ->  
            %{
              "orderId" => sdk_order_id,
              "orderAmount" => amount, 
              "code" => code, 
              "cpInfo" => order_id
             } = JSON.decode!(notify_data)

            if (code |> to_string) == "1" do 
              case Repo.get(AppOrder, order_id) do 
                order = %AppOrder{} ->
                  {:ok, order} = AppOrder.changeset(order, %{
                    status: AppOrder.Status.paid,
                    paid_at: DateTime.utc_now(),
                    transaction_id: "anzhi." <> sdk_order_id, 
                    fee: amount
                  }) |> Repo.update

                  PaymentHelper.notify_cp(order)
                  conn |> text("success")   

                _ ->
                  error "order #{order_id} not found"
                  conn |> text("fail")
              end 
            else
              error "anzhi order #{order_id} code fail"
              conn |> text("fail")
            end
        end    
      _ -> #{client_id invalid}
        error "receive invalid anzhi payment notifications, params: #{inspect params, pretty: true}"
        conn |> text("fail")
    end
  end
  def purchase_callback(conn, _), do: conn |> text("fail")

end

