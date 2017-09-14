defmodule Acs.Wcp.AppWcpResponse do

  alias Acs.Wcp.AppWcpConfig
  
  alias Acs.Cache.CachedApp
  alias Acs.Cache.CachedAppWcpConfig
  alias Acs.Cache.CachedAppWcpMessageRule

  alias Acs.Wcp.AppWcpTFDownloadResponse
  alias Acs.Wcp.AppWcpLoginCodeResponse

  def build_reply(app_id, %{msgtype: "event"} = msg) do 
    case CachedApp.get(app_id) do 
      nil -> nil
      %{} ->
        case CachedAppWcpConfig.get(app_id) do 
          %AppWcpConfig{} = wcp_cfg ->
            _build_event_reply(app_id, msg, wcp_cfg)
          _ -> 
            nil
        end
    end
  end
  def build_reply(app_id, %{msgtype: "text"} = msg) do 
    case CachedApp.get(app_id) do 
      nil -> nil
      %{wcp_download_enabled: _wcp_download_enabled} ->
        if AppWcpTFDownloadResponse.is_waiting_email(app_id, msg.fromusername) do 
            %{from: msg.tousername, 
              to: msg.fromusername, 
              content: AppWcpTFDownloadResponse.build_email_reply(app_id, msg.fromusername, msg.content)}
        else 
          case CachedAppWcpMessageRule.get_all(app_id) do 
            nil ->
              _build_default_text_reply(app_id, msg)

            rules ->
              case Map.get(rules, msg.content) do 
                nil ->
                  _build_default_text_reply(app_id, msg)
                
                ":login_code" -> 
                  case AppWcpLoginCodeResponse.build_reply_content(app_id, msg.fromusername) do 
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
                  case AppWcpTFDownloadResponse.build_reply_content(app_id, msg.fromusername) do 
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
    case CachedAppWcpConfig.get(app_id) do 
      %AppWcpConfig{default_response: nil} -> nil
      %AppWcpConfig{default_response: default_response}  -> 
        %{from: msg.tousername,
          to: msg.fromusername,
          content: default_response}
      _ -> nil
    end
  end

  defp _build_event_reply(_app_id, 
    %{msgtype: "event", event: "subscribe"}, 
    %{subscribed_response: nil}), do: nil
  defp _build_event_reply(app_id, 
    %{msgtype: "event", event: "subscribe"} = msg, 
    %{subscribed_response: ":login_code"}) do 
    %{from: msg.tousername, 
      to: msg.fromusername, 
      content: AppWcpLoginCodeResponse.build_reply_content(app_id, msg.fromusername)}
  end
  defp _build_event_reply(_app_id, 
    %{msgtype: "event", event: "subscribe"} = msg, 
    %{subscribed_response: response}) do 
    %{from: msg.tousername, 
      to: msg.fromusername, 
      content: response}
  end
  defp _build_event_reply(_app_id, 
    %{msgtype: "event", event: "SCAN"}, 
    %{scan_response: nil}), do: nil 
  defp _build_event_reply(app_id, 
    %{msgtype: "event", event: "SCAN"} = msg, 
    %{scan_response: ":login_code"}) do 
    %{from: msg.tousername, 
      to: msg.fromusername, 
      content: AppWcpLoginCodeResponse.build_reply_content(app_id, msg.fromusername)}
  end
  defp _build_event_reply(_app_id, 
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
      content: AppWcpLoginCodeResponse.build_reply_content(app_id, msg.fromusername)}
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
    case AppWcpTFDownloadResponse.build_reply_content(app_id, msg.fromusername) do 
      nil -> nil
      content -> 
        %{from: msg.tousername, 
          to: msg.fromusername, 
          content: content}     
    end
  end
  defp _build_event_reply(_app_id, %{msgtype: "event"}, _cfg), do: nil

  defp _android_download_message(app_id) do 
    case CachedApp.get(app_id) do 
      nil -> nil
      %{wcp_download_enabled: wcp_download_enabled} ->
        case CachedAppWcpConfig.get(app_id) do 
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
    case CachedApp.get(app_id) do 
      nil -> nil
      %{wcp_download_enabled: wcp_download_enabled} ->
        case CachedAppWcpConfig.get(app_id) do 
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
