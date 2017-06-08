defmodule Acs.Web.MallOrderControllerTest do
  use Acs.Web.ConnCase

  alias Utils.JSON
  require Utils

  @app_id   "978A7D84040FE589ED0C76295131E43D"
  @user_id  100001
  @goods_id "1010001"

  setup %{conn: conn} = tags do
      device_id = "idfa.#{Utils.generate_token()}"
      platform = "ios"

      conn = conn
        |> recycle()
        |> set_acs_header(device_id, platform)

      resp = post(conn, "/user/create_token", %{
        account_id: "zhongxiaobin@firevale.com",
        password: "smilezh"
      })

      str = resp.resp_body |> String.replace("'", "\"") |> Poison.decode!
      token = str["access_token"]
      session = %{"access_token" => token}

      conn = conn
      |> Plug.Test.init_test_session(session) 
      |> put_req_header("acs-access-token", token)
      |> put_private(:acs_access_token, token)

      {:ok, %{tags | conn: conn}}
    end

  defp set_acs_header(conn, device_id, platform) do
    conn |> put_private(:acs_app_id, @app_id)
         |> put_private(:acs_platform, platform)
         |> put_req_header("acs-locale", "zh-Hans")
         |> put_req_header("acs-zone-id", "1")
         |> put_req_header("acs-app-id", @app_id)
         |> put_private(:acs_device_id, device_id)
         |> put_private(:acs_session_user_id, @user_id)
  end

  test "fetch_order_list", context do
    resp = post(context.conn, "/mall_actions/fetch_order_list", %{
      "app_id" => @app_id,
      "keyword" => "",
      "page" => 1,
      "records_per_page" => 10
      })

    result = JSON.decode!(resp.resp_body, keys: :atoms)
    IO.inspect resp.resp_body

    assert resp.status == 200
    assert result.success
  end

  test "fetch_order", context do
    resp = post(context.conn, "/mall_actions/fetch_order", %{
      "order_id" => "A10000010"
      })

    result = JSON.decode!(resp.resp_body, keys: :atoms)
    IO.inspect resp.resp_body

    assert resp.status == 200
    assert result.success
  end

  test "create_mall_order", context do
    resp = post(context.conn, "/mall_actions/create_mall_order", %{
        "goods_id" => @goods_id,
        "quantity" => 1,
        "pay_type" => "wechat",
        "address" => %{"name" => "name", "address" => "address"},
      })

    result = JSON.decode!(resp.resp_body, keys: :atoms)
    IO.inspect resp.resp_body

    assert resp.status == 200
    assert result.success
  end

  test "fetch_my_orders", context do
    resp = post(context.conn, "/mall_actions/fetch_my_orders", %{
      "type" => "all",
      "page" => 1,
      "records_per_page" => 10
    })

    result = JSON.decode!(resp.resp_body, keys: :atoms)
    IO.inspect resp.resp_body

    assert resp.status == 200
    assert result.success
  end

  test "confirm_recieved", context do
    resp = post(context.conn, "/mall_actions/confirm_recieved", %{
      "order_id" => "A10000010"
    })

    _result = JSON.decode!(resp.resp_body, keys: :atoms)
    IO.inspect resp.resp_body

    assert resp.status == 200
    # assert result.success
  end

end
