defmodule Acs.SdkPay.Qh360CallbackController do
  use     Acs.Web, :controller
  require SDKQh360

  def purchase_callback(%Plug.Conn{private: %{acs_app: %RedisApp{} = app}} = conn, 
                       %{"gateway_flag" => gateway_flag, 
                         "app_ext1" => order_id, 
                         "app_ext2" => cp_order_id,
                         "order_id" => trans_no,
                         "amount" => amount} = params) do

    case app.sdk_bindings.qh360 do
      %{app_secret: app_secret} ->
        if SDKQh360.validate_payment(app_secret, params) do
          case gateway_flag do 
            "success" ->
              case Repo.get(AppOrder, order_id) do 
                order = %AppOrder{} ->
                  if String.starts_with?(order.cp_order_id, cp_order_id) do
                    {:ok, order} = AppOrder.changeset(order, %{
                      status: AppOrder.Status.paid,
                      paid_at: :calendar.local_time |> NaiveDateTime.from_erl!,
                      transaction_id: "qh360." <> trans_no, 
                      fee: String.to_integer(amount)
                    }) |> Repo.update

                    PaymentHelper.notify_cp(order)
                    conn |> text("ok") 
                 else 
                    Logger.error "cp_order_id mismatch, ours: #{order.cp_order_id}, theirs: #{params["Note"]}"
                    conn |> text("order id mismatch")
                  end
                _ -> 
                  Logger.error "order is not found, params: #{inspect params, pretty: true}"
                  conn |> text("firevale platform order not found")
              end
            _ -> 
              Logger.info "receive qh360 payment fail notification, params: #{inspect params, pretty: true}"
              conn |> text("gateway_flag != 'success'")
          end
        else 
          Logger.error "verify qh360 payment signature failed, params: #{inspect params, pretty: true}"
          conn |> text("mismatch signature")
        end
      _ -> 
        Logger.error "receive invalid qh360 payment notifications, params: #{inspect params, pretty: true}"
        conn |> text("invalid callback url")
    end
  end
  def purchase_callback(conn, _), do: conn |> text("invalid 360 payment callback request")

end