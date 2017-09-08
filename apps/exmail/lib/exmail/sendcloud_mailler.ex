defmodule Exmail.SendCloudMailer do 
  require Utils
  use     Utils.LogAlias
  alias   Utils.Httpc
  alias   Utils.JSON

  import  Exmail.Gettext


  @api_key       Application.get_env(:exmail, Exmail.SendCloudMailer, key: "")[:key] 
  @api_user      Application.get_env(:exmail, Exmail.SendCloudMailer, user: "")[:user]
  @from          Application.get_env(:exmail, Exmail.SendCloudMailer, from: "noreply@sdmail.firevale.com")[:from]

  @base_url      "http://sendcloud.sohu.com"

  def deliver_reset_password(locale, email, token) do 
    template =  case locale do 
                  "en" -> "fvac_resetPasswordCode_enUs"
                  "zh-hans" -> "fvac_resetPasswordCode_zhCn" 
                  "zh-hant" -> "fvac_resetPasswordCode_zhCn" #TODO: add traditional chinese support  
                  _ -> "fvac_resetPasswordCode_enUs"
                end

    vars = JSON.encode! %{to: [email], 
                          sub: %{"%name%" => [Utils.nickname_from_email(email)],
                                "%token%" => [token]}
                        }

    send_template(email, template, vars, 20644)
  end

  defp send_template(to, template, vars, label) do 
    url = Path.join(@base_url, "/webapi/mail.send_template.json")

    response = Httpc.post_form(url,  %{
      api_user: @api_user, 
      api_key: @api_key,
      to: to,
      from: @from,
      fromname: gettext("Firevale Account Center"),
      template_invoke_name: template,
      substitution_vars: vars,
      label: label,
      use_maillist: false,
    })

    if Httpc.success?(response) do 
      case JSON.decode(response.body) do 
        {:ok, %{"message" => "success"}} -> :ok 
        _ -> 
          error "SendCloud send email failed: #{inspect response.body, pretty: true}"
          :error
      end
    else 
      error "SendCloud send email failed: #{inspect response, pretty: true}"
      :error
    end
  end

end