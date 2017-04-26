defmodule Acs.MallRouter do
  use Acs.Web, :router
  use LogAlias

  import  Acs.Plugs

  pipeline :mall do
    plug :accepts, ["json"]
    plug :fetch_session
    plug :parse_user_agent
    plug :fetch_user_id
    plug :fetch_locale
    # plug :fetch_access_token
  end

  scope "/", Acs do
    pipe_through :mall

    get   "/fetch_malls", MallController, :fetch_malls
    post  "/update_mall_icon", MallController, :update_mall_icon
    post  "/update_mall_info", MallController, :update_mall_info
    post  "/fetch_goods", MallController, :fetch_goods
    post  "/update_goods_pic", MallController, :update_goods_pic
    post  "/update_goods_content_pic", MallController, :update_goods_content_pic
    post  "/update_goods", MallController, :update_goods
    post  "/delete_goods", MallController, :delete_goods
    post  "/toggle_goods_status", MallController, :toggle_goods_status

    get  "/get_mall_info", MallController, :get_mall_info
    post "/get_mall_info", MallController, :get_mall_info
    post "/get_active_goods_paged", MallController, :get_active_goods_paged

    post "/get_mall_detail", MallController, :get_mall_detail
    post "/get_goods_detail", MallController, :get_goods_detail

    post "/get_user_addresses", MallController, :get_user_addresses
    post "/delete_address", MallController, :delete_address
    post "/set_default_address", MallController, :set_default_address
    post "/get_address_detail", MallController,  :get_address_detail
    post "/update_address", MallController,  :update_address
    post "/insert_address", MallController,  :insert_address
    post "/get_default_address", MallController, :get_default_address

    post "/create_mall_order", MallOrderController, :create_mall_order
    
    post "/fetch_order_list", MallOrderController, :fetch_order_list
    post "/fetch_order", MallOrderController, :fetch_order
    post "/fetch_my_orders", MallOrderController, :fetch_my_orders
    post "/refund_order", MallOrderController, :refund_order
    post "/update_order_payed", MallOrderController, :update_order_payed

    post "/get_goods_stock", MallController, :get_goods_stock
  end

end
