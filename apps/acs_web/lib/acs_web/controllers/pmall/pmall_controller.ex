defmodule AcsWeb.PMallController do
  use AcsWeb, :controller

  alias Acs.Wcp
  alias Acs.Accounts

  plug :fetch_app_id
  plug :fetch_access_token
  plug :fetch_session_user_id
  plug :fetch_session_user

  # list_pmall_goods
  def list_pmall_goods(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, 
                                      %{"page" => page, 
                                      "records_per_page" => records_per_page,
                                      "keyword" => keyword}) do
    case PMalls.list_pmall_goods(app_id, page, records_per_page, keyword) do
      :zero ->
        conn |> json(%{success: true, total: 0, goodses: []})
      {:ok, goodses, total_page} ->
        conn |> json(%{success: true, goodses: goodses, total: total_page})
    end
  end
  def list_pmall_goods(conn, _params) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  def get_pmall_goods_detail(conn,%{"goods_id" =>goods_id})do
    goods = PMalls.get_pmall_goods_detail(goods_id)
    PMalls.add_goods_click(goods_id, 1)
    conn |> json(%{success: true, goods: goods})
  end
  def get_pmall_goods_detail(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  def get_user_info(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, _) do
    # user = Accounts.get_user()
    # point = PMalls.get_user_point(user_id)
    open_id = "o4tfGszZK1U0c_Z6lj29NAYAv_WA"
    case CachedAppWcpUser.get(app_id, open_id) do
      %AppWcpUser{} = user ->
        wcp_user = Map.take(user, [:id, :nickname, :avatar_url, :app_id])
        user_info = Map.merge(wcp_user, %{points: 200, has_mobile: false })
        conn |> json(%{success: true, wcp_user: user_info})
      _ ->
        conn |> json(%{success: false })
    end
  end

  def list_my_points(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, %{"page" => page, 
  "records_per_page" => records_per_page}) do
    open_id = "o4tfGszZK1U0c_Z6lj29NAYAv_WA"
    wcp_user_id = 1

    result = PMalls.list_my_points(app_id, wcp_user_id, page, records_per_page)
    case result do
      {:ok, point_logs, total} ->
        conn |> json(%{success: true, point_logs: point_logs, total: total})
      _ ->
        conn |> json(%{success: false})
     end
  end 

  def list_my_exchanges(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, %{"page" => page, 
  "records_per_page" => records_per_page}) do
    open_id = "o4tfGszZK1U0c_Z6lj29NAYAv_WA"
    wcp_user_id = 1

    result = PMalls.list_my_exchanges(app_id, wcp_user_id, page, records_per_page)
    case result do
      {:ok, point_logs, total} ->
        conn |> json(%{success: true, point_logs: point_logs, total: total})
      _ ->
        conn |> json(%{success: false})
     end
  end 

  def bind_mobile(conn, %{"mobile" => mobile, "verify_code" => verify_code}) do
    app_id = "3E4125B15C4FE2AB3BA00CB1DC1A0EE5"
    open_id = "o4tfGszZK1U0c_Z6lj29NAYAv_WA"

    case verify_code do
      "12345" ->
        case Wcp.get_app_wcp_user(app_id, openid: open_id) do
          nil ->
            conn |> json(%{success: false, message: "invalid request params"})

          %AppWcpUser{} = wcp_user ->
            if(wcp_user.user_id == nil || Accounts.exists?(mobile)) do
              new_user = Accounts.create_user!(mobile , String.slice(mobile, 5..10))
              Wcp.update_app_wcp_user!(wcp_user, %{user_id: new_user.id})
            else
              case Accounts.get_user(wcp_user.user_id) do
                %User{} = user ->
                  Accounts.update_user!(user, %{mobile: mobile})
                  conn |> json(%{success: true})
              end
            end
            conn |> json(%{success: true})
        end
      _ ->
        conn |> json(%{success: false, i18n_message: "error.server.invalidVerifyCode"})
    end
  end

  def insert_address(conn, %{
                "name" => _name,
                "mobile" => _mobile,
                "area" => _area,
                "address" => _address,
                "area_code" => _area_code} = us_address) do
    user_id = 1
    case Accounts.insert_address(user_id, us_address) do
      {:ok, us_address} ->
        conn |> json(%{success: true, address: us_address, i18n_message: "pmall.address.addSuccess"})
      :error ->
        conn |> json(%{success: false, i18n_message: "error.server.networkError"})
    end
  end

end
