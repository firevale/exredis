defmodule Acs.ForumControllerTest do
  use Acs.ConnCase

  alias Acs.App
  alias Acs.Repo
  alias Acs.User
  alias Acs.AdminUser
  alias Acs.RedisUser
  alias Acs.ForumComment
  alias Acs.ForumPost
  alias Acs.ForumController
  alias Acs.RedisAccessToken

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

  test "update forum info", context do
    resp = post(context.conn, "/admin_actions/forum/update_forum_info", %{
      "forum" => %{
        "id" => 1,
        "title" => "test",
        "active" => true,
        "icon" => "test",
        "app_id" => @app_id
      } })

    result = JSON.decode!(resp.resp_body, keys: :atoms)
    IO.inspect resp.resp_body

    assert resp.status == 200
    assert result.success
  end

  test "update section info", context do
    resp = post(context.conn, "/admin_actions/forum/update_section_info", %{
      "section" => %{
        "id" => 1,
        "title" => "test",
        "active" => true,
        "sort" => 1,
        "forum_id" => 1
      } })

    result = JSON.decode!(resp.resp_body, keys: :atoms)
    IO.inspect resp.resp_body

    assert resp.status == 200
    assert result.success
  end

  test "get forum info with keyword", context do
    resp = post(context.conn, "/forum_actions/get_forum_info_with_keyword", %{
      forum_id: 1
    })

    result = JSON.decode!(resp.resp_body, keys: :atoms)
    IO.inspect resp.resp_body

    assert resp.status == 200
    assert result.success
  end

  test "get user paged post", context do
    resp = post(context.conn, "/forum_actions/get_user_paged_post", %{
      forum_id: 1,
      page: 1,
      records_per_page: 10
    })

    result = JSON.decode!(resp.resp_body, keys: :atoms)
    IO.inspect resp.resp_body

    assert resp.status == 200
    assert result.success
  end

  test "add post", context do
    resp = post(context.conn, "/forum_actions/add_post", %{
      forum_id: "1",
      section_id: 1,
      title: "test title",
      content: "test content"
    })

    result = JSON.decode!(resp.resp_body, keys: :atoms)
    IO.inspect resp.resp_body

    assert resp.status == 200
    assert result.success

  end

  # test "get post detail" do
    
    

  # end

  # test "get user post comments" do
    
    

  # end

  # test "delete comment" do
    
    

  # end

  # test "toggle post favorite" do
    
    

  # end

  # test "toggle post status" do
    
    

  # end

  # test "add comment" do
    
    

  # end

  # test "get user favorites" do
    
    

  # end

  # test "search" do
    
    

  # end

  # test "fetch post" do
    
    

  # end

  # test "upload post image" do
    
    

  # end

  # test "fetch comment" do
    
    

  # end

  # test "upload post image" do
    
    

  # end

end
