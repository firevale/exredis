defmodule Acs.MeishengSmsSender do 
  alias   Utils.Httpc

  require Logger
  import  SweetXml

  alias   Acs.Repo
  alias   Acs.MeishengSms
  alias   Acs.MeishengSmsMo

  @config             Application.get_env(:acs, __MODULE__, [])
  @server_ip          @config[:server_ip]
  @server_port        @config[:server_port]
  @username           @config[:username]
  @password           @config[:password]
  @secret             @config[:secret]
  @template_verify    @config[:template_verify]
  @base_url           "http://#{@server_ip}:#{@server_port}"

  def send_verify_code(mobile, token) do 
    url = Path.join(@base_url, "/service/httpService/httpInterface.do?method=sendUtf8Msg")

    response = Httpc.post_msg(url, %{
      method: "sendMsg",
      username: @username,
      password: @password,
      veryCode: @secret,
      mobile: mobile,
      content: "@1@=#{token}",
      msgtype: 2,
      tempid: @template_verify
    })

    if Httpc.success?(response) do 
      case response.body |> xpath(~x"/sms/mt/status/text()"i) do 
        0 ->
          msg_id = response.body |> xpath(~x"/sms/mt/msgid/text()"s)
          MeishengSms.changeset(%MeishengSms{}, %{
            msg_id: msg_id,
            mobile: mobile,
            template_id: @template_verify,
            content: "@1@=#{token}",
            status: MeishengSms.Status.sent
          }) |> Repo.insert!
          {:ok, msg_id}
        100 ->
          Logger.error "sms verify code send failed, to: #{mobile}"
          :error
        102 ->
          Logger.error "Meisheng account is outdated"
          :error
        103 ->
          Logger.error "Meisheng HTTP post param error"
          :error
        108 ->
          Logger.error "Meisheng account is out of money"
          :error
        114 ->
          Logger.error "Meisheng sms template not exists"
          :error
        116 ->
          Logger.error "invalid Meisheng veryCode"
          :error
        errno ->
          Logger.error "Meisheng return error: #{errno}"
          :error
      end
    else
      Logger.error "Meisheng send sms message failed, response: #{inspect response}"
      :error
    end
  end

  def get_amount() do 
    url = Path.join(@base_url, "/service/httpService/httpInterface.do?method=getAmount")

    response = Httpc.post_msg(url, %{
      method: "getAmount",
      username: @username,
      password: @password,
      veryCode: @secret,
    })

    if Httpc.success?(response) do 
      case response.body |> xpath(~x"/sms/mt/status/text()"i) do 
        0 ->
          amount = response.body |> xpath(~x"/sms/mt/account/text()"i)
          {:ok, amount * 10}
        100 ->
          Logger.error "get amount failed"
          :error
        102 ->
          Logger.error "Meisheng account is outdated"
          :error
        103 ->
          Logger.error "Meisheng HTTP post param error"
          :error
        errno ->
          Logger.error "Meisheng return error: #{errno}"
          :error
      end
    else
      Logger.error "Meisheng get SMS amount failed, response: #{inspect response}"
      :error
    end
  end

  def query_report() do 
    url = Path.join(@base_url, "/service/httpService/httpInterface.do?method=queryReport")

    response = Httpc.post_msg(url, %{
      method: "queryReport",
      username: @username,
      password: @password,
      veryCode: @secret,
    })

    if Httpc.success?(response) do 
      response.body |> xpath(
                      ~x"/sms/rpt"l,
                      mobile: ~x"./mobile/text()"s,
                      msg_id: ~x"./msgid/text()"s,
                      status_code: ~x"./status/text()"s,
                      report_time: ~x"./time/text()"s, 
                    ) |> Enum.each(fn(report) -> 
        report = case report.status_code do 
                   "DELIVRD" ->
                     Map.put(report, :status, MeishengSms.Status.delivered)
                   _ ->
                     Map.put(report, :status, MeishengSms.Status.failed)
                 end
        
        case Repo.get_by(MeishengSms, msg_id: report.msg_id, mobile: report.mobile) do 
          %MeishengSms{} = sms ->
            MeishengSms.changeset(sms, report) |> Repo.update!
          _ ->
            Logger.error "Meisheng SMS record not found for #{inspect report}"
        end
      end)
    else
      Logger.error "Meisheng query report failed, response: #{inspect response}"
      :error
    end
  end

  def query_mo() do 
    url = Path.join(@base_url, "/service/httpService/httpInterface.do?method=queryMo")

    response = Httpc.post_msg(url, %{
      method: "queryMo",
      username: @username,
      password: @password,
      veryCode: @secret,
    })

    Logger.debug "query mo response: #{inspect response, pretty: true}" 
    
    if Httpc.success?(response) do 
      response.body |> xpath(
                      ~x"/sms/mo"l,
                      mobile: ~x"./mobile/text()"s,
                      recv_code: ~x"./recvcode/text()"s,
                      content: ~x"./content/text()"s,
                      recv_time: ~x"./time/text()"s, 
                    ) |> Enum.each(fn(report) -> 
        MeishengSmsMo.changeset(%MeishengSmsMo{}, report) |> Repo.insert!
      end)
    else
      Logger.error "Meisheng query mo failed, response: #{inspect response}"
      :error
    end
  end

end


