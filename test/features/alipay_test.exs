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

    AppGoods.changeset(%AppGoods{}, %{
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

    RedisUser.refresh(user.id)

    {:ok, %{tags | conn: set_acs_header(conn, app, user)}
    }
  end

  test "create order, pay through alipay, and notify", context do
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

    # can not simulate alipay notify since notify_id verification must be failed
    # test verify sign OK
    params = %{
      "notify_data" => "zWXqs+MfpidotWZwxB8Trxf7MvRNfEn1bLvp5wshxyT4JktI+X7xfWQDUNTrlbDNPTqLViMtU+Qk9Ix2UwfYueZoWbXLl9YRKWoS1TmTKEN/SMm227t0hGRVxV8dHDHD7XDDcNGcv0Che79fOa2XswpaLMMCSkX/GITDGECB/1Soh+j8OI6XgFpXikDCvTJjA8TsI+XKdZkcfBlfftTKuOJVJgEw7nV0N55efNj4g6IgqHS4gq9/noJTlE+pDe4k6L2EtTHe+GtV2Z/O3SjMH5Exfl/M1FXfFoGuv12gCO0WDHLBGV4ulHCtuIfevAOQ8VsJ8Zq1G4wfkJzc1j673tSnr3s30j+L9Bzj/PpeB/+/Tddx9OzhGdUGCaWgVkjU+JwKothnETJfymSrZ6bXsx0N1ct3dZeouqVyr2tjwzX/HtG81Xt8Q/VHbFWJTbH36R6LDhzC4L/5MX+oYjw2996eoOWaJYaya8NeZekXfczKqu4icyeUsgUqqJ2T0FtQFvr8uBSBOM9+PPalJfFen/uKvr+qnqkMqIy6INiTO1wp8VdKZzkbAtJuVHEc1Kmgf+geIPQFDlmTyLoE+5u6KlLIBsZNLAyc3ZFHWxMKG9VL/5z+Vk3ij17Au8AIZb01eJz/4+eHzqpo61rNvl6vSWt8Y5bDH/G71kU5xM7lSFkxEPTgOdXHnmsdbWGb4OZsrJG2xIWonjwfvykAHf6L2eS/3hO+NJAtJS27wNMmvd9WDmxM4ibAcT18GMrwYBbSD+RGTMnyPbdW2eabG1UjP+ZQ1m4XKD9KbCIdcXMcu4qDbCfMT0KHgc8VUF/SY0gjbfKpr2Xuf1blU6TkaOYR49Y4Sx47IRhG2P+0mYo0wAs/6+MTKS26FsswC4ri4Sg3/kTJrPZib4Mqj0nRMS6tgth7CCn9AGOUUQ4wePhDZpayY+20Q9O4roeRbyWZpD4SXHMUWnqj6ZtwhIlDzIQvr53KJ4A6Pv03HK1AVb/9og/PgHE8ZkRSwdOdM4rWBUhLrZ61npmntLI/0R/Hz1rLuoKb7V3GBO9L/IpIB7LlL6yV5/NqMwCBSSG/JPeuemf45HlGrsokBmH0fRatyYlrQ8G5Z87Egk//lhB0uPXRKOu0VTjGFU1XH0qeV2TJBMckiPZxiLa/k06e3snE3UejFFnyFfng2vLfqA47aqs/Wg3AxNrYSWkGTI5IYCIjsLx3HRl/K8o+c+VwOJLU3m3w+Vs5PrBgT7d9+JxD0kO3jk9c4yJUQmgjTdKcBm+F9zTwRVQS1pSlK/i6+n6S2uG3PZVyVHm9OSnO9MU401Fwf+q8t8v2yyqOKMPX/D0RyL+z3VgGYd/i/mJZWfrTl4Om4jGeVN9zjbBCG525znjeyPQpoIkaOdFqXYJpI7ny3WuBimPiEVUy3gbRcOPtO2lfkl2/mR4Ioc8kQ396CNib1TL6jYiNzwgYz3v3vYNzamcsmhSlYI5OjU5Pqt5g0+B9nhjXDmnd89EPLu2hhlhh0Z5ZufF+++aEiJ8OBgyEptOO",
      "sec_id" => "0001",
      "service" => "alipay.wap.trade.create.direct",
      "sign" => "MY9xOR/g9fyaWootN70Nrh5tFWddFV9KwAG7uTMBQtc7brE3pzwRRZn5eUSU/jEZkT5h86pp0n7deBizDcO7VR//4HAJ1O5day7OC/px7ky8mO9h6U32/iELogv7kX/rNcp8onyo25vuXsemUTGs7Qr+U9zuBOEG6wAUu02Gmj4=",
      "v" => "1.0"}

    assert {:error, :invalid_notify_id} = SDKAlipay.verify_notify(params)

    resp = post(build_conn(), "/api/pay/alipay/notify", params)
    assert resp.status == 200
    assert resp.resp_body == "fail, invalid_notify_id"
  end

  defp set_acs_header(conn, app, user) do
    conn |> put_req_header("acs-app-id", app.id)
         |> put_req_header("acs-user-id", to_string(user.id))
         |> put_req_header("acs-locale", "zh-Hans")
         |> put_req_header("acs-zone-id", "1")
         |> put_req_header("acs-device-id", "idfa.#{Utils.generate_token()}")
         |> put_req_header("user-agent", "fvacwebview android")
  end

end
