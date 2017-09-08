defmodule Exservice.Tinypng do
  require HTTPoison
  use   Utils.LogAlias
  alias Utils.JSON

  @api_key  Application.get_env(:exservice, Tinypng, "")

  def tinify(image_path) do 
    info "start tinify image file: #{image_path}"
    response  = HTTPoison.post!("https://api.tinify.com/shrink", {:file, image_path}, [],
      [recv_timeout: 120_000, 
       follow_redirect: true,
       hackney: [basic_auth: {"api", @api_key}]])
    
    info "tinify image file: #{image_path} finished, response: #{inspect response}"

    case response do 
      %{status_code: 201, body: json_str} ->
        case JSON.decode!(json_str) do 
          %{"output" => %{"ratio" => ratio, "url" => output_url}} when ratio < 0.8 ->
            info "tinify #{image_path} by #{ratio}"
            case HTTPoison.get!(output_url) do 
              %{status_code: 200, body: body} -> 
                File.write!(image_path, body)
                :ok
              _ ->
                :error
            end
          _x ->
            :error
        end
      _ ->
        :error
    end
  end
end