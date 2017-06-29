defmodule Wcp.AccessToken do
  @moduledoc """
  AccessToken API.
  """

  import Wcp.ApiBase
  alias  Acs.RedisAppWcpConfig

  def get_token(app_id) do
    config = RedisAppWcpConfig.find(app_id)

    get_access_token("token",
      grant_type: "client_credential",
      appid: config.wcp_app_id,
      secret: config.wcp_app_key)
  end
end
