defmodule SDKIIApple do
  require Logger
  alias   Utils.Httpc
  require Utils
  alias   Utils.JSON
  alias   Utils.Crypto

  @baseUrl "http://ucenter.iiapple.com/foreign/oauth/verification.php"

  def validate_session(app_id, app_key, user_id, access_token) do   
    params = %{"game_id" => app_id, "session" => access_token, "user_id" => user_id}

    sign_string = params |> Enum.map_join("&", fn({k, v}) -> "#{k}=#{v}" end)

    sign = Crypto.md5_sign(Crypto.md5_sign(sign_string) <> app_key)

    params = Map.put(params, "_sign", sign)

    response = Httpc.get_msg(@baseUrl, params)

    if Httpc.success?(response) do 
      result = JSON.decode!(response.body)

      result["status"] == 1
    else
      false
    end
  end

  def validate_payment(app_key, %{"_sign" => their_sign} = params) do 
    sign_string = params |> Enum.reject(fn({k, _v}) -> k == "client_id" or k == "format" or k == "_sign" end) 
                         |> Enum.sort 
                         |> Enum.map_join("&", fn({k, v}) -> "#{k}=#{v}" end) 

    our_sign = Crypto.md5_sign(Crypto.md5_sign(sign_string) <> app_key)

    our_sign == their_sign   
  end

end
  
 