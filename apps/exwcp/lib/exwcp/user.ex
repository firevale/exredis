defmodule Exwcp.User do
  @moduledoc """
  User API.
  """

  import Exwcp.ApiBase

  def list(wcp_config = %{wcp_app_id: _, wcp_app_key: _}) do
    get(wcp_config, "user/get")
  end

  def list(wcp_config = %{wcp_app_id: _, wcp_app_key: _}, next_openid) do
    get(wcp_config, "user/get", next_openid: next_openid)
  end

  def info(wcp_config = %{wcp_app_id: _, wcp_app_key: _}, openid) do
    get(wcp_config, "user/info", openid: openid, lang: "zh_CN")
  end
end
