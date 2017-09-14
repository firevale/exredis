defmodule Acs.Wcp.AppWcpTFDownloadResponse do
  use     Utils.LogAlias
  require Exredis
  require Excache
  
  alias Acs.Apps
  alias Acs.Wcp
  alias Acs.LoginCodes

  alias Acs.Wcp.AppWcpConfig
  alias Acs.Wcp.AppWcpUser

  alias Acs.Apps.App

  alias Exservice.TestFlight

  def build_reply_content(app_id, from) do 
    with app = %App{} <- Apps.get_app(app_id),
         cfg = %AppWcpConfig{} <- Wcp.get_app_wcp_config(app_id) 
    do
      if app.wcp_download_enabled do 
        case LoginCodes.get_login_code(app_id, openid: from) do 
          nil ->
            cfg.tf_download_no_login_code_template

          code ->
            Exredis.setex("_wcp.tfd_wait_email.#{app_id}.#{from}", 3600, code)
            cfg.tf_download_template
        end
      else 
        cfg.download_disabled_template
      end
    else 
      _ -> nil
    end
  end

  def is_waiting_email(app_id, open_id) do 
    Exredis.exists("_wcp.tfd_wait_email.#{app_id}.#{open_id}") == 1
  end

  def build_email_reply(app_id, open_id, email) do 
    with email = String.downcase(email),
         _app = %App{} <- Apps.get_app(app_id),
         cfg = %AppWcpConfig{} <- Wcp.get_app_wcp_config(app_id) 
    do 
      if Regex.match?(~r/\A([\w+\-].?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i, email) do 
        case Wcp.get_app_wcp_user(app_id, email: email) do 
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
    else
      _ -> nil
    end
  end

  defp _invite_user(app_id, open_id, email) do 
    Process.spawn(fn ->
      with _app = %App{itc_app_id: itc_app_id} <- Apps.get_app(app_id),
           cfg = %AppWcpConfig{} <- Wcp.get_app_wcp_config(app_id) 
      do 
        if TestFlight.is_tester?(itc_app_id, email) do 
          content = String.replace(cfg.tf_already_invited_template, "#email", email)
          Exwcp.Message.Custom.send_text(cfg, open_id, content)  
        else 
          case Wcp.get_app_wcp_user(app_id, openid: open_id) do 
            nil ->
              error "invite tf tester error:  can't find app wcp user, app_id: #{app_id}, open_id: #{open_id}"
              :ok 

            %AppWcpUser{openid: ^open_id, tf_email: nil, nickname: nickname} = wcp_user ->
              case TestFlight.add_tester!(itc_app_id, email, nickname) do 
                {:ok, _status, _num_testers} ->
                  Exredis.del("_wcp.tfd_wait_email.#{app_id}.#{open_id}")
                  Wcp.update_app_wcp_user!(wcp_user, %{tf_email: email})
                  content = String.replace(cfg.new_tf_email_template, "#email", email)
                  Exwcp.Message.Custom.send_text(cfg, open_id, content)  

                {:error, :quata} -> 
                  Exredis.del("_wcp.tfd_wait_email.#{app_id}.#{open_id}")
                  content = String.replace(cfg.tf_tester_full_template, "#email", email)
                  Exwcp.Message.Custom.send_text(cfg, open_id, content)  

                _ ->
                  content = String.replace(cfg.tf_invite_failed_template, "#email", email)
                  Exwcp.Message.Custom.send_text(cfg, open_id, content)  
              end
              
            %AppWcpUser{openid: ^open_id, tf_email: old_email, nickname: nickname} = wcp_user ->
              TestFlight.del_tester!(itc_app_id, old_email)
              wcp_user = Wcp.update_app_wcp_user!(wcp_user, %{tf_email: nil}) 

              case TestFlight.add_tester!(itc_app_id, email, nickname) do 
                {:ok, status, _num_testers} ->
                  info "tester #{email} for #{nickname} added, status: #{status}"
                  Exredis.del("_wcp.tfd_wait_email.#{app_id}.#{open_id}")
                  Wcp.update_app_wcp_user!(wcp_user, %{tf_email: email}) 
                  content = String.replace(cfg.update_tf_email_template, "#email", email)
                  content = String.replace(content, "#old_email", old_email)
                  Exwcp.Message.Custom.send_text(cfg, open_id, content)  

                {:error, :quata} -> 
                  Exredis.del("_wcp.tfd_wait_email.#{app_id}.#{open_id}")
                  content = String.replace(cfg.tf_tester_full_template, "#email", email)
                  Exwcp.Message.Custom.send_text(cfg, open_id, content)  

                _ ->
                  content = String.replace(cfg.tf_invite_failed_template, "#email", email)
                  Exwcp.Message.Custom.send_text(cfg, open_id, content)  
              end                
          end
        end
      else  
        _ ->
          error "invite tf tester error: wcp config not found for #{app_id}"
      end
    end, [])
  end
end
