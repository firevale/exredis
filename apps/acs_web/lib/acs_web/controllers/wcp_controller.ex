defmodule AcsWeb.WcpController do
  use AcsWeb, :controller

  alias Acs.Wcp
  alias Acs.Wcp.AppWcpConfig

  plug Exwcp.Plugs.CheckUrlSignature
  plug Exwcp.Plugs.CheckMsgSignature when action in [:on_receive_message]

  def index(conn, %{"echostr" => echostr}) do
    conn |> text(echostr)
  end

  def on_receive_message(conn, %{"app_id" => app_id} = _params) do
    msg = conn.assigns[:msg]

    Process.spawn(fn() ->
      case Acs.Wcp.get_app_wcp_config(app_id) do 
        %AppWcpConfig{} = config ->
          openid = msg.fromusername
          user_info =  Exwcp.User.info(config, openid)

          case Map.get(user_info, :openid) do
            ^openid ->
              case Wcp.get_app_wcp_user(app_id, openid) do
                nil ->
                  Wcp.create_app_wcp_user!(%{
                    openid: user_info.openid,
                    nickname: user_info.nickname,
                    sex: user_info.sex,
                    avatar_url: user_info.headimgurl,
                    city: user_info.city,
                    country: user_info.country,
                    app_id: app_id
                  }) 

                wcp_user ->
                  Wcp.update_app_wcp_user!(wcp_user, %{
                    openid: user_info.openid,
                    nickname: user_info.nickname,
                    sex: user_info.sex,
                    avatar_url: user_info.headimgurl,
                    city: user_info.city,
                    country: user_info.country,
                    app_id: app_id
                  }) 
              end
            _ ->
              :do_nothing
          end
        _ ->
          :do_nothing
      end
    end, [])

    wcp_user = CachedAppWcpUser.get(app_id, msg.fromusername)

    case msg.msgtype do
      "text" ->
        ESWcpMessage.index(%{from: wcp_user,
          to: %{openid: msg.tousername, nickname: "系统"},
          msg_type: msg.msgtype,
          content: msg.content,
          inserted_at: Ecto.DateTime.utc,
          create_time: msg.createtime,
          app_id: app_id})

      "event" ->
        ESWcpMessage.index(%{from: wcp_user,
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
        ESWcpMessage.index(%{to: wcp_user,
          from: %{openid: reply.from, nickname: "系统"},
          msg_type: "text",
          content: reply.content,
          inserted_at: Ecto.DateTime.utc,
          app_id: app_id})
        conn |> render("text.xml", reply: reply)
    end
  end
end