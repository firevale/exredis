defmodule Acs.PlugsTest do
  use Acs.Web.ConnCase

  alias Plug.Conn

  @session Plug.Session.init(
    store: :cookie,
    key: "_acs_key",
    signing_salt: "xPmjtHMg",
    encryption_salt: "NW3SXpkS"
  )

  @plug_parsers Plug.Parsers.init(
    parsers: [:json], 
    json_decoder: Poison
  )

  setup do
    conn =
      build_conn()
      |> Map.put(:secret_key_base, String.duplicate("abcdefgh", 8))
      |> Plug.Parsers.call(@plug_parsers)
      |> Plug.Session.call(@session)
      |> Conn.fetch_query_params()
      |> Conn.fetch_session()
      
    {:ok, conn: conn}
  end

  test "parse_user_agent", %{conn: conn} do
    conn = 
      conn 
      |> put_req_header("user-agent", "Windows 10")
      |> Acs.Plugs.parse_user_agent([])
    
    assert conn.private[:acs_platform] == "unknown"
  end

end