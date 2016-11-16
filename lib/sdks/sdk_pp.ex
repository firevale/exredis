defmodule SDKPP do
  require Logger
  alias   Utils.Httpc
  require Utils
  alias   Utils.JSON

  @baseUrl "http://passport_i.25pp.com:8080/account?tunnel-command=2852126760"

  def validate_session(appId, appKey, sessionId) do 
    try do 
      sign_string = "sid=" <> sessionId <> appKey 

      signmd5 = Utils.md5_sign(sign_string)

      response = Httpc.post_json(@baseUrl,  %{
                              "id" => Utils.unix_timestamp,  
                              "service" => "account.verifySession",
                              "data" => %{
                                "sid" => sessionId 
                              },
                              "game" => %{
                                "gameId" => appId
                              },
                              "encrypt" => "MD5",
                              "sign" => signmd5
                            })

      if Httpc.success?(response) do 
        case JSON.decode(response.body) do 
          {:ok, jres = %{"state" => %{"code" => 1 }}} ->
              %{id: jres["data"]["creator"] <> jres["data"]["accountId"],
                nickname: jres["data"]["nickName"]}
          _ -> 
            nil
        end 
      else
        nil
      end
    catch
      :error, e ->
        Logger.error "validate pp session exception: #{inspect e}"
        nil
    end
  end

  def validate_payment(payKey, params) do 
    decoded_str = Utils.rsa_pub_decrypt2(payKey, params["sign"])

    case JSON.decode(decoded_str) do 
      {:ok, jres = %{}} ->
        jres["order_id"] == params["order_id"]
      _ -> 
        false
    end
  end

end
  
 