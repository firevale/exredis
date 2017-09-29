defmodule AcsWeb.PMallRouter do
  use AcsWeb, :router

  scope "/", AcsWeb do
    pipe_through :pmall

    post   "/get_goods_detail", PMallController, :get_goods_detail
    post   "/list_my_point_logs", PMallController, :list_my_point_logs
    post   "/list_my_exchange_point_logs", PMallController, :list_my_exchange_point_logs
    post   "/exchange", PMallController, :exchange   
    post   "/take_award", PMallController, :take_award   
    post   "/update_address", PMallController, :update_address
    post   "/bind_mobile", PMallController, :bind_mobile
    post   "/get_sign_info", PMallController, :get_sign_info
    post   "/get_sign_users", PMallController, :get_sign_users
    post   "/sign", PMallController, :sign
    post   "/get_default_address", PMallController, :get_default_address
    post   "/insert_address", PMallController, :insert_address
    post   "/get_daily_question", PMallController, :get_daily_question
    post   "/answer_question", PMallController, :answer_question
    post   "/luck_draw", PMallController, :luck_draw
    post   "/update_draw_address", PMallController, :update_draw_address
    post   "/get_draw_info", PMallController, :get_draw_info
  end

end
