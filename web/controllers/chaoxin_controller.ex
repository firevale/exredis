defmodule Acs.ChaoxinController do
  use     Acs.Web, :controller

  def receive_bot_msg(conn, _params) do
    conn |> text("ok")
  end

end
