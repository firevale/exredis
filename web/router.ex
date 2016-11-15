defmodule Acs.Router do
  use Acs.Web, :router
  use BugsnagPlug

  require Bugsnag
  require Exception

  import  Acs.Plugs

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    # plug :fetch_flash
    plug :fetch_user_id
    plug :log_user_id
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug :detect_platform
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug :fetch_user_id
    plug :log_user_id
    plug :detect_platform
  end

  scope "/", Acs do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  scope "/user", Acs do
    pipe_through :browser # Use the default browser stack

    get  "/index", UserController, :index # show login page
    get  "/login", UserController, :index # show login page
    get  "/logout", UserController, :logout
    get  "/reset_password", UserController, :reset_password # show reset password page
    get  "/reset_password.html", UserController, :reset_password # show reset password page
    get  "/reset_password_success", UserController, :reset_password_success

    # ajax handlers
    post "/logout", UserController, :logout
    post "/create_session", UserController, :create_session
    post "/session_password", UserController, :session_password
    post "/check_email_exists", UserController, :check_email_exists
    post "/check_email_not_exists", UserController, :check_email_not_exists
    post "/register", UserController, :register # show reset password page
    post "/send_forgot_password_mail", UserController, :send_forgot_password_mail
    get  "/show_reset_password", UserController, :show_reset_password
    post "/reset_password", UserController, :reset_passwor
  end


  # Other scopes may use custom stacks.
  # scope "/api", Acs do
  #   pipe_through :api
  # end


end
