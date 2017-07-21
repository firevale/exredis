defmodule Acs.Web.PageController do
  use     Acs.Web, :controller

  plug :fetch_user
  plug :fetch_app_id
  plug :fetch_app
  plug :fetch_access_token
  plug :fetch_session_user_id
  plug :fetch_session_user
  plug :fetch_zone_id
  plug :fetch_body_class
  plug :check_is_admin when action in  [:show_admin_page, :show_admin_app_page]
  plug :check_admin_authorization, [admin_level: 2] when action == :show_admin_app_page
  plug :check_forum_manager when action == :show_forum_page

  @sm_provider                  Application.get_env(:acs, :sm_provider)
  @is_mobile_account_supported  not (is_nil(@sm_provider) || @sm_provider == :none)

  def index(conn, _params) do
    conn |> redirect(to: "/forum")
  end

  # 用户登录
  def show_login_page(conn, params) do
    redirect_uri = case params["redirect_uri"] do
                     nil -> "/"
                     "" -> "/"
                     v -> v |> Base.url_decode64!
                   end

    conn |> put_layout(:login)
         |> put_session(:locale, conn.private[:acs_locale])
         |> render("login.html", redirect_uri: redirect_uri,
                                 is_mobile_account_supported: @is_mobile_account_supported)
  end

  # 管理后台
  def show_admin_page(conn, _params) do
    conn |> put_layout(:admin)
         |> render("admin.html")
  end

  def show_admin_app_page(conn, _params) do
    conn |> put_layout(:admin)
         |> render("admin.html")
  end

  # 用户中心
  def show_account_page(conn, _params) do
    conn |> put_layout(:app)
         |> render("account.html", is_mobile_account_supported: @is_mobile_account_supported)
  end

  def show_app_forum(%Plug.Conn{private: %{acs_app: %{forum_id: nil}}} = conn, _params) do 
    conn |> send_resp(500, gettext("forum not configured for app"))
  end
  def show_app_forum(%Plug.Conn{private: %{acs_app: %{forum_id: forum_id}}} = conn, _params) do 
    conn |> redirect(to: "/forum/#{forum_id}/index")
  end

  def show_app_mall(%Plug.Conn{private: %{acs_app: %{id: app_id}}} = conn, _params) do 
    conn |> redirect(to: "/mall/#{app_id}/index")
  end
  def show_app_mall(conn, _params) do 
    conn |> send_resp(500, gettext("mall not configured for app"))
  end

  def show_app_games(%Plug.Conn{private: %{acs_app: %{id: app_id}}} = conn, _params) do 
    conn |> redirect(to: "/games/#{app_id}/")
  end
  def show_app_games(conn, _params) do 
    conn |> send_resp(500, gettext("app not found"))
  end

  def show_app_faq(%Plug.Conn{private: %{acs_app: %{id: app_id}}} = conn, _params) do 
    conn |> redirect(to: "/customerService/#{app_id}/index")
  end
  def show_app_faq(conn, _params) do 
    conn |> send_resp(500, gettext("app not found"))
  end

  def show_forum_page(%Plug.Conn{private: %{ is_mobile: is_mobile}} = conn, _params) do
    theme_file = String.starts_with?(conn.request_path, "/m") && "/css/themes/jqxs_mobile.css" || "/css/themes/jqxs.css"
    conn |> put_layout(:app)
         |> render("forum.html", is_mobile_account_supported: @is_mobile_account_supported ,link_files: [theme_file] )
  end


   # 问题反馈
  def show_customer_service_page(conn, _params) do
    conn |> put_layout(:app)
         |> render("customer_service.html", is_mobile_account_supported: @is_mobile_account_supported)
  end

  # 活动
  def show_games_page(conn, _params) do
    conn |> put_layout(:app)
         |> render("games.html", is_mobile_account_supported: @is_mobile_account_supported)
  end

  # 商城
  def show_mall_page(conn, _params) do
    conn |> put_layout(:app)
         |> render("mall.html", is_mobile_account_supported: @is_mobile_account_supported)
  end

  # 购买商品页面, 兼容旧版本
  def show_payment_page(%Plug.Conn{private: %{acs_app: app,
                                              acs_user: user,
                                              acs_platform: platform}} = conn,
                       %{"order_id" => cp_order_id,
                         "goods_id" => goods_id,
                         "price" => price} = params) do

    zone_id = params["zone_id"] || "1"

    app_user = StatsRepo.get_by(AppUser, app_id: app.id, user_id: user.id, zone_id: zone_id)

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
          status: AppOrder.Status.created(),
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

    conn |> put_layout(:app)
         |> render("payment.html", platform: app_order.platform,
                                   is_mobile_account_supported: @is_mobile_account_supported,
                                   app_id: app.id,
                                   order_id: app_order.id,
                                   goods_id: goods_id,
                                   goods_name: app_order.goods_name,
                                   goods_icon: "",
                                   price: price,
                                   currency: app_order.currency)
  end
  def show_payment_page(conn, %{"order_id" => order_id, "version" => "3"}) do
    show_payment_page_by_order_id(conn, order_id)
  end
  def show_payment_page(conn, %{"out_trade_no" => order_id}) do
    show_payment_page_by_order_id(conn, order_id)
  end
  def show_payment_page(conn, %{"merchant_order_id" => order_id}) do
    show_payment_page_by_order_id(conn, order_id)
  end
  def show_payment_page(conn, _params) do
    conn |> put_resp_content_type("application/json")
         |> send_resp(500, JSON.encode!(%{
              success: false,
              message: "bad request params, order id not specified"
            }))
         |> halt()
  end

  defp show_payment_page_by_order_id(conn, order_id) do
    case Repo.get(AppOrder, order_id) do
      nil ->
        error "render payment page error: order[id: #{order_id}] not found"
        conn |> put_resp_content_type("application/json")
             |> send_resp(500, JSON.encode!(%{success: false, message: "bad request params, order[id: #{order_id}] not found"}))
             |> halt()

      %AppOrder{} = app_order ->
        goods_icon = case Repo.get(AppGoods, app_order.goods_id) do 
                       nil -> nil
                       %{icon: ""} -> nil
                       %{icon: nil} -> nil
                       %{icon: v} -> v
                     end
        conn |> put_layout(:app)
             |> render("payment.html", platform: app_order.platform,
                                       is_mobile_account_supported: @is_mobile_account_supported,
                                       app_id: app_order.app_id,
                                       order_id: app_order.id,
                                       goods_name: app_order.goods_name,
                                       goods_id: app_order.goods_id,
                                       goods_icon: goods_icon,
                                       price: app_order.price,
                                       currency: app_order.currency)
    end
  end

  defp fetch_body_class(%Plug.Conn{private: %{
                          acs_browser: browser,
                          acs_platform: platform}} = conn,
                        _options) do
    class = case platform do
      "macos" -> "macos #{browser}"
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

    is_mobile = platform in ["ios", "android", "wp8"]

    conn 
    |> put_private(:acs_body_class, class)
    |> put_private(:is_mobile, is_mobile)
  end
  defp fetch_body_class(conn, _options), do: conn
end
