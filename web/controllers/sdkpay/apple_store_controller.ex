defmodule Acs.AppleStoreController do
  use    Acs.Web, :controller

  require SDKApple

  plug :fetch_zone_id
  plug :fetch_user

  # 兼容旧版本fvsdk
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
    case app.goods[goods_id |> String.to_atom] do 
      %{product_ids: %{applestore: product_id}, price: price, name: goods_name} -> 
        case SDKApple.verify_receipt(receipt) do 
          {:ok, %{product_id: ^product_id, transaction_id: ^transaction_id, receipt_type: receipt_type}} ->
            case Repo.get_by(AppOrder, transaction_id: "applestore." <> transaction_id) do 
              %AppOrder{cp_order_id: ^cp_order_id} = order ->
                  conn |> json(%{success: true})

              %AppOrder{} = order ->
                Logger.error "receive cheat receipt, use #{transaction_id} for cp_order: #{cp_order_id} & #{order.cp_order_id}"
                ChaoxinNotifier.send_text_msg(app, "[#{app.name}] 收到用户#{inspect user}的作弊收条, 购买商品: #{goods_name}")
                conn |> json(%{success: false, reason: "cheat", message: "cheat receipt"})

              nil ->
                app_user = case params["zone_id"] do 
                             nil -> nil
                             zone_id ->
                               Repo.get_by(AppUser, app_id: app.id, user_id: user.id, zone_id: zone_id)
                            end

                order_info = %{
                  id: Utils.generate_token(16),
                  app_id: app.id, 
                  user_id: user.id, 
                  app_user_id: app_user && app_user.id,
                  zone_id: params["zone_id"],
                  platform: "ios",
                  device_id: device_id,
                  sdk: "firevale",
                  cp_order_id: cp_order_id, 
                  status: AppOrder.Status.paid(),
                  price: String.to_integer(amount),
                  fee:  case receipt_type do 
                          "ProductionSandbox" -> 0
                          _ -> String.to_integer(amount)
                        end,
                  paid_channel: "applestore",
                  created_at: :calendar.local_time |> NaiveDateTime.from_erl!,
                  paid_at: :calendar.local_time |> NaiveDateTime.from_erl!,
                  market: "applestore",
                  currency: app.currency,
                  goods_id: goods_id,
                  goods_name: goods_name,
                  transaction_id: "applestore." <> transaction_id,
                  transaction_currency: currency,
                  transaction_status: "FINISHED",
                  debug_mode: receipt_type == "ProductionSandbox",
                }

                order_info = case Repo.get_by(AppUser, app_id: app.id, user_id: user.id) do 
                              nil -> order_info 
                              %AppUser{id: app_user_id} -> %{order_info | app_user_id: app_user_id}
                            end

                AppOrder.changeset(%AppOrder{}, order_info) |> Repo.insert!

                conn |> json(%{success: true})
            end

          {:ok, x} -> 
            Logger.error "receive cheat receipt, apple response: #{inspect x, pretty: true}"
            conn |> json(%{success: false, reason: "cheat", message: "cheat receipt"})
          
          {:error, reason} ->
            conn |> json(%{success: false, reason: reason})
        end
      _ -> 
        Logger.error "product id for goods: #{goods_id}, sdk: applestore is not configured!"
        ChaoxinNotifier.send_text_msg(app, "[#{app.name}] 商品[#{goods_id}] 没有配置apple store product id")
        conn |> json(%{success: false, reason: "network", message: "product id not configured for goods: #{goods_id}, sdk: applestore"})
    end
  end
  def add_order(conn, params) do 
    d "acs_user: #{inspect conn.private[:acs_user], pretty: true}, params: #{inspect params, pretty: true}"
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

  def verify_and_deliver(%Plug.Conn{private: %{acs_user: %RedisUser{} = user,
                                               acs_app: %RedisApp{} = app,
                                               acs_zone_id: zone_id, 
                                               acs_platform: "ios",
                                               acs_device_id: device_id}} = conn, 
                %{"receipt" => receipt,
                  "transaction_id" => transaction_id,
                  "goods_id" => goods_id,
                  "price_in_cent" => amount,
                  "cp_order_id" => cp_order_id,
                  "currency_code" => currency} = params) do 
    case app.goods[goods_id |> String.to_atom] do 
      %{product_ids: %{applestore: product_id}, price: price, name: goods_name} -> 
        case SDKApple.verify_receipt(receipt) do 
          {:ok, %{product_id: ^product_id, transaction_id: ^transaction_id, receipt_type: receipt_type}} ->
            case Repo.get_by(AppOrder, transaction_id: "applestore." <> transaction_id) do 
              %AppOrder{cp_order_id: ^cp_order_id} = order ->
                if order.status > 0 do 
                  d "order already exists, deliver it"
                  PaymentHelper.notify_cp(order)
                  conn |> json(%{success: true})
                else 
                  Logger.error "order already delivered"
                  conn |> json(%{success: false, reason: "delivered"})
                end

              %AppOrder{} = order ->
                Logger.error "receive cheat receipt, use #{transaction_id} for cp_order: #{cp_order_id} & #{order.cp_order_id}"
                ChaoxinNotifier.send_text_msg(app, "[#{app.name}] 收到用户#{inspect user}的作弊收条, 购买商品: #{goods_name}")
                conn |> json(%{success: false, reason: "cheat", message: "cheat receipt"})

              nil ->
                app_user = Repo.get_by(AppUser, app_id: app.id, user_id: user.id, zone_id: zone_id)

                order_info = %{
                  id: Utils.generate_token(16),
                  app_id: app.id, 
                  user_id: user.id, 
                  app_user_id: app_user && app_user.id,
                  platform: "ios",
                  device_id: device_id,
                  sdk: "firevale",
                  cp_order_id: cp_order_id, 
                  status: AppOrder.Status.paid(),
                  price: String.to_integer(amount),
                  fee: case receipt_type do 
                          "ProductionSandbox" -> 0
                          _ -> String.to_integer(amount)
                        end,
                  paid_channel: "applestore",
                  created_at: :calendar.local_time |> NaiveDateTime.from_erl!,
                  paid_at: :calendar.local_time |> NaiveDateTime.from_erl!,
                  market: "applestore",
                  currency: app.currency,
                  goods_id: goods_id,
                  goods_name: goods_name,
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

          {:ok, x} -> 
            Logger.error "receive cheat receipt, apple response: #{inspect x, pretty: true}"
            ChaoxinNotifier.send_text_msg(app, "[#{app.name}] 收到用户#{inspect user}的作弊收条:#{inspect x}, 购买商品: #{goods_name}")
            conn |> json(%{success: false, reason: "cheat", message: "cheat receipt"})
          
          {:error, reason} ->
            conn |> json(%{success: false, reason: reason})
        end

      _ -> 
        Logger.error "product id for goods: #{goods_id}, sdk: applestore is not configured!"
        ChaoxinNotifier.send_text_msg(app, "[#{app.name}] 商品[#{goods_id}] 没有配置apple store product id")
        # set reason to network force client don't finish transaction 
        conn |> json(%{success: false, reason: "network", message: "product id not configured for goods: #{goods_id}, sdk: applestore"})
    end
  end

end