defmodule Acs.MallControllerTest do
  use Acs.ConnCase

  alias Utils.JSON
  alias Acs.MallGoods
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

  test "fetch_malls", context do
    resp = get(context.conn, "/mall_actions/fetch_malls", %{
      "app_id" => @app_id
    })

    result = JSON.decode!(resp.resp_body, keys: :atoms)
    IO.inspect resp.resp_body

    assert resp.status == 200
    assert result.success
  end

  test "fetch_goods", context do
    resp = post(context.conn, "/mall_actions/fetch_goods", %{
      "keyword" => "",
      "page" => 1,
      "records_per_page" => 10
    })

    result = JSON.decode!(resp.resp_body, keys: :atoms)
    IO.inspect resp.resp_body

    assert resp.status == 200
    assert result.success
  end

  test "update_goods", context do
    resp = post(context.conn, "/admin_actions/mall/update_goods", %{
          "id" => "1010003",
          "app_id" => @app_id,
          "name" => "test",
          "pic" => "pic",
          "description" => "desc",
          "price" => 1100,
          "currency" => "CNY",
          "postage" => 800,
          "stock" => 99,
          "is_new" => true
      })

    result = JSON.decode!(resp.resp_body, keys: :atoms)
    IO.inspect resp.resp_body

    assert resp.status == 200
    assert result.success
  end

  test "delete_goods", context do
    goods = MallGoods.changeset(%MallGoods{}, %{
      id: "1010003",
      name: "test",
      description: "test",
      price: 1100,
      postage: 900,
      app_id: @app_id,
      user_id: @user_id
      }) |> Repo.insert!(on_conflict: :nothing)

    resp = post(context.conn, "/admin_actions/mall/delete_goods", %{
      "goods_id" => goods.id
    })

    result = JSON.decode!(resp.resp_body, keys: :atoms)
    IO.inspect resp.resp_body

    assert resp.status == 200
    assert result.success
  end

  test "get_active_goods_paged", context do
    resp = post(context.conn, "/mall_actions/get_active_goods_paged", %{
      "app_id" => @app_id,
      "page" => 1,
      "records_per_page" => 10
    })

    result = JSON.decode!(resp.resp_body, keys: :atoms)
    IO.inspect resp.resp_body

    assert resp.status == 200
    assert result.success
  end  

  test "get_goods_stock", context do
    resp = post(context.conn, "/mall_actions/get_goods_stock", %{
      "goods_id" => @goods_id,
    })

    result = JSON.decode!(resp.resp_body, keys: :atoms)
    IO.inspect resp.resp_body

    assert resp.status == 200
    assert result.success
  end  

  test "get_mall_detail", context do
    resp = post(context.conn, "/mall_actions/get_mall_detail", %{
      "app_id" => @app_id
    })

    result = JSON.decode!(resp.resp_body, keys: :atoms)
    IO.inspect resp.resp_body

    assert resp.status == 200
    assert result.success
  end  

  test "get_goods_detail", context do
    resp = post(context.conn, "/mall_actions/get_goods_detail", %{
      "goods_id" => @goods_id
    })

    result = JSON.decode!(resp.resp_body, keys: :atoms)
    IO.inspect resp.resp_body

    assert resp.status == 200
    assert result.success
  end  

  test "get_user_addresses", context do
    resp = post(context.conn, "/mall_actions/get_user_addresses", %{})

    result = JSON.decode!(resp.resp_body, keys: :atoms)
    IO.inspect resp.resp_body

    assert resp.status == 200
    assert result.success
  end   

  test "delete_address", context do
    resp = post(context.conn, "/mall_actions/delete_address", %{
      "address_id" => 1
    })

    result = JSON.decode!(resp.resp_body, keys: :atoms)
    IO.inspect resp.resp_body

    assert resp.status == 200
    assert result.success
  end   

  test "set_default_address", context do
    resp = post(context.conn, "/mall_actions/set_default_address", %{
      "address_id" => 1
    })

    result = JSON.decode!(resp.resp_body, keys: :atoms)
    IO.inspect resp.resp_body

    assert resp.status == 200
    assert result.success
  end    

  test "get_address_detail", context do
    resp = post(context.conn, "/mall_actions/get_address_detail", %{
      "address_id" => 1
    })

    result = JSON.decode!(resp.resp_body, keys: :atoms)
    IO.inspect resp.resp_body

    assert resp.status == 200
    assert result.success
  end   

  test "insert_address", context do
    resp = post(context.conn, "/mall_actions/insert_address", %{
        "name" => "test",
        "mobile" => "18950385555",
        "area" => "fuzhou",
        "address" => "address",
        "area_code" => "366300"
    })

    result = JSON.decode!(resp.resp_body, keys: :atoms)
    IO.inspect resp.resp_body

    assert resp.status == 200
    assert result.success
  end    

  test "update_address", context do
    resp = post(context.conn, "/mall_actions/update_address", %{
      "id" => 1,
      "name" => "test",
      "mobile" => "18950320000",
      "area" => "fuzhou",
      "address" => "fujian",
      "area_code" => "350001",
      "is_default" => true
    })

    result = JSON.decode!(resp.resp_body, keys: :atoms)
    IO.inspect resp.resp_body

    assert resp.status == 200
    assert result.success
  end            

end
