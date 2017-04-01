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

 
  def test(conn, _) do
    conn |> json(%{success: false, i18n_message: "forum.serverError.badRequestParams"})
  end  
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
end
