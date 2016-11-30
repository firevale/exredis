defmodule Acs.MandrillMailer do
  use    Bamboo.Mailer, otp_app: :acs
  import Bamboo.Email
  import Acs.Gettext
  alias  Acs.Emails

  @noreply "noreply@fvac.firevale.com"

  @config Application.get_env(:acs, Acs.MandrillMailer, [from: @noreply, reply: @noreply]) 
  @from @config[:from]
  @reply @config[:reply]

  def deliver_reset_password(locale, email, token) do 
    Emails.reset_password(locale, email, token) 
      |> put_header("Reply-To", @reply)  
      |> from({gettext("Firevale Account Center"), @from})
      |> deliver_later 
  end
end