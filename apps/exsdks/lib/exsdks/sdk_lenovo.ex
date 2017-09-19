defmodule SDKLenovo do
  require Logger
  alias   Utils.Httpc
  import  SweetXml

  @baseUrl "http://passport.lenovo.com/interserver/authen/1.2/getaccountid"

  def validate_session(app_id, access_token) do   
    response = Httpc.get_msg(@baseUrl, %{
                                          "lpsust" => access_token,
                                          "realm"  => app_id,
                                          })
    
    if Httpc.success?(response) do 
      xmlresult = response.body 
        |> xpath(~x"//IdentityInfo", 
                  account_id: ~x"./AccountID/text()[1]", 
                  user_name: ~x"./Username/text()[1]",
                  device_id: ~x"./DeviceID/text()[1]", 
                  verified:  ~x"./verified/text()[1]")
        |> Enum.into(%{}, fn({k, v}) -> {k, (v |> to_string |> String.trim)} end)
      %{success: true, account_id: xmlresult.account_id, user_name: xmlresult.user_name}
    else
      %{success: false}
    end
  end

  
end