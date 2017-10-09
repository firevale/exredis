defmodule SDKWandoujia do
  # require Logger
  alias   Utils.Httpc

  @baseUrl "https://pay.wandoujia.com/api/uid/check"

  def validate_session(app_id, user_id, access_token) do   
    response = Httpc.get_msg(@baseUrl, %{
                                          "uid" => user_id,
                                          "token" => access_token,
                                          "appkey_id" => app_id
                                          })


    if Httpc.success?(response) do 
      response.body == "true"
    else
      false
    end
  end
end
  
 