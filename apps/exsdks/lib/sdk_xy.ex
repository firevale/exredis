defmodule SDKXY do
  require Logger
  alias   Utils.Httpc
  require Utils
  alias   Utils.JSON

  @baseUrl "http://passport.xyzs.com/checkLogin.php"
  


  def validate_session(appId, sessionId, uid) do 
    try do 
      response = Httpc.post_msg(@baseUrl, %{
                                           "uid" => uid,
                                           "appid" => appId,
                                           "token" => sessionId
                                          })

      if Httpc.success?(response) do 
       
        case JSON.decode(response.body) do 
          {:ok, res} -> 
            Logger.info "validate xy session, Code = #{res["ret"]}"
            res["ret"] == 0
          _ -> 
            Logger.error "validate xy session error, not a json response"
            false
        end 
      else
        Logger.error "validate xy session failed"
        false
      end
    catch
      :error, e ->
        Logger.error "validate xy session exception: #{inspect e}"
        false
    end
  end

  def validate_payment(appKey, params) do 
    
    
    sign_string = params |> Enum.reject(fn({k, _v}) -> k == "client_id" or k == "format" or k == "sign" or k == "sig" end) 
                         |> Enum.sort 
                         |> Enum.map_join("&", fn({k, v}) -> "#{k}=#{v}" end)
                         
    
    sign_string = appKey <> sign_string 
    our_sign = Utils.md5_sign(sign_string)
    our_sign == params["sig"]

  end

end
  
 