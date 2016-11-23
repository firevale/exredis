defmodule Acs.Emails do 
  import Bamboo.Email
  import Acs.Gettext

  defp base_email(locale) do
    new_email
    |> from(gettext("Firevale Account Center") <> "<noreply@firevale.com>")
    |> put_header("Reply-To", "noreply@firevale.com")
    |> put_html_layout({Acs.LayoutView, "email.html"})
  end
end