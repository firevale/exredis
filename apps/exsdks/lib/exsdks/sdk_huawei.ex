defmodule SDKHuawei do
  require Logger
  alias   Utils.Httpc
  require Utils
  alias   Utils.JSON
  alias   Utils.Crypto

  @baseUrl "https://api.vmall.com/rest.php"

  def validate_session(access_token) do   
    response = Httpc.post_form(@baseUrl, %{
                                          "nsp_svc" => "OpenUP.User.getInfo",
                                          "nsp_ts" => Utils.unix_timestamp,
                                          "access_token" => access_token
                                          })


    if Httpc.success?(response) do 
      case response.body do 
        "NSP_STATUS" <> _ ->
          %{success: false}
        _ ->
          case JSON.decode!(response.body) do 
            %{"userID" => user_id, "userName" => nick_name} ->
              %{success: true, user_id: user_id, nick_name: nick_name}
            _ ->
              %{success: false}
          end
      end
    else
      %{success: false}
    end
  end

  def validate_payment(pub_key, %{"sign" => sign} = params) do 

    sign_string = params |> Enum.reject(fn({k, _v}) -> k == "client_id" or k == "format" or k == "sign" end) 
                         |> Enum.sort 
                         |> Enum.map_join("&", fn({k, v}) -> "#{k}=#{v}" end) 
                   
    sign = URI.decode(sign)
    Crypto.rsa_public_verify2(pub_key, sign_string, sign, :sha) 
  end

end