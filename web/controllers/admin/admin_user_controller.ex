defmodule Acs.AdminUserController do
  use Acs.Web, :controller
  alias Acs.AdminUser

  def add_user(conn,%{"account_id" => account_id, "level" => level, "active" => active, 
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

  def get_users_by_app(conn, %{"app_id" =>app_id})do
    query = from au in AdminUser,
            left_join: user in assoc(au, :user),
            select: map(au, [:id, :account_id, :admin_level, :app_id, :inserted_at,
            user: [:id, :nickname, :mobile] ]),
            where: is_nil(au.app_id) == false and au.admin_level != 1 and au.app_id == ^app_id,
            order_by: [desc: au.inserted_at],
            preload: [user: user]
    users = Repo.all(query)
    conn |> json(%{success: true, users: users})
  end

  def delete_admin_user(conn, %{"admin_user_id" => admin_user_id}) do
    case Repo.get(AdminUser, admin_user_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.commentNotFound"})
      %AdminUser{} = user ->
        case Repo.delete(user) do
          {:ok, _} ->
            conn |> json(%{success: true, i18n_message: "admin.user.messages.opSuccess"})
          {:error, %{errors: errors}} ->
            conn |> json(%{success: false, message: translate_errors(errors)})
        end   
    end
  end
  def delete_admin_user(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

end
