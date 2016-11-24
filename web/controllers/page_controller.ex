defmodule Acs.PageController do
  use     Acs.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end

  @sm_provider      Application.get_env(:acs, :sm_provider)

  def show_login_page(%Plug.Conn{private: %{acs_browser: browser, 
                                            acs_platform: platform}} = conn,
             params) do 
    decoded_redirect_url = case params["redirect_url"] do 
                              nil -> "/"
                              "" -> "/"
                              v -> v |> Base.url_decode64!
                            end

   locale = case params["locale"] || params["lang"] do 
              nil -> "zh-hans"
              _ -> "zh-hans"
            end

    conn |> put_layout(false) 
         |> render("login.html", redirect_url: decoded_redirect_url, 
                                 browser: browser,
                                 platform: platform,
                                 locale: locale,
                                 isMobileRegisterSupported: not is_nil(@sm_provider))
  end

  def show_admin_page(conn, params) do
    conn |> put_layout(false) |> render("admin.html")
  end

end
