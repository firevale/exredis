defmodule Elasticsearch.Worker do
  use     GenServer
  use     Utils.LogAlias

  alias   Utils.Httpc
  alias   Utils.JSON

  def start_link(args) do
    GenServer.start_link(__MODULE__, args)
  end

  @request_timeout 60_000
  def request %{worker: worker, 
                method: method, 
                path: path, 
                body: body, 
                params: params} do 
    GenServer.call(worker, {method, path, body, params}, @request_timeout)
  end

  def request %{worker: worker, 
                method: method, 
                path: path,
                body: body} do 
    GenServer.call(worker, {method, path, body, nil}, @request_timeout)
  end

  def request %{worker: worker, 
                method: method, 
                path: path,
                params: params} do  
    GenServer.call(worker, {method, path, nil, params}, @request_timeout)
  end

  def request %{worker: worker, 
                method: method, 
                path: path} do 
    GenServer.call(worker, {method, path, nil, nil}, @request_timeout)
  end

  def init(args) do 
    base_url = ["http://", host_to_binary(args[:host]), ":", port_to_binary(args[:port]), "/"] |> Enum.join("")
    info "elasticsearch base_url: #{base_url}"
    {:ok, %{base_url: base_url} }
  end

  defp host_to_binary({:system, env_var}), do: host_to_binary(System.get_env(env_var) || "127.0.0.1")
  defp host_to_binary(host), do: to_string(host)

  defp port_to_binary({:system, env_var}), do: port_to_binary(System.get_env(env_var) || "9200")
  defp port_to_binary(port), do: to_string(port)

  def handle_call({method, path, body, params}, _from, %{base_url: base_url} = state) when is_list(path) do 
    path = path |> Enum.map(&(to_string(&1)))
    url = Path.join(base_url, Path.join(path)) 
    {:reply, handle_http_request(method, url, body, params), state}
  end

  def handle_call({method, path, body, params}, _from, %{base_url: base_url} = state) when is_bitstring(path) do 
    url = Path.join(base_url, path)
    {:reply, handle_http_request(method, url, body, params), state}
  end

  def handle_call(request, from, state) do 
    super(request, from, state)
  end

  defp handle_http_request(method, url, body, params) do 
    headers = case method do 
                :delete -> []
                _ -> ["content-type": "application/json"]
              end

    url = case params do 
            nil -> url
            "" -> url 
            x when is_map(x) -> url <> "?" <> URI.encode_query(params)
            x when is_bitstring(x) -> url <> "?" <> params 
          end

    body = case body do 
            nil -> ""
            "" -> ""
            x when is_map(x) -> body |> JSON.encode!
            x when is_bitstring(x) -> body
           end

    try do 
      response = Httpc.request(method, url, body: body, headers: headers, timeout: @request_timeout)

      result = case response.body do 
                 "" -> response.status_code
                 nil -> response.status_code 
                 "{" <> _ -> JSON.decode!(response.body, keys: :atoms)
                 _ -> response.body
               end

      curl = "curl -X#{String.upcase(method |> to_string)} #{inspect url} -d #{inspect body, pretty: true}"
      d "#{curl}\n\n#{inspect response, pretty: true}\n\n"

      if Httpc.success?(response) do 
        {:ok,  result}
      else 
        curl = "curl -X#{String.upcase(method |> to_string)} #{inspect url} -d #{inspect body, pretty: true}"
        error "#{curl}\n\n#{inspect response, pretty: true}\n\n"
        {:error, nil}
      end
    rescue
      e in HTTPotion.HTTPError -> 
        curl = "curl -X#{String.upcase(method |> to_string)} #{inspect url} -d #{inspect body, pretty: true}"
        error "#{curl}\n\n#{inspect e, pretty: true}\n\n"
        {:error, nil}
    end
  end
end