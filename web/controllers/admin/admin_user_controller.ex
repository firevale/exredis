defmodule Acs.AdminUserController do
  use Acs.Web, :controller

  def add_user(conn, %{"user" => %{
                "nickname" => nickname,
                "email" => email,
                "device_id" => device_id,
                "encrypted_password" => encrypted_password,
                "mobile" => mobile,
                "age" => age} = user}
                #  %{"admin" => %{
                # "app_id" => app_id,
                # "active" => active,
                # "account_id" => account_id,
                # "admin_level" => admin_level} = admin}
                )do
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

        user = user |> Map.put("id", lastUser.id + 1)
        # admin = admin |> Map.put("user_id", lastUser.id + 1)  |> Map.put("account_id", email)
        Repo.transaction(fn ->
            User.changeset(%User{}, user) |> Repo.insert

            # AdminUser.changeset(%AdminUser{}, admin) |> Repo.insert
        end)
        conn |>json(%{success: true, i18n_message: ""})
    end
  end
  def add_user(conn, para) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end
end