defmodule Excache.Hook do
  use     Cachex.Hook
  use     Utils.LogAlias

  @moduledoc """
  A very small example hook which simply logs all actions to stdout and keeps
  track of the last executed action.
  """

  @doc """
  The arguments provided to this function are those defined in the `args` key of
  your hook registration. This is the same as any old GenServer init phase. The
  value you return in the tuple will be the state of your hook.
  """
  def init(_options \\ []) do
    node = System.get_env("NODE")
    {:ok, %{node: node, last_pub_key: nil, last_msg: nil}}
  end

  @doc """
  This is the actual handler of your hook, receiving a message, results and the
  state. If the hook is a of type `:pre`, then the results will always be `nil`.

  Messages take the form `{ :action, args... }`, so you can quite easily pattern
  match and take different action based on different events (or ignore certain
  events entirely).

  The return type of this function should be `{ :ok, new_state }`, anything else
  is not accepted.
  """
  def handle_notify({:del, [key | _]} = msg, {:ok, _}, %{node: node, last_pub_key: last_pub_key} = state) do
    case last_pub_key do 
      ^key -> 
        {:ok, %{state | last_pub_key: nil, last_msg: msg}}

      _ ->
        payload = Poison.encode!(%{action: :del, key: key, node: node})
        info "excache publish payload: #{inspect payload}"
        Redix.PubSub.Fastlane.publish(Excache.PubSub.Redis, "cachex", payload)
        {:ok, %{state | last_msg: msg}}
    end
  end

  def handle_notify(msg, _results,  state) do
    {:ok, %{state | last_msg: msg}}
  end


  @doc """
  Provides a way to retrieve the last action taken inside the cache.
  """
  def handle_call({:last_pub_key, key}, _ctx, state) do
    {:reply, :ok, %{state | last_pub_key: key}}
  end

end