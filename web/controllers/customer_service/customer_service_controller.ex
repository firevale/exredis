defmodule Acs.CustomerServiceController do
  use Acs.Web, :controller

  alias   Acs.RedisForum
  alias   Acs.RedisSetting
  alias   Acs.RedisForum
  require Floki

  plug :fetch_app_id
  plug :fetch_session_user_id  
  plug :fetch_session_user  
 
  def test(conn, _) do
    conn |> json(%{success: false, i18n_message: "forum.serverError.badRequestParams"})
  end 

  def get_paged_questions(conn, %{"app_id" =>app_id, "page" => page, "records_per_page" => records_per_page}) do
    get_paged_questions(conn, page, records_per_page)
  end
  def get_paged_questions(conn, _params) do
    get_paged_questions(conn, 1, 100)
  end
  def get_paged_questions(conn, page, records_per_page) do
    total = Repo.one!(from q in Acs.Question, select: count(q.id))
    total_page = round(Float.ceil(total / records_per_page))

    query = from question in Acs.Question,
              left_join: user in assoc(question, :user),
              left_join: app in assoc(question, :app),
              limit: ^records_per_page,
              offset: ^((page - 1) * records_per_page),
              select: question,
              preload: [user: user]

    questions = Repo.all(query)
    IO.inspect(questions, pretty: true)
    conn |> json(%{success: true, questions: questions, total: total_page})
  end  
 
end
