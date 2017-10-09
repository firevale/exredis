defmodule Excache.Fastlane do
  use GenServer
  use Utils.LogAlias

  def start_link(opts \\ []), do: GenServer.start_link(__MODULE__, opts)

  def init(opts) do
    :ok = Redix.PubSub.Fastlane.subscribe(Excache.PubSub.Redis, "cachex", {self(), __MODULE__, []})
    {:ok, opts}
  end

  def fastlane(_pid, %{channel: "cachex", payload: payload}, _options) do
    payload = payload |> Base.decode64! |> :erlang.binary_to_term
    handle_payload(payload)
  end
  def fastlane(_pid, %{channel: channel, payload: payload}, _options) do
    error "receive unsubscribed channel message, channel: #{channel}, payload: #{payload}" 
  end

  def handle_payload(%{action: :del, key: key, node: node}) do 
    case System.get_env("NODE") do 
      ^node -> :ok
      _ -> Cachex.del(:default, key)
    end
  end
end