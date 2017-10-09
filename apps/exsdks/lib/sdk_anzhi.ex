defmodule SDKAnzhi do
  require Logger

  alias   Utils.Httpc
  alias   Utils.JSON

  @baseUrl  "http://user.anzhi.com/web/api/sdk/third/1/queryislogin"

  def validate_session(appkey, appsecret, sid) do 	 
    try do 
      response = Httpc.post_msg(@baseUrl, %{
                                          "time" => Timex.format!(Timex.local, "%Y%m%d%H%M%S", :strftime),
                                          "appkey" => appkey,
                                          "sid" => sid,
                                          "sign" => Base.encode64("#{appkey}#{sid}#{appsecret}")
                                          })

      if Httpc.success?(response) do 
        rep_string = String.replace(response.body, "'", "\"")
       
        case JSON.decode(rep_string) do 
          {:ok, res} -> 
            Logger.info "validate anzhi session, st = #{res["st"]} ,sc=#{res["sc"]}"
            res["sc"] == 1 || res["sc"] == "1"
          _ -> 
            Logger.error "validate anzhi session error, not a json response"
            false
        end 
      else
        Logger.error "validate anzhi session failed"
        false
      end
    catch
      :error, e ->
        Logger.error "validate anzhi session exception: #{inspect e}"
        false
    end
  end

 

end