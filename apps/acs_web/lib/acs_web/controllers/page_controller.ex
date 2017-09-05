defmodule AcsWeb.PageController do
  use AcsWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
