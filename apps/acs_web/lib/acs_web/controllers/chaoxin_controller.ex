defmodule AcsWeb.ChaoxinController do
  use     AcsWeb, :controller

  def receive_bot_msg(conn, _params) do
    conn |> text("ok")
  end

end
