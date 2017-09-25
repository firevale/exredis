defmodule AcsWeb.FVSdkView do
  use AcsWeb, :view

  alias Acs.Apps
  alias Acs.Apps.App

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

  def render("app_info.ios.3.json", %{app: nil, sdk: sdk}) do 
    %{success: false,
      message: "application not found"
     }
  end
  def render("app_info.ios.3.json", %{app: %App{} = app, sdk: sdk}) do 
    %{success: true,
      use_custom_iap: @ios_custom_iap,
      supported_custom_iap_channels: @ios_custom_iap_channels,
      currency: app.currency,
      has_forum: app.has_forum,
      has_mall: app.has_mall,
      has_pmall: app.has_pmall,
      fb_app_id: 
        case Apps.get_app_sdk_binding(app.id, "facebook") do 
          nil -> ""
          %{binding: %{app_id: facebook_app_id}} -> facebook_app_id
          _ -> ""
        end,
      goods: transform_goods(app.goods, sdk)
     }
  end
  def render("app_info.android.3.json", %{app: nil, sdk: sdk}) do 
    %{success: false,
      message: "application not found"
     }
  end
  def render("app_info.android.3.json", %{app: %App{} = app, sdk: sdk}) do 
    %{success: true,
      use_custom_iap: @android_custom_iap,
      supported_custom_iap_channels: @android_custom_iap_channels,
      currency: app.currency,
      has_forum: app.has_forum, 
      has_mall: app.has_mall,
      has_pmall: app.has_pmall,
      fb_app_id:         
        case Apps.get_app_sdk_binding(app.id, "facebook") do 
          nil -> ""
          %{binding: %{app_id: facebook_app_id}} -> facebook_app_id
          _ -> ""
        end,
      wechat_pay_info: 
        case Apps.get_app_sdk_binding(app.id, "wechat") do 
          nil -> ""
          %{binding: binding} -> Map.drop(binding, [:app_secret, :signature, :partnerid])
          _ -> ""
        end,
      goods: transform_goods(app.goods, sdk),
     }
  end

  def render("app_info.ios.json", %{app: nil}) do 
    %{success: false,
      message: "application not found"
     }
  end
  def render("app_info.ios.json", %{app: %App{} = app}) do 
    %{
      success: true,
      use_custom_iap: @ios_custom_iap,
      supported_custom_iap_channels: @ios_custom_iap_channels,
      goods: transform_app_goods_old(app)      
    }
  end
  def render("app_info.android.json", %{app: nil}) do 
    %{success: false,
      message: "application not found"
     }
  end
  def render("app_info.android.json", %{app: %App{} = app}) do 
    %{
      success: true,
      use_custom_iap: @android_custom_iap,
      supported_custom_iap_channels: @android_custom_iap_channels,
      goods: transform_app_goods_old(app)     
    }
  end

  defp transform_goods(goods, sdk) do 
    goods |> Enum.map(fn(g) ->
      product_id = case g.product_ids |> Enum.filter(&( &1.sdk == sdk )) do 
        [] -> ""
        [x | _] -> x.product_id
      end
      {g.id, %{id: g.id,
               name: g.name,
               description: g.description || "",
               price: g.price,
               icon: g.icon || "",
               product_id: product_id}}
    end) |> Enum.into(%{})
  end

  defp transform_app_goods_old(%App{} = app) do 
    app.goods |> Enum.map(fn(g) ->
      {g.id, %{id: g.id,
             currency: app.currency,
             name: g.name,
             title: g.description,
             price: g.price,
             product_ids: g.product_ids
             }}
    end) |> Enum.into(%{})
  end 
end
