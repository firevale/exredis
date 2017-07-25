defmodule Acs.Web.Admin.StatsController do
  use Acs.Web, :controller

  def onlines(conn, %{"app_id" => app_id}) do 
    chart = Cachex.get!(:default, "onlines_chart.#{app_id}", fallback: fn(key) -> 
      case Redis.get(key) do 
        :undefined ->
          {:commit,  %{ labels: [],
                        datasets: [
                          %{
                            label: "同时在线",
                            data: [],
                          },
                          %{
                            label: "同时在线(IOS)",
                            data: [],
                          },
                          %{
                            label: "同时在线(ANDROID)",
                            data: [],
                          }
                        ]}}
        raw ->
          {:commit, raw |> Base.decode64! |> :erlang.binary_to_term}
      end
    end)
    conn |> json(%{ success: true, chart: chart})
  end

  def brief_stats(conn, %{"app_id" => app_id}) do 
    today = Timex.to_date(Timex.local)
    conn |> json(%{
      success: true,
      stats: %{
        dau: %{
          ios: Redis.scard("_dau.#{today}.#{app_id}.ios") |> String.to_integer,
          android: Redis.scard("_dau.#{today}.#{app_id}.android") |> String.to_integer,
        },
        danu: %{
          ios: Redis.scard("_danu.#{today}.#{app_id}.ios") |> String.to_integer,
          android: Redis.scard("_danu.#{today}.#{app_id}.android") |> String.to_integer,
        },
        dapu: %{
          ios: Redis.scard("_dapu.#{today}.#{app_id}.ios") |> String.to_integer,
          android: Redis.scard("_dapu.#{today}.#{app_id}.android") |> String.to_integer,
        },
        fee: %{
          ios: case Redis.get("_totalfee.#{today}.#{app_id}.ios") do 
                :undefined -> 0
                x -> String.to_integer(x)
                end,
          android: case Redis.get("_totalfee.#{today}.#{app_id}.android") do 
                      :undefined -> 0
                      x -> String.to_integer(0)
                    end,
        }
      }
    })  
  end

  def historic_onlines(conn, %{"app_id" => app_id}) do 
    chart = Cachex.get!(:default, "hourly_onlines_chart.#{app_id}", fallback: fn(key) -> 
      case Redis.get(key) do 
        :undefined ->
          {:commit,  %{ labels: [],
                        datasets: [
                          %{
                            label: "同时在线",
                            data: [],
                          },
                          %{
                            label: "同时在线(IOS)",
                            data: [],
                          },
                          %{
                            label: "同时在线(ANDROID)",
                            data: [],
                          }
                        ]}}
        raw ->
          {:commit, raw |> Base.decode64! |> :erlang.binary_to_term}
      end
    end)
    conn |> json(%{ success: true, chart: chart})
  end

end
