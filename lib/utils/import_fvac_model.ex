defmodule ImportFvacModel do 

  require Redis
  require Utils

  alias   Utils.JSON
  alias   Acs.App
  alias   Acs.AppSdkBinding
  alias   Acs.AppGoods
  alias   Acs.AppGoodsProductId
  alias   Acs.User
  alias   Acs.UserSdkBinding 

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



end