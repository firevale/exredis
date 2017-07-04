defmodule Acs.Web.AdminUserController do
  use Acs.Web, :controller
  alias Acs.AdminUser
  alias Acs.RedisUser
  alias Acs.RedisAdminUser

  def get_users_by_level(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, %{"level" => _level, "keyword" => keyword}) do
    queryAdminUser = from au in AdminUser,
                     select: au.user_id,
                     where: au.admin_level == 1 or au.app_id == ^app_id
    adminUsers = Repo.all(queryAdminUser)

    query = from user in User,
            select: map(user, [:id, :nickname, :email, :inserted_at]),
            where: not user.id in (^adminUsers) and (like(user.email, ^"%#{keyword}%") or like(user.mobile, ^"%#{keyword}%")),
            order_by: [desc: user.inserted_at]
    users = Repo.all(query)
    conn |> json(%{success: true, users: users})
  end

  def get_current_user_level(%Plug.Conn{private: %{ acs_admin_id: acs_admin_id}} = conn, _) do
    level = RedisAdminUser.get_admin_level(acs_admin_id, nil) 
    conn |> json(%{success: true, level: level})
  end

  def add_admin_user(%Plug.Conn{private: %{acs_app_id: app_id, acs_admin_id: acs_admin_id}} = conn, %{"admin_id" => admin_id , "level" => level, "account_id" => account_id}) do
    if(RedisAdminUser.get_admin_level(admin_id, nil) == 1) do
      conn |> json(%{success: false, i18n_message: "error.server.illegal"})
    end
    if(level == 2 and RedisAdminUser.get_admin_level(acs_admin_id, nil) !=1) do
      conn |> json(%{success: false, i18n_message: "error.server.illegal"})
    else 
      queryCount = from au in AdminUser, select: count(1), where: au.app_id == ^app_id and au.user_id == ^admin_id
      case Repo.one!(queryCount) do
        1 ->
          conn |> json(%{success: false, i18n_message: "admin.user.messages.appAccountExists"})
        _ ->
          case AdminUser.changeset(%AdminUser{}, %{user_id: admin_id, account_id: account_id, admin_level: level, active: true, app_id: app_id}) |> Repo.insert do
            {:ok, _new_admin_user} ->
              RedisAdminUser.refresh(admin_id, app_id)
              conn |> json(%{success: true, i18n_message: "admin.user.messages.opSuccess"})
            {:error, what} ->
              error "add admin user failed, error: #{inspect what, pretty: true}"
              conn |> json(%{success: false, i18n_message: "error.server.networkError"})
          end
      end
    end
  end
  def add_admin_user(conn, _)do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  def add_user(conn, %{"account_id" => account_id, "level" => level, "active" => active, 
                 "app_id" => app_id, "nickname" => nickname, "email" => email, "device_id" => device_id,
                 "password" => password, "mobile" => mobile, "age" => age})do

    if(level == 1)do
      conn |> json(%{success: false, i18n_message: "error.server.illegal"})
    end                  
    queryCount = from us in User,select: count(1), where: us.email == ^email
    case Repo.one!(queryCount) do
      1 ->
        conn |> json(%{success: false, i18n_message: "error.server.accountInUse"})
      _ ->
        queryLast = from us in User, 
                    order_by: [desc: us.inserted_at],  
                    limit: 1,
                    select: map(us, [:id])
        lastUser = Repo.one(queryLast)

        Repo.transaction(fn ->
          # add user
          User.changeset(%User{}, %{id: lastUser.id + 1, email: email, mobile: mobile, device_id: device_id, encrypted_password: password, nickname: nickname, age: age }) |> Repo.insert
          # add adminuser
          AdminUser.changeset(%AdminUser{}, %{user_id: lastUser.id + 1, account_id: account_id, admin_level: level, active: active, app_id: app_id}) |> Repo.insert
        end)
        conn |>json(%{success: true, i18n_message: "admin.user.messages.opSuccess"})
    end
  end
  def add_user(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  def get_admin_user_by_app(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, _)do
    query = from au in AdminUser,
            left_join: user in assoc(au, :user),
            select: map(au, [:id, :account_id, :admin_level, :app_id, :inserted_at,
            user: [:id, :nickname, :mobile] ]),
            where: not is_nil(au.app_id) and au.admin_level != 1 and au.app_id == ^app_id,
            order_by: [desc: au.inserted_at],
            preload: [user: user]
    users = Repo.all(query)
    conn |> json(%{success: true, users: users})
  end

  def delete_admin_user(%Plug.Conn{private: %{acs_app_id: app_id, acs_admin_id: acs_admin_id}} = conn, %{"admin_user_id" => admin_user_id}) do
    query = from au in AdminUser,
            select: au,
            where: au.id == ^admin_user_id and au.app_id == ^app_id
    case Repo.one(query) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.userNotExist"})
      %AdminUser{} = user ->
        if(user.admin_level == 2 and RedisAdminUser.get_admin_level(acs_admin_id, nil) !=1) do
            conn |> json(%{success: false, i18n_message: "error.server.illegal"})
        else
          case Repo.delete(user) do
            {:ok, _} ->
              RedisAdminUser.refresh(user.id, user.app_id)
              conn |> json(%{success: true, i18n_message: "admin.user.messages.opSuccess"})
            {:error, %{errors: errors}} ->
              conn |> json(%{success: false, message: translate_errors(errors)})
          end
        end
    end
  end
  def delete_admin_user(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end
  
  def get_user_from_redis(conn, %{"user_id" => user_id}) do
    user = RedisUser.find(user_id) 
    conn |> json(%{success: true, user: user})
  end
end
