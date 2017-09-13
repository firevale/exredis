defmodule AcsWeb.CustomerServiceController do
  use AcsWeb, :controller

  plug :fetch_app_id
  plug :fetch_session_user_id
  plug :fetch_session_user

  def add_contact(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn,
                    %{"title" => _title,
                      "app_id" => app_id} = contact)do
      with  contact <- contact |> Map.put("user_id", user_id) |> Map.put("app_id", app_id),
            {:ok, contact} <- AppQuestion.changeset(%AppQuestion{}, contact) |> Repo.insert
      do
        Acs.Search.ESQuestion.index(contact)
        conn |>json(%{success: true, i18n_message: "customer.writeContact.addSuccess"})
      else
        nil ->
          conn |> json(%{success: false, i18n_message: "error.server.illegal"})
        {:error, %{errors: _errors}} ->
          conn |> json(%{success: false, i18n_message: "error.server.networkError"})
      end
  end
  def add_contact(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  def get_paged_questions(conn, %{"app_id" =>app_id, "page" => page, "records_per_page" => records_per_page}) do
    get_paged_questions(conn, app_id,page, records_per_page)
  end
  def get_paged_questions(conn,app_id, page, records_per_page) do
    total = Repo.one!(from q in AppQuestion, select: count(q.id),where: q.app_id == ^app_id)
    total_page = round(Float.ceil(total / records_per_page))

    query = from question in AppQuestion,
              left_join: user in assoc(question, :user),
              left_join: app in assoc(question, :app),
              limit: ^records_per_page,
              offset: ^((page - 1) * records_per_page),
              select: map(question, [:id, :title, :answer, :is_hot, :active, :inserted_at, :updated_at, user: [:id, :nickname, :avatar_url]]),
              where: question.app_id == ^app_id,
              order_by: [desc: :id],
              preload: [user: user]

    questions = Repo.all(query)
    conn |> json(%{success: true, questions: questions, total: total_page})
  end

  def get_common_issues(conn, %{"app_id" =>app_id}) do
    query = from question in AppQuestion,
              select: question.title,
              where: question.app_id == ^app_id and question.is_hot== true

    questions = Repo.all(query)
    conn |> json(%{success: true, issues: questions})
  end

  def get_paged_services(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn, %{"app_id" => app_id, "page" => page, "records_per_page" => records_per_page})do
    total = Repo.one!(from q in AppQuestion, select: count(q.id), where: q.user_id == ^user_id and q.app_id == ^app_id)
    total_page = round(Float.ceil(total / records_per_page))

    query = from question in AppQuestion,
              left_join: user in assoc(question, :user),
              left_join: app in assoc(question, :app),
              limit: ^records_per_page,
              order_by: [desc: question.inserted_at],
              where: question.user_id == ^user_id and question.app_id == ^app_id,
              offset: ^((page - 1) * records_per_page),
              select: map(question, [:id, :title, :answer, :inserted_at])
    questions = Repo.all(query)

    conn |> json(%{success: true, questions: questions, total: total_page})
  end

  def search(conn, %{"app_id" => _forum_id,
                     "keyword" => keyword,
                     "page" => page,
                     "records_per_page" => records_per_page}) do

    case Search.search_question(keyword, page, records_per_page) do
      {:ok, %{hits: %{hits: hits, total: total}}} ->
        questions = Enum.map(hits, fn(%{
          _id: _id,
        } = hit) ->
          %{
            id: hit._source.id,
            title: hit._source.title,
            answer:  hit._source.answer,
            active: hit._source.active,
            inserted_at: hit._source.inserted_at
          }

        end)
        total_page = round(Float.ceil(total/records_per_page))
        conn |> json(%{success: true, questions: questions, total: total_page})
      error ->
        error "search failed: #{inspect error, pretty: true}"
        conn |> json(%{success: false})
    end
  end

  def get_app_detail(%Plug.Conn{private: %{acs_session_user_id: _user_id}} = conn, %{"app_id" => app_id}) do
     app = CachedApp.get(app_id) |> Map.take([:id, :cs_phone_number, :baidu_tieba_name, :weibo_name, :website_url, :public_weixin_name, :forum_url])

     conn |> json(%{success: true, app: app})
  end
   def get_app_detail(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end
end
