defmodule Acs.Web.AdminUserControllerTest do
  use Acs.Web.ConnCase

  alias Utils.JSON
  alias Acs.User
  alias Acs.AdminUser
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

  test "get_users_by_level", context do
    resp = post(context.conn, "/admin_actions/user/get_users_by_level", %{
      "level" => 1,
      "keyword" => ""
    })

    result = JSON.decode!(resp.resp_body, keys: :atoms)
    IO.inspect resp.resp_body

    assert resp.status == 200
    assert result.success
  end

  test "get_current_user_level", context do
    resp = post(context.conn, "/admin_actions/user/get_current_user_level", %{})

    result = JSON.decode!(resp.resp_body, keys: :atoms)
    IO.inspect resp.resp_body

    assert resp.status == 200
    assert result.success
  end

  test "add_admin_user", context do

    _user = User.changeset(%User{}, %{
        id: 100005,
        email: "test@firevale.com",
        encrypted_password: "xxxxxx"
      }) |> Repo.insert!(on_conflict: :nothing)

    resp = post(context.conn, "/admin_actions/user/add_admin_user", %{
        "admin_id" => 100005,
        "level" => 2,
        "app_id" => @app_id, 
        "account_id" => "test@firevale.com"
      })

    result = JSON.decode!(resp.resp_body, keys: :atoms)
    IO.inspect resp.resp_body

    assert resp.status == 200
    assert result.success
  end

  test "delete_admin_user", context do
      _user = User.changeset(%User{}, %{
        id: 100005,
        email: "test@firevale.com",
        encrypted_password: "xxxxxx"
      }) |> Repo.insert!(on_conflict: :nothing)

      admin_user = AdminUser.changeset(%AdminUser{}, %{
        account_id: "test@firevale.com",
        active: true,
        admin_level: 2,
        app_id: @app_id, 
        user_id: 100005
      }) |> Repo.insert!(on_conflict: :nothing)

    resp = post(context.conn, "/admin_actions/user/delete_admin_user", %{
        "admin_user_id" => admin_user.id
      })

    result = JSON.decode!(resp.resp_body, keys: :atoms)
    IO.inspect resp.resp_body

    assert resp.status == 200
    assert result.success
  end

  test "get_admin_user_by_app", context do
    resp = post(context.conn, "/admin_actions/user/get_admin_user_by_app", %{})

    result = JSON.decode!(resp.resp_body, keys: :atoms)
    IO.inspect resp.resp_body

    assert resp.status == 200
    assert result.success
  end

end
