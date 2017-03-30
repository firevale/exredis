defmodule Acs.NewsController do
  use Acs.Web, :controller

  require Floki

  plug :cache_page, [cache_seconds: 600] when action in [:get_paged_news]

# get_paged_news
def get_paged_news(conn, %{"app_id" => app_id,
                          "group" => group,
                          "page" => page, 
                          "records_per_page" => records_per_page}) do
    total = Repo.one!(from n in AppNews, select: count(1), where: n.app_id == ^app_id and n.group == ^group)
    total_page = round(Float.ceil(total / records_per_page))

    query = from n in AppNews,
              join: a in assoc(n, :app),
              join: u in assoc(n, :user),
              where: n.app_id == ^app_id and n.group == ^group,
              order_by: [desc: n.id],
              limit: ^records_per_page,
              offset: ^((page - 1) * records_per_page),
              select: map(n, [:id, :title, :is_top, :pic, :reads, :inserted_at,
                              user: [:id, :nickname], 
                              app: [:id]]),
              preload: [app: a, user: u]

    news = Repo.all(query)
    conn |> json(%{success: true, news: news, total: total_page, records: total})
  end
  def get_paged_news(conn, _) do
    conn |> json(%{success: false, i18n_message: "admin.serverError.badRequestParams"})
  end  
  
end
