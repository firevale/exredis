defmodule SDKItools do

  require Logger
  alias   Utils.Httpc
  require Utils
  alias   Utils.JSON
  alias   Utils.Crypto

  @baseUrl "https://pay.slooti.com/"

  def validate_session(appId, accessToken) do 
    # TODO: uncomment following code if we get appSecret
    try do 
      response = Httpc.get_msg(@baseUrl, %{
                          "r" => "auth/verify",
                          "appid" => appId,
                          "sessionid" => accessToken,
                          "sign" => Crypto.md5_sign("appid=#{appId}&sessionid=#{accessToken}")
                          })

      if Httpc.success?(response) do 
        # Logger.info "validate itools session response: #{inspect response.body}"
        case JSON.decode(response.body) do 
          {:ok, res} -> 
            if res["status"] == "success" do 
              true
            else
              Logger.error "validate itools session success, sessionId is invalid"
              false
            end
          _ -> 
            Logger.error "validate itools session error, not a json response"
            false
        end 
      else
        Logger.error "validate itools session failed"
        false
      end
    catch
      :error, e ->
        Logger.error "validate itools session exception: #{inspect e}"
        false
    end 
  end

end