defmodule SDKOppo do

  require Logger
  require OAuther

  alias   Utils.Httpc
  alias   Utils.JSON
  require Utils

  @baseUrl       "http://thapi.nearme.com.cn/account/GetUserInfoByGame"
  @baseUrl2      "http://i.open.game.oppomobile.com/gameopen/user/fileIdInfo"
  @oppo_key_file "priv/certs/oppo_public_key.pem"

  # use oauth 1.0 client "OAuther" to verify oppo session
  def validate_session(appKey, appSecret, accessToken, tokenSecret) do 	 
    creds = OAuther.credentials(consumer_key: appKey, 
                                consumer_secret: appSecret, 
                                token: accessToken, 
                                token_secret: tokenSecret)

    params = OAuther.sign("post", @baseUrl, [], creds)

    {oauth_header, req_params} = OAuther.header(params)

    headers = [{"Content-Type", "application/x-www-form-urlencoded"}, oauth_header]

    response = Httpc.post(@baseUrl, 
                          body: req_params,
                          headers: headers)

    if Httpc.success?(response) do 
      case JSON.decode(response.body) do 
        {:ok, %{"BriefUser" => user}} -> 
          %{
            id: user["id"], 
            picture_url: user["profilePictureUrl"], 
            nickname: user["name"] || user["id"], 
            email: user["email"] || ""
          }  
        _ ->
          result = URI.decode_query response.body
          Logger.error "oppo oauth result: #{inspect result, pretty: true}"
          nil
      end
    else 
      nil
    end
  end

  # oppo sdk 2.0
  def validate_session2(appKey, appSecret, accessToken, oppoUserId) do 	 
    base_string =  URI.encode_query([oauthConsumerKey: appKey, 
                    oauthToken: accessToken, 
                    oauthSignatureMethod: "HMAC-SHA1",
                    oauthTimestamp: Utils.unix_timestamp |> to_string,
                    oauthNonce: Utils.nonce |> to_string,
                    oauthVersion: "1.0"
                    ]) <> "&"

    sign = :crypto.hmac(:sha, appSecret <> "&", base_string) |> Base.encode64 |> URI.encode_www_form

    headers = [param: base_string, oauthSignature: sign]

    url = @baseUrl2 <> "?" <> URI.encode_query([fileId: oppoUserId, token: accessToken])

    response = Httpc.get(url, headers: headers)

    if Httpc.success?(response) do 
      case JSON.decode(response.body) do 
        {:ok, %{"resultCode" => "200", 
                "ssoid" => ^oppoUserId,
                "userName" => userName,
                "email" => email}} -> 
          %{
            id: oppoUserId, 
            picture_url: "", 
            nickname: userName, 
            email: email
          }
        _ ->
          result = URI.decode_query response.body
          Logger.error "oppo oauth result: #{inspect result, pretty: true}"
          nil
      end
    else 
      nil
    end
  end


  def validate_payment(params)  do
    base_string = ["notifyId", "partnerOrder", "productName", "productDesc", "price", "count", "attach"] 
                  |> Enum.map_join("&", &("#{&1}=#{params[&1]}"))

    sign = params["sign"] 

    key_file = Application.app_dir(:acs, @oppo_key_file)

    Utils.rsa_public_verify(key_file, base_string, sign)
  end

end