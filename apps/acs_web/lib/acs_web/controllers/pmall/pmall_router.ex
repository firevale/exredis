defmodule AcsWeb.PMallRouter do
  use AcsWeb, :router

  scope "/", AcsWeb do
    pipe_through :pmall

    post   "/get_user_info", PMallController, :get_user_info
    post   "/list_my_points", PMallController, :list_my_points
    post   "/list_my_exchanges", PMallController, :list_my_exchanges
  end

end
