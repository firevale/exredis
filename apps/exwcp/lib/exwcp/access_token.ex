defmodule Exwcp.AccessToken do
  @moduledoc """
  AccessToken API.
  """

  import Exwcp.ApiBase

  def get_token(%{wcp_app_id: wcp_app_id, wcp_app_key: wcp_app_key}) do
    get_access_token("token",
      grant_type: "client_credential",
      appid: wcp_app_id,
      secret: wcp_app_key)
  end
end
