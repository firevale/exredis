defmodule Acs.AdminControllerTest do
  use Acs.ConnCase

  alias Utils.JSON
  require Utils

  @app_id   "978A7D84040FE589ED0C76295131E43D"
  @user_id  100001
  @goods_id "biu.goods.credits18"

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

  test "fetch_apps", context do
    resp = post(context.conn, "/admin_actions/fetch_apps", %{})

    result = JSON.decode!(resp.resp_body, keys: :atoms)
    IO.inspect resp.resp_body

    assert resp.status == 200
    assert result.success
  end

  test "fetch_supported_sdks", context do
    resp = post(context.conn, "/admin_actions/fetch_supported_sdks", %{})

    result = JSON.decode!(resp.resp_body, keys: :atoms)
    IO.inspect resp.resp_body

    assert resp.status == 200
    assert result.success
  end

  test "update_app_info", context do
    resp = post(context.conn, "/admin_actions/app/update_app_info", %{
      "app" => %{
        "name" => "test app",
        "currency" => "CNY"
      }})

    result = JSON.decode!(resp.resp_body, keys: :atoms)
    IO.inspect resp.resp_body

    assert resp.status == 200
    assert result.success
  end

  test "update_app_goods_info", context do
    resp = post(context.conn, "/admin_actions/app/update_app_goods_info", %{
      "goods" => %{
        "id" => @goods_id,
        "name" => "测试商品",
        "description" => "测试描述",
        "price" => 1100,
        "app_id" => @app_id,
    }})

    result = JSON.decode!(resp.resp_body, keys: :atoms)
    IO.inspect resp.resp_body

    assert resp.status == 200
    assert result.success
  end

  test "fetch_orders", context do
    resp = post(context.conn, "/admin_actions/fetch_orders", %{
      "app_id" => @app_id,
      "page" => 1,
      "records_per_page" => 10
    })

    result = JSON.decode!(resp.resp_body, keys: :atoms)
    IO.inspect resp.resp_body

    assert resp.status == 200
    assert result.success
  end

  test "search_orders", context do
    resp = post(context.conn, "/admin_actions/search_orders", %{
      "app_id" => @app_id,
      "keyword" => "test",
      "page" => 1,
      "records_per_page" => 10
    })

    result = JSON.decode!(resp.resp_body, keys: :atoms)
    IO.inspect resp.resp_body

    assert resp.status == 200
    assert result.success
  end
end
