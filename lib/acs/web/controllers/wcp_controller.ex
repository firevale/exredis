defmodule Acs.Web.WcpController do
  use Acs.Web, :controller

  plug Wcp.Plugs.CheckUrlSignature
  plug Wcp.Plugs.CheckMsgSignature when action in [:on_receive_message]

  alias Acs.AppWcpResponse

  def index(conn, %{"echostr" => echostr}) do
    conn |> text(echostr)
  end

  def on_receive_message(conn, %{"app_id" => app_id} = params) do
    msg = conn.assigns[:msg]
    case AppWcpResponse.build_reply(app_id, msg) do 
      nil ->
        info "response is nil, return success"
        conn |> text "success" 
      %{} = reply ->
        conn |> render("text.xml", reply: reply)
    end
  end
end