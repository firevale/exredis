defmodule Acs.Web.WechatTest do
  use Acs.Web.ConnCase

  alias Acs.Repo
  alias Acs.App
  alias Acs.AppGoods
  alias Acs.User
  alias Acs.AppSdkBinding

  alias Acs.RedisApp
  alias Acs.RedisUser
  alias Utils.JSON

  require Utils

  @sign_key    "FireVale2017GoforMillionsFortune"

  setup %{conn: conn} = tags do
    app = App.changeset(%App{}, %{
        id: "wechatpay.test.app.001",
        secret: Utils.generate_token(),
        name: "WechatPay Test",
        currency: "CNY",
        payment_callback: "http://localhost:4001/",
      }) |> Repo.insert!(on_conflict: :nothing)

    AppGoods.changeset(%AppGoods{}, %{
      id: "wechatpay.test.goods.001",
      app_id: app.id,
      name: "天神月卡",
      description: "1张天神月卡",
      price: 1
      }) |> Repo.insert!(on_conflict: :nothing)

    AppSdkBinding.changeset(%AppSdkBinding{}, %{
      app_id: "wechatpay.test.app.001",
      sdk: "wechat",
      binding: %{
        app_id: "wx06aa585d82e1bed7",
        app_secret: "916f1b7eb6570daf3f3322a2f88aef66",
        package_name: "com.firevale.wxqz.fv",
        partnerid: "1426834702",
        sign_key: @sign_key,
        signature: "84a28a826d5fbc76571de9004d5bf1ff"}
      }) |> Repo.insert!(on_conflict: :nothing)

    RedisApp.refresh(app.id)

    user = User.changeset(%User{}, %{
      id: 90_000_002,
      email: "wechatpay_test@firevale.com",
      encrypted_password: "xxxxxx"
      }) |> Repo.insert!(on_conflict: :nothing)

    RedisUser.refresh(user.id)

    {:ok, %{tags | conn: set_acs_header(conn, app, user)}
    }
  end

  test "create order, prepay, pay through wechat, and notify", context do
    resp = post(context.conn, "/api/sdkpay/add_channel_order", %{
      cp_order_id: Utils.generate_token(10),
      sdk: "firevale",
      price_in_cent: "1",
      channel: "firevale",
      market: "firevale",
      currency: "CNY",
      goods_id: "wechatpay.test.goods.001",
      goods_name: "天神月卡",
      sdk_user_id: "fvwechatpaytest",
      debug_mode: false,
    })

    app = resp.private[:acs_app]
    user = resp.private[:acs_user]

    result = JSON.decode!(resp.resp_body, keys: :atoms)

    assert resp.status == 200
    assert result.success

    conn =
      context.conn
      |> recycle()
      |> set_acs_header(app, user)

    order_id = result.order_id

    # prepay
    resp = post(conn, "/api/pay/wechat/prepay", %{
      payment_order_id: result.order_id
    })

    result = JSON.decode!(resp.resp_body, keys: :atoms)



    assert resp.status == 200
    assert result.success

    # notify
    resp_body = %{
      appid: "wx06aa585d82e1bed7",
      bank_type: "ICBC_DEBIT",
      cash_fee: "1",
      fee_type: "CNY",
      is_subscribe: "N",
      mch_id: "1426834702",
      nonce_str: "2464611910",
      openid: "oXKBYwrCX-9hSQQjNrx-keiVwZkk",
      out_trade_no: order_id,
      result_code: "SUCCESS",
      return_code: "SUCCESS",
      time_end: "20170301164805",
      total_fee: 1,
      trade_type: "APP",
      transaction_id: "4004272001201703011809263647"
    }

    resp_ok =
      """
        <xml>
          <return_code><![CDATA[SUCCESS]]></return_code>
          <return_msg><![CDATA[OK]]></return_msg>
        </xml>
      """
    notify_params = SDKWechat.params_with_sign(resp_body, @sign_key)
    assert "SUCCESS" == notify_params[:return_code]
    assert :ok == SDKWechat.check_sign(notify_params, @sign_key)
    req_data = """
      <xml>
        #{Enum.map_join(notify_params, "", fn({k, v}) -> "<#{k}>#{v}</#{k}>" end)}
      </xml>
    """
    testconn = build_conn() |> put_req_header("content-type", "text/plain")
    resp = post(testconn, "/api/pay/wechat/notify", req_data)
    assert resp.status == 200
    assert resp.resp_body == resp_ok
  end

  defp set_acs_header(conn, app, user) do
    conn |> put_req_header("acs-app-id", app.id)
         |> put_req_header("acs-user-id", to_string(user.id))
         |> put_req_header("acs-locale", "zh-Hans")
         |> put_req_header("acs-zone-id", "1")
         |> put_req_header("acs-device-id", "idfa.#{Utils.generate_token()}")
         |> put_req_header("user-agent", "fvacwebview android")
  end

  # test "GET /", %{conn: conn} do
  #   conn = get conn, "/"
  #   assert html_response(conn, 200) =~ "Welcome to Phoenix!"
  # end
end
