defmodule Acs.TestFlight.Worker do 
  use LogAlias

  require CookieJar
  require Poison
  require Cachex
  require Redis

  alias CookieJar.HTTPoison
  alias Acs.RedisItcApp
  alias Acs.ItcApp

  @base_url "https://itunesconnect.apple.com"

  def start(itc_app_id) do 
    GenServer.start(__MODULE__, itc_app_id, name: String.to_atom("tf_#{itc_app_id}"), timeout: 120_000)
  end

  def invite!(itc_app_id, email) do 
    call!(itc_app_id, {:invite, email})
  end

  def num_testers!(itc_app_id) do 
    call!(itc_app_id, :num_testers)
  end

  def is_tester?(itc_app_id, email) do 
    call!(itc_app_id, {:is_tester, email})
  end

  def get_tester!(itc_app_id, email) do 
    call!(itc_app_id, {:get_tester, email})
  end

  def add_tester!(itc_app_id, email, nickname) do 
    call!(itc_app_id, {:add_tester, email, nickname})
  end

  def del_tester!(itc_app_id, email) do 
    call!(itc_app_id, {:del_tester, email})
  end

  def update_app_id(itc_app_id, app_id) do 
    call!(itc_app_id, {:update_app_id, app_id})
  end

  defp call!(itc_app_id, term) do 
    if alive?(itc_app_id) do 
      GenServer.call(String.to_atom("tf_#{itc_app_id}"), term, 60_000)
    else 
      {:ok, _} = start(itc_app_id)
      GenServer.call(String.to_atom("tf_#{itc_app_id}"), term, 60_000)
    end
  end

  defp alive?(itc_app_id) do 
    name = String.to_atom("tf_#{itc_app_id}")
    case Process.whereis(name) do 
      nil -> false
      pid -> 
        GenServer.call(pid, :ping) == :pong
    end
  end

  def init(itc_app_id) do 
    with {:ok, jar} <- CookieJar.new,
         %ItcApp{active: true, itc_login: login, itc_password: password} <- RedisItcApp.find(itc_app_id),
         {:ok, service_key} <- get_service_key(jar),
         :ok <- itc_login(jar, login, password, service_key),
         {:ok, team_id} <- get_first_content_provider_id(jar),
         {:ok, group_id} <- get_default_external_group_id(jar, team_id, itc_app_id),
         {:ok, num_testers, testers} <- num_testers(jar, itc_app_id),
         {:ok, train} <- get_train(%{jar: jar, team_id: team_id, itc_app_id: itc_app_id}),
         {:ok, build_id} <- get_build_id(%{jar: jar, team_id: team_id, itc_app_id: itc_app_id, train: train}),
         {:ok, timer} = :timer.send_interval(60_000, :checker)
    do 
      Process.link(jar)
      app_id = case Redis.get("_acs.itc_app_assoc.#{itc_app_id}") do 
                :undefined -> nil
                v -> v
               end
      {:ok, %{itc_app_id: itc_app_id, 
              team_id: team_id,
              group_id: group_id,
              num_testers: num_testers, 
              itc_login: login,
              itc_password: password,
              service_key: service_key,
              testers: testers,
              train: train,
              build_id: build_id,
              app_id: app_id,
              counter: 0,
              timer: timer,
              jar: jar}}      
    else
      _  -> {:error, "init failed"}
    end
  end

  def handle_call(:ping, _from, state) do 
    {:reply, :pong, state}
  end

  def handle_call(:num_testers, _from, %{num_testers: num_testers} = state) do 
    {:reply, num_testers, state}
  end

  def handle_call({:update_app_id, app_id}, _from, state) do 
    {:reply, :ok, %{state | app_id: app_id}}
  end

  def handle_call({:get_tester, email}, _from, %{testers: testers} = state) do 
    {:reply, Map.get(testers, email), state}
  end

  def handle_call({:is_tester, email}, _from, %{testers: testers} = state) do 
    {:reply, Map.get(testers, email) != nil, state}
  end

  def handle_call({:add_tester, email, nickname}, _from, state) do 
    case add_tester(email, nickname, state) do 
      {:ok, tester_id, status} -> 
        testing = status in ["installed", "accepted"]
        testers = Map.put(state.testers, email, %{"tester_id" => tester_id, "testing" => testing})
        if status == "added" do 
          add_indivitual_tester(tester_id, state)
        end
        num_testers = state.num_testers + 1 
        if num_testers >= 9900 do 
          app_id = case state.app_id do 
                    nil ->
                      case Redis.get("_acs.itc_app_assoc.#{state.itc_app_id}") do 
                        :undefined ->
                          nil
                        x -> x
                      end
                    x -> x
                  end
          
          Cachex.del(:default, "_acs.itc_active_app.#{app_id}")
        end
        {:reply, {:ok, status}, %{state | testers: testers, num_testers: num_testers}}
      _ ->
        {:reply, :error, state}
    end
  end

  def handle_call({:del_tester, email}, _from, state) do 
    case del_tester(email, state) do 
      :ok -> 
        testers = Map.delete(state.testers, email)
        num_testers = state.num_testers - 1
        {:reply, :ok, %{state | testers: testers, num_testers: num_testers}}        
      res -> 
        {:reply, res, state}        
    end
  end

  def handle_info(:checker, %{
    jar: jar, 
    itc_login: login, 
    itc_password: password, 
    service_key: service_key,
    counter: counter} = state) do
    itc_login(jar, login, password, service_key) 
    {:ok, train} = get_train(state)
    state = %{state | train: train}
    {:ok, build_id} = get_build_id(state)
    {:noreply, %{state | counter: counter + 1, service_key: service_key, train: train, build_id: build_id}}
  end

  def terminate(reason, %{timer: nil}) do
    :ok
  end
  def terminate(reason, %{timer: timer}) do
    :timer.cancel(timer)
    :ok
  end

  defp get_service_key(jar) do 
    case HTTPoison.get(jar, Path.join(@base_url, "/itc/static-resources/controllers/login_cntrl.js")) do 
      {:ok, %{body: body}} ->
        case Regex.named_captures(~r/itcServiceKey = '(?<key>.*)'/, body) do 
          %{"key" => service_key} ->
            {:ok, service_key}
          _ -> 
            {:error, "cant get service key"}
        end
      _ ->
        {:error, "js file not found"}
    end
  end

  defp itc_login(jar, login, password, service_key) do 
    case HTTPoison.post(jar, "https://idmsa.apple.com/appleauth/auth/signin?widgetKey=#{service_key}", %{
      accountName: login,
      password: password, 
      rememberMe: false
    } |> Poison.encode!, [
      {"Content-Type", "application/json"},
      {"X-Requested-With", "XMLHttpRequest"},
      {"Accept", "application/json, text/javascript"}
    ]) do 
      {:ok, %{body: body, status_code: 200}} -> 
        :ok
      _ -> 
        {:error, "login failed"}
    end
  end

  defp get_first_content_provider_id(jar) do 
    case HTTPoison.get(jar, Path.join(@base_url, "/WebObjects/iTunesConnect.woa/ra/user/detail")) do 
      {:ok, %{body: body}} ->
        case Poison.decode(body) do 
          {:ok, %{"data" => %{"associatedAccounts" => accounts}}} ->
            [%{"contentProvider" => %{"contentProviderId" => team_id}} | _] = accounts 
            {:ok, team_id}
          _ ->
            {:error, "account not found"}
        end
      _ ->
        {:error, "get provider id failed"}
    end
  end

  defp get_groups(jar, team_id, itc_app_id) do 
    case HTTPoison.get(jar, Path.join(@base_url, "/testflight/v2/providers/#{team_id}/apps/#{itc_app_id}/groups")) do 
      {:ok, %{body: body}} ->
        case Poison.decode(body) do 
          {:ok, %{"data" => groups}} ->
            {:ok, groups}
          _ ->
            {:error, "decode failed"}
        end
      _ ->
        {:error, "get groups failed"}
    end
  end

  defp num_testers(jar, itc_app_id) do 
   case HTTPoison.get(jar, 
    Path.join(@base_url, "/WebObjects/iTunesConnect.woa/ra/user/externalTesters/#{itc_app_id}/"), 
    [{"Content-Type", "application/json"}]) do 
      {:ok, %{body: body}} ->
        case Poison.decode(body) do 
          {:ok, %{"data" => %{"users" => users}}} ->
            testers = Enum.map(users, &( {&1["emailAddress"]["value"], %{"tester_id" => &1["testerId"], "testing" => &1["testing"]["value"]}} ))
            {:ok, Enum.count(users), Enum.into(testers, %{})}
          _ ->
            {:error, "decode failed"}
        end
      _ ->
        {:error, "get testers failed"}
    end    
  end

  defp get_default_external_group_id(jar, team_id, itc_app_id) do 
    case get_groups(jar, team_id, itc_app_id) do 
      {:ok, groups} ->
        [%{"id" => group_id} | _] = Enum.filter(groups, fn(x) -> x["name"] == "external" end)
        {:ok, group_id}
      e -> e
    end
  end

  defp add_tester(email, nickname, %{jar: jar, team_id: team_id, itc_app_id: itc_app_id, group_id: group_id}) do 
    case HTTPoison.post(jar, "https://itunesconnect.apple.com/testflight/v2/providers/#{team_id}/apps/#{itc_app_id}/testers", %{
      email: email,
      firstName: "",
      lastName: nickname || "",
    } |> Poison.encode!, [ {"Content-Type", "application/json"}]) do 
      {:ok, %{body: body}} -> 
        case Poison.decode(body) do 
          {:ok, %{"data" => %{"id" => tester_id}}} ->
            case HTTPoison.put(jar, "https://itunesconnect.apple.com/testflight/v2/providers/#{team_id}/apps/#{itc_app_id}/groups/#{group_id}/testers/#{tester_id}", %{
              groupId: group_id,
              testerid: tester_id
            } |> Poison.encode!, [ {"Content-Type", "application/json"}]) do 
              {:ok, %{body: body}} -> 
                case Poison.decode(body) do 
                  {:ok, %{"data" => %{"email" => ^email, "testerAppState" => state}, "error" => nil}} -> 
                    {:ok, tester_id, state}
                  v -> 
                    {:error, "add tester #{tester_id} to group #{tester_id} failed"}
                end
              _ -> 
                {:error, "add tester #{tester_id} to group #{tester_id} failed due to network"}
            end
          _ -> 
            {:error, "add tester #{email} failed"}
        end
      _ -> 
        {:error, "add tester #{email} failed due to network"}
    end
  end

  defp add_indivitual_tester(tester_id, %{jar: jar, team_id: team_id, itc_app_id: itc_app_id, build_id: build_id}) do
    case HTTPoison.put(jar, "https://itunesconnect.apple.com/testflight/v2/providers/#{team_id}/apps/#{itc_app_id}/builds/#{build_id}/testers/#{tester_id}", %{
      buildId: build_id,
      testerId: tester_id
    } |> Poison.encode!, [ {"Content-Type", "application/json"}]) do 
      {:ok, %{body: body}} ->
        :ok
      _ -> 
        :error
    end
  end

  defp del_tester(email, %{jar: jar, team_id: team_id, itc_app_id: itc_app_id}) do 
    case HTTPoison.post(jar, "https://itunesconnect.apple.com/testflight/v2/providers/#{team_id}/apps/#{itc_app_id}/testers", %{
      email: email,
      firstName: "",
      lastName: "",
    } |> Poison.encode!, [ {"Content-Type", "application/json"}]) do 
      {:ok, %{body: body}} -> 
        case Poison.decode(body) do 
          {:ok, %{"data" => %{"id" => tester_id}, "error" => nil}} ->
            case HTTPoison.post(jar, "https://itunesconnect.apple.com/testflight/v2/providers/#{team_id}/apps/#{itc_app_id}/deleteTesters", [%{
              id: tester_id
            }] |> Poison.encode!, [ {"Content-Type", "application/json"}]) do 
              {:ok, %{status_code: 200}} -> :ok
              _ -> :error
            end
          _ -> 
            :error
        end
      _ -> 
        :error
    end
  end

  defp get_train(%{jar: jar, team_id: team_id, itc_app_id: itc_app_id}) do 
    case HTTPoison.get(jar, "https://itunesconnect.apple.com/testflight/v2/providers/#{team_id}/apps/#{itc_app_id}/platforms/ios/trains") do 
      {:ok, %{body: body}} -> 
        case Poison.decode(body) do 
          {:ok, %{"data" => [train | _], "error" => nil}} ->
            {:ok, train}
          _ -> 
            :error
        end
      _ -> 
        :error
    end
  end

  defp get_build_id(%{jar: jar, team_id: team_id, itc_app_id: itc_app_id, train: train}) do 
    case HTTPoison.get(jar, "https://itunesconnect.apple.com/testflight/v2/providers/#{team_id}/apps/#{itc_app_id}/platforms/ios/trains/#{train}/builds") do 
      {:ok, %{body: body}} -> 
        case Poison.decode(body) do 
          {:ok, %{"data" => builds, "error" => nil}} ->
            [%{"id" => build_id} | _] = Enum.filter(builds, fn(x) -> x["externalState"] == "testflight.build.state.testing.active" end)
            {:ok, build_id}
          _ -> 
            :error
        end
      _ -> 
        :error
    end
  end

end