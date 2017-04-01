defmodule Acs.FVSdkView do
  use Acs.Web, :view

  alias Acs.RedisApp

  @custom_iap_config Application.get_env(:acs, :custom_iap, [])

  case @custom_iap_config[:ios] do 
    nil ->
      @ios_custom_iap false
      @ios_custom_iap_channels []
    false ->
      @ios_custom_iap false
      @ios_custom_iap_channels []
    channels ->
      @ios_custom_iap true
      @ios_custom_iap_channels channels 
  end

  case @custom_iap_config[:android] do 
    nil ->
      @android_custom_iap false
      @android_custom_iap_channels []
    false ->
      @android_custom_iap false
      @android_custom_iap_channels []
    channels ->
      @android_custom_iap true
      @android_custom_iap_channels channels 
  end

  def render("app_info.ios.3.json", %{app: %RedisApp{} = app, sdk: sdk}) do 
    goods = transform_goods(app.goods, sdk)
    %{success: true,
      use_custom_iap: @ios_custom_iap,
      supported_custom_iap_channels: @ios_custom_iap_channels,
      currency: app.currency,
      has_forum: app.has_forum,
      has_mall: app.has_mall,
      fb_app_id: case app.sdk_bindings[:facebook] do 
                   nil -> ""
                   %{app_id: app_id} -> app_id
                   _ -> "" 
                 end,
      goods: goods
     }
  end
  def render("app_info.android.3.json", %{app: %RedisApp{} = app, sdk: sdk}) do 
    goods = transform_goods(app.goods, sdk)
    %{success: true,
      use_custom_iap: @android_custom_iap,
      supported_custom_iap_channels: @android_custom_iap_channels,
      currency: app.currency,
      has_forum: app.has_forum, 
      has_mall: app.has_mall,
      fb_app_id: case app.sdk_bindings[:facebook] do 
                   nil -> ""
                   %{app_id: app_id} -> app_id
                   _ -> "" 
                 end,
      wechat_pay_info: case app.sdk_bindings[:wechat] do 
                         nil -> %{}
                         wechat_info = %{} -> 
                           wechat_info |> Map.drop([:app_secret,:signature,:partnerid]) 
                         _ -> %{}
                        end,
      goods: goods,
     }
  end

  def render("app_info.ios.json", %{app: %RedisApp{} = app}) do 
    %{
      success: true,
      use_custom_iap: @ios_custom_iap,
      supported_custom_iap_channels: @ios_custom_iap_channels,
      goods: transform_app_goods_old(app)      
    }
  end
  def render("app_info.android.json", %{app: %RedisApp{} = app}) do 
    %{
      success: true,
      use_custom_iap: @android_custom_iap,
      supported_custom_iap_channels: @android_custom_iap_channels,
      goods: transform_app_goods_old(app)     
    }
  end

  defp transform_goods(goods, sdk) do 
    goods |> Enum.map(fn({id, g}) ->
      {g.id, %{id: g.id,
               name: g.name,
               description: g.description || "",
               price: g.price,
               icon: g.icon || "",
               product_ids: g.product_ids,
               product_id: g.product_ids[sdk |> String.to_atom] || ""}}
    end) |> Enum.into(%{})
  end

  defp transform_app_goods_old(%RedisApp{} = app) do 
    app.goods |> Enum.map(fn({id, goods}) ->
      {id, %{id: id,
             currency: app.currency,
             name: goods.name,
             title: goods.description,
             price: goods.price,
             product_ids: goods.product_ids
             }}
    end) |> Enum.into(%{})
  end 
end
