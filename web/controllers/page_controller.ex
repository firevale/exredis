defmodule Acs.PageController do
  use     Acs.Web, :controller
  require Logger

  def index(conn, _params) do
    render conn, "index.html"
  end
end
