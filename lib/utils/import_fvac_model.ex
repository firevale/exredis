defmodule ImportFvacModel do 

  use     Timex

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
  alias   Acs.Device
  alias   Acs.AppDevice
  alias   Acs.AppUser
  alias   Acs.AppUserDailyActivity

  alias   Acs.RedisApp
  alias   Acs.RedisUser


  import  Ecto
  import  Ecto.Query
  alias   Ecto.Adapters.SQL
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

    if max_user_id > min_user_id do 
      IO.puts "import users from #{min_user_id + 1} to #{max_user_id}"

      ((min_user_id + 1) .. max_user_id) |> Enum.each(fn(user_id) -> 
        if rem(user_id, 1000) == 0 do 
          IO.puts "import user: #{user_id}"
        end
        import_user(user_id)
      end)
    else 
      IO.puts "no users to be imported"
    end
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

          {:error, %{errors: [device_id: error]}} ->
            case Repo.get_by(User, device_id: device_id) do 
              nil ->
                IO.puts "user device #{inspect user, pretty: true} is existing, not imported"
              %User{} = u ->
                Repo.delete(u)
                import_user(user_id)
            end

        end
    end
  end

  def import_all_orders(from_date) do 
    response = Httpc.post_json("http://10.10.134.58:9200/payment/orders/_search?search_type=scan&scroll=1m&size=100&pretty=true", %{
      query: %{ range: %{
        created_at: %{
          gt: from_date
        }
      } }
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
    [created_at_iso8601 | _] = String.split(order[:created_at], "+")
    created_at_naive = NaiveDateTime.from_iso8601!(created_at_iso8601)

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
                    v -> v.id 
                  end
               end

    user_id = case order.user_id do 
                "g" <> _ -> nil
                "" -> nil
                _ -> 
                  case Repo.get(User, order.user_id) do 
                    nil -> nil 
                    _ -> order.user_id
                  end
              end

    unless is_nil(user_id) do 
      app_user_id = case Repo.get_by(AppUser, app_id: order[:client_id], user_id: user_id, zone_id: "0") do 
                     nil -> nil
                     %{id: id} -> id
                    end  

      AppOrder.changeset(%AppOrder{}, %{
        id: id,
        platform: order[:platform],
        device_id: order[:device_id],
        sdk: order[:sdk],
        sdk_user_id: order[:sdk_user_id],
        cp_order_id: order[:cp_order_id],
        zone_id: to_string(order[:zone_id]),
        market: order[:market],
        status: case order[:status] do 
                  "delivered" -> AppOrder.Status.delivered()
                  "paid" -> AppOrder.Status.paid()
                  _ -> AppOrder.Status.created()
                end,
        paid_at: paid_at_naive,
        created_at: created_at_naive,
        deliver_at: delivered_at_naive,
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
        user_id: user_id,
        app_user_id: app_user_id,
      }) |> Repo.insert!(on_conflict: :nothing)
    else 
      IO.puts "invalid user id, order not import: \n#{inspect order, pretty: true}"
    end
  end

  def import_all_devices(from_date) do 
    response = Httpc.post_json("http://10.10.134.58:9200/app_devices/_search?search_type=scan&scroll=1m&size=100&pretty=true", %{
      query: %{ range: %{
        created_at: %{
          gt: from_date
        }
      } }
    })

    if Httpc.success?(response) do 
      case JSON.decode(response.body, keys: :atoms) do 
        {:ok, %{ _scroll_id: scroll_id}} ->
          import_scroll_devices(scroll_id)
        _ ->
          IO.puts "create cursor failed: #{inspect response.body}"
      end
    else 
      IO.puts "create scroll cursor failed..."
    end
  end

  def import_scroll_devices(scroll_id) do 
    response = Httpc.post("http://10.10.134.58:9200/_search/scroll?scroll=1m&pretty=true", body: scroll_id)

    if Httpc.success?(response) do 
      case JSON.decode(response.body, keys: :atoms) do 
        {:ok, %{ _scroll_id: res_scroll_id, hits: %{hits: []}}} ->
          Httpc.delete("http://10.10.134.58:9200/_search/scroll/_all")
          IO.puts "all devices imported"
        {:ok, %{ _scroll_id: res_scroll_id, hits: %{hits: devices}}} ->
          devices |> Enum.each(&(import_device(&1)))
          import_scroll_devices(res_scroll_id)
          :timer.sleep(1)
        _ ->
          IO.puts "fetch scroll_id: #{scroll_id} content failed: #{inspect response.body}"
      end
    else 
      IO.puts "fetch scroll_id: #{scroll_id} content failed"
    end
  end

  def import_device(%{_id: device_id, _type: app_id, _source: app_device_info}) do 
    [created_at_iso8601 | _] = String.split(app_device_info[:reg_date], "+")
    created_at_naive = NaiveDateTime.from_iso8601!(created_at_iso8601)

    Device.changeset(%Device{}, %{
      id: device_id,
      model: app_device_info[:model],
      platform: app_device_info[:platform],
      created_at: created_at_naive,
    }) |> Repo.insert!(on_conflict: :nothing)

    app = case Process.get({:app, app_id}) do 
            nil ->
              x = RedisApp.find(app_id)
              Process.put({:app, app_id}, x)
              x
            v -> v
          end

    unless is_nil(app) do 
      [created_at_iso8601 | _] = String.split(app_device_info[:reg_date], "+")
      created_at_naive = NaiveDateTime.from_iso8601!(created_at_iso8601)      

      [last_active_at_iso8601 | _] = String.split(app_device_info[:last_active_at], "+")
      last_active_at_naive = NaiveDateTime.from_iso8601!(last_active_at_iso8601)      

      [reg_date_iso8601 | _] = String.split(app_device_info[:reg_date], "T")
      reg_date = Date.from_iso8601!(reg_date_iso8601)   

      last_paid_at_naive = case app_device_info[:last_paid_at] do 
                             "1900-01-01T00:00:00+0800" -> nil
                             "" -> nil
                             nil -> nil
                             x ->
                              [xx | _] = String.split(x, "+")
                              NaiveDateTime.from_iso8601!(xx)
                            end

      AppDevice.changeset(%AppDevice{}, %{
        pay_amount: app_device_info[:amount],
        last_active_at: last_active_at_naive,
        reg_date: reg_date,
        created_at: created_at_naive,
        last_paid_at: last_paid_at_naive,
        app_id: app_id, 
        device_id: device_id,
        zone_id: "0"
      }) |> Repo.insert!(on_conflict: :nothing)                       
    end
  end

  def import_all_app_users(from_date) do 
    response = Httpc.post_json("http://10.10.134.58:9200/app_users/_search?search_type=scan&scroll=1m&size=100&pretty=true", %{
      query: %{ range: %{
        created_at: %{
          gt: from_date
        }
      } }
    })

    if Httpc.success?(response) do 
      case JSON.decode(response.body, keys: :atoms) do 
        {:ok, %{ _scroll_id: scroll_id}} ->
          import_scroll_app_users(scroll_id)
        _ ->
          IO.puts "create cursor failed: #{inspect response.body}"
      end
    else 
      IO.puts "create scroll cursor failed..."
    end
  end

  def import_scroll_app_users(scroll_id) do 
    response = Httpc.post("http://10.10.134.58:9200/_search/scroll?scroll=1m&pretty=true", body: scroll_id)

    if Httpc.success?(response) do 
      case JSON.decode(response.body, keys: :atoms) do 
        {:ok, %{ _scroll_id: res_scroll_id, hits: %{hits: []}}} ->
          Httpc.delete("http://10.10.134.58:9200/_search/scroll/_all")
          IO.puts "all app users imported"
        {:ok, %{ _scroll_id: res_scroll_id, hits: %{hits: app_users}}} ->
          app_users |> Enum.each(&(import_app_user(&1)))
          import_scroll_app_users(res_scroll_id)
          :timer.sleep(1)
        _ ->
          IO.puts "fetch scroll_id: #{scroll_id} content failed: #{inspect response.body}"
      end
    else 
      IO.puts "fetch scroll_id: #{scroll_id} content failed"
    end
  end

  def import_app_user(%{_id: user_id, _type: app_id, _source: app_user_info} = x) do 
    app = case Process.get({:app, app_id}) do 
            nil ->
              x = RedisApp.find(app_id)
              Process.put({:app, app_id}, x)
              x
            v -> v
          end

    user_exists = case user_id do 
                    "g" <> _ -> false
                    "" -> false
                    _ -> 
                      case Repo.get(User, user_id) do 
                        nil -> false 
                        _ -> true
                      end
                  end

    if !is_nil(app) and user_exists do 
      [created_at_iso8601 | _] = String.split(app_user_info[:reg_date], "+")
      created_at_naive = NaiveDateTime.from_iso8601!(created_at_iso8601)      

      [last_active_at_iso8601 | _] = String.split(app_user_info[:last_active_at], "+")
      last_active_at_naive = NaiveDateTime.from_iso8601!(last_active_at_iso8601)      

      [reg_date_iso8601 | _] = String.split(app_user_info[:reg_date], "T")
      reg_date = Date.from_iso8601!(reg_date_iso8601)   

      last_paid_at_naive = case app_user_info[:last_paid_at] do 
                             "1900-01-01T00:00:00+0800" -> nil
                             "" -> nil
                             nil -> nil
                             x ->
                              [xx | _] = String.split(x, "+")
                              NaiveDateTime.from_iso8601!(xx)
                            end

      AppUser.changeset(%AppUser{}, %{
        app_user_id: app_user_info[:app_user_id],
        app_user_name: app_user_info[:app_user_name],
        pay_amount: app_user_info[:amount],
        last_active_at: last_active_at_naive,
        reg_date: reg_date,
        created_at: created_at_naive,
        last_paid_at: last_paid_at_naive,
        app_id: app_id, 
        user_id: user_id,
        zone_id: "0"
      }) |> Repo.insert!(on_conflict: :nothing)                       
    end
  end

  def import_all_app_user_activities() do 
    from = ~D[2015-01-01]
    days = Timex.diff(Timex.today(), from, :days)

    SQL.query(Repo, "update app_users set active_seconds = 0")

    (0 .. days) |> Enum.each(fn(duration) ->
      date = Timex.add(from, Duration.from_days(duration)) |> Timex.format!("{YYYY}-{0M}-{0D}")
      response = Httpc.head("http://10.10.134.58:9200/app_users_#{date}")

      if Httpc.success?(response) do 
        response = Httpc.post_json("http://10.10.134.58:9200/app_users_#{date}/_search?search_type=scan&scroll=1m&size=100&pretty=true", %{
          query: %{match_all: %{}}
        })        

        if Httpc.success?(response) do 
          case JSON.decode(response.body, keys: :atoms) do 
            {:ok, %{ _scroll_id: scroll_id}} ->
              import_scroll_app_user_activities(scroll_id)
            _ ->
              IO.puts "create cursor failed: #{inspect response.body}"
          end
        else 
          IO.puts "create scroll cursor failed..."
        end
      else
        IO.puts "index[app_users_#{date}] not exists"
      end
    end)
  end

  def import_scroll_app_user_activities(scroll_id) do 
    response = Httpc.post("http://10.10.134.58:9200/_search/scroll?scroll=1m&pretty=true", body: scroll_id)

    if Httpc.success?(response) do 
      case JSON.decode(response.body, keys: :atoms) do 
        {:ok, %{ _scroll_id: res_scroll_id, hits: %{hits: []}}} ->
          Httpc.delete("http://10.10.134.58:9200/_search/scroll/_all")
          IO.puts "all app user activities imported"
        {:ok, %{ _scroll_id: res_scroll_id, hits: %{hits: array}}} ->
          array |> Enum.each(&(import_app_user_activity(&1)))
          import_scroll_app_user_activities(res_scroll_id)
          :timer.sleep(1)
        _ ->
          IO.puts "fetch scroll_id: #{scroll_id} content failed: #{inspect response.body}"
      end
    else 
      IO.puts "fetch scroll_id: #{scroll_id} content failed"
    end  
  end

  def import_app_user_activity(%{_id: user_id, _type: app_id, _index: index, _source: %{
    active_counter: active_counter
  }}) do 
    case user_id do 
      "g" <> _ -> :ok
      _ ->
        case Repo.get_by(AppUser, app_id: app_id, user_id: user_id, zone_id: "0") do 
          nil ->
            IO.puts "app user not found for app_id: #{app_id}, user_id: #{user_id}"

          %AppUser{} = app_user ->
            ["app", "users", date] = String.split(index, "_", trim: true)
            AppUser.changeset(app_user, %{active_seconds: app_user.active_seconds + 300*active_counter}) |> Repo.update!
            AppUserDailyActivity.changeset(%AppUserDailyActivity{}, %{
              active_seconds: 300*active_counter,
              app_user_id: app_user.id,
              date: date
            }) |> Repo.insert!
        end
    end
  end


  def import_all() do 
    from_date = "2010-01-01 00:00:00"
    import_all_apps()
    import_all_users()
    import_all_devices(from_date)
    import_all_app_users(from_date)
    import_all_orders(from_date)
  end

  def import_latest() do 
    from_date = "2017-01-18 00:00:00"
    import_all_users()
    import_all_devices(from_date)
    import_all_app_users(from_date)
    import_all_orders(from_date)
  end

end