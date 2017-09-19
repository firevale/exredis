defmodule AcsWeb.Admin.LoginCodesController do
  use AcsWeb, :controller

  alias Acs.Admin
  alias Acs.LoginCodes

  def gen_codes(%Plug.Conn{private: %{acs_admin_id: acs_admin_id}} = conn, %{"app_id" => app_id, "number" => number}) do 
    LoginCodes.gen_codes(app_id, number)
    Admin.log_admin_operation(acs_admin_id, app_id, "gen_login_codes", %{"number" => number})
    LoginCodes.refresh_stats_info(app_id)
    conn |> json(%{success: true})
  end

  def del_codes(%Plug.Conn{private: %{acs_admin_id: acs_admin_id}} = conn, %{"app_id" => app_id, "number" => number}) do 
    removed_number = LoginCodes.del_codes(app_id, number)
    Admin.log_admin_operation(acs_admin_id, app_id, "del_login_codes", %{"number" => number, "removed_number" => removed_number})
    LoginCodes.refresh_stats_info(app_id)
    conn |> json(%{success: true})
  end

  def stats_info(conn, %{"app_id" => app_id}) do 
    conn |> json(%{
      success: true,
      stats: LoginCodes.stats_info(app_id),
      daily_chart: LoginCodes.daily_chart_data(app_id, 30),
    })
  end

  def assign_codes(%{private: %{acs_admin_id: admin_user_id}} = conn, %{"app_id" => app_id, "number" => number}) do
    case LoginCodes.assign_admin_codes(admin_user_id, app_id, number) do 
      {:error, _} ->
        conn |> json(%{success: false, i18n_message: "error.server.assignTooManyCodes"})
      {:ok, codes} ->
        Admin.log_admin_operation(admin_user_id, app_id, "assign_login_codes", %{"number" => number})
        LoginCodes.refresh_stats_info(app_id)
        conn |> json(%{success: true, codes: codes})
    end
  end

  def list_my_codes(%{private: %{acs_admin_id: admin_user_id}} = conn, %{"app_id" => app_id}) do
    codes = LoginCodes.list_admin_codes(app_id, admin_user_id)
    conn |> json(%{success: true, codes: codes})    
  end
end