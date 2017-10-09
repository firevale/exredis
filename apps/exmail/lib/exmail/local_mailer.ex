defmodule Exmail.LocalMailer do
  use    Bamboo.Mailer, otp_app: :exmail
  import Bamboo.Email
  import Exmail.Gettext
  alias  Exmail.Emails

  def deliver_reset_password(locale, email, token) do 
    Emails.reset_password(locale, email, token) 
      |> put_header("Reply-To", "noreply@firevale.com")  
      |> from({gettext("Firevale Account Center"), "noreply@firevale.com"})
      |> deliver_later

    :ok
  end
end
