defmodule SDKTBT do
  require Logger
  alias   Utils.Httpc
  require Utils
  alias   Utils.JSON
  alias   Utils.Crypto

  @baseUrl "http://tgi.tongbu.com/api/LoginCheck.ashx"

  def validate_session(appId, sessionId) do 


    try do 
      response = Httpc.get_msg(@baseUrl, %{
                                          "session" => sessionId,
                                          "appid" => appId
                                          })

      if Httpc.success?(response) do 
        
        case JSON.decode(response.body) do 
          {:ok, res} -> 
            Logger.info "validate tbt session, res = #{res}"
            res > 0
          _ -> 
            Logger.error "validate tbt session error, not a json response"
            false
        end 
      else
        Logger.error "validate tbt session failed"
        false
      end
    catch
      :error, e ->
        Logger.error "validate tbt session exception: #{inspect e}"
        false
    end
  end

  def validate_payment(appKey, %{"sign" => their_sign} = params) do 
    sign_str = ~w(source trade_no amount partner paydes debug tborder)
                 |> Enum.map_join("&", &("#{&1}=#{params[&1]}"))


    sign_str = sign_str <> "&key=#{appKey}"            
    our_sign = Crypto.md5_sign(sign_str)
    our_sign == their_sign
  end

end
  
 