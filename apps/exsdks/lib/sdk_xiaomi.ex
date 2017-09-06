defmodule SDKXiaomi do

  require Logger
  alias   Utils.Httpc
  require Utils
  alias   Utils.JSON
  alias   Utils.Crypto

  @baseUrl "http://mis.migc.xiaomi.com/api/biz/service/verifySession.do"
  
  def validate_session(appId, accessToken, userId, appSecret) do 
    
      response = Httpc.get_msg(@baseUrl, %{
         appId: appId,
         session: accessToken,
         uid: userId,
         signature: Crypto.hmacsha1_sign("appId=#{appId}&session=#{accessToken}&uid=#{userId}", appSecret)
        })
      

      if Httpc.success?(response) do
        case JSON.decode(response.body) do 
          {:ok, res} -> 
            Logger.info "validate xiaomi session, ErrorCode = #{res["errcode"]}"
            res["errcode"] == 200
          _ -> 
            Logger.error "validate xiaomi session error, not a json response"
            false
        end 
      else
        false
      end
  end

  def validate_payment(params, appSecret) do 
    
    sign_string = params |> Enum.reject(fn({k, v}) -> k == "client_id" or k == "format" or k == "signature" or v == "" end) 
                         |> Enum.sort 
                         |> Enum.map_join("&", fn({k, v}) -> "#{k}=#{v}" end)
                         

    our_sign = Crypto.hmacsha1_sign(sign_string, appSecret)
    our_sign == params["signature"]
  end

end