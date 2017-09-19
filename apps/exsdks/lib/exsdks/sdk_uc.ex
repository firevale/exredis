defmodule SDKUC do

  require Logger

  alias   Utils.Httpc
  alias   Utils.JSON
  alias   Utils.Crypto
  require Utils

  @debug_baseUrl       "http://sdk.test4.g.uc.cn/cp/account.verifySession"
  @production_baseUrl  "http://sdk.g.uc.cn/cp/account.verifySession"

  # debug_mode == true, use debug base url
  def validate_session(app_id, app_key, access_token, "true") do 
    _validate_session(app_id, app_key, access_token, @debug_baseUrl)
  end

  def validate_session(app_id, app_key, access_token, _) do 
    _validate_session(app_id, app_key, access_token, @production_baseUrl)
  end

  defp _validate_session(app_id, app_key, access_token, baseUrl) do 	 
    response = Httpc.post_json(baseUrl, %{
      id: Utils.unix_timestamp,
      data: %{sid: access_token},
      game: %{gameId: app_id},
      sign: Crypto.md5_sign("sid=#{access_token}#{app_key}")
      })


    if Httpc.success?(response) do 
      case JSON.decode(response.body) do 
        {:ok, jres = %{"state" => %{"code" => 1 }}} ->
          %{id: jres["data"]["accountId"],
            nickname: jres["data"]["nickName"]}
        _ -> 
          nil
      end
    else
      nil
    end
  end

  def validate_payment(app_key, params) do
    sign_string = params["data"] |> Enum.sort
                                 |> Enum.map_join("", fn({k, v}) -> "#{k}=#{v}" end)

   
    sign_string = sign_string <> app_key
    our_sign = Crypto.md5_sign(sign_string)
    our_sign == params["sign"]
  end

end
