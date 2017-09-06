defmodule SDKBaidu do

  require Logger
  alias   Utils.Httpc
  require Utils
  alias   Utils.JSON
  alias   Utils.Crypto

  @baseUrl "http://querysdkapi.91.com/CpLoginStateQuery.ashx"

  def validate_session(appId, uin, accessToken, appSecret) do 
    
    try do 
      response = Httpc.post_form(@baseUrl, %{
                          "AppID" => appId,
                          "AccessToken" => accessToken,
                          "Sign" => Crypto.md5_sign("#{appId}#{accessToken}#{appSecret}")
                          })

      if Httpc.success?(response) do 
       
        case JSON.decode(response.body) do 
          {:ok, res} -> 
            if res["ResultCode"] == 1 do 
              content = res["Content"] |> URI.decode # for verify sign
              our_sign = Crypto.md5_sign("#{res["AppID"]}#{res["ResultCode"]}#{content}#{appSecret}")
              content = content |> Base.decode64! # get real content

              if our_sign == res["Sign"] do 
                res_content = JSON.decode!(content)
                to_string(res_content["UID"]) == to_string(uin)
              else
                Logger.error "validate baidu session failed, mismatch sign, our: #{our_sign}, theis: #{res["Sign"]}"
                false
              end
            else 
              Logger.error "validate baidu session failed, ResultCode = #{res["ResultCode"]}"
              false
            end
          _ -> 
            Logger.error "validate baidu session error, not a json response"
            false
        end 
      else
        Logger.error "validate baidu session failed"
        false
      end
    catch
      :error, e ->
        Logger.error "validate baidu session exception: #{inspect e}"
        false
    end 
  end

  def validate_payment(appSecret, %{"AppID" => appId, 
                                 "Content" => content,
                                 "CooperatorOrderSerial" => order_id,
                                 "OrderSerial" => trans_no,
                                 "Sign" => sign} = _params) do 

    sign_str = "#{appId}#{trans_no}#{order_id}#{content}#{appSecret}" 

    Logger.info "sign_str = #{sign_str}, our_sign = #{Crypto.md5_sign(sign_str)}, their_sign: #{sign}\n"
    Crypto.md5_sign(sign_str) == sign 
  end

  def validate_payment(_, _) do 
    false
  end


end