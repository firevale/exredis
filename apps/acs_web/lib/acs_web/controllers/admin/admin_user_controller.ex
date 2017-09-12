defmodule AcsWeb.AdminUserController do
  use AcsWeb, :controller

  alias Acs.Admin
  alias Acs.AdminAuth
  alias Acs.Accounts

  def get_users_by_level(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, %{"level" => _level, "keyword" => keyword}) do
    query = from au in AdminUser,
      select: au.user_id,
      where: au.admin_level == 1 or au.app_id == ^app_id

    admin_user_ids = Repo.all(query)

    query = from user in User,
            select: map(user, [:id, :nickname, :email, :mobile, :inserted_at]),
            where: not user.id in ^admin_user_ids,
            where: like(user.email, ^"%#{keyword}%") or like(user.mobile, ^"%#{keyword}%"),
            order_by: [desc: user.inserted_at]

    users = Repo.all(query)

    conn |> json(%{success: true, users: users})
  end

  def get_current_user_level(%Plug.Conn{private: %{acs_admin_id: acs_admin_id}} = conn, _) do
    level = AdminAuth.get_admin_level(acs_admin_id, nil) 
    conn |> json(%{success: true, level: level})
  end

  def add_admin_user(%Plug.Conn{private: %{acs_app_id: app_id, acs_admin_id: acs_admin_id}} = conn, 
                    %{"admin_id" => admin_id , "level" => level, "account_id" => account_id}) do
    if AdminAuth.get_admin_level(admin_id, nil) == 1 do
      conn |> json(%{success: false, i18n_message: "error.server.illegal"})
    else
      if level == 2 and Acs.AdminAuth.get_admin_level(acs_admin_id, nil) != 1 do
        conn |> json(%{success: false, i18n_message: "error.server.illegal"})
      else 
        case Admin.add_admin_user(app_id, admin_id, account_id, level) do 
          {:ok, admin_user} ->
            AdminAuth.refresh_admin_ids()
            AdminAuth.refresh_admin_level(admin_id, app_id)
            Admin.log_admin_operation(acs_admin_id, app_id, "add_admin_user", admin_user)
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
    conn |> json(%{success: true, users: Acs.Admin.list_app_admin_users(app_id)})
  end

  def delete_admin_user(%Plug.Conn{private: %{acs_app_id: app_id, acs_admin_id: acs_admin_id}} = conn, 
                        %{"admin_user_id" => admin_user_id} = params) do
    case Admin.delete_admin_user(app_id, admin_user_id) do 
      {:ok, _} -> 
        AdminAuth.refresh_admin_ids()
        AdminAuth.refresh_admin_level(admin_user_id, app_id)
        Admin.log_admin_operation(acs_admin_id, app_id, "delete_admin_user", params)
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
