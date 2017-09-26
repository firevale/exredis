defmodule AcsWeb.PMallRouter do
  use AcsWeb, :router

  scope "/", AcsWeb do
    pipe_through :pmall

    post   "/list_index", PMallController, :list_index
    post   "/list_goods", PMallController, :list_goods
    post   "/get_goods_detail", PMallController, :get_goods_detail
    post   "/get_user_info", PMallController, :get_user_info
    post   "/list_my_points", PMallController, :list_my_points
    post   "/list_my_exchanges", PMallController, :list_my_exchanges
    post   "/exchange", PMallController, :exchange   
    post   "/take_award", PMallController, :take_award   
    post   "/update_address", PMallController, :update_address
    post   "/bind_mobile", PMallController, :bind_mobile
    post   "/get_sign_info", PMallController, :get_sign_info
    post   "/sign", PMallController, :sign
    post   "/insert_address", PMallController, :insert_address
    post   "/get_daily_question", PMallController, :get_daily_question
    post   "/answer_question", PMallController, :answer_question
    post   "/luck_draw", PMallController, :luck_draw
  end

end
