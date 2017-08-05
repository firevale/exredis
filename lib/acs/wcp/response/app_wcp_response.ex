defmodule Acs.AppWcpResponse do 
  use   LogAlias
  alias Acs.RedisApp
  alias Acs.WcpLoginCodeResponse
  alias Acs.WcpTFDownloadResponse
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
      %{wcp_download_enabled: wcp_download_enabled} ->
        if WcpTFDownloadResponse.is_waiting_email(app_id, msg.fromusername) do 
            %{from: msg.tousername, 
              to: msg.fromusername, 
              content: WcpTFDownloadResponse.build_email_reply(app_id, msg.fromusername, msg.content)}
        else 
          case RedisAppWcpMessageRule.get_all(app_id) do 
            nil ->
              _build_default_text_reply(app_id, msg)

            rules ->
              case Map.get(rules, msg.content) do 
                nil ->
                  _build_default_text_reply(app_id, msg)
                
                ":login_code" -> 
                  case WcpLoginCodeResponse.build_reply_content(app_id, msg.fromusername) do 
                    nil -> nil
                    content -> 
                      %{from: msg.tousername, 
                        to: msg.fromusername, 
                        content: content}
                  end

                ":android_download" ->
                  case _android_download_message(app_id) do 
                    nil -> nil
                    content -> 
                      %{from: msg.tousername, 
                        to: msg.fromusername, 
                        content: content }
                  end

                ":ios_download" ->
                  case _ios_download_message(app_id) do 
                    nil -> nil
                    content -> 
                      %{from: msg.tousername, 
                        to: msg.fromusername, 
                        content: content }
                  end

                ":tf_download" ->
                  case WcpTFDownloadResponse.build_reply_content(app_id, msg.fromusername) do 
                    nil -> nil
                    content -> 
                      %{from: msg.tousername, 
                        to: msg.fromusername, 
                        content: content}                
                  end
                  
                response when is_bitstring(response) ->
                  %{from: msg.tousername, to: msg.fromusername, content: response}

                _ -> 
                  nil
              end
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
  defp _build_event_reply(app_id, 
    %{msgtype: "event", event: "CLICK", eventkey: "ios_download"} = msg, _cfg) do 
    case _ios_download_message(app_id) do 
      nil -> nil
      content -> 
        %{from: msg.tousername, 
          to: msg.fromusername, 
          content: content}
    end
  end
  defp _build_event_reply(app_id, 
    %{msgtype: "event", event: "CLICK", eventkey: "android_download"} = msg, _cfg) do 
    case _android_download_message(app_id) do 
      nil -> nil
      content -> 
        %{from: msg.tousername, 
          to: msg.fromusername, 
          content: content}
    end
  end
  defp _build_event_reply(app_id, 
    %{msgtype: "event", event: "CLICK", eventkey: "tf_download"} = msg, _cfg) do 
    case WcpTFDownloadResponse.build_reply_content(app_id, msg.fromusername) do 
      nil -> nil
      content -> 
        %{from: msg.tousername, 
          to: msg.fromusername, 
          content: content}     
    end
  end
  defp _build_event_reply(app_id, %{msgtype: "event"}, _cfg), do: nil

  defp _android_download_message(app_id) do 
    case RedisApp.find(app_id) do 
      nil -> nil
      %{wcp_download_enabled: wcp_download_enabled} ->
        case RedisAppWcpConfig.find(app_id) do 
          nil -> nil
          %AppWcpConfig{
            download_disabled_template: download_disabled_template,
            android_download_template: android_download_template
          } ->
            if wcp_download_enabled do 
              android_download_template                        
            else 
              download_disabled_template                        
            end
        end
    end
  end

  defp _ios_download_message(app_id) do 
    case RedisApp.find(app_id) do 
      nil -> nil
      %{wcp_download_enabled: wcp_download_enabled} ->
        case RedisAppWcpConfig.find(app_id) do 
          nil -> nil
          %AppWcpConfig{
            download_disabled_template: download_disabled_template,
            ios_download_template: ios_download_template
          } ->
            if wcp_download_enabled do 
              ios_download_template                        
            else 
              download_disabled_template                        
            end
        end
    end
  end

end