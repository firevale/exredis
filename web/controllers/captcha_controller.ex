defmodule Acs.CaptchaController do
  use Acs.Web, :controller

  alias Acs.CaptchaGenerator

  def check(conn, %{"captcha_value" => value}) do 
    conn |> json(%{success: true, match: get_session(conn, :captcha_value) == String.downcase(value)})
  end

  def update(conn, _params) do 
    size = 3 + :rand.uniform(2)
    {_, token} = :rand.uniform(0xffffff) |> :binary.encode_unsigned |> Base.encode16 |> String.downcase |> String.split_at(6 - size)
    image_url = CaptchaGenerator.generate(token)
    conn |> put_session(:captcha_value, token)
         |> json(%{success: true, image_url: image_url})
  end

end