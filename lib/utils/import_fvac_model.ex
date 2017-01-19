defmodule ImportFvacModel do 

  require Redis
  require Utils

  alias   Utils.JSON
  alias   Utils.Httpc
  alias   Acs.App
  alias   Acs.AppSdkBinding
  alias   Acs.AppGoods
  alias   Acs.AppGoodsProductId
  alias   Acs.User
  alias   Acs.UserSdkBinding 
  alias   Acs.AppOrder

  alias   Acs.RedisApp
  alias   Acs.RedisUser

  import  Ecto
  import  Ecto.Query

  alias   Acs.Repo

  def import_fvac_client(data) do 
    client = data |> Base.decode64! |> :erlang.binary_to_term

    Repo.transaction(fn -> 
      case Repo.get(App, client.id) do 
        nil ->
          App.changeset(%App{}, Map.from_struct(client)) |> Repo.insert!     
        %App{} = app ->
          App.changeset(app, Map.from_struct(client)) |> Repo.update!     
      end

      if Map.has_key?(client, :bindings) do 
        client.bindings |> Enum.each(fn({sdk, binding}) -> 
          sdk = case sdk do 
                  "ccplay" -> "cc"
                  x -> x
                end

          case Repo.get_by(AppSdkBinding, sdk: "#{sdk}", app_id: client.id) do 
            nil ->
              AppSdkBinding.changeset(%AppSdkBinding{}, %{app_id: client.id, sdk: "#{sdk}", binding: binding}) |> Repo.insert!
            x -> 
              AppSdkBinding.changeset(x, %{app_id: client.id, sdk: "#{sdk}", binding: binding}) |> Repo.update!
          end    
        end)
      end

      if Map.has_key?(client, :goods) do 
        client.goods |> Enum.each(fn({id, info}) -> 
          case Repo.get(AppGoods, id) do 
            nil ->
              AppGoods.changeset(%AppGoods{}, %{id: id, app_id: client.id, name: info.name, description: info.title, price: info.price}) |> Repo.insert!
            x ->
              AppGoods.changeset(x, %{name: info.name, description: info.title, price: info.price, app_id: client.id}) |> Repo.update!
          end  

          if not is_nil(info.product_ids) do 
            info.product_ids |> Enum.each(fn({sdk, product_id}) -> 
              sdk = case "#{sdk}" do 
                      "ccplay" -> "cc"
                      x -> x
                    end
                    
              case Repo.get_by(AppGoodsProductId, app_goods_id: id, sdk: sdk) do 
                nil ->
                  AppGoodsProductId.changeset(%AppGoodsProductId{}, %{sdk: sdk, product_id: product_id, app_goods_id: id}) |> Repo.insert!
                x ->
                  AppGoodsProductId.changeset(x, %{sdk: sdk, product_id: product_id, app_goods_id: id}) |> Repo.update!
              end               
            end)
          end
        end)
      end
    end)  
  end

  def import_all_apps() do 
    Redis.hvals("fvac.tables.clients") |> Enum.each(fn(data) -> 
      import_fvac_client(data)
    end)
  end

  def import_all_users() do 
    max_user_id = Redis.get("fvac.counter.uid") |> String.to_integer
    min_user_id = Repo.one(from user in Acs.User, select: max(user.id)) || 100_001 

    IO.puts "import users from #{min_user_id + 1} to #{max_user_id}"

    ((min_user_id + 1) .. max_user_id) |> Enum.each(fn(user_id) -> 
      if rem(user_id, 1000) == 0 do 
        IO.puts "import user: #{user_id}"
      end
      import_user(user_id)
    end)
  end

  def import_user(user_id) do 
    case Redis.hget("fvac.tables.users", user_id) do 
      :undefined -> :not_exists 
      raw ->
        user = JSON.decode!(raw, keys: :atoms) |> Map.delete(:__struct__) 

        case Repo.get_by(User, email: user[:email]) do 
          nil ->
            :ok
          old_user ->
            IO.puts "email: #{user[:email]} exists, delete old user #{inspect old_user, pretty: true}"
            Repo.delete!(old_user)
        end

        device_id = case user[:nickname] do 
                      "anonymous" -> user[:device_id]
                      _ -> nil
                    end

        case User.changeset(%User{}, %{
          id: user.id,
          email: String.downcase(user[:email]),
          encrypted_password: user[:encrypted_password],
          device_id: device_id,
          nickname: user[:nickname],
        }) |> Repo.insert do 

          {:ok, db_user} ->
            if Map.has_key?(user, :bindings) do 
              user.bindings |> Enum.each(fn({bkey, sdk_user_id}) -> 
                [sdk, app_id] = String.split(to_string(bkey), ".", trim: true)

                sdk = case sdk do 
                        "ccplay" -> "cc"
                        x -> x
                      end

                case UserSdkBinding.changeset(%UserSdkBinding{}, %{
                  user_id: user.id,
                  app_id: app_id,
                  sdk: sdk,
                  sdk_user_id: to_string(sdk_user_id)
                }) |> Repo.insert do 
                  {:ok, _} -> :ok
                  {:error, changeset} ->
                    IO.puts "insert user sdk binding failed: #{inspect changeset}"
                    Repo.delete!(db_user)
                end
              end)          
            end

          {:error, %{errors: [email: _ ]}} ->
            IO.puts "user email #{inspect user, pretty: true} is invalid, not imported"
        end
    end
  end

  def import_all_orders() do 
    response = Httpc.post_json("http://10.10.134.58:9200/payment/orders/_search?search_type=scan&scroll=1m&size=100&pretty=true", %{
      query: %{ match_all: %{} }
    })

    if Httpc.success?(response) do 
      case JSON.decode(response.body, keys: :atoms) do 
        {:ok, %{ _scroll_id: scroll_id}} ->
          import_scroll_orders(1, scroll_id)
        _ ->
          IO.puts "create cursor failed: #{inspect response.body}"
      end
    else 
      IO.puts "create scroll cursor failed..."
    end
  end

  def import_scroll_orders(n, scroll_id) do 
    response = Httpc.post("http://10.10.134.58:9200/_search/scroll?scroll=1m&pretty=true", body: scroll_id)

    IO.puts "import orders....#{n}"

    if Httpc.success?(response) do 
      case JSON.decode(response.body, keys: :atoms) do 
        {:ok, %{ _scroll_id: res_scroll_id, hits: %{hits: []}}} ->
          Httpc.delete("http://10.10.134.58:9200/_search/scroll/_all")
          IO.puts "all orders imported"
        {:ok, %{ _scroll_id: res_scroll_id, hits: %{hits: orders}}} ->
          orders |> Enum.each(&(import_order(&1)))
          import_scroll_orders(n+1, res_scroll_id)
          :timer.sleep(1)
        _ ->
          IO.puts "fetch scroll_id: #{scroll_id} content failed: #{inspect response.body}"
      end
    else 
      IO.puts "fetch scroll_id: #{scroll_id} content failed"
    end
  end

  def import_order(%{_id: id, _source: order}) do 
    [paid_at_iso8601 | _] = String.split(order[:paid_at], "+")
    paid_at_naive = NaiveDateTime.from_iso8601!(paid_at_iso8601)

    [delivered_at_iso8601 | _] = String.split(order[:delivered_at], "+")
    delivered_at_naive = NaiveDateTime.from_iso8601!(delivered_at_iso8601)

    [try_delivered_at_iso8601 | _] = String.split(order[:last_try_deliver_at], "+")
    try_delivered_at_naive = NaiveDateTime.from_iso8601!(try_delivered_at_iso8601)

    app = case Process.get({:app, order[:client_id]}) do 
            nil ->
              x = RedisApp.find(order[:client_id])
              Process.put({:app, order[:client_id]}, x)
              x
            v -> v
          end
    
    app_currency = case app do 
                     nil -> "CNY"
                     _ -> app.currency
                   end

    goods_id = case order[:goods_id] do 
                nil -> nil
                "" -> nil
                x -> 
                  case Process.get({:goods, x}) do 
                    nil ->
                      case Repo.get(AppGoods, x) do 
                        nil ->
                          Process.put({:goods, x}, :not_configured)
                          nil
                        y ->
                          Process.put({:goods, x}, y)
                          x
                      end
                    :not_configured -> nil
                    v -> v
                  end
               end

    user_id = case order.user_id do 
                "g" <> _ -> nil
                _ -> 
                  case RedisUser.find(String.to_integer(order.user_id)) do 
                    nil -> nil 
                    _ -> order.user_id
                  end
              end

    IO.puts "import order [#{id}]"

    AppOrder.changeset(%AppOrder{}, %{
      id: id,
      platform: order[:platform],
      device_id: order[:device_id],
      sdk: order[:sdk],
      sdk_user_id: order[:sdk_user_id],
      cp_order_id: order[:cp_order_id],
      zone_id: order[:zone_id],
      market: order[:market],
      status: case order[:status] do 
                "delivered" -> AppOrder.Status.delivered()
                "paid" -> AppOrder.Status.paid()
                _ -> AppOrder.Status.created()
              end,
      paid_at: paid_at_naive,
      delivered_at: delivered_at_naive,
      try_delivered_at: try_delivered_at_naive,
      price: order[:price],
      currency: app_currency,
      goods_name: order[:goods_name],
      goods_id: goods_id,
      paid_channel: order[:paid_channel],
      debug_mode: order[:debug_mode] || false,
      fee: order[:total_fee],
      transaction_currency: order[:trade_currency],
      transaction_id: order[:trade_no],
      transaction_status: order[:trade_status],
      app_id: order[:client_id],
      user_id: user_id
    }) |> Repo.insert!(on_conflict: :nothing)
  end



end