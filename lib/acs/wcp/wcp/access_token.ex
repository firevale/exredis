defmodule Wcp.AccessToken do
  @moduledoc """
  AccessToken API.
  """

  import Wcp.ApiBase

  def get_token(app_id) do
    get "token",
      grant_type: "client_credential",
      appid: Wcp.config[:appid],
      secret: Wcp.config[:secret]
  end
end
