defmodule SDKI4 do
  require Logger
  alias   Utils.Httpc
  require Utils
  alias   Utils.JSON
  alias   Utils.Crypto

  @baseUrl "https://pay.i4.cn/member_third.action"

  def validate_session(session_id) do 
    try do 
      response = Httpc.post_form(@baseUrl, %{"token" => session_id})

      if Httpc.success?(response) do 
       
        case JSON.decode(response.body) do 
          {:ok, res} -> 
            Logger.info "validate i4 session, Code = #{res["status"]}"
            res["status"] == 0
          _ -> 
            Logger.error "validate i4 session error, not a json response"
            false
        end 
      else
        Logger.error "validate i4 session failed"
        false
      end
    catch
      :error, e ->
        Logger.error "validate i4 session exception: #{inspect e}"
        false
    end
  end


  def validate_payment(rsa_key, params) do 
    plain_text = Crypto.rsa_pubseg_decrypt2(rsa_key, params["sign"] |> String.replace("\n", ""))

    case URI.decode_query(plain_text) do 
      %{"status" => "0"} -> 
        true
      _ ->
        false
    end
  end

end
  
 