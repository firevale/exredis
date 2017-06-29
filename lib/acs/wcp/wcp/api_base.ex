defmodule Wcp.ApiBase do
  @moduledoc """
  HTTP request for basic api.
  """

  use HTTPoison.Base

  @base_url "https://api.weixin.qq.com/cgi-bin/"

  def process_url(path) do
    @base_url <> path
  end

  def process_response_body(body), do: Poison.decode!(body, keys: :atoms)

  def get(app_id, path, params \\ []) do
    __MODULE__.get!(path, [], params: append_access_token(app_id, params)).body
  end

  def get_access_token(path, params \\ []) do
    __MODULE__.get!(path, [], params: params).body
  end

  def post(app_id, path, body, params \\ []) do
    body = Poison.encode!(body)

    __MODULE__.post!(path, body, [], [params: append_access_token(app_id, params)]).body
  end

  defp append_access_token(app_id, params) do
    params
    |> Keyword.merge([access_token: Wcp.access_token(app_id)])
  end
end
