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
       conn |>json(%{success: true, i18n_message: "customer.writeContact.addSuccess"})
      else
        nil ->
          conn |> json(%{success: false, i18n_message: "customer.error.illegal"})
        {:error, %{errors: errors}} ->
          conn |> json(%{success: false, i18n_message: "customer.error.networkError"})
      end
  end
  def add_contact(conn, _) do
    conn |> json(%{success: false, i18n_message: "customer.serverError.badRequestParams"})
  end

  def get_paged_questions(conn, %{"app_id" =>app_id, "page" => page, "records_per_page" => records_per_page}) do
    get_paged_questions(conn, app_id,page, records_per_page)
  end
  def get_paged_questions(conn,app_id, page, records_per_page) do
    total = Repo.one!(from q in Acs.Question, select: count(q.id),where: q.app_id == ^app_id)
    total_page = round(Float.ceil(total / records_per_page))

    query = from question in Acs.Question,
              left_join: user in assoc(question, :user),
              left_join: app in assoc(question, :app),
              limit: ^records_per_page,
              offset: ^((page - 1) * records_per_page),
              select: map(question, [:id, :title, :answer, :is_hot, :active, :inserted_at, :updated_at, user: [:id, :nickname, :avatar_url]]),
              where: question.app_id == ^app_id,
              preload: [user: user]

    questions = Repo.all(query)
    conn |> json(%{success: true, questions: questions, total: total_page})
  end

  def get_common_issues(conn, %{"app_id" =>app_id}) do
    query = from question in Acs.Question,
              left_join: user in assoc(question, :user),
              left_join: app in assoc(question, :app),
              select: map(question, [:id, :title]),
              # where: question.app_id == ^app_id and question.is_hot== true,
              # where: question.app_id == ^app_id,
              # limit: 9,
              preload: [user: user]

    questions = Repo.all(query)
    conn |> json(%{success: true, issues: questions})
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
              order_by: [desc: question.inserted_at],
              where: question.user_id == ^user_id and question.app_id == ^app_id,
              offset: ^((page - 1) * records_per_page),
              select: map(question, [:id, :title, :answer, :inserted_at])
    questions = Repo.all(query)
    
    conn |> json(%{success: true, questions: questions, total: total_page})
  end

  def get_app_detail(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn,%{"app_id" =>app_id})do
     app = RedisApp.find(app_id) |> Map.take([:id, :cs_phone_number, :baidu_tieba_name, :weibo_name, :website_url, :public_weixin_name, :forum_url])

     conn |> json(%{success: true, app: app})
  end
   def get_app_detail(conn, _) do
    conn |> json(%{success: false, i18n_message: "customer.serverError.badRequestParams"})
  end
end
