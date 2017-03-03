defmodule Acs.ForumController do
  use Acs.Web, :controller

  plug :fetch_app_id
  plug :fetch_user_id
  plug :fetch_user

  # 论坛首页
  def show_index_page(%Plug.Conn{private: %{acs_app_id: app_id}} = conn,
                                            params) do
    case Repo.get_by(Acs.Forum, app_id: app_id) do
      nil ->
        conn |> text("Forum not exist")

      %Acs.Forum{} = forum ->
        sections = Repo.get_by(Acs.ForumSection, forum_id: forum.id)
        conn |> put_layout(false)
             |> put_session(:locale, conn.private[:acs_locale])
             |> render("forum.html", sections: sections,
                                     is_mobile_account_supported: @is_mobile_account_supported)

    end

  end
end
