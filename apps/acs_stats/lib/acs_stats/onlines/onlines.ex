defmodule AcsStats.Onlines do
  @moduledoc """
  Acs keeps the contexts that define your domain
  and business logic.

  Contexts are also responsible for managing your data, regardless
  if it comes from the database, an external API or others.
  """

  require Exredis
  require Excache

  use     Utils.LogAlias

  def add_online_user(node, app_id, platform, user_id) do 
    case Excache.exists?("online_app.#{app_id}") do 
      {:ok, false} ->
        Excache.set("online_app.#{app_id}", 1, ttl: nil)
        Exredis.sadd("online_apps", app_id)
      _ ->
        :do_nothing
    end
    Exredis.setbit(key(node, app_id), user_id, 1)
    Exredis.setbit(key(node, app_id, platform), user_id, 1)
  end

  def remove_online_user(node, app_id, platform, user_id) do 
    Exredis.setbit(key(node, app_id), user_id, 0)
    Exredis.setbit(key(node, app_id, platform), user_id, 0)
  end

  def remove_online_node(node) do 
    for key <- Exredis.keys("acs.online_counter.*.#{node}") do 
      info "deleting online key: #{key} ...."
      Exredis.del(key)
    end
    for key <- Exredis.keys("acs.ponline_counter.*.#{node}") do 
      info "deleting online key: #{key} ...."
      Exredis.del(key)
    end
  end

  def get_online_user_number(app_id) do
    for key <- Exredis.keys("acs.online_counter.#{app_id}.*") do 
      Exredis.bitcount(key)
    end |> Enum.sum()
  end
  def get_online_user_number(app_id, platform) do
    for key <- Exredis.keys("acs.ponline_counter.#{app_id}.#{platform}.*") do 
      Exredis.bitcount(key)
    end |> Enum.sum()
  end

  def list_online_apps() do 
    Exredis.smembers("online_apps")
  end

  @n_mins 180 
  def update_online_chart(ts, label, app_id) do 
    n_all = get_online_user_number(app_id)
    n_ios = get_online_user_number(app_id, :ios) 
    n_android = get_online_user_number(app_id, :android) 

    Exredis.lpush("acs.onlines.#{app_id}", "#{ts}.#{n_all}") 
    Exredis.ltrim("acs.onlines.#{app_id}", 0, @n_mins) 
    Exredis.lpush("acs.ponlines.#{app_id}.ios", "#{ts}.#{n_ios}") 
    Exredis.ltrim("acs.ponlines.#{app_id}.ios", 0, @n_mins) 
    Exredis.lpush("acs.ponlines.#{app_id}.android", "#{ts}.#{n_android}") 
    Exredis.ltrim("acs.ponlines.#{app_id}.android", 0, @n_mins)     
    
    %{
      labels: labels,
      datasets: [
        %{ data: all }, %{data: ios}, %{data: android}
      ]
    } = get_online_chart(app_id) 

    {labels, _} = Enum.split([label | Enum.reverse(labels)], @n_mins)
    {all, _} = Enum.split([n_all | Enum.reverse(all)], @n_mins)
    {ios, _} = Enum.split([n_ios | Enum.reverse(ios)], @n_mins)
    {android, _} = Enum.split([n_android | Enum.reverse(android)], @n_mins)
    
    chart =
      %{
        labels: Enum.reverse(labels),
        datasets: [
          %{
            label: "同时在线",
            data: Enum.reverse(all),
          },
          %{
            label: "同时在线(IOS)",
            data: Enum.reverse(ios),
          },
          %{
            label: "同时在线(ANDROID)",
            data: Enum.reverse(android),
          }
        ]          
      }

    key = online_chart_key(app_id)
    Exredis.set(key, chart |> :erlang.term_to_binary |> Base.encode64)
    Excache.del(key)

    %{
      label: label,
      data: [ n_all, n_ios, n_android ],
    }
  end

  @n_hours 7*24
  def update_historic_online_chart(beginning, ending, label, app_id) do 
    max = 
      Exredis.lrange("acs.onlines.#{app_id}", 0, 90) 
        |> Enum.filter(fn(x) ->
          [ts, _counter] = String.split(x, ".", trim: true)  
          ts = String.to_integer(ts)
          ts >= beginning && ts < ending
        end) 
        |> Enum.map(fn(x) -> 
          [_, counter] = String.split(x, ".", trim: true)  
          String.to_integer(counter)
        end) 
        |> Enum.max(fn -> 0 end)

    ios_max = 
      Exredis.lrange("acs.ponlines.#{app_id}.ios", 0, 90) 
        |> Enum.filter(fn(x) ->
          [ts, _counter] = String.split(x, ".", trim: true)  
          ts = String.to_integer(ts)
          ts >= beginning && ts < ending
        end) 
        |> Enum.map(fn(x) -> 
          [_, counter] = String.split(x, ".", trim: true)  
          String.to_integer(counter)
        end) 
        |> Enum.max(fn -> 0 end)

    android_max = 
      Exredis.lrange("acs.ponlines.#{app_id}.android", 0, 90) 
        |> Enum.filter(fn(x) ->
          [ts, _counter] = String.split(x, ".", trim: true)  
          ts = String.to_integer(ts)
          ts >= beginning && ts < ending
        end) 
        |> Enum.map(fn(x) -> 
          [_, counter] = String.split(x, ".", trim: true)  
          String.to_integer(counter)
        end) 
        |> Enum.max(fn -> 0 end)


    %{
      labels: labels,
      datasets: [
        %{ data: all }, %{data: ios}, %{data: android}
      ]
    } = get_hourly_online_chart(app_id) 
      
    {labels, _} = Enum.split([label | Enum.reverse(labels)], @n_hours)
    {all, _} = Enum.split([max | Enum.reverse(all)], @n_hours)
    {ios, _} = Enum.split([ios_max | Enum.reverse(ios)], @n_hours)
    {android, _} = Enum.split([android_max | Enum.reverse(android)], @n_hours)
    
    chart =
      %{
        labels: Enum.reverse(labels),
        datasets: [
          %{
            label: "同时在线",
            data: Enum.reverse(all),
          },
          %{
            label: "同时在线(IOS)",
            data: Enum.reverse(ios),
          },
          %{
            label: "同时在线(ANDROID)",
            data: Enum.reverse(android),
          }
        ]          
      }

    key = hourly_online_chart_key(app_id)
    Exredis.set(key, chart |> :erlang.term_to_binary |> Base.encode64)
    Excache.del(key)
    Excache.set(key, ttl: :timer.hours(1))

    %{
      label: label,
      data: [ max, ios_max, android_max ]
    }
  end

  def get_online_chart(app_id) do 
    get_chart(online_chart_key(app_id))
  end

  def get_hourly_online_chart(app_id) do 
    get_chart(hourly_online_chart_key(app_id))
  end
 
  defp get_chart(key) do 
    Excache.get!(key, fallback: fn(redis_key) -> 
      case Exredis.get(redis_key) do 
        nil ->
          {:ignore, default_online_chart()}
        raw ->
          {:commit, raw |> Base.decode64! |> :erlang.binary_to_term}
      end
    end)
  end

  defp key(node, app_id) do 
    "acs.online_counter.#{app_id}.#{node}"
  end
  defp key(node, app_id, platform) do 
    "acs.ponline_counter.#{app_id}.#{platform}.#{node}"
  end

  defp online_chart_key(app_id) do 
    "acs.online_chart.#{app_id}" 
  end

  defp hourly_online_chart_key(app_id) do 
    "acs.hourly_online_chart.#{app_id}" 
  end

  defp default_online_chart() do
    %{
      labels: [],
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
      ]
    }
  end

end
