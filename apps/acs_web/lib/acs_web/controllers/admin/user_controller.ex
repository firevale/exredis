defmodule AcsWeb.Admin.UserController do
  use AcsWeb, :controller
  
  def search_users(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, %{
    "keyword" => keyword, "page" => page, "records_per_page" => records_per_page}) do
      {:ok, total, users} = Acs.Search.search_user(keyword: keyword, app_id: app_id, page: page, records_per_page: records_per_page)
      total_page = round(Float.ceil(total/records_per_page))
      conn |> json(%{success: true, total: total_page, users: users})
  end

  def get_user_by_id(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, %{"id" => user_id}) when is_integer(user_id) do
    user = get_users_by_ids(app_id, id)
    conn |> json(%{success: true, user: user})
  end

  defp get_users_by_ids(app_id, id) when is_integer(id) do
    get_users_by_ids(app_id, [id])
  end
  defp get_users_by_ids(app_id, ids \\ []) when is_list(ids) do
    case ids do
      [] -> 
        []
      ids_list ->
        users = Enum.map(ids, fn id -> Accounts.get_user(id) end)
        |> Enum.filter(&(&1 != nil))
        |> Enum.map(fn user ->
            app_users_query =
              from app_user in AppUser,
                where: app_user.app_id == ^app_id and app_user.user_id == ^user.id,
                select: map(app_user, [:zone_id, :app_user_id, :app_user_name, :app_user_level, :active_seconds,
                  :pay_amount, :last_active_at, :inserted_at]),
                order_by: [asc: app_user.zone_id]
            app_users = AcsStats.Repo.all(app_users_query)
            Map.put_new(Map.take(user, [:id, :email, :mobile, :gender, :nickname, :age, 
              :inserted_at]), :app_users, app_users)
          end)
      _ ->
        []
    end
  end

end