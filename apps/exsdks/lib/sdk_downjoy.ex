defmodule SDKDownjoy do

  require Logger

  alias   Utils.Httpc
  alias   Utils.JSON
  alias   Utils.Crypto
  require Utils

  @baseUrl  "http://ngsdk.d.cn/api/cp/checkToken"

  def validate_session(appid, appkey, token, umid) do 	 
    try do 
      response = Httpc.get_msg(@baseUrl, %{
                                          "appid" => appid,
                                          "token" => token,
                                          "umid" => umid,
                                          "sig" => Crypto.md5_sign("#{appid}|#{appkey}|#{token}|#{umid}")
                                          })

      
      if Httpc.success?(response) do 
        case JSON.decode(response.body) do 
          {:ok, res} -> 
            Logger.info "validate downjoy session, valid = #{res["valid"]}"
            res["valid"] == "1"
          _ -> 
            Logger.error "validate downjoy session error, not a json response"
            false
        end 
      else
        Logger.error "validate downjoy session failed"
        false
      end
    catch
      :error, e ->
        Logger.error "validate downjoy session exception: #{inspect e}"
        false
    end
  end

  def validate_payment(paymentKey, %{"signature" => their_sign} = params) do 
    sign_str = ~w(order money mid time result ext)
                 |> Enum.map_join("&", &("#{&1}=#{params[&1]}"))

    sign_str = sign_str <> "&key=#{paymentKey}"         
    our_sign = Crypto.md5_sign(sign_str)
    our_sign == their_sign
  end

end