defmodule Acs.PageController do
  use     Acs.Web, :controller

  plug :fetch_app_id
  plug :fetch_locale

  def index(conn, _params) do
    render conn, "index.html"
  end

  @sm_provider                  Application.get_env(:acs, :sm_provider)
  @is_mobile_account_supported  not (is_nil(@sm_provider) || @sm_provider == :none)

  def show_login_page(%Plug.Conn{private: %{acs_browser: browser, 
                                            acs_platform: platform}} = conn,
             params) do 
               
    decoded_redirect_url = case params["redirect_url"] do 
                              nil -> "/"
                              "" -> "/"
                              v -> v |> Base.url_decode64!
                            end

    locale = case conn.private[:acs_locale] do 
               nil -> "zh-hans"
               _ -> "zh-hans"
             end

    browser = case Mix.env do 
                :dev -> 
                  case params["browser"] do 
                    nil -> browser 
                    x -> x
                  end
                _ -> browser
              end

    conn |> put_layout(false) 
         |> put_session(:locale, locale)
         |> render("login.html", redirect_url: decoded_redirect_url, 
                                 browser: browser,
                                 platform: platform,
                                 locale: locale,
                                 is_mobile_account_supported: @is_mobile_account_supported)
  end

  def show_admin_page(conn, params) do
    conn |> put_layout(false) |> render("admin.html")
  end

  def show_forum_page(%Plug.Conn{private: %{acs_browser: browser, 
                                            acs_platform: platform}} = conn,
             params) do
    decoded_redirect_url = case params["redirect_url"] do 
                              nil -> "/"
                              "" -> "/"
                              v -> v |> Base.url_decode64!
                            end

    locale = case conn.private[:acs_locale] do 
               nil -> "zh-hans"
               _ -> "zh-hans"
             end

    browser = case Mix.env do 
                :dev -> 
                  case params["browser"] do 
                    nil -> browser 
                    x -> x
                  end
                _ -> browser
              end

    conn |> put_layout(false) 
         |> put_session(:locale, locale)
         |> render("forum.html", redirect_url: decoded_redirect_url, 
                                 browser: browser,
                                 platform: platform,
                                 locale: locale,
                                 is_mobile_account_supported: @is_mobile_account_supported)
  end

end
