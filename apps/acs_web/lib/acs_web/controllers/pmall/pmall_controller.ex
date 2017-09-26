defmodule AcsWeb.PMallController do
  use AcsWeb, :controller
  require Exredis
  alias Acs.Wcp
  alias Acs.Accounts
  alias Acs.PMallsPoint

  plug :fetch_app_id
  plug :fetch_access_token
  plug :fetch_session_user_id
  plug :fetch_session_user

  def list_index(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, params) do
    #任务清单
    tasks = PMalls.get_task_list(app_id)

    #商品
    goodses =
      case PMalls.list_pmall_goods(app_id, 1, 5, "") do
        {:ok, goodses, total_page} ->
          goodses
       _ ->
          []
      end

    conn |> json(%{success: true, tasks: tasks, goodses: goodses})
  end

  # list_pmall_goods
  def list_goods(%Plug.Conn{private: %{acs_app_id: app_id}} = conn,
                                      %{"page" => page,
                                      "records_per_page" => records_per_page}) do
    {total_page, goodses} =
      case PMalls.list_pmall_goods(app_id, page, records_per_page, "") do
        {:ok, goodses, total_page} ->
          {total_page, goodses}
        _ ->
          {0, []}
      end

    conn |> json(%{success: true, total: total_page, goodses: goodses})
  end

  def get_goods_detail(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, %{"goods_id" =>goods_id})do
    PMalls.add_goods_click(goods_id, 1)
    goods = PMalls.get_pmall_goods_detail(goods_id)

    wcp_user_id = 1
    exchange_count =  PMalls.count_exchange_goods(app_id, wcp_user_id, goods_id)
    conn |> json(%{success: true, goods: goods, exchanged: exchange_count>=1})
  end

  def get_user_info(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, _) do
    # user = Accounts.get_user()
    wcp_user_id = 1
    point = PMalls.get_user_point(app_id, wcp_user_id)
    open_id = "o4tfGszZK1U0c_Z6lj29NAYAv_WA"
    case CachedAppWcpUser.get(app_id, open_id) do
      %AppWcpUser{} = user ->
        wcp_user = Map.take(user, [:id, :nickname, :avatar_url, :app_id])
        user_info = Map.merge(wcp_user, %{points: point, has_mobile: false })
        conn |> json(%{success: true, wcp_user: user_info})
      _ ->
        conn |> json(%{success: false, i18n_message: "error.server.badRequestParams" })
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
        conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
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
        conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
     end
  end

  def exchange(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, %{"goods_id" => goods_id}) do
    wcp_user_id = 1
    result = PMalls.exchange_goods(app_id, wcp_user_id, goods_id)
    case result do
      {:ok, exchange_info} ->
        conn |> json(Map.merge(%{success: true}, exchange_info))
      {:error, %{i18n_message: i18n_message}} ->
        conn |> json(%{success: false, i18n_message: i18n_message})
    end
  end

  def take_award(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, %{"days" => days}) do
    wcp_user_id = 1
    result = PMalls.take_sign_award(app_id, wcp_user_id, String.to_integer(days))
    case result do
      {:ok, add_point, total_point} ->
        conn |> json(%{success: true, add_point: add_point, total_point: total_point, i18n_message: "pmall.award.gotSuccess"})
      {:error, i18n_message} ->
        conn |> json(%{success: false, i18n_message: i18n_message})
    end
   
  end

  def update_address(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, %{"order_id" => order_id,  "user_address" => %{"name" => name,
  "mobile" => mobile, "area" => area, "address" => address, "area_code" => area_code} = user_address}) do
    open_id = "o4tfGszZK1U0c_Z6lj29NAYAv_EE"
    wcp_user_id  = 1
    result = PMalls.update_order_address( wcp_user_id, order_id, user_address)
    case result do 
      {:ok, order} ->
        conn |> json(%{success: true})
      {:error, i18n_message} ->
        conn |> json(%{success: false, i18n_message: i18n_message})
    end 
  end

  def get_sign_info(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, params) do
    wcp_user_id = 1
    {:ok, signed, sign_times, pic_raw, terms, awards} = PMalls.get_sign_info(app_id, wcp_user_id)
    %{"pic" => pic} = pic_raw
    {total, sign_users} = PMalls.get_sign_users(app_id)
    conn |> json(%{success: true, signed: signed, sign_times: sign_times, pic: pic, terms: terms,
    awards: awards, sign_total: total, sign_users: sign_users})
  end

  def sign(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, params) do
    wcp_user_id = 1
    open_id = "o4tfGszZK1U0c_Z6lj29NAYAv_WA"

    result = PMalls.sign(app_id, wcp_user_id)
    case result do
      {:ok, sign_info} ->
        PMalls.add_sign_user(app_id, open_id)
        conn |> json(Map.merge(%{success: true}, sign_info))
      {:error, %{i18n_message: i18n_message}} ->
        conn |> json(%{success: false, i18n_message: i18n_message})
    end
  end

  def bind_mobile(conn, %{"mobile" => mobile, "verify_code" => verify_code}) do
    app_id = "3E4125B15C4FE2AB3BA00CB1DC1A0EE5"
    open_id = "o4tfGszZK1U0c_Z6lj29NAYAv_WA"

    case get_session(conn, :bind_mobile_verify_code) do
      ^verify_code ->
        case PMalls.bind_mobile(app_id, open_id, mobile) do
          {:ok, mobile} ->
            conn |> delete_session(:bind_mobile_verify_code)
                 |> json(Map.merge(%{success: true}, mobile))
          {:error, %{i18n_message: i18n_message}} ->
            conn |> json(%{success: false, i18n_message: i18n_message})
        end
      _ ->
        conn |> json(%{success: false, i18n_message: "pmall.bindMobile.invalidVerifyCode"})
    end
  end

  def insert_address(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, %{
                "name" => _name,
                "mobile" => _mobile,
                "area" => _area,
                "address" => _address,
                "area_code" => _area_code} = us_address) do

    open_id = "o4tfGszZK1U0c_Z6lj29NAYAv_WA"
    case Wcp.get_app_wcp_user(app_id, openid: open_id) do
      nil ->
        conn |> json(%{success: false, message: "invalid request params"})

      %AppWcpUser{} = wcp_user ->
        case Accounts.insert_address(wcp_user.user_id, us_address) do
          {:ok, us_address} ->
            conn |> json(%{success: true, address: us_address, i18n_message: "pmall.address.addSuccess"})
          :error ->
            conn |> json(%{success: false, i18n_message: "error.server.networkError"})
        end
    end
  end

  def get_daily_question(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, _) do
    wcp_user_id = 1
    exists = PMalls.exists_answer_user(app_id, wcp_user_id)
    case PMalls.get_daily_question(app_id) do
      nil ->
        conn |> json(%{success: false, exists: exists})
      {:ok, question} ->
        conn |> json(%{success: true, question: question, exists: exists})
    end
  end

  def answer_question(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, %{"id" => id,
    "correct" => correct}) do
      wcp_user_id = 1
      result = PMalls.answer_question(id, app_id, wcp_user_id, correct)
      case result do
        {:ok, answer} ->
          conn |> json(Map.merge(%{success: true}, answer))
        {:error, %{i18n_message: i18n_message}} ->
          conn |> json(%{success: false, i18n_message: i18n_message})
      end
  end

  def luck_draw(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, _) do
    wcp_user_id = 1
    log_type = "point_luck_draw"

    result = PMalls.luck_draw(app_id, wcp_user_id, log_type)    
    case result do
      {:ok, draw} ->
        conn |> json(%{success: true, index: draw.index, draw_name: draw.draw_name, order_id: draw.order.id, total_point: draw.total_point, i18n_message: draw.i18n_message})
      {:error, %{i18n_message: i18n_message}} ->
        conn |> json(%{success: false, i18n_message: i18n_message})
    end
  end

  def update_draw_address(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, %{"order_id" => order_id,  "user_address" => %{"name" => name,
  "mobile" => mobile, "area" => area, "address" => address, "area_code" => area_code} = user_address}) do
    open_id = "o4tfGszZK1U0c_Z6lj29NAYAv_EE"
    wcp_user_id  = 1
    result = PMalls.update_draw_address( wcp_user_id, order_id, user_address)
    case result do 
      {:ok, order} ->
        conn |> json(%{success: true})
      {:error, i18n_message} ->
        conn |> json(%{success: false, i18n_message: i18n_message})
    end 
  end

end
