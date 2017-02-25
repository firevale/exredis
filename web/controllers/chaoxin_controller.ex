defmodule Acs.ChaoxinController do
  use     Acs.Web, :controller

  def receive_bot_msg(conn, params) do
    conn |> text("ok")
  end

end
