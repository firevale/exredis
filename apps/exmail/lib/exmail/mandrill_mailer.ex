defmodule Exmail.MandrillMailer do
  use    Bamboo.Mailer, otp_app: :exmail
  import Bamboo.Email
  import Exmail.Gettext
  alias  Exmail.Emails

  @noreply "noreply@firevale.com"

  @config Application.get_env(:exmail, Exmail.MandrillMailer, [from: @noreply, reply: @noreply]) 
  @from @config[:from]
  @reply @config[:reply]

  def deliver_reset_password(locale, email, token) do 
    Emails.reset_password(locale, email, token) 
      |> put_header("Reply-To", @reply)  
      |> from({gettext("Firevale Account Center"), @from})
      |> deliver_later 
  end
end