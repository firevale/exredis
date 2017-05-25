defmodule Acs.ForumControllerTest do
  use Acs.ConnCase

  alias Acs.Repo
  alias Acs.User
  alias Acs.RedisUser
  alias Acs.Forum
  alias Acs.ForumComment
  alias Acs.ForumPost
  alias Acs.ForumSection
  alias Acs.ForumController
  alias Acs.RedisAccessToken

  alias Utils.JSON

  require Utils

  setup %{conn: conn} = tags do
      app_id = "978A7D84040FE589ED0C76295131E43D"
      device_id = "idfa.#{Utils.generate_token()}"
      platform = "ios"

      conn = conn
        |> recycle()
        |> set_acs_header(app_id, device_id, platform)

      user = User.changeset(%User{}, %{
        id: 100001,
        email: "zhongxiaobin@firevale.com",
        encrypted_password: "$pbkdf2-sha512$160000$XBC9izsPHnce3kqllIpE8A$xh0TY1uYF3VKukY5fwyqsGEkLqvY.o.iIdaN536i2lSJp6Bnu4xNsu/FH243xuEv9UrLQXLOPmPetmi3hrmdmA"
        }) |> Repo.insert!(on_conflict: :nothing)

      RedisUser.refresh(user.id)

      resp = post(conn, "/user/create_token", %{
        account_id: user.email,
        password: "smilezh"
      })

      str = resp.resp_body |> String.replace("'", "\"") |> Poison.decode!
      token = str["access_token"]
      IO.inspect token

      conn = conn 
      |> put_req_header("acs-access-token", token)
      |> put_private(:acs_access_token, token)
      |> put_private(:plug_session_fetch, :done)

      {:ok, %{tags | conn: conn}}
    end

  defp set_acs_header(conn, app_id, device_id, platform) do
    conn |> put_private(:acs_app_id, app_id)
         |> put_private(:acs_platform, platform)
         |> put_req_header("acs-locale", "zh-Hans")
         |> put_req_header("acs-zone-id", "1")
         |> put_req_header("acs-app-id", app_id)
         |> put_private(:acs_device_id, device_id)
         |> put_private(:acs_session_user_id, 100001)
  end

  test "update forum info", context do

    IO.inspect context.conn

    resp = post(context.conn, "/admin_actions/forum/update_forum_info", %{
      "forum" => %{
        "id" => 1,
        "title" => "test",
        "active" => true,
        "icon" => "test",
        "app_id" => "978A7D84040FE589ED0C76295131E43D"
      } })

    IO.inspect resp.resp_body
    # result = JSON.decode!(resp.resp_body, keys: :atoms)
    # IO.inspect result

    assert resp.status == 200
    # assert result.success
  end

  # test "update section info" do
    
    

  # end

  # test "get forum info with keyword", context do
  #   resp = post(context.conn, "/forum_actions/get_forum_info_with_keyword", %{
  #     forum_id: 1
  #   })

  #   IO.inspect resp.resp_body
  #   # result = JSON.decode!(resp.resp_body, keys: :atoms)
  #   # IO.inspect result

  #   assert resp.status == 200
  #   # assert result.success
  # end

  # test "get user paged post", context do
  #   resp = post(context.conn, "/forum_actions/get_user_paged_post", %{
  #     forum_id: 1,
  #     page: 1,
  #     records_per_page: 10
  #   })

  #   IO.inspect resp.resp_body
  #   # result = JSON.decode!(resp.resp_body, keys: :atoms)
  #   # IO.inspect result

  #   assert resp.status == 200
  #   # assert result.success

  # end

  # test "add post" do
    
    

  # end

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
