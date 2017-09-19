defmodule Exwcp.ApiFile do
  @moduledoc """
  HTTP request for file api.
  """

  use HTTPoison.Base
  alias HTTPoison.Response

  @base_url "http://file.api.weixin.qq.com/cgi-bin/"

  def process_url(path) do
    @base_url <> path
  end

  def process_response(%Response{headers: headers, body: body}) do
    content_type = :proplists.get_value("Content-Type", headers)
    if content_type in ["application/json", "text/plain"] do
      Poison.decode!(body, keys: :atoms)
    else
      body
    end
  end

  def get(wcp_config = %{wcp_app_id: _, wcp_app_key: _}, path, params \\ []) do
    params = Keyword.merge(params, [access_token: Exwcp.access_token(wcp_config)])
    __MODULE__.get!(path, [], params: params)
      |> process_response
  end
end
