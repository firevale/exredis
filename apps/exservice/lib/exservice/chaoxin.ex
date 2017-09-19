defmodule Exservice.Chaoxin do
  use     Utils.LogAlias
  alias   Utils.Httpc
  alias   Utils.JSON
  alias   Utils.Crypto
  require Exredis

  @chaoxin_cfg   Application.get_env(:exservice, Chaoxin, [api_key: "", default_group_id: ""])

  @api_key @chaoxin_cfg[:api_key]
  @default_group_id @chaoxin_cfg[:default_group_id]

  def send_text_msg(msg) do
    send_text_msg(msg, @default_group_id)
  end
  def send_text_msg(msg, %{chaoxin_group_id: nil}) do
    send_text_msg(msg)
  end
  def send_text_msg(msg, %{chaoxin_group_id: group_id}) do
    send_text_msg(msg, group_id)
  end
  def send_text_msg(msg, group_id) do
    group_ctl_key = "exservice.chaoxin.#{group_id}"
    msg_ctl_key = Crypto.md5_sign("exservice.chaoxin.#{group_id}.#{msg}")

    case Exredis.get(group_ctl_key) do
      nil ->
        case Exredis.get(msg_ctl_key) do
          nil ->
            response = Httpc.post_form("https://botapi.chaoxin.com/sendTextMessage/#{@api_key}", %{
              chat_type: 0,
              chat_id: group_id,
              text: msg
            })

            if Httpc.success?(response) do
              case JSON.decode(response.body) do
                {:ok, %{"result" => 0}} ->
                  Exredis.setex(group_ctl_key, 1, :already_send)
                  Exredis.setex(msg_ctl_key, 1800, :already_send)
                  :ok
                _ ->
                  error "chaoxin notify #{group_id}, msg: #{msg} failed: #{inspect response}"
              end
            else
              error "chaoxin notify #{group_id}, msg: #{msg} failed: #{inspect response}"
            end
          _ ->
            error "chaoxin notify #{group_id}, msg: #{msg} failed: can't send message now"
        end
      _ ->
        error "chaoxin notify #{group_id}, msg: #{msg} failed: can't send message now"
    end
  end
end
