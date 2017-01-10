defmodule ImportFvacModel do 

  require Redis
  require Utils

  alias   Acs.App
  alias   Acs.AppSdkBinding
  alias   Acs.AppGoods
  alias   Acs.AppGoodsProductId
  # alias   Utils.JSON
  # alias   Acs.RedisApp

  # import  Ecto
  # import  Ecto.Changeset
  # import  Ecto.Query

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
    end)  
  end

end