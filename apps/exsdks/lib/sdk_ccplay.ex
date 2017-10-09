defmodule SDKCCPlay do
  require Logger
  require Utils

  #cc 没有验证token
  def validate_session(_app_id, _app_key, _token) do 
    true
  end

  def validate_payment(payKey, params) do 
    sign_string = params |> Enum.reject(fn({k, _v}) -> k == "client_id" or k == "format" or k == "sign"  end) 
                         |> Enum.sort 
                         |> Enum.map_join("&", fn({k, v}) -> "#{k}=#{v}" end)
                         
    sign_string = sign_string <> "&" <> payKey 
    our_sign = Utils.md5_sign(sign_string)
    our_sign == params["sign"]

  end

end
  
 