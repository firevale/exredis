defmodule Acs.PlugsTest do
 use Acs.ConnCase
 alias Acs.Plugs
#  test "parse_user_agent unkown", %{​conn:​ conn} do
#     # conn = Acs.Plugs.parse_user_agent(conn, [])
    
#     # assert conn.private[:acs_platform] == "unknown"
#     # assert conn.private[:acs_platform] == "unknown"
#  end

   test "GET /", %{conn: conn} do
     conn = Plugs.parse_user_agent(conn, [])
    
    assert conn.private[:acs_platform] == "unknown"
    assert conn.private[:acs_platform] == "unknown"
  end

end