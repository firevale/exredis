defmodule Exmail.EmailService do 
  use Utils.LogAlias

  @mailer Application.get_env(:exmail, :email_service_provider, Exmail.LocalMailer)

  def deliver_reset_password(_, nil, _) do 
    error "user email is nil, can't send password token to a nil email address"
  end
  def deliver_reset_password(_, "", _) do 
    error "user email is empty, can't send password token to a blank email address"
  end
  def deliver_reset_password(locale, email, token) do 
    apply(@mailer, :deliver_reset_password, [locale, email, token])
  end
 
end