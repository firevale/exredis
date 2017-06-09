defmodule Acs.Web.AdminSettingControllerTest do
  use Acs.Web.ConnCase

  alias Utils.JSON
  require Utils

  @app_id   "978A7D84040FE589ED0C76295131E43D"
  @user_id  100001

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

  test "get_setting", context do
    resp = post(context.conn, "/admin_actions/setting/get_setting", %{
      "setting_name" => "keyword"
    })

    result = JSON.decode!(resp.resp_body, keys: :atoms)


    assert resp.status == 200
    assert result.success
  end

  test "get_settings_by_group", context do
    resp = post(context.conn, "/admin_actions/setting/get_settings_by_group", %{
      "group" => "keyword"
    })

    result = JSON.decode!(resp.resp_body, keys: :atoms)


    assert resp.status == 200
    assert result.success
  end

  test "delete_setting", context do
    resp = post(context.conn, "/admin_actions/setting/delete_setting", %{
        "setting_name" => "keyword"
      })

    result = JSON.decode!(resp.resp_body, keys: :atoms)


    assert resp.status == 200
    assert result.success
  end

  test "add_setting", context do
    resp = post(context.conn, "/admin_actions/setting/add_setting", %{
        "setting_name" => "test_setting",
        "setting_value" => "123",
        "group" => "test",
        "memo" => "test"
      })

    result = JSON.decode!(resp.resp_body, keys: :atoms)


    assert resp.status == 200
    assert result.success
  end

  test "update_setting", context do
    resp = post(context.conn, "/admin_actions/setting/update_setting", %{
      "setting_id" => 1,
      "setting_value" => "123456",
      "active" => true
    })

    result = JSON.decode!(resp.resp_body, keys: :atoms)


    assert resp.status == 200
    assert result.success
  end

end
