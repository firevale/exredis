defmodule SDKSogou do

  require Logger

  alias   Utils.Httpc
  alias   Utils.JSON
  alias   Utils.Crypto
  require Utils

  @baseUrl  "http://api.app.wan.sogou.com/api/v1/login/verify"

  def validate_session(gid, session_key, user_id, app_secret) do 	 
    try do 
      auth = "gid=#{gid}&session_key=#{session_key}&user_id=#{user_id}&#{app_secret}" |> Crypto.md5_sign

      response = Httpc.post_form(@baseUrl, %{
                                          "gid" => gid,
                                          "user_id" => user_id,
                                          "session_key" => session_key,
                                          "auth" => auth
                                          })

      Logger.info "verify sogou session response: #{inspect response, pretty: true}"

      if Httpc.success?(response) do 
        Logger.info "validate sogou session response: #{inspect response.body}"
        case JSON.decode(response.body) do 
          {:ok, res} -> 
            Logger.info "validate sogou session, result = #{res["result"]}"
            res["result"] == true || res["result"] == "true"
          _ -> 
            Logger.error "validate sogou session error, not a json response"
            false
        end 
      else
        Logger.error "validate sogou session failed"
        false
      end
    catch
      :error, e ->
        Logger.error "validate sogou session exception: #{inspect e}"
        false
    end
  end

  def validate_payment(pay_key, params) do 

    sign_string = params |> Enum.reject(fn({k, _v}) -> k == "client_id" or k == "format" or k == "auth"  end) 
                         |> Enum.sort 
                         |> Enum.map_join("&", fn({k, v}) -> "#{k}=#{v}" end)
                         
    sign_string = sign_string <> "&" <> pay_key

    our_sign = Crypto.md5_sign(sign_string)

    our_sign == params["auth"]

  end
  

end