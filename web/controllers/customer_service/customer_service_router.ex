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

    get  "/test", CustomerServiceController, :test
    post "/get_paged_questions", CustomerServiceController, :get_paged_questions

  end

end
