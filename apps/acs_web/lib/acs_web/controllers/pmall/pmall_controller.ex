defmodule AcsWeb.PMallController do
  use AcsWeb, :controller
  require Exredis
  alias Acs.Wcp
  alias Acs.Accounts
  alias Acs.PMallsPoint
  alias Acs.Cache.CachedAdminSetting

  plug :fetch_app_id
  plug :fetch_access_token
  plug :fetch_session_user_id
  plug :fetch_session_user

  def list_index(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, params) do
    #任务清单
    tasks = PMalls.get_task_list(app_id)

    #商品
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
      {:ok, %{last_point: point,i18n_message: i18n_message}} ->
        conn |> json(%{success: true, point: point, i18n_message: i18n_message})
      {:error, %{i18n_message: i18n_message}} ->
        conn |> json(%{success: false, i18n_message: i18n_message})
    end
  end

  def get_sign_info(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, params) do
    wcp_user_id = 1
    {:ok,signed, sign_times} = PMalls.get_sign_info(app_id, wcp_user_id)
    conn |> json(%{success: true, signed: signed, sign_times: sign_times})
  end

  def sign(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, params) do
    wcp_user_id = 1
    result = PMalls.sign(app_id, wcp_user_id)
    case result do
      {:ok, sign_info} ->
        conn |> json(Map.merge(%{success: true}, sign_info))
      {:error, %{i18n_message: i18n_message}} ->
        conn |> json(%{success: false, i18n_message: i18n_message})
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

  def luck_draw(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, _) do
    wcp_user_id = 1
    log_type = "point_luck_draw"
    index = :rand.uniform(8)
    draw = PMalls.get_draw(index)
    case draw do
      nil ->
        conn |> json(%{success: true, index: 1})
      _ ->
        Repo.transaction(fn ->
          setting  = CachedAdminSetting.get_fat(app_id, log_type)
          user_point = PMalls.get_user_point(app_id, wcp_user_id)
          cond do
            user_point < String.to_integer(setting.value) * -1 || user_point <= 0 ->
              conn |> json(%{success: false, i18n_message: "pmall.draw.pointless"})
            true ->
              draw_log = %{"name": draw.name, "pic": draw.pic, "status": 0,
              "app_id": app_id, "wcp_user_id": wcp_user_id, "lucky_draw_id": draw.id
              }
              PMallsPoint.add_point(log_type, app_id, wcp_user_id)
              PMalls.update_draw_num(draw, draw.num - 1)
              PMalls.create_draw_log(draw_log)
          end
        end)

        user_point = PMalls.get_user_point(app_id, wcp_user_id)
        if PMalls.is_draw_exists?(app_id, wcp_user_id, draw.id) do
          conn |> json(%{success: true, index: 1, point: user_point})
        else
          conn |> json(%{success: true, index: index, point: user_point})
        end
    end
  end

end
