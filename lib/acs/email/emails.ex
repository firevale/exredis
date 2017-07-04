defmodule Acs.Emails do 
  import Bamboo.Email
  use    Bamboo.Phoenix, view: Acs.Web.EmailView
  import Acs.Web.Gettext

  require Utils

  def reset_password(locale, email, token) do 
    nickname = Utils.nickname_from_email(email)

    base_email(locale)
      |> to({nickname, email})
      |> subject(gettext("Firevale account password reset token"))
      |> assign(:token, token)
      |> assign(:name, nickname)
      |> render(:reset_password)
  end

  defp base_email(locale) do
    Gettext.put_locale(Acs.Gettext, locale)

    new_email()
    |> put_html_layout({Acs.Web.LayoutView, "email.html"})
  end
end