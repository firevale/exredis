defmodule Acs.RedisSubscriber do
  use     GenServer
  use     LogAlias
  require Cachex

  def start_link() do
    GenServer.start_link(__MODULE__, [], name: __MODULE__)
  end

  def init(_) do 
    host = Application.get_env(:redis_poolex, :host, "127.0.0.1")
    port = Application.get_env(:redis_poolex, :port, 6379)
    password = Application.get_env(:redis_poolex, :password, "")
    {:ok, sub} = :eredis_sub.start_link(host |> String.to_charlist, port, password |> String.to_charlist)
    :eredis_sub.controlling_process(sub)
    :eredis_sub.subscribe(sub, ["cachex.del"])
    {:ok, %{sub: sub}}
  end

  def handle_cast(what, state)  do 
    d "handle_cast: #{inspect what}, state: #{inspect state}"
    {:noreply, state}
  end

  def handle_info({:message, "cachex.del", key, _}, %{sub: sub} = state) do 
    # invoke Cachex.del only when the key exists, otherwise it will cause endless loop
    case Cachex.get!(:mem_cache, key) do 
      nil -> :do_nothing
      _ -> 
        info "delete cachex key: #{key}"
        Cachex.del(:mem_cache, key)
    end
    :eredis_sub.ack_message(sub)
    {:noreply, state}
  end

  def handle_info({:subscribed, channel, _}, %{sub: sub} = state) do 
    info "channel: #{inspect channel} subscribed"
    :eredis_sub.ack_message(sub)
    {:noreply, state}
  end

  def handle_info(what, %{sub: sub} = state) do 
    d "receive unknown message: #{inspect what}"
    {:noreply, state}
  end

  def terminate(reason, state) do 
    info "redis_sub terminated with reason: #{inspect reason}, state: #{inspect state}"
    {:shutdown, reason}
  end

end