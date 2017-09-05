defmodule Exsm.MeishengService do 
  alias   Utils.Httpc
  use     Utils.LogAlias

  import  SweetXml

  @config             Application.get_env(:exsm, __MODULE__, [])
  @server_ip          @config[:server_ip]
  @server_port        @config[:server_port]
  @username           @config[:username]
  @password           @config[:password]
  @secret             @config[:secret]
  @template_verify    @config[:template_verify]
  @base_url           "http://#{@server_ip}:#{@server_port}"

  def send_verify_code(mobile, token) do 
    url = Path.join(@base_url, "/service/httpService/httpInterface.do?method=sendUtf8Msg")

    response = Httpc.post_form(url, %{
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
          {:ok, msg_id}
        100 ->
          error("sms verify code send failed, to: #{mobile}")
          {:error, 100}
        102 ->
          error("Meisheng account is outdated")
          {:error, 102}
        103 ->
          error("Meisheng HTTP post param error")
          {:error, 103}
        108 ->
          error("Meisheng account is out of money")
          {:error, 108}
        114 ->
          error("Meisheng sms template not exists")
          {:error, 114}
        116 ->
          error("invalid Meisheng veryCode")
          {:error, 116}
        errno ->
          error("Meisheng return error: #{errno}")
          {:error, errno}
      end
    else
      error("Meisheng send sms message failed, response: #{inspect response}")
      :error
    end
  end

  def get_amount() do 
    url = Path.join(@base_url, "/service/httpService/httpInterface.do?method=getAmount")

    response = Httpc.post_form(url, %{
      method: "getAmount",
      username: @username,
      password: @password,
      veryCode: @secret,
    })

    if Httpc.success?(response) do 
      case response.body |> xpath(~x"/sms/mt/status/text()"i) do 
        0 ->
          {amount, _} = response.body |> xpath(~x"/sms/mt/account/text()"s) |> Float.parse
          {:ok, round(amount * 10)}
        100 ->
          error("get amount failed")
          {:error, 100}
        102 ->
          error("Meisheng account is outdated")
          {:error, 102}
        103 ->
          error("Meisheng HTTP post param error")
          {:error, 103}
        errno ->
          error("Meisheng return error: #{errno}")
          {:error, errno}
      end
    else
      error("Meisheng get SMS amount failed, response: #{inspect response}")
      {:error, :http}
    end
  end

  def query_report() do 
    url = Path.join(@base_url, "/service/httpService/httpInterface.do?method=queryReport")

    response = Httpc.post_form(url, %{
      method: "queryReport",
      username: @username,
      password: @password,
      veryCode: @secret,
    })

    if Httpc.success?(response) do 
      {:ok, response.body 
              |> xpath(
                ~x"/sms/rpt"l,
                mobile: ~x"./mobile/text()"s,
                msg_id: ~x"./msgid/text()"s,
                status_code: ~x"./status/text()"s,
                report_time: ~x"./time/text()"s)} 
    else
      error("Meisheng query report failed, response: #{inspect response}")
      :error
    end
  end

  def query_mo() do 
    url = Path.join(@base_url, "/service/httpService/httpInterface.do?method=queryMo")

    response = Httpc.post_form(url, %{
      method: "queryMo",
      username: @username,
      password: @password,
      veryCode: @secret,
    })

    if Httpc.success?(response) do 
      {:ok, response.body 
              |> xpath(~x"/sms/mo"l,
                mobile: ~x"./mobile/text()"s,
                recv_code: ~x"./recvcode/text()"s,
                content: ~x"./content/text()"s,
                recv_time: ~x"./time/text()"s, 
              ) 
      }
    else
       error("Meisheng query mo failed, response: #{inspect response}")
      :error
    end
  end

end


