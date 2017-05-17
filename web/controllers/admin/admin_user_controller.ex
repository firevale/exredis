defmodule Acs.AdminUserController do
  use Acs.Web, :controller
  alias Acs.AdminUser
  plug :fetch_device_id

  def add_user(conn,%{"account_id" => account_id, "level" => level, "active" => active, 
                 "app_id" => app_id, "nickname" => nickname, "email" => email, "device_id" => device_id,
                 "password" => password, "mobile" => mobile, "age" => age})do

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
  def add_user(conn, para) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end
end