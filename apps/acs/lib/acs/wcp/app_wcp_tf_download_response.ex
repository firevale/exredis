defmodule Acs.Wcp.AppWcpTFDownloadResponse do
  import  Ecto.Query
  use     Utils.LogAlias
  require Exredis
  require Excache
  
  alias Acs.Repo
  alias Acs.Cache.CachedApp
  alias Acs.Cache.CachedAppWcpUser
  alias Acs.Cache.CachedAppWcpConfig
  alias Acs.Wcp.AppWcpConfig
  alias Acs.Wcp.AppWcpUser

  def build_reply_content(app_id, from) do 
    case CachedApp.get(app_id) do 
      %{} = app ->
        case CachedAppWcpConfig.get(app_id) do 
          %AppWcpConfig{} = cfg ->
            if app.wcp_download_enabled do 
              case AppLoginCode.find_by_openid(app_id, from) do 
                nil ->
                  cfg.tf_download_no_login_code_template
                code ->
                  Exredis.setex("_wcp.tfd_wait_email.#{app_id}.#{from}", 3600, code)
                  cfg.tf_download_template
              end
            else 
              cfg.download_disabled_template
            end
          _ -> nil
        end
      _ -> nil
    end
  end

  def is_waiting_email(app_id, open_id) do 
    Exredis.exists("_wcp.tfd_wait_email.#{app_id}.#{open_id}") == 1
  end

  def build_email_reply(app_id, open_id, email) do 
    email = String.downcase(email)
    case CachedApp.get(app_id) do 
      %{} = app ->
        case CachedAppWcpConfig.get(app_id) do 
          %AppWcpConfig{} = cfg ->
            if Regex.match?(~r/\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i, email) do 
              case CachedAppWcpUser.find_by_email(app_id, email) do 
                %AppWcpUser{openid: ^open_id, tf_email: ^email} -> 
                  String.replace(cfg.tf_already_invited_template, "#email", email)
                nil ->
                  _invite_user(app_id, open_id, email)
                  String.replace(cfg.tf_download_email_received_template, "#email", email)
                _ ->
                  String.replace(cfg.tf_email_used_template, "#email", email)
              end
            else
              String.replace(cfg.tf_invalid_email_template, "email", email)
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

  defp _invite_user(app_id, open_id, email) do 
    Task.Supervisor.async(Acs.TaskSupervisor, fn ->
      case CachedAppWcpConfig.get(app_id) do 
        %AppWcpConfig{} = cfg ->
          if TestFlight.is_tester?(app_id, email) do 
            content = String.replace(cfg.tf_already_invited_template, "#email", email)
            Exwcp.Message.Custom.send_text(app_id, open_id, content)  
          else 
            case CachedAppWcpUser.get(app_id, open_id) do 
              nil ->
                error "invite tf tester error:  can't find app wcp user, app_id: #{app_id}, open_id: #{open_id}"
                :ok 
              %AppWcpUser{openid: ^open_id, tf_email: nil, nickname: nickname} = wcp_user ->
                case TestFlight.invite(app_id, email, nickname) do 
                  {:ok, status, num_testers} ->
                    if num_testers >= 9900 do 
                      Excache.del(:default, "_acs.itc_active_app.#{app_id}")
                    end
                    Exredis.del("_wcp.tfd_wait_email.#{app_id}.#{open_id}")
                    {:ok, wcp_user} = AppWcpUser.changeset(wcp_user, %{tf_email: email}) |> Repo.update
                    CachedAppWcpUser.refresh(wcp_user)
                    content = String.replace(cfg.new_tf_email_template, "#email", email)
                    Exwcp.Message.Custom.send_text(app_id, open_id, content)  

                  {:error, :quata} -> 
                    Exredis.del("_wcp.tfd_wait_email.#{app_id}.#{open_id}")
                    content = String.replace(cfg.tf_tester_full_template, "#email", email)
                    Exwcp.Message.Custom.send_text(app_id, open_id, content)  

                  _ ->
                    content = String.replace(cfg.tf_invite_failed_template, "#email", email)
                    Exwcp.Message.Custom.send_text(app_id, open_id, content)  
                end
                
              %AppWcpUser{openid: ^open_id, tf_email: old_email, nickname: nickname} = wcp_user ->
                TestFlight.remove(app_id, old_email)
                CachedAppWcpUser.clear_cache(app_id, open_id, old_email)
                case TestFlight.invite(app_id, email, nickname) do 
                  {:ok, status, num_testers} ->
                    info "tester #{email} for #{nickname} added, status: #{status}"
                    if num_testers >= 9900 do 
                      Excache.del(:default, "_acs.itc_active_app.#{app_id}")
                    end
                    Exredis.del("_wcp.tfd_wait_email.#{app_id}.#{open_id}")
                    {:ok, wcp_user} = AppWcpUser.changeset(wcp_user, %{tf_email: email}) |> Repo.update
                    CachedAppWcpUser.refresh(wcp_user)
                    content = String.replace(cfg.update_tf_email_template, "#email", email)
                    content = String.replace(content, "#old_email", old_email)
                    Exwcp.Message.Custom.send_text(app_id, open_id, content)  

                  {:error, :quata} -> 
                    Exredis.del("_wcp.tfd_wait_email.#{app_id}.#{open_id}")
                    content = String.replace(cfg.tf_tester_full_template, "#email", email)
                    Exwcp.Message.Custom.send_text(app_id, open_id, content)  

                  _ ->
                    content = String.replace(cfg.tf_invite_failed_template, "#email", email)
                    Exwcp.Message.Custom.send_text(app_id, open_id, content)  
                end                
            end
          end
        _ ->
          error "invite tf tester error: wcp config not found for #{app_id}"
      end
    end)
  end
end
