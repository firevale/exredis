defmodule Acs.ChaoxinNotifier do 
  require Logger

  use     LogAlias
  require Redis
  alias   Utils.Httpc
  alias   Utils.JSON

  @chaoxin_cfg   Application.get_env(:acs, :chaoxin_bot, [api_key: "", default_group_id: ""])

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
    case Redis.get("chaoxin.#{group_id}") do 
      :undefined ->
        response = Httpc.post_msg("https://botapi.chaoxin.com/sendTextMessage/#{@api_key}", %{
          chat_type: 0,
          chat_id: group_id,
          text: msg
        })    

        if Httpc.success?(response) do 
          case JSON.decode(response.body) do 
            {:ok, %{"result" => 0}} -> 
              Redis.setex("chaoxin.#{group_id}", 1, :already_send)
              :ok
            _ -> 
              Logger.error "chaoxin notify #{group_id}, msg: #{msg} failed: #{inspect response}"
          end
        else 
          Logger.error "chaoxin notify #{group_id}, msg: #{msg} failed: #{inspect response}"
        end
      _ ->
        Logger.error "chaoxin notify #{group_id}, msg: #{msg} failed: can't send message now"
    end
  end
  


end