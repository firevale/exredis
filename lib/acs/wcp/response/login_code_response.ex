defmodule Acs.WcpLoginCodeResponse do 
  alias Acs.AppWcpConfig
  alias Acs.RedisAppWcpConfig
  alias Acs.AppLoginCode
  alias Acs.RedisApp 

  alias   Acs.Repo
  import  Ecto.Query

  alias   Ecto.Adapters.SQL

  defmodule Scripts do
    import Redis.Script

    defredis_script :rand_code, file_path: "lua/rand_code.lua"
  end


  def build_reply_content(app_id, from) do 
    case RedisApp.find(app_id) do 
      %{} = app ->
        case RedisAppWcpConfig.find(app_id) do 
          %AppWcpConfig{} = cfg ->
            if app.can_assign_code do 
              case AppLoginCode.find_by_openid(app_id, from) do 
                nil ->
                  case Scripts.rand_code([app_id], []) do 
                    "undefined" ->
                      cfg.no_code_template || "所有激活码已全部发放完成(默认回复，请在后台编辑此消息)"
                    
                    code ->
                      AppLoginCode.changeset(%AppLoginCode{}, %{
                        code: code,
                        owner: "openid.#{from}",
                        assigned_at: DateTime.utc_now(),
                        app_id: app_id
                      }) |> Repo.insert!

                      AppLoginCode.clear_stats_cache(app_id)
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