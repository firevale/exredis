defmodule AcsWeb.MallRouter do
  use AcsWeb, :router

  scope "/", AcsWeb do
    pipe_through :mall

    get  "/list_malls", MallController, :list_malls
    get  "/get_mall_info", MallController, :get_mall_info
    post "/get_mall_info", MallController, :get_mall_info
    post "/get_mall_detail", MallController, :get_mall_detail

    post "/get_active_goods_paged", MallController, :get_active_goods_paged
    post "/get_mall_goods_detail", MallController, :get_mall_goods_detail
    post "/list_mall_goods", MallController, :list_mall_goods
    post "/get_user_addresses", MallController, :get_user_addresses
    post "/delete_address", MallController, :delete_address
    post "/set_default_address", MallController, :set_default_address
    post "/get_address_detail", MallController,  :get_address_detail
    post "/update_address", MallController,  :update_address
    post "/insert_address", MallController,  :insert_address
    post "/get_default_address", MallController, :get_default_address

    post "/create_mall_order", MallOrderController, :create_mall_order
    post "/list_mall_orders", MallOrderController, :list_mall_orders
    post "/get_mall_order", MallOrderController, :get_mall_order
    post "/fetch_my_orders", MallOrderController, :fetch_my_orders
    post "/confirm_recieved", MallOrderController, :confirm_recieved

    post "/get_goods_stock", MallController, :get_goods_stock
  end

end
