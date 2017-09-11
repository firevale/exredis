defmodule AcsWeb.WcpController do
  use AcsWeb, :controller

  plug Wcp.Plugs.CheckUrlSignature
  plug Wcp.Plugs.CheckMsgSignature when action in [:on_receive_message]

  alias Acs.AppWcpResponse
  alias Acs.AppWcpMessage
  alias Acs.AppWcpUser
  alias Acs.RedisAppWcpUser

  require Wcp.User
  require Utils

  def index(conn, %{"echostr" => echostr}) do
    conn |> text(echostr)
  end

  def on_receive_message(conn, %{"app_id" => app_id} = _params) do
    msg = conn.assigns[:msg]

    Process.spawn(fn() ->
      openid = msg.fromusername
      user_info = Wcp.User.info(app_id, openid)

      case Map.get(user_info, :openid) do
        ^openid ->
          {:ok, wcp_user} = case Repo.get_by(AppWcpUser, app_id: app_id, openid: user_info.openid) do
            nil ->
              AppWcpUser.changeset(%AppWcpUser{}, %{
                openid: user_info.openid,
                nickname: user_info.nickname,
                sex: user_info.sex,
                avatar_url: user_info.headimgurl,
                city: user_info.city,
                country: user_info.country,
                app_id: app_id
              }) |> Repo.insert

            wcp_user ->
              AppWcpUser.changeset(wcp_user, %{
                openid: user_info.openid,
                nickname: user_info.nickname,
                sex: user_info.sex,
                avatar_url: user_info.headimgurl,
                city: user_info.city,
                country: user_info.country,
                app_id: app_id
              }) |> Repo.update
          end
          RedisAppWcpUser.refresh(wcp_user)
        _ ->
          :do_nothing
      end
    end, [])

    wcp_user = RedisAppWcpUser.find(app_id, msg.fromusername)

    case msg.msgtype do
      "text" ->
        AppWcpMessage.index(%{from: wcp_user,
          to: %{openid: msg.tousername, nickname: "系统"},
          msg_type: msg.msgtype,
          content: msg.content,
          inserted_at: Ecto.DateTime.utc,
          create_time: msg.createtime,
          app_id: app_id})

      "event" ->
        AppWcpMessage.index(%{from: wcp_user,
          to: %{openid: msg.tousername, nickname: "系统"},
          msg_type: msg.msgtype,
          content: "event: #{msg.event}, event_key: #{Map.get(msg, :eventkey, "null")}",
          create_time: msg.createtime,
          inserted_at: Ecto.DateTime.utc,
          app_id: app_id})
      _ ->
        :do_nothing
    end

    case AppWcpResponse.build_reply(app_id, msg) do
      nil ->
        info "response is nil, return success"
        conn |> text("success")

      %{} = reply ->
        AppWcpMessage.index(%{to: wcp_user,
          from: %{openid: reply.from, nickname: "系统"},
          msg_type: "text",
          content: reply.content,
          inserted_at: Ecto.DateTime.utc,
          app_id: app_id})
        conn |> render("text.xml", reply: reply)
    end
  end
end