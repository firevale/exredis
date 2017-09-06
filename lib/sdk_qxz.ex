defmodule SDKQxz do

  require Logger

  # alias   Utils.Httpc
  # alias   Utils.JSON
  require Utils

  # @baseUrl  "http://api.appchina.com/appchina-usersdk/user/v2/get.json"

  def validate_session(_appid, _appkey, _user_id) do 	 
    # no validate method provided
    true
  end

  def validate_payment(key, params, signature) do 
    sign_string = params |> Enum.map_join("&", fn({k, v}) -> "#{k}=#{v}" end)

    our_sign = Utils.md5_sign(sign_string <> key) 
    our_sign == signature
  end

end