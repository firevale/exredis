defmodule SDKMeizu do

  require Logger

  alias   Utils.Httpc
  alias   Utils.JSON
  alias   Utils.Crypto
  require Utils

  @baseUrl  "https://api.game.meizu.com/game/security/checksession"

  def validate_session(app_id, app_secret, session_id, uid) do 	 
    try do 
      params = %{"app_id" => app_id, "session_id" => session_id, "uid" => uid, "ts" => Utils.unix_timestamp}
      sign_string = params |> Enum.sort  |> Enum.map_join("&", fn({k, v}) -> "#{k}=#{v}" end)
      sign = Crypto.md5_sign(sign_string <> ":" <> app_secret)
      params = Map.put(params, "sign_type", "md5")
      params = Map.put(params, "sign", sign)

      response = Httpc.post_form(@baseUrl, params)

      if Httpc.success?(response) do 
        # Logger.info "validate meizu session response: #{inspect response.body}"
        case JSON.decode(response.body) do 
          {:ok, res} -> 
            Logger.info "validate meizu session, code = #{res["code"]}"
            res["code"] == "200"
          _ -> 
            Logger.error "validate meizu session error, not a json response"
            false
        end 
      else
        Logger.error "validate meizu session failed"
        false
      end
    catch
      :error, e ->
        Logger.error "validate meizu session exception: #{inspect e}"
        false
    end
  end

  def validate_payment(appSecret, %{"sign" => their_sign} = params) do 

    sign_str = ~w(app_id buy_amount cp_order_id create_time notify_id notify_time order_id partner_id pay_time pay_type product_id product_per_price product_unit total_price trade_status uid user_info)
                 |> Enum.sort
                 |> Enum.map_join("&", &("#{&1}=#{params[&1]}"))

    sign_str = sign_str <> ":#{appSecret}"
    our_sign = Crypto.md5_sign(sign_str)
    our_sign == their_sign
  end

end