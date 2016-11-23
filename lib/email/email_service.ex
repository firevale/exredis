defmodule Acs.EmailService do 
  alias   Acs.RedisUser
  require Logger

  @mailer Application.get_env(:acs, :email_service_provider, Acs.LocalMailer)

  def deliver_reset_password(_, %RedisUser{email: nil}, _) do 
    Logger.error "user email is nil, can't send password token to a nil email address"
  end
  def deliver_reset_password(_, %RedisUser{email: ""}, _) do 
    Logger.error "user email is empty, can't send password token to a blank email address"
  end
  def deliver_reset_password(locale, %RedisUser{} = user, token) do 
    apply(@mailer, :deliver_reset_password, [locale, user, token])
  end
 
end