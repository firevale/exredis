defmodule Acs.TestFlight.Worker do 
  use LogAlias

  require Poison
  alias HTTPoison

  def is_tester?(itc_app_id, email) do 
    case HTTPoison.post("https://itc.firevale.com/api/is_tester", %{
      itc_app_id: itc_app_id,
      email: email,
    } |> Poison.encode!, [{"Content-Type", "application/json"}]) do 
      {:ok, %{body: body, status_code: 200}} ->
        case Poison.decode(body) do 
          {:ok, %{"success" => true, "is_tester" => result}} -> 
            result
          _ ->
            false 
        end
      _ ->
        false
    end
  end

  def num_testers!(itc_app_id) do 
    Cachex.get!(:default, "_acs.num_testers.#{itc_app_id}", fallback: fn(_key) ->
      case HTTPoison.post("https://itc.firevale.com/api/num_testers", %{
        itc_app_id: itc_app_id,
      } |> Poison.encode!, [{"Content-Type", "application/json"}]) do 
        {:ok, %{body: body, status_code: 200}} ->
          d "body: #{inspect body}"
          case Poison.decode(body) do 
            {:ok, %{"success" => true, "num_testers" => num_testers}} -> 
              {:commit, num_testers}
            xx ->
              {:ignore, 10000} 
          end
        response ->
          error "get num test failed: #{inspect response}"
          {:ignore, 10000}
      end
    end)
  end

  def add_tester!(itc_app_id, email, nickname) do 
    case HTTPoison.post("https://itc.firevale.com/api/invite", %{
      itc_app_id: itc_app_id,
      email: email,
      nickname: nickname
    } |> Poison.encode!, [{"Content-Type", "application/json"}]) do 
      {:ok, %{body: body, status_code: 200}} ->
        case Poison.decode(body) do 
          {:ok, %{"success" => true, "status" => status, "num_testers" => num_testers}} -> 
            Cachex.set(:default, "_acs.num_testers.#{itc_app_id}", num_testers)
            {:ok, status}
          _ ->
            :error
        end
      _ ->
        :error
    end
  end

  def del_tester!(itc_app_id, email) do 
    case HTTPoison.post("https://itc.firevale.com/api/remove", %{
      itc_app_id: itc_app_id,
      email: email
    } |> Poison.encode!, [{"Content-Type", "application/json"}]) do 
      {:ok, %{body: body, status_code: 200}} ->
        case Poison.decode(body) do 
          {:ok, %{"success" => true}} -> 
            :ok
          _ ->
            :error
        end
      _ ->
        :error
    end
  end
end
