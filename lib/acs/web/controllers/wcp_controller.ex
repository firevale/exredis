defmodule Acs.Web.WcpController do
  use Acs.Web, :controller

  plug Wcp.Plugs.CheckUrlSignature
  plug Wcp.Plugs.CheckMsgSignature when action in [:on_receive_message]

  alias Acs.AppWcpResponse
  alias Acs.AppWcpMessage
  alias Acs.AppWcpUser
  alias Acs.RedisAppWcpUser

  require Wcp.User

  def index(conn, %{"echostr" => echostr}) do
    conn |> text(echostr)
  end

  def on_receive_message(conn, %{"app_id" => app_id} = params) do
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

    case msg.msgtype do 
      "text" ->
        AppWcpMessage.changeset(%AppWcpMessage{}, 
          %{from: msg.fromusername, 
            to: msg.tousername, 
            msg_type: msg.msgtype, 
            content: msg.content, 
            create_time: msg.createtime,
            app_id: app_id}) |> Repo.insert

      "event" -> 
        AppWcpMessage.changeset(%AppWcpMessage{}, 
          %{from: msg.fromusername, 
            to: msg.tousername, 
            msg_type: msg.msgtype, 
            content: "event: #{msg.event}, event_key: #{Map.get(msg, :eventkey, "null")}", 
            create_time: msg.createtime,
            app_id: app_id}) |> Repo.insert
      _ ->
        :do_nothing
    end
    
    case AppWcpResponse.build_reply(app_id, msg) do 
      nil ->
        info "response is nil, return success"
        conn |> text("success") 

      %{} = reply ->
        AppWcpMessage.changeset(%AppWcpMessage{}, 
          %{from: reply.from, 
            to: reply.to, 
            msg_type: "text", 
            content: reply.content, 
            create_time: DateTime.to_unix(DateTime.utc_now),
            app_id: app_id}) |> Repo.insert        
        conn |> render("text.xml", reply: reply)
    end
  end
end