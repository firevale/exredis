defmodule Acs.CustomerServiceController do
  use Acs.Web, :controller


  alias   Acs.RedisForum
  alias   Acs.RedisSetting
  alias   Acs.RedisForum
  alias   Acs.Question
  require Floki

  plug :fetch_app_id
  plug :fetch_session_user_id
  plug :fetch_session_user

  def add_contact(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn,
                    %{"title" => title,
                      "app_id" => app_id} = contact)do
      with  contact <- contact |> Map.put("user_id", user_id) |> Map.put("app_id", app_id),
            {:ok, contact} <- Question.changeset(%Question{}, contact) |> Repo.insert
      do
       conn |>json(%{success: true, i18n_message: "forum.writeContact.addSuccess"})
      else
        nil ->
          conn |> json(%{success: false, i18n_message: "forum.error.illegal"})
        {:error, %{errors: errors}} ->
          conn |> json(%{success: false, i18n_message: "forum.error.networkError"})
      end
  end
  def add_contact(conn, _) do
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

  def update_question(conn,%{"id" => id, "answer" => answer, "active" => active,"is_hot" => is_hot})  do
    with %Question{} = question  <- Repo.get(Question,id),
         {:ok, question} <- Question.changeset(question,%{answer: answer,active: active, is_hot: is_hot}) |>Repo.update
    do
        conn |> json(%{success: true, question: question,i18n_message: "admin.serverSuccess.updated"})
    else
      nil -> conn |> json(%{success: false, i18n_message: "admin.serverError.badRequestParams"})
      {:error, %{errors: errors}} -> conn |> json(%{success: false, i18n_message: "admin.serverError.networkError"})
    end

  end
  def update_question(conn, _) do
    conn |> json(%{success: false, i18n_message: "admin.serverError.badRequestParams"})
  end

  def get_paged_services(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn, %{"app_id" => app_id, "page" => page, "records_per_page" => records_per_page})do
    total = Repo.one!(from q in Question, select: count(q.id), where: q.user_id == ^user_id and q.app_id == ^app_id)
    total_page = round(Float.ceil(total / records_per_page))

    query = from question in Question,
              left_join: user in assoc(question, :user),
              left_join: app in assoc(question, :app),
              limit: ^records_per_page,
              where: question.user_id == ^user_id and question.app_id == ^app_id,
              offset: ^((page - 1) * records_per_page),
              select: question,
              preload: [user: user]

    questions = Repo.all(query)
    IO.inspect(questions, pretty: true)
    conn |> json(%{success: true, questions: questions, total: total_page})
  end
end
