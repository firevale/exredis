defmodule SDKFacebook do
  require Logger

  defmodule Graph do 
	  use     HTTPotion.Base
	  require Logger
    alias   Utils.JSON

	  @config Application.get_env(:acs, :facebook)

    def get_url(url, params = %{}) do 
      get(url <> "?" <> URI.encode_query(params))
    end

	  defp process_url(url) do
     result = Path.join(@config[:graph_url], url) 
     #Logger.info "facebook me url: #{result}"
     result
    end

    defp process_response_body(body) do 
      #Logger.info "facebook graph get response body: #{inspect body}"
      try do 
        JSON.decode!(body)
      rescue
        _e in Poison.SyntaxError ->
          URI.decode_query(body)
      end
    end
  end

  @doc """
  Basic user infos of the logged in user (specified by the access_token)

  See: https://developers.facebook.com/docs/graph-api/reference/user/
  """
  def me(secret, fields, access_token) when is_bitstring(fields) do
    me(secret, %{fields: fields}, access_token)
  end

  def me(secret, fields, access_token) when is_map(fields) do
    fields = fields |> Map.put(:appsecret_token, encrypt(secret, access_token)) 
                    |> Map.put(:access_token, access_token) 
    try do 
      response = Graph.get_url("/me", fields)
      
      if response.status_code in 200..299 do 
        Logger.info "facebook validate access_token success, #{inspect response.body}"
        Map.put(response.body, :success, true)
      else 
        Logger.error "facebook validate access_token failed"
        %{success: false, message: "http request failed"} 
      end
    catch
      :error, e ->
        Logger.error "facebook validate access_token exception encountered, #{inspect e}"
        %{success: false, message: "exception"}
    end
  end

  defp encrypt(secret, token) do
    :crypto.hmac(:sha256, secret, token)
  end
end