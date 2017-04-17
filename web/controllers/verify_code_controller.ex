defmodule Acs.VerifyCodeController do
  use Acs.Web, :controller

  alias Acs.CaptchaGenerator
  alias Acs.SmsService
  alias Acs.EmailService

  plug :detect_account_id 
  plug :check_account_exist 

  def check_register_verify_code(conn, %{"verify_code" => value}) do 
    verify_code = get_session(conn, :register_verify_code)
    conn |> json(%{success: true, match: verify_code == String.downcase(value)})
  end

  def reset_register_captcha(conn, _params) do 
    code = gen_hex_code() 
    image_url = CaptchaGenerator.generate(code)
    conn |> put_session(:register_verify_code, code)
         |> json(%{success: true, image_url: image_url})
  end

  def send_mobile_register_verify_code(conn, %{"mobile" => mobile}) do 
    send_mobile_verify_code(conn, mobile, "register")
  end

  def send_mobile_bind_verify_code(conn, %{"mobile" => mobile}) do 
    send_mobile_verify_code(conn, mobile, "bind_mobile")
  end

  def check_retrieve_password_verify_code(conn, %{"token" => value}) do 
    check_retrieve_password_verify_code(conn, %{"verify_code" => value})
  end
  def check_retrieve_password_verify_code(conn, %{"verify_code" => value}) do 
    verify_code = get_session(conn, :retrieve_password_verify_code)
    conn |> json(%{success: true, match: verify_code == String.downcase(value)})
  end

  def send_retrieve_password_verify_code(%Plug.Conn{private: %{acs_mobile: mobile}} = conn, _) do 
    send_mobile_verify_code(conn, mobile, "retrieve_password")
  end
  def send_retrieve_password_verify_code(%Plug.Conn{private: %{acs_email: email}} = conn, _) do 
    send_email_verify_code(conn, email)
  end

  defp send_mobile_verify_code(conn, mobile, type) do 
    case Redis.get("vc.mobile.sms.#{mobile}") do 
      :undefined ->
        code = gen_code()
        case SmsService.send_verify_code(mobile, code) do 
          :ok ->
            Redis.setex("vc.mobile.sms.#{mobile}", 60, code)
            conn |> put_session(String.to_atom("#{type}_account_id"), mobile)
                 |> put_session(String.to_atom("#{type}_verify_code"), code)
                 |> json(%{success: true})
          _ ->
            conn |> json(%{success: false, i18n_message: "error.server.sendSmsFailed"})
        end
      _ ->
        conn |> json(%{success: false, i18n_message: "error.server.sendSmsCooldown"})
    end
  end

  defp send_email_verify_code(%Plug.Conn{private: %{acs_locale: locale}} = conn, email) do 
    case Redis.get("vc.email.#{email}") do 
      :undefined ->
        code = gen_code()
        case EmailService.deliver_reset_password(locale, email, code) do 
          :ok ->
            Redis.setex("vc.email.#{email}", 60, code)
            conn |> put_session(:retrieve_password_account_id, email)
                 |> put_session(:retrieve_password_verify_code, code)
                 |> json(%{success: true})
          _ ->
            conn |> json(%{success: false, i18n_message: "error.server.sendEmailFailed"})
        end
      _ ->
        conn |> json(%{success: false, i18n_message: "error.server.sendEmailCooldown"})
    end
  end

  defp check_account_exist(%Plug.Conn{params: %{"account_id" => account_id}} = conn, _options) do 
    if not RedisUser.exists?(account_id) do 
      conn |> json(%{success: false, i18n_message: "error.server.accountNotFound"}) |> halt
    else 
      conn
    end
  end
  defp check_account_exist(conn, _options), do: conn 

  defp gen_hex_code do 
    size = 3 + :rand.uniform(2)
    {code, _} = :rand.uniform(0xffffff) |> :binary.encode_unsigned |> Base.encode16 |> String.downcase |> String.split_at(size)
    code
  end

  defp gen_code do 
    :rand.uniform(99999) |> to_string |> String.pad_leading(5, "0")
  end

end