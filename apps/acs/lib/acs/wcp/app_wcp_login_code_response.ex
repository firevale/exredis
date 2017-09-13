defmodule Acs.Wcp.AppWcpLoginCodeResponse do
  use   Utils.LogAlias

  alias Acs.Cache.CachedApp
  alias Acs.Cache.CachedAppWcpConfig
  alias Acs.Wcp.AppWcpConfig
  alias Acs.LoginCodes.AppLoginCode
  alias Acs.LoginCodes

  def build_reply_content(app_id, from) do 
    case CachedApp.get(app_id) do 
      %{} = app ->
        case CachedAppWcpConfig.get(app_id) do 
          %AppWcpConfig{} = cfg ->
            if app.can_assign_code do 
              case LoginCodes.get_login_code(app_id, openid: from) do 
                x when x in [nil, "undefined"] ->
                  case LoginCodes.assign_code(app_id, openid: from) do 
                    nil ->
                      cfg.no_code_template || "所有激活码已全部发放完成(默认回复，请在后台编辑此消息)"
                    
                    code ->
                      _build_content(cfg.new_code_template, code) 
                  end

                code ->
                  _build_content(cfg.owned_code_template, code)
              end
            else 
              cfg.closed_template || "激活码领取未开启(默认回复，请在后台编辑本消息)"
            end
          _ -> nil
        end
      _ -> nil
    end
  end

  defp _build_content(nil, code), do: code
  defp _build_content(response, code) do 
    String.replace(response, "#code", code)
  end
end
