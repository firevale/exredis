defmodule AcsWeb.PMallRouter do
  use AcsWeb, :router

  scope "/", AcsWeb do
    pipe_through :pmall

    post   "/get_user_info", PMallController, :get_user_info
    
  end

end
