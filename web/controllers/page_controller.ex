defmodule Acs.PageController do
  use     Acs.Web, :controller

  plug :fetch_user
  plug :fetch_app_id
  plug :fetch_app

  def index(conn, _params) do
    render conn, "index.html"
  end

  @sm_provider                  Application.get_env(:acs, :sm_provider)
  @is_mobile_account_supported  not (is_nil(@sm_provider) || @sm_provider == :none)

  # TODO: refactor this module, loclae/browser etc,

  def show_login_page(%Plug.Conn{private: %{acs_browser: browser, 
                                            acs_platform: platform}} = conn,
             params) do 
    
    d "show login page for app: #{conn.private[:acs_app_id]}"
               
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

    body_class = case platform do 
                  "wp8" -> "wp8 in-app"
                  "ios" -> 
                    case browser do 
                      "webview" -> "ios in-app"
                      _ -> "ios"
                    end
                  "android" -> 
                    case browser do 
                      "webview" -> "android in-app"
                      _ -> "android"
                    end
                  _ -> ""
                end

    conn |> put_layout(false) 
         |> put_session(:locale, locale)
         |> render("login.html", redirect_url: decoded_redirect_url, 
                                 browser: browser,
                                 platform: platform,
                                 body_class: body_class,
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

  # 兼容旧版本
  def show_payment_page(%Plug.Conn{private: %{acs_browser: browser, 
                                              acs_app: app,
                                              acs_user: user,
                                              acs_platform: platform}} = conn,
             %{
               "order_id" => cp_order_id,
               "goods_id" => goods_id,
               "price" => price
             } = params) do

    zone_id = params["zone_id"] || "1"

    app_user = Repo.get_by(AppUser, app_id: app.id, user_id: user.id, zone_id: zone_id) 

    app_order = case Repo.get_by(AppOrder, app_id: app.id, cp_order_id: cp_order_id) do 
      nil ->
        order_info = %{
          id: Utils.generate_token(16),
          app_id: app.id, 
          user_id: user.id, 
          platform: platform,
          app_user_id: app_user && app_user.id,
          zone_id: zone_id,
          sdk: params["sdk"] || "firevale",
          cp_order_id: cp_order_id, 
          status: AppOrder.Status.created,
          price: price,
          debug_mode: params["debug_mode"] == "true",
          fee: case params["debug_mode"] do 
                "true" -> 0
                _ -> params["price_in_cent"] || 0
              end,  
          currency: app.currency,
          market: params["market"],
          transaction_id: "empty." <> Utils.generate_token(32),
          transaction_currency: params["currency_code"] || params["currency"] || "CNY", 
          transaction_status: "UNKNOWN",
          goods_id: params["goods_id"],
          goods_name: params["goods_name"] || params["goods_id"],
        }

        AppOrder.changeset(%AppOrder{}, order_info) |> Repo.insert!    
      %AppOrder{} = x -> x
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
         |> render("payment.html", browser: browser,
                                   platform: platform,
                                   order_id: app_order.id,
                                   goods_name: app_order.goods_name,
                                   price: price,
                                   currency: app_order.currency,
                                   locale: locale)
  end

  # 新版本
  def show_payment_page(%Plug.Conn{private: %{acs_browser: browser, 
                                              acs_access_token: access_token,
                                              acs_platform: platform}} = conn,
             %{
               "order_id" => order_id,
               "version" => "3"
             } = params) do

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
         |> render("payment.html", browser: browser,
                                   order_id: order_id,
                                   platform: platform,
                                   locale: locale)
  end

  # callback from alipay
  def show_payment_page(%Plug.Conn{private: %{acs_browser: browser}} = conn, 
                        %{"out_trade_no" => order_id} = params) do 
    show_payment_page_by_order_id(conn, order_id)
  end
  # merchant url back from alipay
  def show_payment_page(%Plug.Conn{private: %{acs_browser: browser}} = conn, 
                        %{"merchant_order_id" => order_id} = params) do 
    show_payment_page_by_order_id(conn, order_id)
  end
  def show_payment_page(conn, params) do 
    conn |> put_resp_content_type("application/json")
         |> send_resp(500, JSON.encode!(%{success: false, message: "bad request params"}))
         |> halt()
  end

  defp show_payment_page_by_order_id(%Plug.Conn{private: %{acs_browser: browser}} = conn, order_id) do 
    case Repo.get(AppOrder, order_id) do 
      nil ->
        conn |> put_resp_content_type("application/json")
             |> send_resp(500, JSON.encode!(%{success: false, message: "bad request params"}))
             |> halt()

      %AppOrder{} = app_order ->
        conn |> put_layout(false) 
             |> render("payment.html", browser: browser,
                                       platform: app_order.platform,
                                       app_id: app_order.app_id,
                                       order_id: app_order.id,
                                       goods_name: app_order.goods_name,
                                       price: app_order.price,
                                       currency: app_order.currency,
                                       locale: get_session(conn, :locale))        
    end
  end

  # NOTE: 兼容旧版本SDK
  def show_native_bridge(conn, params) do 
    conn |> put_layout(false)
         |> render("native_bridge.html", platform: params["platform"])
  end

end
