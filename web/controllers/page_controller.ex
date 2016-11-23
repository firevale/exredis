defmodule Acs.PageController do
  use     Acs.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end

  @sm_provider      Application.get_env(:acs, :sm_provider)

  def login(%Plug.Conn{private: %{acs_channel: channel}} = conn, params) do 
    decoded_redirect_url = case params["redirect_url"] do 
                              nil -> "/"
                              "" -> "/"
                              v -> v |> Base.url_decode64!
                            end

    conn |> put_layout(false) 
         |> render("login.html", redirect_url: decoded_redirect_url, 
                                 channel: channel,
                                 isMobileRegisterSupported: not is_nil(@sm_provider))
  end
end
