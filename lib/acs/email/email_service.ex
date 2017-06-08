defmodule Acs.EmailService do 
  require Logger

  @mailer Application.get_env(:acs, :email_service_provider, Acs.LocalMailer)

  def deliver_reset_password(_, nil, _) do 
    Logger.error "user email is nil, can't send password token to a nil email address"
  end
  def deliver_reset_password(_, "", _) do 
    Logger.error "user email is empty, can't send password token to a blank email address"
  end
  def deliver_reset_password(locale, email, token) do 
    apply(@mailer, :deliver_reset_password, [locale, email, token])
  end
 
end