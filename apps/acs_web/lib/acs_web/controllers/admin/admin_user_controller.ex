defmodule AcsWeb.Admin.AdminUserController do
  use AcsWeb, :controller

  alias Acs.Admin
  alias Acs.AdminAuth
  alias Acs.Accounts

  def search_user(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, %{"keyword" => keyword}) do
    conn |> json(%{success: true, users: Admin.search_user(app_id, keyword)})
  end

  def get_current_user_level(%Plug.Conn{private: %{acs_admin_id: acs_admin_id}} = conn, _) do
    conn |> json(%{success: true, level: AdminAuth.get_admin_level(acs_admin_id, nil)})
  end

  def add_admin_user(%Plug.Conn{private: %{acs_app_id: app_id, acs_admin_id: acs_admin_id}} = conn, 
                    %{"admin_id" => user_id , "level" => level, "account_id" => account_id}) do
    if AdminAuth.get_admin_level(user_id, nil) == 1 do
      conn |> json(%{success: false, i18n_message: "error.server.illegal"})
    else
      if level == 2 and Acs.AdminAuth.get_admin_level(acs_admin_id, nil) != 1 do
        conn |> json(%{success: false, i18n_message: "error.server.illegal"})
      else 
        case Admin.add_admin_user(app_id, user_id, account_id, level) do 
          {:ok, admin_user} ->
            Admin.log_admin_operation(acs_admin_id, app_id, "add_admin_user", %{account_id: account_id})
            conn |> json(%{success: true, i18n_message: "admin.user.messages.opSuccess"})
          _ ->
            conn |> json(%{success: false, i18n_message: "error.server.networkError"})
        end
      end
    end
  end
  def add_admin_user(conn, _)do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  def list_app_admin_users(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, _)do
    conn |> json(%{success: true, users: Admin.list_app_admin_users(app_id)})
  end

  def delete_admin_user(%Plug.Conn{private: %{acs_app_id: app_id, acs_admin_id: acs_admin_id}} = conn, 
                        %{"admin_user_id" => admin_user_id} = params) do
    case Admin.delete_admin_user(app_id, admin_user_id) do 
      {:ok, admin_user} -> 
        Admin.log_admin_operation(
          acs_admin_id, 
          app_id, 
          "delete_admin_user", 
          %{user_id: admin_user.user_id, account_id: admin_user.account_id})
        conn |> json(%{success: true, i18n_message: "admin.user.messages.opSuccess"}) 

      {:error, :admin_user_not_exists} ->
        conn |> json(%{success: false, i18n_message: "error.server.userNotExist"})

      {:error, %{errors: errors}} ->
        conn |> json(%{success: false, message: translate_errors(errors)})
    end
  end
  def delete_admin_user(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end
  
  def get_user_from_redis(conn, %{"user_id" => user_id}) do
    user = Accounts.get_user(String.to_integer(user_id)) 
    conn |> json(%{success: true, user: user})
  end
end
