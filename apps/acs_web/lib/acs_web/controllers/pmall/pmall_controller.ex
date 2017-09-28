defmodule AcsWeb.PMallController do
  use AcsWeb, :controller
  require Exredis

  alias Acs.Wcs
  alias Acs.Wcs.WcsUser

  alias Acs.Accounts
  alias Acs.PMallsPoint

  plug :fetch_app_id
  plug :fetch_session_wcs_user_id

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

  def get_goods_detail(%Plug.Conn{private: %{acs_app_id: app_id, wcs_user_id: wcs_user_id}} = conn, %{"goods_id" =>goods_id})do
    PMalls.add_goods_click(goods_id, 1)
    goods = PMalls.get_pmall_goods_detail(goods_id)
    exchange_count =  PMalls.count_exchange_goods(app_id, wcs_user_id, goods_id)
    conn |> json(%{success: true, goods: goods, exchanged: exchange_count >= 1})
  end

  def get_user_info(%Plug.Conn{private: %{acs_app_id: app_id, wcs_user_id: wcs_user_id}} = conn, _) do
    point = PMalls.get_user_point(app_id, wcs_user_id)
    case Wcs.get_wcs_user(wcs_user_id) do
      %WcsUser{} = user ->
        wcp_user = Map.take(user, [:id, :nickname, :avatar_url, :app_id])
        user_info = Map.merge(wcp_user, %{points: point, has_mobile: false })
        conn |> json(%{success: true, wcp_user: user_info})
      _ ->
        conn |> json(%{success: false, i18n_message: "error.server.badRequestParams" })
    end
  end

  def list_my_points(%Plug.Conn{private: %{acs_app_id: app_id, wcs_user_id: wcs_user_id}} = conn,
    %{"page" => page,
      "records_per_page" => records_per_page}) do
    result = PMalls.list_my_points(app_id, wcs_user_id, page, records_per_page)
    case result do
      {:ok, point_logs, total} ->
        conn |> json(%{success: true, point_logs: point_logs, total: total})
      _ ->
        conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
     end
  end

  def list_my_exchanges(%Plug.Conn{private: %{acs_app_id: app_id, wcs_user_id: wcs_user_id}} = conn,
    %{"page" => page,
      "records_per_page" => records_per_page}) do
    result = PMalls.list_my_exchanges(app_id, wcs_user_id, page, records_per_page)
    case result do
      {:ok, point_logs, total} ->
        conn |> json(%{success: true, point_logs: point_logs, total: total})
      _ ->
        conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
     end
  end

  def exchange(%Plug.Conn{private: %{acs_app_id: app_id, wcs_user_id: wcs_user_id}} = conn, %{"goods_id" => goods_id}) do
    result = PMalls.exchange_goods(app_id, wcs_user_id, goods_id)
    case result do
      {:ok, exchange_info} ->
        conn |> json(Map.merge(%{success: true}, exchange_info))
      {:error, %{i18n_message: i18n_message}} ->
        conn |> json(%{success: false, i18n_message: i18n_message})
    end
  end

  def take_award(%Plug.Conn{private: %{acs_app_id: app_id, wcs_user_id: wcs_user_id}} = conn, %{"days" => days}) do
    result = PMalls.take_sign_award(app_id, wcs_user_id, days)
    case result do
      {:ok, add_point, total_point} ->
        conn |> json(%{success: true, add_point: add_point, total_point: total_point, i18n_message: "pmall.award.gotSuccess"})
      {:error, i18n_message} ->
        conn |> json(%{success: false, i18n_message: i18n_message})
    end

  end

  def update_address(%Plug.Conn{private: %{acs_app_id: app_id, wcs_user_id: wcs_user_id}} = conn,
    %{"order_id" => order_id,
      "user_address" =>
        %{"id" => id,
          "name" => name,
          "mobile" => mobile,
          "area" => area,
          "address" => address,
          "area_code" => area_code} = user_address}) do

    result = PMalls.update_order_address( wcs_user_id, order_id, user_address)
    PMalls.save_address(wcs_user_id, user_address)
    case result do
      {:ok, order} ->
        conn |> json(%{success: true})
      {:error, i18n_message} ->
        conn |> json(%{success: false, i18n_message: i18n_message})
    end
  end

  def get_sign_info(%Plug.Conn{private: %{acs_app_id: app_id, wcs_user_id: wcs_user_id}} = conn, params) do
    {:ok, signed, sign_times, pic_raw, terms, awards} = PMalls.get_sign_info(app_id, wcs_user_id)
    %{"pic" => pic} = pic_raw
    {total, sign_users} = PMalls.get_sign_users(app_id)
    conn |> json(%{
      success: true,
      signed: signed,
      sign_times: sign_times,
      pic: pic,
      terms: terms,
      awards: awards,
      sign_total: total,
      sign_users: sign_users})
  end

  def sign(%Plug.Conn{private: %{acs_app_id: app_id, wcs_user_id: wcs_user_id}} = conn, params) do
    wcp_user = Wcp.get_app_wcp_user(wcs_user_id)
    result = PMalls.sign(app_id, wcs_user_id)

    case result do
      {:ok, sign_info} ->
        PMalls.add_sign_user(app_id, wcp_user.openid)
        conn |> json(Map.merge(%{success: true}, sign_info))

      {:error, %{i18n_message: i18n_message}} ->
        conn |> json(%{success: false, i18n_message: i18n_message})
    end
  end

  def bind_mobile(%Plug.Conn{private: %{acs_app_id: app_id, wcs_user_id: wcs_user_id}} = conn,
    %{"mobile" => mobile, "verify_code" => verify_code}) do
    case get_session(conn, :bind_mobile_verify_code) do
      ^verify_code ->
        case Acs.Wcs.bind_mobile(wcs_user_id, mobile) do
          :ok ->
            {:ok, add_point, total_point} = PMallsPoint.add_point("point_bind_mobile", app_id, wcs_user_id)
            conn |> delete_session(:bind_mobile_verify_code)
                 |> json(%{
                   success: true,
                   add_point: add_point,
                   total_point: total_point,
                   i18n_message: "pmall.bindMobile.success"
                 })
          {:error, %{i18n_message: i18n_message}} ->
            conn |> json(%{success: false, i18n_message: i18n_message})
        end
      _ ->
        conn |> json(%{success: false, i18n_message: "pmall.bindMobile.invalidVerifyCode"})
    end
  end

  def get_default_address(%Plug.Conn{private: %{acs_app_id: app_id, wcs_user_id: wcs_user_id}} = conn, _) do
    case Wcp.get_app_wcp_user(wcs_user_id) do
      nil ->
        conn |> json(%{success: false})

      wcs_user ->
        case Accounts.get_default_address(wcs_user.user_id) do
          nil ->
            conn |> json(%{success: false})
          {:ok, address} ->
            conn |> json(%{success: true, address: address})
        end
    end
  end

  def get_daily_question(%Plug.Conn{private: %{acs_app_id: app_id, wcs_user_id: wcs_user_id}} = conn, _) do
    exists = PMalls.exists_answer_user(app_id, wcs_user_id)
    case PMalls.get_daily_question(app_id) do
      nil ->
        conn |> json(%{success: false, exists: exists})
      {:ok, question} ->
        conn |> json(%{success: true, question: question, exists: exists})
    end
  end

  def answer_question(%Plug.Conn{private: %{acs_app_id: app_id, wcs_user_id: wcs_user_id}} = conn, %{"id" => id,
    "correct" => correct}) do
      result = PMalls.answer_question(id, app_id, wcs_user_id, correct)
      case result do
        {:ok, answer} ->
          conn |> json(Map.merge(%{success: true}, answer))
        {:error, %{i18n_message: i18n_message}} ->
          conn |> json(%{success: false, i18n_message: i18n_message})
      end
  end

  def luck_draw(%Plug.Conn{private: %{acs_app_id: app_id, wcs_user_id: wcs_user_id}} = conn, _) do
    result = PMalls.luck_draw(app_id, wcs_user_id)
    case result do
      {:ok, draw} ->
        conn |> json(Map.merge(%{success: true},draw))
      {:error, %{i18n_message: i18n_message}} ->
        conn |> json(%{success: false, i18n_message: i18n_message})
    end
  end

  def update_draw_address(%Plug.Conn{private: %{acs_app_id: app_id, wcs_user_id: wcs_user_id}} = conn,
    %{
      "order_id" => order_id,
      "user_address" =>
        %{"id" => id,
          "name" => name,
          "mobile" => mobile,
          "area" => area,
          "address" => address,
          "area_code" => area_code} = user_address}) do

    result = PMalls.update_draw_address( wcs_user_id, order_id, user_address)
    PMalls.save_address(wcs_user_id, user_address)
    case result do
      {:ok, order} ->
        conn |> json(%{success: true})

      {:error, i18n_message} ->
        conn |> json(%{success: false, i18n_message: i18n_message})
    end
  end

  def point_subscribe(conn,  %{"app_id" => app_id, "wcs_user_id" => wcs_user_id} = params) do
    with  %WcsUser{} <-  Wcs.get_wcs_user(wcs_user_id),
      {:ok, add_point, total_point} <- PMalls.subscribe_point(app_id, wcs_user_id)
    do
      conn |> json(%{success: true, result_code: "ok"})
    else
      false ->
        conn |> json(%{success: false, result_code: "argument_error"})
      {:exist} ->
        conn |> json(%{success: true, result_code: "subscribed"})
      _ ->
        conn |> json(%{success: true, result_code: "user_not_found"})
    end
  end
  
end
