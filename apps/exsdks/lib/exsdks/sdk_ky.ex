defmodule SDKKY do
  require Logger
  alias   Utils.Httpc
  require Utils
  alias   Utils.JSON
  alias   Utils.Crypto

  @baseUrl "http://f_signin.bppstore.com/loginCheck.php"

  def validate_session(app_key, access_token) do   
    response = Httpc.get_msg(@baseUrl, %{
                                          "tokenKey" => access_token,
                                          "sign" => Crypto.md5_sign("#{app_key}#{access_token}")
                                          })

    if Httpc.success?(response) do 
      case JSON.decode(response.body) do 
        {:ok, %{"code" => 0, "data" => %{"guid" => user_id, "username" => nickname} }} ->
          %{id: user_id, nickname: nickname}
        _ -> 
          nil
      end
    else
      nil
    end
  end

  def validate_payment(rsa_key, params = %{}) do 
    sign_string = params |> Enum.reject(fn({k, _v}) -> k == "client_id" or k == "format" or k == "sign" end) 
                         |> Enum.sort 
                         |> Enum.map_join("&", fn({k, v}) -> "#{k}=#{v}" end)

     Crypto.rsa_public_verify2(rsa_key, sign_string, params["sign"])
  end

  def get_total_fee(rsa_key, %{"notify_data" => notify_data}) do
    decoded_str = Crypto.rsa_pub_decrypt2(rsa_key, notify_data)

    case URI.decode_query(decoded_str) do 
      %{"payresult" => "0", "fee" => fee} -> 
        round(String.to_float(fee) * 100)
      _ -> 
        0
    end    
  end

end
  
 