defmodule Wcp.ApiFile do
  @moduledoc """
  HTTP request for file api.
  """

  use HTTPoison.Base
  alias HTTPoison.Response

  @base_url "http://file.api.weixin.qq.com/cgi-bin/"

  def process_response(%Response{headers: headers, body: body}) do
    content_type = :proplists.get_value("Content-Type", headers)
    if content_type in ["application/json", "text/plain"] do
      Poison.decode!(body, keys: :atoms)
    else
      body
    end
  end

  def get(app_id, path, params \\ []) do
    params = Keyword.merge(params, [access_token: Wcp.access_token(app_id)])
    __MODULE__.get!(path, [], params: params)
      |> process_response
  end
end
