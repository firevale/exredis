defmodule Excache.Fastlane do
  use GenServer

  def start_link(opts \\ []), do: GenServer.start_link(__MODULE__, opts, name: __MODULE__)

  def init(opts) do
    :ok = Redix.PubSub.Fastlane.subscribe(Excache.PubSub.Redis, "my_channel", {self(), __MODULE__, []})
    {:ok, opts}
  end

  def fastlane(_pid, payload, _options) do
    payload = Poison.decode!(payload, keys: :atoms)
    handle_payload(payload)
  end

  defp handle_payload(%{action: :del, keys: keys, node: node}) do 
    case System.get_env("NODE") do 
      ^node -> 
        :do_nothing
      _ -> 
        keys |> Enum.each(fn(key) -> Cachex.del(:default, key) end)
      end
  end
end