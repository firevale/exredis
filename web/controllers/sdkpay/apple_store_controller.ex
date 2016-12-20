defmodule Acs.AppleStoreController do
  use    Acs.Web, :controller

  require SDKApple

  plug :fetch_user

  def add_order(%Plug.Conn{private: %{acs_user: %RedisUser{} = user,
                                      acs_app: %RedisApp{} = app,
                                      acs_platform: "ios",
                                      acs_device_id: device_id}} = conn, 
                %{"receipt" => receipt,
                  "transaction_id" => transaction_id,
                  "goods_id" => goods_id,
                  "price_in_cent" => amount,
                  "cp_order_id" => cp_order_id,
                  "currency_code" => currency,
                  "version" => "2"} = params) do 
    case Repo.get_by(AppGoodsProductId, app_goods_id: goods_id, sdk: "applestore") do 
      nil -> 
        Logger.error "product id for goods: #{goods_id}, sdk: applestore is not configured!"
        conn |> json(%{success: false, message: "product id not configured for goods: #{goods_id}, sdk: applestore"})
      
      %AppGoodsProductId{product_id: product_id} -> 
        case Repo.get_by(AppGoods, id: goods_id) do 
          nil -> 
            Logger.error "goods: #{goods_id} is not configured!"
            conn |> json(%{success: false, message: "goods #{goods_id} is not configured for app #{app.name}"})

          %AppGoods{price: price} ->
            cp_order_id = case cp_order_id do 
                            "(null)" -> "null." <> Utils.generate_token(32)
                            _ -> cp_order_id
                          end

            order_info = %{
              id: Utils.generate_token(16),
              app_id: app.id, 
              user_id: user.id, 
              platform: "ios",
              device_id: device_id,
              sdk: "firevale",
              cp_order_id: cp_order_id, 
              status: AppOrder.Status.created,
              price: price,
              fee: String.to_integer(amount),
              paid_channel: "applestore",
              currency: currency,
              goods_id: goods_id,
              goods_name: params["goods_name"],
              transaction_id: "applestore." <> transaction_id
            }

            order_info = case Repo.get_by(AppUser, app_id: app.id, user_id: user.id) do 
                          nil -> order_info 
                          %AppUser{id: app_user_id} -> %{order_info | app_user_id: app_user_id}
                        end

            order_info = case SDKApple.verify_receipt(receipt) do 
                          {:valid_receipt, :production, %{"receipt" => %{
                            "product_id" => ^product_id,
                            "transaction_id" => ^transaction_id
                          }}} ->
                            %{order_info | status: AppOrder.Status.paid,
                                          paid_at: :calendar.local_time |> NaiveDateTime.from_erl!}   

                          {:valid_receipt, :sandbox, %{"receipt" => %{
                            "product_id" => ^product_id,
                            "transaction_id" => ^transaction_id
                          }}} ->
                            %{order_info | status: AppOrder.Status.paid, 
                                          debug_mode: true, 
                                          paid_at: :calendar.local_time |> NaiveDateTime.from_erl!,
                                          fee: 0} 

                          {:valid_receipt, :production, %{"receipt" => %{
                            "in_app" => [%{
                              "product_id" => ^product_id,
                              "transaction_id" => ^transaction_id} | _],
                          }}} ->
                            %{order_info | status: AppOrder.Status.paid,
                                          paid_at: :calendar.local_time |> NaiveDateTime.from_erl!}   

                          {:valid_receipt, :sandbox, %{"receipt" => %{
                            "in_app" => [%{
                              "product_id" => ^product_id,
                              "transaction_id" => ^transaction_id} | _],
                          }}} ->
                            %{order_info | status: AppOrder.Status.paid, 
                                          debug_mode: true, 
                                          paid_at: :calendar.local_time |> NaiveDateTime.from_erl!,
                                          fee: 0}
                          {:valid_receipt, :production, decrypted_receipt} ->
                            Logger.error "receive cheat receipt: #{inspect decrypted_receipt, pretty: true}"
                            %{order_info | status: AppOrder.Status.cheat, fee: 0}

                          _ -> 
                            %{order_info | status: AppOrder.Status.created, fee: 0}
                        end

            AppOrder.changeset(%AppOrder{}, order_info) |> Repo.insert! 

            conn |> json(%{success: true})
        end
    end
  end
  def add_order(conn, _params) do 
    conn |> json(%{success: false, message: "invalid request params"})
  end 

  def deliver_order(%Plug.Conn{private: %{acs_platform: "ios"}} = conn, 
                    %{"transaction_id" => transaction_id} = _params) do 

    case Repo.get_by(AppOrder, transaction_id: "applestore." <> transaction_id) do 
      nil ->
        conn |> json(%{success: false, message: "can't find order by apple store transaction id: #{transaction_id}"}) 

      order = %AppOrder{} ->
        cond do 
          order.status == AppOrder.Status.paid() -> 
            PaymentHelper.notify_cp(order)
          order.status == AppOrder.Status.cheat() -> 
            Logger.error "won't deliver cheat order #{inspect order, pretty: true}"
          true ->
            Logger.error "invalid order #{inspect order, pretty: true}"
        end
              
        conn |> json(%{success: true, 
                       price: order.price, 
                       currency_code: order.currency, 
                       item_name: order.goods_name})
    end
  end
  def deliver_order(conn, _params) do 
    conn |> json(%{success: false, message: "invalid request params"})
  end 

  # def verify_and_deliver(conn, _params) do 
  #   conn |> json(%{success: false, reason: :network})
  # end

  def verify_and_deliver(%Plug.Conn{private: %{acs_user: %RedisUser{} = user,
                                               acs_app: %RedisApp{} = app,
                                               acs_platform: "ios",
                                               acs_device_id: device_id}} = conn, 
                %{"receipt" => receipt,
                  "transaction_id" => transaction_id,
                  "goods_id" => goods_id,
                  "price_in_cent" => amount,
                  "cp_order_id" => cp_order_id,
                  "currency_code" => currency} = params) do 
    case Repo.get_by(AppGoodsProductId, app_goods_id: goods_id, sdk: "applestore") do 
      nil -> 
        Logger.error "product id for goods: #{goods_id}, sdk: applestore is not configured!"
        conn |> json(%{success: false, message: "product id not configured for goods: #{goods_id}, sdk: applestore"})
      
      %AppGoodsProductId{product_id: product_id} -> 
        case SDKApple.verify_receipt(receipt) do 
          {:ok, %{product_id: ^product_id, transaction_id: ^transaction_id, receipt_type: receipt_type}} ->
            case Repo.get_by(AppOrder, transaction_id: "applestore." <> transaction_id) do 
              %AppOrder{cp_order_id: ^cp_order_id} = order ->
                d "order already exists, deliver it"
                if order.status > 0 do 
                  PaymentHelper.notify_cp(order)
                  conn |> json(%{success: true})
                else 
                  conn |> json(%{success: false, reason: "delivered"})
                end

              %AppOrder{} = order ->
                Logger.error "receive cheat receipt, use #{transaction_id} for cp_order: #{cp_order_id} & #{order.cp_order_id}"
                conn |> json(%{success: false, reason: "cheat", message: "cheat receipt"})

              nil ->
                case Repo.get_by(AppGoods, id: goods_id) do 
                  nil -> 
                    Logger.error "goods: #{goods_id} is not configured!"
                    conn |> json(%{success: false, message: "goods #{goods_id} is not configured for app #{app.name}"})

                  %AppGoods{price: price} = goods ->
                    cp_order_id = case cp_order_id do 
                                    "(null)" -> "null." <> Utils.generate_token(32)
                                    _ -> cp_order_id
                                  end

                    order_info = %{
                      id: Utils.generate_token(16),
                      app_id: app.id, 
                      user_id: user.id, 
                      platform: "ios",
                      device_id: device_id,
                      sdk: "firevale",
                      cp_order_id: cp_order_id, 
                      status: AppOrder.Status.created(),
                      price: String.to_integer(amount),
                      fee: case receipt_type do 
                             "ProductionSandbox" -> 0
                             _ -> String.to_integer(amount)
                           end,
                      paid_channel: "applestore",
                      market: "applestore",
                      currency: currency,
                      goods_id: goods_id,
                      goods_name: goods.name,
                      transaction_id: "applestore." <> transaction_id,
                      transaction_currency: currency,
                      transaction_status: "FINISHED",
                      debug_mode: receipt_type == "ProductionSandbox",
                    }

                    order_info = case Repo.get_by(AppUser, app_id: app.id, user_id: user.id) do 
                                  nil -> order_info 
                                  %AppUser{id: app_user_id} -> %{order_info | app_user_id: app_user_id}
                                end

                    {:ok, order} = AppOrder.changeset(%AppOrder{}, order_info) |> Repo.insert 

                    PaymentHelper.notify_cp(order)

                    conn |> json(%{success: true})
                end                
            end

          {:ok, x} -> 
            Logger.error "receive cheat receipt, apple response: #{inspect x, pretty: true}"
            conn |> json(%{success: false, reason: "cheat", message: "cheat receipt"})
          
          {:error, reason} ->
            conn |> json(%{success: false, reason: reason})
        end
    end
  end

end