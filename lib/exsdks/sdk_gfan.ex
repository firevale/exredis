defmodule SDKGFan do

  require Logger

  alias   Utils.Httpc
  alias   Utils.JSON
  alias   Utils.Crypto
  require Utils

  @baseUrl  "http://api.gfan.com/uc1/common/verify_token"

  def validate_session(appkey, token, uid) do 	
    try do 
      headers = [{"Content-Type", "application/x-www-form-urlencoded"}, {"User-Agent", "packageName=,appName=,channelID=#{appkey}"}]
      response = Httpc.post(@baseUrl, 
                            body: %{"token" => token},
                            headers: headers) 
      #Logger.info "verify gfan session response: #{inspect response, pretty: true}"

      if Httpc.success?(response) do 
        
        case JSON.decode(response.body) do 
          {:ok, res} -> 
            Logger.info "validate gfan session, resultCode = #{res["resultCode"]} uid = #{res["uid"]}"
            ((res["resultCode"] == "1") or (res["resultCode"] == 1) ) and ((uid |> to_string) == (res["uid"] |> to_string))
          _ -> 
            Logger.error "validate gfan session error, not a json response"
            false
        end 
      else
        Logger.error "validate gfan session failed"
        false
      end
    catch
      :error, e ->
        Logger.error "validate gfan session exception: #{inspect e}"
        false
    end
  end

  def validate_payment(uid, params) do 
    our_sign = Crypto.md5_sign( uid <> params["time"] |> to_string )
    params["sign"] == our_sign
  end

end