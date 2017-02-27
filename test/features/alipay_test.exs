defmodule Acs.AlipayTest do
  use Acs.ConnCase

  alias Acs.App
  alias Acs.Repo
  require Utils

  setup %{conn: conn} do
    app = %App{
      id: Utils.generate_token(),
      secret: Utils.generate_token(),
      name: "Alipay Test",
      currency: "CNY",
      payment_callback: "http://localhost:4001/",
    } |> App.changeset(%{}) |> Repo.insert!(on_conflict: :nothing)

    {:ok, %{conn: conn |> put_req_header("acs-app-id", app.id)}
  end

  test "POST /api/sdk_pay/add_channel_order", %{conn: conn} do
  end

  # test "GET /", %{conn: conn} do
  #   conn = get conn, "/"
  #   assert html_response(conn, 200) =~ "Welcome to Phoenix!"
  # end
end
