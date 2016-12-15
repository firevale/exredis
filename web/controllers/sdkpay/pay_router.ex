defmodule Acs.PayRouter do
  use Acs.Web, :router

  import  Acs.Plugs

  pipeline :sdkpay do 
    plug :fetch_app_id
    plug :fetch_app
  end

  scope "/", Acs do
    pipe_through :sdkpay

    scope path: "/alipay" do
      get   "/redirect", AlipayController, :alipay_redirect
      post  "/redirect", AlipayController, :alipay_redirect 

      get   "/notify",   AlipayController, :notify
      post  "/notify",   AlipayController, :notify

      get   "/callback", AlipayController, :callback
    end  

    get  "/add_applestore_order",     AppleStoreController, :add_order
    post "/add_applestore_order",     AppleStoreController, :add_order
    get  "/deliver_applestore_order", AppleStoreController, :deliver_order
    get  "/deliver_ggplay_order",     GgplayController,     :verify_and_deliver
  end
end