defmodule Acs.Web.CustomerServiceControllerTest do
  use Acs.Web.ConnCase

  alias Utils.JSON
  alias Acs.Question
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

  test "add_contact", context do
    resp = post(context.conn, "/customer_service_actions/add_contact", %{
      "title" => "test",
      "app_id" => @app_id
    })

    result = JSON.decode!(resp.resp_body, keys: :atoms)


    assert resp.status == 200
    assert result.success
  end

  test "get_paged_questions", context do
    resp = post(context.conn, "/customer_service_actions/get_paged_questions", %{
      "app_id" => @app_id,
      "page" => 1,
      "records_per_page" => 10
    })

    result = JSON.decode!(resp.resp_body, keys: :atoms)


    assert resp.status == 200
    assert result.success
  end

  test "get_common_issues", context do
    resp = post(context.conn, "/customer_service_actions/get_common_issues", %{
        "app_id" => @app_id
      })

    result = JSON.decode!(resp.resp_body, keys: :atoms)


    assert resp.status == 200
    assert result.success
  end

  test "update_question", context do
    question = Question.changeset(%Question{}, %{
      title: "test",
      app_id: @app_id,
      user_id: @user_id
      }) |> Repo.insert!(on_conflict: :nothing)

    resp = post(context.conn, "/admin_actions/customer_service/update_question", %{
        "id" => question.id,
        "title" => "test",
        "answer" => "test",
        "active" => true,
        "is_hot" => false
      })

    result = JSON.decode!(resp.resp_body, keys: :atoms)


    assert resp.status == 200
    assert result.success
  end

  test "delete_question", context do
    question = Question.changeset(%Question{}, %{
      title: "test",
      app_id: @app_id,
      user_id: @user_id
      }) |> Repo.insert!(on_conflict: :nothing)

    resp = post(context.conn, "/admin_actions/customer_service/delete_question", %{
      "id" => question.id
    })

    result = JSON.decode!(resp.resp_body, keys: :atoms)


    assert resp.status == 200
    assert result.success
  end

  test "get_paged_services", context do
    resp = post(context.conn, "/customer_service_actions/get_paged_services", %{
      "app_id" => @app_id,
      "page" => 1,
      "records_per_page" => 10
    })

    result = JSON.decode!(resp.resp_body, keys: :atoms)


    assert resp.status == 200
    assert result.success
  end  

  test "search", context do
    resp = post(context.conn, "/customer_service_actions/search", %{
      "app_id" => @app_id,
      "keyword" => "test",
      "page" => 1,
      "records_per_page" => 10
    })

    result = JSON.decode!(resp.resp_body, keys: :atoms)


    assert resp.status == 200
    assert result.success
  end  

  test "get_app_detail", context do
    resp = post(context.conn, "/customer_service_actions/get_app_detail", %{
      "app_id" => @app_id
    })

    result = JSON.decode!(resp.resp_body, keys: :atoms)


    assert resp.status == 200
    assert result.success
  end  

end
