defmodule Acs.AlipayTest do
  use Acs.ConnCase

  alias Acs.Repo
  alias Acs.App
  alias Acs.AppGoods
  alias Acs.User

  alias Acs.RedisApp
  alias Acs.RedisUser
  alias Utils.JSON

  require Utils

  setup %{conn: conn} = tags do
    app = App.changeset(%App{}, %{
        id: Utils.generate_token(),
        secret: Utils.generate_token(),
        name: "Alipay Test",
        currency: "CNY",
        payment_callback: "http://localhost:4001/",
      }) |> Repo.insert!(on_conflict: :nothing)

    goods = AppGoods.changeset(%AppGoods{}, %{
      id: "alipay.test.goods.001",
      app_id: app.id,
      name: "一小袋金币",
      description: "一小袋金币",
      price: 1
      }) |> Repo.insert!(on_conflict: :nothing)

    RedisApp.refresh(app.id)

    user = User.changeset(%User{}, %{
      id: 90_000_001,
      email: "alipay_test@firevale.com",
      encrypted_password: "xxxxxx"
      }) |> Repo.insert!(on_conflict: :nothing)

    redis_user = RedisUser.refresh(user.id)

    {:ok, %{tags | conn: set_acs_header(conn, app, user)}
    }
  end

  test "create order, pay through alipay, get alipay notify success", context do
    resp = post(context.conn, "/api/sdkpay/add_channel_order", %{
      cp_order_id: Utils.generate_token(10),
      goods_id: "alipay.test.goods.001",
      sdk_user_id: "fvalipaytest",
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

    resp = post(conn, "/api/pay/alipay/redirect", %{
      payment_order_id: result.order_id,
      merchant_url: "https://fvac.firevale.com/payment/pay_proxy"
    })

    result = JSON.decode!(resp.resp_body, keys: :atoms)

    assert resp.status == 200
    assert result.success


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
