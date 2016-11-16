defmodule SDKYouku do
  require Logger
  alias   Utils.Httpc
  require Utils
  alias   Utils.JSON

  @baseUrl "http://sdk.api.gamex.mobile.youku.com/game/user/infomation"

  def validate_session(appKey, payKey, sessionId) do 
    try do 
      response = Httpc.post_msg(@baseUrl, %{
                                           "sessionid" => sessionId,
                                           "appkey" => appKey,
                                           "sign" => session_sign(appKey, payKey, sessionId)
                                          })


      if Httpc.success?(response) do 
        case response.body do 
          "" -> false 
          nil -> false 
          "{" <> _ ->
            case JSON.decode(response.body) do 
              {:ok, %{"status" => "success", "uid" => uid}} -> 
                {:ok, uid}
              _ -> 
                Logger.error "validate youku session error, not a json response"
                false
            end 
        end
      else
        Logger.error "validate youku session failed"
        false
      end
    catch
      :error, e ->
        Logger.error "validate youku session exception: #{inspect e}"
        false
    end
  end

  def validate_payment(payKey, %{"apporderID" => apporderID, 
                              "uid" => uid, 
                              "price" => price, 
                              "sign" => sign, 
                              "passthrough" => baseUrl}) do 

    sign_string = "#{baseUrl}?apporderID=#{apporderID}&price=#{price}&uid=#{uid}"                  
    our_sign = Utils.hmacmd5_sign(sign_string, payKey)
    our_sign == sign
  end

  def validate_payment(_, _), do: false


  defp session_sign(appKey, payKey, sessionId) do 
    Utils.hmacmd5_sign("appkey=#{appKey}&sessionid=#{sessionId}", payKey)
  end

end
  
 