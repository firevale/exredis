defmodule Exwcp.ApiBase do
  @moduledoc """
  HTTP request for basic api.
  """

  use HTTPoison.Base
  require Exwcp

  @base_url "https://api.weixin.qq.com/cgi-bin/"

  def process_url(path) do
    @base_url <> path
  end

  def process_response_body(body), do: Poison.decode!(body, keys: :atoms)

  def get(wcp_config = %{wcp_app_id: _, wcp_app_key: _}, path, params \\ []) do
    __MODULE__.get!(path, [], params: append_access_token(wcp_config, params)).body
  end

  def get_access_token(path, params \\ []) do
    __MODULE__.get!(path, [], params: params).body
  end

  def post(wcp_config = %{wcp_app_id: _, wcp_app_key: _}, path, body, params \\ []) do
    body = Poison.encode!(body)

    __MODULE__.post!(path, body, [], [params: append_access_token(wcp_config, params)]).body
  end

  defp append_access_token(wcp_config, params) do
    params
    |> Keyword.merge([access_token: Exwcp.access_token(wcp_config)])
  end
end
