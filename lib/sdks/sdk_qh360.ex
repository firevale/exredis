defmodule SDKQh360 do

  require Logger

  alias   Utils.Httpc
  alias   Utils.JSON
  require Utils

  @baseUrl       "https://openapi.360.cn/user/me"

  def validate_session(qh360_access_token) do 	 
    response = Httpc.get_msg(@baseUrl, %{access_token: qh360_access_token, fields: "id,name,avatar,sex,area,nick"})

    if Httpc.success?(response) do 
      case JSON.decode(response.body, keys: :atoms) do 
        {:ok, jres = %{}} ->
          if is_nil(jres[:id]) or jres[:id] == "" do 
            nil
          else 
            jres 
          end
        _ -> nil
      end
    else
      nil
    end
  end

  def validate_payment(app_secret, params) do
    sign_string = params |> Enum.reject(fn({k, _v}) -> k == "client_id" or k == "format" or k == "sign"  or k == "sign_return"  end) 
                         |> Enum.sort 
                         |> Enum.map_join("#", fn({_k, v}) -> "#{v}" end)

    sign_string = sign_string <> "#" <> app_secret
    our_sign = Utils.md5_sign(sign_string)
    our_sign == params["sign"]
  end

end
