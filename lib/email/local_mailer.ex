defmodule Acs.LocalMailer do
  use    Bamboo.Mailer, otp_app: :acs
  import Bamboo.Email
  import Acs.Gettext
  alias  Acs.RedisUser
  alias  Acs.Emails

  def deliver_reset_password(locale, %RedisUser{} = user, token) do 
    Emails.reset_password(locale, user, token) 
      |> put_header("Reply-To", "noreply@firevale.com")  
      |> from({gettext("Firevale Account Center"), "noreply@firevale.com"})
      |> deliver_later
  end
end