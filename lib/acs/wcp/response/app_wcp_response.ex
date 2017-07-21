defmodule Acs.AppWcpResponse do 
  use   LogAlias
  alias Acs.RedisApp
  alias Acs.WcpLoginCodeResponse
  alias Acs.AppWcpConfig
  alias Acs.RedisAppWcpConfig
  alias Acs.RedisAppWcpMessageRule

  def build_reply(app_id, %{msgtype: "event"} = msg) do 
    case RedisApp.find(app_id) do 
      nil -> nil
      %{} ->
        case RedisAppWcpConfig.find(app_id) do 
          %AppWcpConfig{} = wcp_cfg ->
            _build_event_reply(app_id, msg, wcp_cfg)
          _ -> 
            nil
        end
    end
  end
  def build_reply(app_id, %{msgtype: "text"} = msg) do 
    case RedisApp.find(app_id) do 
      nil -> nil
      %{} ->
        case RedisAppWcpMessageRule.get_all(app_id) do 
          nil ->
            _build_default_text_reply(app_id, msg)

          rules ->
            case Map.get(rules, msg.content) do 
              nil ->
                _build_default_text_reply(app_id, msg)
              
              ":login_code" -> 
                %{from: msg.tousername, 
                  to: msg.fromusername, 
                  content: WcpLoginCodeResponse.build_reply_content(app_id, msg.fromusername)}
                
              response when is_bitstring(response) ->
                %{from: msg.tousername, to: msg.fromusername, content: response}

              _ -> 
                nil
            end
        end
    end
  end
  def build_reply(_, _), do: nil

  defp _build_default_text_reply(app_id, msg) do 
    case RedisAppWcpConfig.find(app_id) do 
      %AppWcpConfig{default_response: nil} -> nil
      %AppWcpConfig{default_response: default_response}  -> 
        %{from: msg.tousername,
          to: msg.fromusername,
          content: default_response}
      _ -> nil
    end
  end

  defp _build_event_reply(app_id, 
    %{msgtype: "event", event: "subscribe"}, 
    %{subscribed_response: nil}), do: nil
  defp _build_event_reply(app_id, 
    %{msgtype: "event", event: "subscribe"} = msg, 
    %{subscribed_response: ":login_code"}) do 
    %{from: msg.tousername, 
      to: msg.fromusername, 
      content: WcpLoginCodeResponse.build_reply_content(app_id, msg.fromusername)}
  end
  defp _build_event_reply(app_id, 
    %{msgtype: "event", event: "subscribe"} = msg, 
    %{subscribed_response: response}) do 
    %{from: msg.tousername, 
      to: msg.fromusername, 
      content: response}
  end
  defp _build_event_reply(app_id, 
    %{msgtype: "event", event: "SCAN"}, 
    %{scan_response: nil}), do: nil 
  defp _build_event_reply(app_id, 
    %{msgtype: "event", event: "SCAN"} = msg, 
    %{scan_response: ":login_code"}) do 
    %{from: msg.tousername, 
      to: msg.fromusername, 
      content: WcpLoginCodeResponse.build_reply_content(app_id, msg.fromusername)}
  end
  defp _build_event_reply(app_id, 
    %{msgtype: "event", event: "SCAN"} = msg, 
    %{scan_response: response}) do 
    %{from: msg.tousername, 
      to: msg.fromusername, 
      content: response}
  end
  # 自定义菜单事件
  defp _build_event_reply(app_id, 
    %{msgtype: "event", event: "CLICK", eventkey: "assign_login_code"} = msg, _cfg) do 
    %{from: msg.tousername, 
      to: msg.fromusername, 
      content: WcpLoginCodeResponse.build_reply_content(app_id, msg.fromusername)}
  end
  defp _build_event_reply(app_id, %{msgtype: "event"}, _cfg), do: nil

end