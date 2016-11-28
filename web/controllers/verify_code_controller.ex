defmodule Acs.VerifyCodeController do
  use Acs.Web, :controller

  alias Acs.CaptchaGenerator
  alias Acs.SmsService

  def check_register_code(conn, %{"verify_code" => value}) do 
    captcha = get_session(conn, :verify_code)
    conn |> json(%{success: true, match: captcha == String.downcase(value)})
  end

  def reset_register_captcha(conn, _params) do 
    size = 3 + :rand.uniform(2)
    {token, _} = :rand.uniform(0xffffff) |> :binary.encode_unsigned |> Base.encode16 |> String.downcase |> String.split_at(size)
    image_url = CaptchaGenerator.generate(token)
    conn |> put_session(:verify_code, token)
         |> json(%{success: true, image_url: image_url})
  end

  def send_mobile_register_verify_code(conn, %{"mobile" => mobile}) do 
    last_sent = case get_session(conn, :last_mobile_sent_at) do 
                  nil -> 0 
                  v -> v
                end

    now = Utils.unix_timestamp

    if now - last_sent > 59 do 
      token = :rand.uniform(99999) |> to_string |> String.pad_leading(5, "0")
      case SmsService.send_verify_code(mobile, token) do 
        :ok ->
          conn |> put_session(:verify_code, token)
               |> put_session(:last_mobile_sent_at, now)
               |> json(%{success: true})
        _ ->
          conn |> json(%{success: false, message: "send sms failed"})
      end
    else
      conn |> json(%{success: false, message: "send mobile code cooldown time limit"})
    end
  end



end