defmodule Acs.GgplayController do
  use    Acs.Web, :controller

  plug :fetch_app_id
  plug :fetch_app
  plug :fetch_user

  def verify_and_deliver(%Plug.Conn{private: %{acs_app: %RedisApp{} = app,
                                               acs_platform: "android"}} = conn, 
                        %{"order_id" => order_id, 
                          "signed_data" => signed_data,
                          "signature" => signature,
                          "version" => "2"} = params) do

    if verify_ggplay_signature(signed_data, signature, app.sdk_bindings.ggplay.key) do 
      case Repo.get(AppOrder, order_id) do 
        order = %AppOrder{} ->
          case JSON.decode(params["signed_data"]) do  
            {:ok, %{"purchaseTime" => _purchase_time, "orderId" => transaction_id}} ->
              {:ok, order} = AppOrder.changeset(order, %{
                status: AppOrder.Status.paid,
                paid_at: :calendar.local_time |> NaiveDateTime.from_erl!,
                transaction_id: "ggplay." <> transaction_id 
              }) |> Repo.update

              PaymentHelper.notify_cp(order)

              conn |> json(%{success: true, 
                              price: order.price, 
                              currency_code: order.trade_currency, 
                              item_name: order.goods_name})
            _ ->
              Logger.error "deliver ggplay goods failed, invalid signed_data: #{signed_data}"
              conn |> json(%{success: false, message: "signed_data is not a valid json string"})
          end

        _ ->
          Logger.error "deliver ggplay goods failed, can't find platform order: #{order_id}"
          conn |> json(%{success: false, message: "invalid platform order id"})
      end
    else 
      Logger.error "deliver ggplay goods failed, verify signature failed: #{signed_data}, #{signature}"
      conn |> json(%{success: false, message: "invalid signature data"})
    end 
  end

  defp verify_ggplay_signature(signed_data, signature, key) do 
    sig = case Base.decode64(signature) do 
            {:ok, val} -> val
            :error ->
              case Base.decode64(signature <> "==") do 
                {:ok, val} -> val
                :error ->
                  Logger.error "decode ggplay signature failed, signature: #{signature}"
                  nil
              end
          end

    case sig do 
      nil -> 
        false
      _ ->
        Utils.rsa_public_verify3(key, signed_data, sig)
    end
  end
 
end