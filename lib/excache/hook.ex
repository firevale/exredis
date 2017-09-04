defmodule Excache.Hook do
  use     Cachex.Hook

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
    {:ok, nil}
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
  def handle_notify({:del, keys} = msg, {:ok, _}, _state) do
    node = System.get_env("NODE")
    payload = Poison.encode!(%{action: :del, keys: keys, node: node})
    Redix.PubSub.Fastlane.publish(Excache.PubSub.Redis, "cachex", payload)
    {:ok, msg}
  end

  def handle_notify(msg, _results, _state) do
    {:ok, msg}
  end

  @doc """
  Provides a way to retrieve the last action taken inside the cache.
  """
  def handle_call(:last_action, _ctx, state) do
    {:reply, state, state}
  end

end