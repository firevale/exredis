defmodule SDKVivo do

  require Logger

  alias   Utils.Httpc
  alias   Utils.JSON
  alias   Utils.Crypto
  require Utils

  @baseUrl  "https://usrsys.inner.bbk.com/auth/user/info"
  def validate_session(uid, token) do 	 
    try do 
      response = Httpc.post_form(@baseUrl, %{
                                          "access_token" => token
                                          })

      
      if Httpc.success?(response) do 
        rep_string = String.replace(response.body, "'", "\"")
      
        case JSON.decode(rep_string) do 
          {:ok, res} -> 
            Logger.info "validate vivo session, uid = #{res["uid"]} ,email=#{res["email"]}"
            res["uid"] |> to_string == uid |> to_string
          _ -> 
            Logger.error "validate vivo session error, not a json response"
            false
        end 
      else
        Logger.error "validate vivo session failed"
        false
      end
    catch
      :error, e ->
        Logger.error "validate vivo session exception: #{inspect e}"
        false
    end
  end


  def validate_payment(cp_key, params) do 
    their_sign = params["signature"]
    sign_string = params |> Enum.reject(fn({k, _v}) -> k == "client_id" or k == "format" or k == "signMethod" or k == "signature" end) 
                         |> Enum.sort 
                         |> Enum.map_join("&", fn({k, v}) -> "#{k}=#{v}" end)
                         
    cp_key_md5 = Crypto.md5_sign(cp_key)
    our_sign = Crypto.md5_sign(sign_string <> "&" <> cp_key_md5)
    our_sign == their_sign
  end

 

end