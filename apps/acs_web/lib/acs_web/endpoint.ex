defmodule AcsWeb.Endpoint do
  use Phoenix.Endpoint, otp_app: :acs_web

  socket "/socket", AcsWeb.UserSocket

  # Serve at "/" the static files from "priv/static" directory.
  #
  # You should set gzip to true if you are running phoenix.digest
  # when deploying your static files in production.
  plug Plug.Static,
    at: "/", from: "/assets", gzip: false,
    only: ~w(css fonts images js assets fonts favicon.ico robots.txt)

  # Code reloading can be explicitly enabled under the
  # :code_reloader configuration of your endpoint.
  if code_reloading? do
    socket "/phoenix/live_reload/socket", Phoenix.LiveReloader.Socket
    plug Phoenix.LiveReloader
    plug Phoenix.CodeReloader
  end

  plug Plug.RequestId
  plug Plug.Logger

  plug Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json],
    pass: ["*/*"],
    json_decoder: Poison,
    length: 100_000_000

  plug Plug.MethodOverride
  plug Plug.Head

  # The session will be stored in the cookie and signed,
  # this means its contents can be read but not tampered with.
  # Set :encryption_salt if you would also like to encrypt it.
  plug Plug.Session,
    store: :cookie,
    key: "_acs_web_key",
    signing_salt: "LpoTwPvl"

  plug CORSPlug, origin: ~r/https?.*firevale\.com$/

  plug AcsWeb.Router

  @doc """
  Callback invoked for dynamically configuring the endpoint.

  It receives the endpoint configuration and checks if
  configuration should be loaded from the system environment.
  """
  def init(_key, config) do
    {:ok, config |> env_port() |> env_redis_pubsub()}
  end

  defp env_port(config) do 
    if config[:load_from_system_env] do
      port = System.get_env("PORT") || raise "expected the PORT environment variable to be set"
      Keyword.put(config, :http, [:inet6, port: port])
    else
      config
    end
  end

  defp env_redis_pubsub(config) do 
    case config[:pubsub][:adapter] do 
      Phoenix.PubSub.Redis ->
        node = System.get_env("NODE") || raise "expected the NODE environment variable to be set"
        redis_config = Exredis.Helper.conn_cfg()
        pubsub = 
          config[:pubsub] 
            |> Keyword.merge(redis_config)
            |> Keyword.put(:node_name, node)
        
        config |> Keyword.put(:pubsub, pubsub)

      _ -> 
        config
    end
  end
end
