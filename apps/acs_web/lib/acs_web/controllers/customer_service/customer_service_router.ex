defmodule AcsWeb.CustomerServiceRouter do
  use AcsWeb, :router
  use LogAlias

  scope "/", AcsWeb do
    pipe_through :forum

    post  "/add_contact", CustomerServiceController, :add_contact

    post  "/get_paged_questions", CustomerServiceController, :get_paged_questions
    post  "/get_hot_questions", CustomerServiceController, :get_hot_questions
    post  "/get_paged_services", CustomerServiceController, :get_paged_services
    post  "/get_common_issues", CustomerServiceController, :get_common_issues
    post   "/get_app_detail",  CustomerServiceController, :get_app_detail
    post   "/search",  CustomerServiceController, :search

  end

end
