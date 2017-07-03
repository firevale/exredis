defmodule Acs.Web.WcpController do
  use Acs.Web, :controller

  plug Wcp.Plugs.CheckUrlSignature
  plug Wcp.Plugs.CheckMsgSignature when action in [:on_receive_message]

  def index(conn, %{"echostr" => echostr}) do
    conn |> text(echostr)
  end

  def on_receive_message(conn, %{"app_id" => app_id} = params) do
    msg = conn.assigns[:msg]
    d "msg: #{inspect msg, pretty: true}"
    reply = build_text_reply(msg, msg.content)
    conn |> render("text.xml", reply: reply)
  end

  defp build_text_reply(%{tousername: to, fromusername: from}, content) do
    %{from: to, to: from, content: content}
  end
end