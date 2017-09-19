defmodule AcsWeb.PayRouter do
  use AcsWeb, :router

  scope "/", AcsWeb do
    pipe_through :sdkpay

    scope path: "/alipay" do
      get   "/redirect", AlipayController, :alipay_redirect
      post  "/redirect", AlipayController, :alipay_redirect
      post  "/mall_redirect", AlipayController, :alipay_mall_redirect

      get   "/notify",   AlipayController, :notify
      post  "/notify",   AlipayController, :notify
      get   "/mall_notify",   AlipayController, :mall_notify
      post  "/mall_notify",   AlipayController, :mall_notify
    end

    scope path: "/wechat" do
      get  "/prepay", WechatController, :prepay
      post "/prepay", WechatController, :prepay
      post "/mallprepay", WechatController, :mallprepay

      get  "/notify", WechatController, :notify
      post "/notify", WechatController, :notify
      post "/mallnotify", WechatController, :mallnotify
    end

    get  "/add_applestore_order",     AppleStoreController, :add_order
    post "/add_applestore_order",     AppleStoreController, :add_order
    post "/applestore_purchase",      AppleStoreController, :verify_and_deliver
    get  "/deliver_applestore_order", AppleStoreController, :deliver_order
    get  "/deliver_ggplay_order",     GgplayController,     :verify_and_deliver
    post "/deliver_ggplay_order",     GgplayController,     :verify_and_deliver
  end
end
