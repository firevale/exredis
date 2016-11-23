defmodule Acs.EmailService do 
  alias   Acs.RedisUser
  require Logger

  def deliver_reset_password(_, %RedisUser{email: nil}, _) do 
    Logger.error "user email is nil, can't send password token to a nil email address"
  end
  def deliver_reset_password(_, %RedisUser{email: ""}, _) do 
    Logger.error "user email is empty, can't send password token to a blank email address"
  end

  if Mix.env == "dev" do 
    # import  Bamboo.Email
    # alias   Acs.Emails
    # alias   Acs.LocalMailer

    def deliver_reset_password(locale, %RedisUser{} = user, token) do 
      Emails.reset_password(locale, user, token) 
        |> put_header("Reply-To", "noreply@firevale.com")  
        |> from({gettext("Firevale Account Center"), "noreply@firevale.com"})
        |> LocalMailer.deliver_later
    end 
  else
    @email_service_config Application.get_env(:acs, :email_service_provider, [])
    @provider @email_service_config[:provider]
    @from @email_service_config[:from]
    @reply @email_service_config[:reply]
    case Application.get_env(:acs, :email_service_provider, nil) do 
      :mandrill ->
        # import  Bamboo.Email
        # alias   Acs.Emails
        # alias   Acs.MandrillMailer    
        def deliver_reset_password(locale, %RedisUser{} = user, token) do 
          Emails.reset_password(locale, user, token) 
            |> put_header("Reply-To", @reply)  
            |> from({gettext("Firevale Account Center"), @from})
            |> MandrillMailer.deliver_later 
        end

      :sendcloud ->
        alias Acs.SendCloudMailer 
        def deliver_reset_password(locale, %RedisUser{} = user, token) do 
          template =  case locale do 
                        "en" -> "fvac_resetPasswordCode_enUs"
                        "zh-Hans" -> "fvac_resetPasswordCode_zhCn" 
                        "zh-Hant" -> "fvac_resetPasswordCode_zhCn" #TODO: add traditional chinese support  
                        _ -> "fvac_resetPasswordCode_enUs"
                      end

          vars = JSON.encode! %{to: [user.email], 
                                sub: %{"%name%" => [User.nickname(user)],
                                      "%token%" => [token]}
                              }

          SendCloudMailer.send_template(user.email, template, vars, 20644)
       end

      _ ->
       def deliver_reset_password(_, %RedisUser{} = user, _) do 
         Logger.error ":email_service_provider is not configured, don't know how to deliver password token to #{user.email}"
       end
    end
  end
end