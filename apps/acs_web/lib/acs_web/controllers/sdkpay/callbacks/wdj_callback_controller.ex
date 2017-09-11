defmodule AcsWeb.SdkPay.WandoujiaCallbackController do
  use    AcsWeb, :controller

  def purchase_callback(%Plug.Conn{private: %{acs_app: %RedisApp{} = app}} = conn, 
                        %{"content" => content, 
                          "sign" => sign} = params) do

    case app.sdk_bindings.wdj do
      %{rsa_key: rsa_key} ->
        if Utils.rsa_public_verify2(rsa_key, content, sign) do  
          pay_info = JSON.decode!(content)
          case Repo.get(AppOrder, pay_info["out_trade_no"]) do 
            order = %AppOrder{} ->
              {:ok, order} = AppOrder.changeset(order, %{
                status: AppOrder.Status.paid,
                paid_at: DateTime.utc_now(),
                transaction_id:  "wdj." <> (pay_info["orderId"] |> to_string),
                fee:  String.to_integer(pay_info["money"] |> to_string)
              }) |> Repo.update

              PaymentHelper.notify_cp(order)
              conn |> text("success")  
            _ -> 
              Logger.error "order is not found, params: #{inspect params, pretty: true}"
              conn |> text("failure") 
          end 
        else 
          Logger.error "verify wdj payment signature failed, params: #{inspect params, pretty: true}"
          conn |> text("failure")  
        end
      _ -> 
        Logger.error "receive invalid wdj payment notifications, params: #{inspect params, pretty: true}"
        conn |> text("failure") 
    end
  end
end