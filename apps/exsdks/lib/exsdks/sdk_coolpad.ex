defmodule SDKCoolPad do
  require Logger
  alias   Utils.Httpc
  alias   Utils.JSON

  @baseUrl "https://openapi.coolyun.com/oauth2/token"
  @get_user_info_url "https://openapi.coolyun.com/oauth2/api/get_user_info"

  def validate_session(add_id, app_key, authcode) do   
    response = Httpc.get_msg(@baseUrl, %{
                                          "grant_type" => "authorization_code",
                                          "client_id" => add_id,
                                          "client_secret" => app_key,
                                          "code" => authcode,
                                          "redirect_uri" => app_key
                                          })


    if Httpc.success?(response) do 
      case JSON.decode(response.body) do 
        {:ok, %{"openid" => openid, "expires_in" => _expires_in, "refresh_token" => _refresh_token, "access_token" => access_token}} -> 
          response = Httpc.get_msg(@get_user_info_url, %{
                                          "access_token" => access_token,
                                          "oauth_consumer_key" => add_id,
                                          "openid" => openid
                                          })
          if Httpc.success?(response) do
            case JSON.decode(response.body) do 
              {:ok, %{"rtn_code" => _rtn_code, "sex" => _sex, "nickname" => nickname, "brithday" => _brithday, "highDefUrl" => _highDefUrl, "headIconUrl" => _headIconUrl}} ->
                %{openid: openid, access_token: access_token, nickname: nickname}
              _ ->
                %{openid: openid, access_token: access_token, nickname: openid}
            end    
          else
            %{openid: openid, access_token: access_token, nickname: openid}
          end
        _ -> 
          nil
      end
    else
      nil
    end
  end

end
  
 