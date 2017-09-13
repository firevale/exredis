defmodule AcsWeb.Admin.CustomerServiceController do
  use AcsWeb, :controller

  def update_question(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, %{"id" => id, "title" => title,"answer" => answer, "active" => active,"is_hot" => is_hot}) do
    with %AppQuestion{} = question <- Repo.get_by(AppQuestion, id: id, app_id: app_id),
         {:ok, question} <- AppQuestion.changeset(question,%{title: title, answer: answer,active: active, is_hot: is_hot}) |> Repo.update
    do
      Acs.Search.ESQuestion.update(%{ doc: %{ title: title, answer: answer,active: active, is_hot: is_hot }}, id)
      conn |> json(%{success: true, question: question,i18n_message: "admin.serverSuccess.updated"})
    else
      nil -> conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
      {:error, %{errors: _errors}} -> conn |> json(%{success: false, i18n_message: "error.server.networkError"})
    end

  end
  def update_question(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  def delete_question(%Plug.Conn{private: %{acs_app_id: app_id}} = conn,%{"id" => id})  do
    with %AppQuestion{id: ^id} = question <- Repo.get_by(AppQuestion, id: id, app_id: app_id),
         {:ok, _}  <- Repo.delete(question)
    do
      Acs.Search.ESQuestion.delete(id)
      conn |> json(%{success: true})
    else
       nil -> conn |> json(%{success: false, i18n_message: "error.server.goodsNotFound"})
       {:error, %{errors: errors}} ->
            conn |> json(%{success: false, message: translate_errors(errors)})
    end
  end

end