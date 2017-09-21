defmodule AcsWeb.PMallRouter do
  use AcsWeb, :router

  scope "/", AcsWeb do
    pipe_through :pmall

    post   "/list_index", PMallController, :list_index
    post   "/list_goods", PMallController, :list_goodsa
    post   "/get_goods_detail", PMallController, :get_goods_detail
    post   "/get_user_info", PMallController, :get_user_info
    post   "/list_my_points", PMallController, :list_my_points
    post   "/list_my_exchanges", PMallController, :list_my_exchanges
    post   "/bind_mobile", PMallController, :bind_mobile
    post   "/sign", PMallController, :sign
  end

end
