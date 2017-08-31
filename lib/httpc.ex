defmodule Utils.Httpc do
  use     HTTPotion.Base
  alias   Utils.JSON
  use     LogAlias

  def get_msg(url, params) do
    info "http get: #{url <> "?" <> URI.encode_query(params)}"
    get(url <> "?" <> URI.encode_query(params))
  end

  def post_msg(url, msg, timeout \\ 30_000) do
    info "http post: #{url} msg: #{URI.encode_query(msg)}"
    post(url, body: URI.encode_query(msg),
              headers: ["Content-Type": "application/x-www-form-urlencoded"],
              timeout: timeout)
  end

  def post_json(url, %{} = msg, timeout \\ 30_000) do
    info "http post: #{url} msg: #{JSON.encode!(msg)}"
    post(url, body: JSON.encode!(msg),
              headers: ["Content-Type": "application/json"],
              timeout: timeout)
  end

  def success?(%HTTPotion.Response{} = response), do: HTTPotion.Response.success?(response)
  def success?(%HTTPotion.ErrorResponse{}), do: false
end
