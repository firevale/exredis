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

    conn =
      conn
      |> recycle()
      |> set_acs_header(app_id, device_id, platform)

    user = User.changeset(%User{}, %{
      id: 100001,
      email: "zhongxiaobin@firevale.com",
      encrypted_password: "$pbkdf2-sha512$160000$XBC9izsPHnce3kqllIpE8A$xh0TY1uYF3VKukY5fwyqsGEkLqvY.o.iIdaN536i2lSJp6Bnu4xNsu/FH243xuEv9UrLQXLOPmPetmi3hrmdmA"
      }) |> Repo.insert!(on_conflict: :nothing)

    RedisUser.refresh(user.id)

    access_token = RedisAccessToken.create(%{
                            app_id: app_id,
                            user_id: user.id,
                            device_id: device_id,
                            platform: platform,
                            ttl: 604800,
                            binding: %{}
                          })

    conn  |> put_session(:access_token, access_token.id)
          |> put_session(:platform, platform)
          |> put_session(:device_id, device_id)

    {:ok, %{tags | conn: conn}}
  end

  defp set_acs_header(conn, app_id, device_id, platform) do
    conn |> put_private(:acs_app_id, app_id)
         |> put_private(:acs_platform, platform)
         |> put_req_header("acs-locale", "zh-Hans")
         |> put_req_header("acs-zone-id", "1")
         |> put_private(:acs_device_id, device_id)
  end

  test "update forum info", context do
    
    resp = post(context.conn, "/admin_actions/forum/update_forum_info", %{
      id: 1,
      title: "test",
      active: true,
      icon: "test",
      app_id: "978A7D84040FE589ED0C76295131E43D"
    })

    IO.inspect resp.resp_body
    # result = JSON.decode!(resp.resp_body, keys: :atoms)
    # IO.inspect result

    assert resp.status == 200
    # assert result.success
  end

  # test "update section info" do
    
    

  # end

  # test "get forum info with keyword" do
    
    

  # end

  # test "get user paged post" do
    
    

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
