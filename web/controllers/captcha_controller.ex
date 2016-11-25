defmodule Acs.CaptchaController do
  use Acs.Web, :controller

  alias Acs.CaptchaGenerator

  def check(conn, %{"captcha_value" => value}) do 
    conn |> json(%{success: true, match: get_session(conn, :captcha_value) == value})
  end

  def update(conn, _params) do 
    size = 1 + :rand.uniform(2)
    token = Utils.generate_token(size)
    image_url = CaptchaGenerator.generate(token)
    conn |> put_session(:captcha_value, token)
         |> json(%{success: true, url: image_url})
  end

end