defmodule Acs.SdkPay.AnzhiCallbackController do
  use    Acs.Web, :controller

  plug :detect_app_id
  plug :fetch_app

  def purchase_callback(conn, %{"data" => notify_data, "app" => %App{} = app} = params) do 

    case app.sdk_bindings |> Enum.find(&(&1.sdk == "anzhi")) do 
      _ ->
        Logger.error "can't get app anzhi binding info for app: #{inspect app, pretty: true}"
        conn |> text("anzhi settings not found ")

      %AppSdkBinding{bindings: %{app_key: _app_key, app_secret: app_secret}} ->
        case DesEcb3.decrypt(app_secret, notify_data |> Base.decode64!) do
          nil -> 
            Logger.error "anzhi DesEcb3 fail"
            conn |> text("decrypt notify data failed")

          ""  -> 
            Logger.error "anzhi DesEcb3 fail"
            conn |> text("decrypt notify data failed")

          notify_data ->  
            %{
              "orderId" => sdk_order_id,
              "orderAmount" => amount, 
              "code" => code, 
              "cpInfo" => order_id
             } = JSON.decode!(notify_data)

            if (code |> to_string) == "1" do 
              # case Repo.get(AppOrder, order_id) do 
              #   order = %AppOrder{} ->
              #     {:ok, order} = AppOrder.changeset(order, %{
              #       status: AppOrder.Status.paid,
              #       paid_at: 
              #     })
              #     order = %{order | status: :paid, 
              #                       paid_at: Utils.unix_timestamp, 
              #                       trade_status: "TRADE_FINISHED",
              #                       trade_no: "anzhi." <> sdk_order_id,
              #                       total_fee: amount |> to_string  }

              #     :ok = Order.save(order)

              #     case PaymentHelper.notify_cp(order) do 
              #       :ok -> 
              #         Logger.info "notify cp success, order id: #{order.id}"
              #         conn |> text("success")

              #       {:cp_failed, cp_result} ->
              #         Logger.error "notify cp failed: #{inspect cp_result}"
              #         OrderNotifier.add_order(order)
              #         conn |> text("success")

              #       {:error, error} -> 
              #         Logger.error "notify cp error: #{inspect error}"
              #         OrderNotifier.add_order(order)
              #         conn |> text("success")
              #     end

              #   _ ->
              #     Logger.error "anzhi order #{order_id} not found"
              #     conn |> text("fail")
              # end
            else
              Logger.error "anzhi order #{order_id} code fail"
              conn |> text("fail")
            end
        end    
      _ -> #{client_id invalid}
        Logger.error "receive invalid anzhi payment notifications, params: #{inspect params, pretty: true}"
        conn |> text("fail")
    end
  end

  def purchase_callback(conn, _), do: conn |> text("fail")
end

