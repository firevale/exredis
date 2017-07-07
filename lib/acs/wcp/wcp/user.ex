defmodule Wcp.User do
  @moduledoc """
  User API.
  """

  import Wcp.ApiBase

  def list(app_id) do
    get(app_id, "user/get")
  end

  def list(app_id, next_openid) do
    get(app_id, "user/get", next_openid: next_openid)
  end

  def info(app_id, openid) do
    get(app_id, "user/info", openid: openid, lang: "zh_CN")
  end
end
