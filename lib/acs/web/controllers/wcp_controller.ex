defmodule Acs.Web.WcpController do
  use Acs.Web, :controller

  def on_receive_message(conn, params) do 
    conn |> text ""
  end
end