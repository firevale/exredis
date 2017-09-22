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

    # #商品
    goodses = 
      case PMalls.list_pmall_goods(app_id, 1, 3, "") do
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
    case PMalls.list_pmall_goods(app_id, page, records_per_page, nil) do
      :zero ->
        conn |> json(%{success: true, total: 0, goodses: []})
      {:ok, goodses, total_page} ->
        conn |> json(%{success: true, goodses: goodses, total: total_page})
    end
  end

  def get_goods_detail(conn,%{"goods_id" =>goods_id})do
    goods = PMalls.get_pmall_goods_detail(goods_id)
    PMalls.add_goods_click(goods_id, 1)
    conn |> json(%{success: true, goods: goods})
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

  def cache_key_sign(app_id, wcp_user_id), do: "pmall:sign:#{app_id}:#{Timex.today}:#{wcp_user_id}"
  def cache_key_sign_before(app_id, wcp_user_id), do: "pmall:sign:#{app_id}:#{Timex.shift(Timex.today, days: -1)}:#{wcp_user_id}"
  def cache_key_sign_times(app_id, wcp_user_id), do: "pmall:signtimes:#{app_id}:#{wcp_user_id}"
  
  def sign(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, params) do
    wcp_user_id = 1 
    sign_key = cache_key_sign(app_id, wcp_user_id)
    
    signed = Exredis.incr(sign_key)
    case signed do
      1 ->
        {:ok, times} = _sign(app_id, wcp_user_id)
        conn |> json(%{success: true, sign_times: times})
      _ ->
        conn |> json(%{success: false, i18n_message: "pmall.sign.signed"})
    end
    
  end
  defp _sign(app_id, wcp_user_id) do
    sign_key = cache_key_sign(app_id, wcp_user_id)
    sign_key_before = cache_key_sign_before(app_id, wcp_user_id)
    sign_key_times = cache_key_sign_times(app_id, wcp_user_id)

    #连续签到次数
    times  =
      case Exredis.exists(sign_key_before) do
        1 ->
          Exredis.incr(sign_key_times)
        _ ->
          Exredis.set(sign_key_times, 1)
      end

    #最后签到时间2天后过期
    Exredis.expire(sign_key, 172800)
    #添加积分
    Acs.PMallsPoint.add_point("point_day_sign", app_id, wcp_user_id)
    
    {:ok, times}

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
              Repo.transaction(fn ->
                new_user = Accounts.create_user!(mobile , String.slice(mobile, 5..10))
                Wcp.update_app_wcp_user!(wcp_user, %{user_id: new_user.id})
              end)
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

  def insert_address(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, %{
                "name" => _name,
                "mobile" => _mobile,
                "area" => _area,
                "address" => _address,
                "area_code" => _area_code} = us_address) do

    open_id = "o4tfGszZK1U0c_Z6lj29NAYAv_EE"
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
    case PMalls.get_daily_question(app_id) do
      nil ->
        conn |> json(%{success: false})
      {:ok, question} ->
        conn |> json(%{success: true, question: question})
    end
  end

  def answer_question(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, %{"id" => id, 
    "correct" => correct}) do
      wcp_user_id = 1
      question = PMalls.get_question(id)
      case question do
        nil ->
          conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
        _ ->
          if(question.correct == correct) do
            PMallsPoint.add_point("point_day_question", app_id, wcp_user_id)
            conn |> json(%{success: true})
          else
            conn |> json(%{success: false})
          end
      end
  end

end
