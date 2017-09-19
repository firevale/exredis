defmodule SDKYYH do

  require Logger

  alias   Utils.Httpc
  alias   Utils.JSON
  alias   Utils.Crypto
  require Utils

  @baseUrl  "http://api.appchina.com/appchina-usersdk/user/v2/get.json"

  def validate_session(appid, appkey, ticket) do 	 
    try do 
      response = Httpc.get_msg(@baseUrl, %{
                                          "login_id" => appid,
                                          "login_key" => appkey,
                                          "ticket" => ticket
                                          })
      if Httpc.success?(response) do 
        case JSON.decode(response.body) do 
          {:ok, res} -> 
            Logger.info "validate yyh session, status = #{res["status"]}"
            res["status"] == "0" || res["status"] == 0
          _ -> 
            Logger.error "validate yyh session error, not a json response"
            false
        end 
      else
        Logger.error "validate yyh session failed"
        false
      end
    catch
      :error, e ->
        Logger.error "validate yyh session exception: #{inspect e}"
        false
    end
  end

  def validate_payment(key, transdata, sign) do 
    << _ :: binary-size(40), key2 :: binary >> = key |> Base.decode64!
    [private_key, mod_key] = key2 |> Base.decode64! |> String.split("+")

    msg_md5  = Crypto.md5_sign(transdata)
    sign_md5 = decrypt_rsa(sign |> String.trim, private_key, mod_key)

    msg_md5 == sign_md5
  end


  defp decrypt_rsa(cipher, private_key, mod_key) do 

    private_key = String.to_integer(private_key)
    mod_key     = String.to_integer(mod_key)

    for v <- String.split(cipher, " ") do 
      v = String.to_integer(v, 16)
      :crypto.mod_pow(v, private_key, mod_key) 
    end |> Enum.join("") |> String.trim
  end

  

end