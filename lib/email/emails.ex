defmodule Acs.Emails do 
  import Bamboo.Email
  use    Bamboo.Phoenix, view: Acs.EmailView
  import Acs.Gettext

  require Utils
  alias   Acs.RedisUser

  def reset_password(locale, %RedisUser{} = to, token, locale) do 
    nickname = to.nickname || Utils.nickname_from_email(to.email)

    base_email(locale)
      |> to(to.email)
      |> subject(gettext("Firevale account password reset token"))
      |> assign(:token, token)
      |> assign(:name, nickname)
      |> render(:reset_password)
  end

  defp base_email(locale) do
    Gettext.put_locale(Acs.Gettext, locale)

    new_email
    |> put_html_layout({Acs.LayoutView, "email.html"})
  end
end