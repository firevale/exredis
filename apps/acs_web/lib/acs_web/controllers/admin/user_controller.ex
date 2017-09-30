defmodule AcsWeb.Admin.UserController do
  use AcsWeb, :controller

  def search_users(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, %{
    "keyword" => keyword, "page" => page, "records_per_page" => records_per_page}) do
      {:ok, total, users} = Acs.Search.search_user(
        keyword: keyword, 
        app_id: app_id, 
        page: page, 
        records_per_page: records_per_page)
      users = for user <- users do 
        Map.put(user, :sdk_bindings, Accounts.get_user_sdk_bindings(user.id))
      end
      total_page = round(Float.ceil(total/records_per_page))
      conn |> json(%{success: true, total: total_page, users: users})
  end

  def get_user_info(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, %{"id" => user_id}) when is_integer(user_id) do
    user = Accounts.get_user(user_id) 
           |> Map.put(:sdk_bindings, Accounts.get_user_sdk_bindings(user_id))
           |> Map.put(:app_users, AcsStats.list_app_users(app_id, user_id))
    conn |> json(%{success: true, user: user})
  end

end