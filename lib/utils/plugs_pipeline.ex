defmodule Acs.PlugsPipeline do
    import  Acs.Plugs
    use Phoenix.Router
    pipeline :browser do
        plug :accepts, ["html"]
        plug :fetch_session
        plug :protect_from_forgery
        plug :put_secure_browser_headers
        plug :parse_user_agent
        plug :fetch_user_id
        plug :fetch_user
        plug :fetch_device_id
        plug :fetch_locale
    end

    pipeline :api do
        plug :accepts, ["json"]
        plug :fetch_session
        plug :parse_user_agent
        plug :fetch_user_id
        plug :fetch_user
        plug :fetch_device_id
        plug :fetch_locale
    end

    pipeline :admin do
        plug :accepts, ["json"]
        plug :fetch_session
        plug :parse_user_agent
        plug :fetch_user_id
        plug :fetch_locale
        plug :fetch_access_token
        plug :check_admin_access
    end

    pipeline :auth do 
        plug :fetch_app_id
        plug :fetch_app
        plug :fetch_user_id
        plug :fetch_user
    end

    pipeline :auth_user_api do 
        plug :fetch_app_id
        plug :fetch_app
    end

     pipeline :sdkpay do
        plug :accepts, ["json"]
        plug :fetch_session
        plug :parse_user_agent
        plug :fetch_user_id
        plug :fetch_user
        plug :fetch_device_id
        plug :fetch_locale
        plug :fetch_app_id
        plug :fetch_app
    end

    pipeline :games do
        plug :accepts, ["json"]
        plug :fetch_session
        plug :parse_user_agent
        plug :fetch_user_id
        plug :fetch_locale
    end

     pipeline :mall do
        plug :accepts, ["json"]
        plug :fetch_session
        plug :parse_user_agent
        plug :fetch_user_id
        plug :fetch_locale
    end

      pipeline :forum do
        plug :accepts, ["json"]
        plug :fetch_session
        plug :parse_user_agent
        plug :fetch_user_id
        plug :fetch_locale
    end
end