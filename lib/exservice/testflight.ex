defmodule Exservice.TestFlight do 
  use     Utils.LogAlias
  require Poison
  alias   HTTPoison

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
            raise "get is_tester from itc.firevale.com failed, body: #{inspect body}"
        end
      response ->
        raise "get is_tester from itc.firevale.com failed, response: #{inspect response}"
    end
  end

  def num_testers!(itc_app_id) do 
    Excache.get!("exservice.testflight.num_testers.#{itc_app_id}", fallback: fn(_key) ->
      case HTTPoison.post("https://itc.firevale.com/api/num_testers", %{
        itc_app_id: itc_app_id,
      } |> Poison.encode!, [{"Content-Type", "application/json"}]) do 
        {:ok, %{body: body, status_code: 200}} ->
          case Poison.decode(body) do 
            {:ok, %{"success" => true, "num_testers" => num_testers}} -> 
              {:commit, num_testers}
            _ ->
              raise "decode response body from itc.firevale.com failed, body: #{inspect body}"
          end
        response ->
          raise "fetch number testers from itc.firevale.com failed, #{inspect response}"
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
            Excache.set("_acs.num_testers.#{itc_app_id}", num_testers)
            {:ok, status, num_testers}
          _ ->
            raise "add tester #{email} to #{itc_app_id} failed, body: #{inspect body}"
        end
      response ->
        raise "add tester #{email} to #{itc_app_id} failed, response: #{inspect response}"
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
            raise "del tester #{email} from #{itc_app_id} failed, body: #{inspect body}"
        end
      response ->
        raise "del tester #{email} from #{itc_app_id} failed, response: #{inspect response}"
    end
  end
end
