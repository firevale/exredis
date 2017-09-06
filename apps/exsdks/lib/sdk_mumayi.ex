defmodule SDKMumayi do

  require Logger

  alias   Utils.Httpc
  alias   Utils.Crypto
  require Utils
  use Bitwise

  @baseUrl  "http://pay.mumayi.com/user/index/validation"

  def validate_session(token, uid) do 	 
    try do 
      response = Httpc.post_form(@baseUrl, %{
                                          "token" => token,
                                          "uid" => uid
                                          })

      if Httpc.success?(response) do 
        response.body == "success"
      else
        false
      end
    catch
      :error, e ->
        Logger.error "validate downjoy session exception: #{inspect e}"
        false
    end
  end

  def validate_payment(app_key, %{"tradeSign" => tradeSign, "orderID" => orderID}) do 
    sign_length = String.length(tradeSign)
    if sign_length < 14 do
      false
    else
      << verifyStr :: binary-size(8), data :: binary >> = tradeSign
      case data |> Crypto.md5_sign |> :binary.part(0, 8) do 
        ^verifyStr ->
          << key_b :: binary-size(6), rest :: binary >> = data
          rand_key = Crypto.md5_sign(key_b <> app_key) |> String.to_char_list
          
          signedOrderID = Base.decode64!(rest) |> String.to_char_list |> Enum.with_index |> Enum.map_join("", fn{c, i} ->
            << Bitwise.bxor(c,  Enum.at(rand_key, rem(i, 32))) >>
          end)

          signedOrderID == orderID
        _ ->
          false
      end
    end
  end

  def validate_payment(_, _), do: false 

end