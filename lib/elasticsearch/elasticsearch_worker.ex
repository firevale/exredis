defmodule ElasticSearch.Worker do
  use     GenServer
  alias   Utils.Httpc
  alias   Utils.JSON
  require Logger

  def start_link(args) do
    GenServer.start_link(__MODULE__, args)
  end

  def request %{worker: worker, 
                method: method, 
                path: path, 
                body: body, 
                params: params} do 
    GenServer.call(worker, {method, path, body, params}, 60_000)
  end

  def init(args) do 
    base_url = ["http://", host_to_binary(args[:host]), ":", port_to_binary(args[:port]), "/"] |> Enum.join("")
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
                _ -> [{"content-type", "application/json"}]
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
      response = Httpc.request(method, url, body: body, headers: headers, timeout: 60_000)

      result = case response.body do 
                 "" -> response.status_code
                 nil -> response.status_code 
                 "{" <> _ -> JSON.decode!(response.body, keys: :atoms)
                 _ -> response.body
               end

      curl = "curl -X#{String.upcase(method |> to_string)} #{inspect url} -d #{inspect body, pretty: true}"
      Logger.debug "#{curl}\n\n#{inspect response, pretty: true}\n\n"

      if Httpc.success?(response) do 
        {:ok,  result}
      else 
        curl = "curl -X#{String.upcase(method |> to_string)} #{inspect url} -d #{inspect body, pretty: true}"
        Logger.error "#{curl}\n\n#{inspect response, pretty: true}\n\n"
        {:error, nil}
      end
    rescue
      e in HTTPotion.HTTPError -> 
        curl = "curl -X#{String.upcase(method |> to_string)} #{inspect url} -d #{inspect body, pretty: true}"
        Logger.error "#{curl}\n\n#{inspect e, pretty: true}\n\n"
        {:error, nil}
    end
  end
end