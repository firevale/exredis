defmodule AcsWeb.Admin.CustomerServiceController do
  use AcsWeb, :controller

  def update_question(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, 
                                          %{"id" => _id, 
                                          "title" => _title,
                                          "answer" => _answer, 
                                          "active" => _active,
                                          "is_hot" => _is_hot} = q) do
    case Apps.update_question(app_id, q) do
      {:ok, question} ->
        conn |> json(%{success: true, question: question, i18n_message: "admin.serverSuccess.updated"})
      nil -> 
        conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
      :error ->
        conn |> json(%{success: false, i18n_message: "error.server.networkError"})
    end
  end
  def update_question(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  def delete_question(%Plug.Conn{private: %{acs_app_id: app_id}} = conn,%{"id" => id})  do
    case Apps.delete_question(app_id, id) do
      :ok ->
        conn |> json(%{success: true})
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.goodsNotFound"})
      {:error, errors} ->
        conn |> json(%{success: false, message: translate_errors(errors)})
    end
  end

end