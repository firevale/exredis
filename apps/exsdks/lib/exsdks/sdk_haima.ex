defmodule SDKHaima do
  require Logger
  alias   Utils.Httpc
  alias   Utils.Crypto
  require Utils
  # alias   Utils.JSON

  @baseUrl "http://api.haimawan.com/index.php?m=api&a=validate_token"

  def validate_session(app_id, access_token) do   
    response = Httpc.post_form(@baseUrl, %{
                                          "appid" => app_id,
                                          "t" => access_token
                                          })


    if Httpc.success?(response) do 
      response.body == "success"
    else
      false
    end
  end

  def validate_payment(app_key, params = %{"sign" => their_sign}) do 
    sign_string = ~w(notify_time appid out_trade_no total_fee subject body trade_status)
                  |> Enum.map_join("&", &("#{&1}=#{params[&1] |> URI.encode_www_form}")) 

                  Crypto.md5_sign(sign_string <> app_key) == their_sign
  end

end
  
 