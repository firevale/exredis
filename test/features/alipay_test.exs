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
      name: "测试商品",
      description: "测试商品",
      price: 1
      }) |> Repo.insert!(on_conflict: :nothing)

    RedisApp.refresh(app.id)

    user = User.changeset(%User{}, %{
      id: 90_000_001,
      email: "alipay_test@firevale.com",
      encrypted_password: "xxxxxx"
      }) |> Repo.insert!(on_conflict: :nothing)

    redis_user = RedisUser.refresh(user.id)

    IO.puts "setup redis_user: #{inspect redis_user, pretty: true}"

    {:ok, %{tags | conn: conn |> put_req_header("acs-app-id", app.id)
                              |> put_req_header("acs-user-id", to_string(user.id))
                              |> put_req_header("acs-locale", "zh-Hans")
                              |> put_req_header("acs-zone-id", "1")
                              |> put_req_header("acs-device-id", "idfa.#{Utils.generate_token()}")
                              |> put_req_header("user-agent", "fvacwebview android")}
    }
  end

  test "POST /api/sdkpay/add_channel_order", context do
    resp = post(context.conn, "/api/sdkpay/add_channel_order", %{
      cp_order_id: Utils.generate_token(10),
      goods_id: "alipay.test.goods.001",
      sdk_user_id: "fvalipaytest",
      debug_mode: false,
    })

    result = JSON.decode!(resp.resp_body, keys: :atoms)

    assert resp.status == 200
    assert result.success




  end

  # test "GET /", %{conn: conn} do
  #   conn = get conn, "/"
  #   assert html_response(conn, 200) =~ "Welcome to Phoenix!"
  # end
end
