defmodule Acs.SendCloudMailer do 

  alias   Utils.Httpc
  alias   Utils.JSON

  import  Acs.Gettext
  require Logger


  @api_key       Application.get_env(:acs, :sendcloud, key: "")[:key]
  @api_user      Application.get_env(:acs, :sendcloud, user: "")[:user]
  @from          Application.get_env(:acs, :sendcloud, from: "noreply@sdmail.firevale.com")[:from]

  @base_url      "http://sendcloud.sohu.com"

  def send_template(to, template, vars, label) do 
    url = Path.join(@base_url, "/webapi/mail.send_template.json")

    response = Httpc.post_msg(url,  %{
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
          Logger.error "SendCloud send email failed: #{inspect response.body, pretty: true}"
          :error
      end
    else 
      Logger.error "SendCloud send email failed: #{inspect response, pretty: true}"
      :error
    end
  end

end