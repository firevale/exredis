defmodule AcsWeb.WcpController do
  use AcsWeb, :controller

  alias Acs.Wcp
  alias Acs.Wcp.AppWcpConfig
  alias Acs.Wcp.AppWcpResponse

  plug Exwcp.Plugs.CheckUrlSignature, [fun: &__MODULE__.get_wcp_config/1]
  plug Exwcp.Plugs.CheckMsgSignature, [fun: &__MODULE__.get_wcp_config/1] when action in [:on_receive_message] 

  def get_wcp_config(%{params: %{"app_id" => app_id}}) do 
    Acs.Wcp.get_app_wcp_config(app_id)
  end

  def index(conn, %{"echostr" => echostr}) do
    conn |> text(echostr)
  end

  def on_receive_message(conn, %{"app_id" => app_id} = _params) do
    msg = conn.assigns[:msg]

    with config = %AppWcpConfig{} <- Acs.Wcp.get_app_wcp_config(app_id),
         reply <- AppWcpResponse.build_reply(app_id, msg),
         wcp_user <- Wcp.get_app_wcp_user(app_id, openid: msg.fromusername) 
    do 
      Process.spawn(fn() ->
        try do 
          openid = msg.fromusername

          wcp_user = if is_nil(wcp_user) do 
            user_info =  Exwcp.User.info(config, openid)
            Wcp.create_app_wcp_user!(%{
              openid: user_info.openid,
              nickname: user_info.nickname,
              sex: user_info.sex,
              avatar_url: user_info.headimgurl |> String.replace_leading("http:", ""),
              city: user_info.city,
              country: user_info.country,
              app_id: app_id
            }) 
          else 
            wcp_user
          end

          ESWcpMessage.index(%{from: %{
              openid: wcp_user.openid, 
              nickname: wcp_user.nickname,
              avatar_url: wcp_user.avatar_url 
              },
            to: %{openid: msg.tousername, nickname: "系统"},
            msg_type: msg.msgtype,
            content: case msg.msgtype do 
              "text" -> msg.content
              "event" -> "event: #{msg.event}, event_key: #{Map.get(msg, :eventkey, "null")}"
            end,
            inserted_at: Ecto.DateTime.utc(),
            create_time: msg.createtime,
            app_id: app_id})

          if is_map(reply) do 
            ESWcpMessage.index(%{to: %{openid: wcp_user.openid, nickname: wcp_user.nickname},
              from: %{openid: reply.from, nickname: "系统"},
              msg_type: "text",
              content: reply.content,
              inserted_at: Ecto.DateTime.utc(),
              app_id: app_id})
          end
        rescue
          exception -> Bugsnag.report(exception)
        end
      end, [])

      if is_map(reply) do 
        conn |> render("text.xml", reply: reply)
      else 
        conn |> text("success")
      end
    else 
      _ ->
        conn |> text("success")
    end
  end
end