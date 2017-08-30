defmodule Utils.Tinypng do
  require HTTPoison
  require Redis
  use LogAlias
  alias Utils.JSON

  @api_key "vFezemVJCvE6VYpWy6sFqB2Puja57XGm"
  @redis_cache_key "fvac.tiny_list"

  def tinify(image_path) do
    Redis.sadd(@redis_cache_key, image_path)
  end

  def tinify_bg(image_path) do 
    response  = HTTPoison.post!("https://api.tinify.com/shrink", {:file, image_path}, [],
      [recv_timeout: 60_000, 
       follow_redirect: true,
       hackney: [basic_auth: {"api", @api_key}]])

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
          x ->
            :error
        end
      _ ->
        :error
    end
  end
end