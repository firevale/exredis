defmodule SDKIYouxi do
  require Logger
  alias   Utils.Httpc
  require Utils
  alias   Utils.JSON
  alias   Utils.Crypto

  @baseUrl "https://open.play.cn/oauth/token"

  def validate_session(client_id, client_secret, auth_code, sdk_version) do   
    timestamp = Utils.unix_timestamp * 1000

    {sign_sort, sign} = signature(client_id, client_secret, timestamp, sdk_version)

    response = Httpc.post_form(@baseUrl, %{
                                          "client_id" => client_id,
                                          "client_secret" => client_secret,
                                          "code" => auth_code,
                                          "grant_type" => "authorization_code",
                                          "timestamp" => timestamp,
                                          "version" => sdk_version,
                                          "sign_method" => "MD5",
                                          "sign_sort" => sign_sort,
                                          "signature" => sign
                                          })

   

    if Httpc.success?(response) do 
      case JSON.decode(response.body) do 
        {:ok, %{"user_id" => user_id, "access_token" => access_token, "refresh_token" => refresh_token}} -> 
          {user_id, access_token, refresh_token}
        _ ->
          nil
      end
    else
      nil
    end
  end

  def verify_signature_if1(client_secret, %{"cp_order_id" => cp_order_id, 
                                            "correlator" => correlator, 
                                            "order_time" => order_time,
                                            "method" => method,
                                            "sign" => sign}) do 
    our_sign = "#{cp_order_id}#{correlator}#{order_time}#{method}#{client_secret}" |> Crypto.md5_sign
    our_sign == sign
  end

  def verify_signature_if1(client_secret, %{"cp_order_id" => cp_order_id, 
                                            "correlator" => correlator, 
                                            "method" => method,
                                            "sign" => sign}) do 
    our_sign = "#{cp_order_id}#{correlator}#{method}#{client_secret}" |> Crypto.md5_sign
    our_sign == sign
  end

  def verify_signature_if1(_, _), do: false


  def verify_signature_if2(client_secret, %{"cp_order_id" => cp_order_id, 
                                          "correlator" => correlator, 
                                          "result_code" => result_code,
                                          "fee" => fee,
                                          "pay_type" => pay_type,
                                          "method" => method,
                                          "sign" => sign}) do 
    sign_data = "#{cp_order_id}#{correlator}#{result_code}#{fee}#{pay_type}#{method}#{client_secret}"
    our_sign = sign_data |> Crypto.md5_sign
    our_sign == sign
  end

  def verify_signature_if2(_, _), do: false

  defp signature(client_id, client_secret, timestamp, sdk_version) do 
    sort = "timestamp&sign_method&client_secret&client_id&version" 
    sign = "#{timestamp}MD5#{client_secret}#{client_id}#{sdk_version}" |> Crypto.md5_sign
    {sort, sign}
  end
end
  
 