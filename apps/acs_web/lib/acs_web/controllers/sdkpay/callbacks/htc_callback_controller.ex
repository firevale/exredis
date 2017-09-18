defmodule AcsWeb.SdkPay.HtcCallbackController do
  use    AcsWeb, :controller
  alias  Acs.Apps
  alias  Acs.Apps.AppSdkBinding

  def purchase_callback(%Plug.Conn{private: %{acs_app: %App{} = app}} = conn, params) do
    case Apps.get_app_sdk_binding(app.id, "htc") do
      %AppSdkBinding{binding: %{"pub_key" => pub_key}} ->
        {:ok, body, conn} = Plug.Conn.read_body(conn, length: 1_000_000)

        body_params = %{"order" => orderText, "sign" => orderSign, "sign_type" => "\"RSA\""} = URI.decode_query(body)

        orderText = String.trim(orderText, ?")
        orderSign = String.trim(orderSign, ?")

        if Crypto.rsa_public_verify2(pub_key, orderText, orderSign) do 
          case JSON.decode(orderText) do 
            {:ok, %{"result_code" => 1, "real_amount" => total_fee, "game_order_id" => order_id, "jolo_order_id" => jolo_order_id}} ->
              case Repo.get(AppOrder, order_id) do 
                order = %AppOrder{} ->
                  {:ok, order} = AppOrder.changeset(order, %{
                    status: AppOrder.Status.paid,
                    paid_at: DateTime.utc_now(),
                    transaction_id: "htc." <> jolo_order_id, 
                    fee: total_fee
                  }) |> Repo.update

                  PaymentHelper.notify_cp(order)
                  conn |> text("success")  

               _ -> 
                  error "order is not found, params: #{inspect params, pretty: true}"
                  conn |> text("failure") 
              end 

            error ->
              error "decode json from #{orderText} failed: #{error}"
              conn |> text("failure")               
          end
        else
          error "receive invalid payment notifications, params: #{inspect body_params, pretty: true}"
          conn |> text("failure") 
        end

      _ -> 
        error "receive invalid htc payment notifications, params: #{inspect params, pretty: true}"
        conn |> text("failure") 
    end
  end
end