defmodule Acs.CustomerServiceRouter do
  use Acs.Web, :router
  use LogAlias

  import  Acs.Plugs

  pipeline :forum do
    plug :accepts, ["json"]
    plug :fetch_session
    plug :parse_user_agent
    plug :fetch_user_id
    plug :fetch_locale
    # plug :fetch_access_token
  end

  scope "/", Acs do
    pipe_through :forum

    post  "/add_contact", CustomerServiceController, :add_contact

    post  "/get_paged_questions", CustomerServiceController, :get_paged_questions
    post  "/update_question", CustomerServiceController, :update_question
    post  "/get_hot_questions", CustomerServiceController, :get_hot_questions
    post  "/get_common_issues", CustomerServiceController, :get_common_issues
   

  end

end
