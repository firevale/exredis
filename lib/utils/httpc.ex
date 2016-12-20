defmodule Utils.Httpc do
  use     HTTPotion.Base
  alias   Utils.JSON
  require Logger

  def get_msg(url, params = %{}) do 
    Logger.debug "http get: #{url <> "?" <> URI.encode_query(params)}"
    get(url <> "?" <> URI.encode_query(params))
  end

  def post_msg(url, %{} = msg, timeout \\ 30_000) do 
    Logger.debug "http post: #{url} msg: #{msg |> URI.encode_query}"
    post url, body: msg |> URI.encode_query, headers: ["Content-Type": "application/x-www-form-urlencoded"], timeout: timeout
  end

  def post_json(url, %{} = msg, timeout \\ 30_000) do 
    Logger.debug "http post: #{url} msg: #{msg |> JSON.encode!}"
    post url, body: msg |> JSON.encode!, headers: ["Content-Type": "application/json"], timeout: timeout
  end

  def success?(%HTTPotion.Response{} = response) do 
    HTTPotion.Response.success?(response)
  end
  def success?(%HTTPotion.ErrorResponse{}) do 
    false
  end
end