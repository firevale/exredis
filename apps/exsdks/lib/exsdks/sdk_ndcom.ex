defmodule SDKNdcom do
  require Logger
  alias   Utils.Httpc
  require Utils
  alias   Utils.JSON
  alias   Utils.Crypto

  @baseUrl "http://service.sj.91.com/usercenter/AP.aspx"

  def validate_session(appId, appKey, uin, sessionId) do 
    try do 
      response = Httpc.get_msg(@baseUrl, %{
        "AppId" => appId,
        "Act" => 4,
        "Uin" => uin,
        "SessionID" => sessionId,
        "Sign" => Crypto.md5_sign("#{appId}4#{uin}#{sessionId}#{appKey}")
      })

      if Httpc.success?(response) do 
        case JSON.decode(response.body) do 
          {:ok, res} -> 
            Logger.info "validate ndcom session, ErrorCode = #{res["ErrorCode"]}"
            res["ErrorCode"] == "1"
          _ -> 
            Logger.error "validate ndcom session error, not a json response"
            false
        end 
      else
        Logger.error "validate ndcom session failed"
        false
      end
    catch
      :error, e ->
        Logger.error "validate ndcom session exception: #{inspect e}"
        false
    end
  end

  def validate_payment(_appId, appKey, params) do 
    sign_theirs = params["Sign"]

    case sign_theirs do 
      "" -> false
      nil -> false 
      v when is_bitstring(v) ->
        keys = ["AppId", "Act", "ProductName", "ConsumeStreamId", 
                "CooOrderSerial", "Uin", "GoodsId", "GoodsInfo", "GoodsCount",
                "OriginalMoney", "OrderMoney", "Note", "PayStatus", "CreateTime"]

        sign_str = keys |> Enum.map_join("", &(params[&1] |> to_string))
        sign_str = sign_str <> appKey
        Crypto.md5_sign(sign_str) == sign_theirs
    end
  end

end