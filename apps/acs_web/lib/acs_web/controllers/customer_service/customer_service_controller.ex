defmodule AcsWeb.CustomerServiceController do
  use AcsWeb, :controller

  plug :fetch_app_id
  plug :fetch_session_user_id
  plug :fetch_session_user

  def add_contact(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn,
                    %{"title" => _title,
                      "app_id" => app_id} = contact)do
    case Apps.add_contact(user_id, app_id, contact) do
      :ok ->
        conn |>json(%{success: true, i18n_message: "customer.writeContact.addSuccess"})
      :illegal ->
        conn |> json(%{success: false, i18n_message: "error.server.illegal"})
      :error ->
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
    {:ok, questions, total_page} = Apps.get_paged_questions(app_id, page, records_per_page)
    conn |> json(%{success: true, questions: questions, total: total_page})
  end

  def get_common_issues(conn, %{"app_id" =>app_id}) do
    questions = Apps.get_common_issues(app_id)
    conn |> json(%{success: true, issues: questions})
  end

  def get_paged_services(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn, %{"app_id" => app_id, "page" => page, "records_per_page" => records_per_page})do
    {:ok, questions, total_page} = Apps.get_paged_services(user_id, app_id, page, records_per_page)
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
     app = Apps.get_app(app_id) |> Map.take([:id, :cs_phone_number, :baidu_tieba_name, :weibo_name, :website_url, :public_weixin_name, :forum_url])
     conn |> json(%{success: true, app: app})
  end
  def get_app_detail(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end
end
