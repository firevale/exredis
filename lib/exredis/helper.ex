defmodule Exredis.Helper do
  defmacro defredis(cmd, args, fun \\ nil) do
    margs = Enum.map(args, fn x -> {x, [], Redis.Helper} end)
    cmd = if is_list(cmd), do: cmd, else: [cmd]

    cmd_name =
      Enum.map(cmd, fn x -> Atom.to_charlist(x) end) |> Enum.join("_") |> String.to_atom()

    method = Enum.map(cmd, fn x -> Atom.to_string(x) |> String.upcase() end)

    quote do
      def unquote(cmd_name)(unquote_splicing(margs)) do
        f = unquote(fun)
        command = List.flatten([unquote_splicing(method) | [unquote_splicing(margs)]])
        {:ok, res} = Exredis.Helper.command(command)
        if is_function(f), do: f.(res), else: res
      end
    end
  end

  @spec command([binary()]) ::
          {:error,
           atom()
           | %{
               :__exception__ => any(),
               :__struct__ => Redix.ConnectionError | Redix.Error,
               optional(:message) => binary(),
               optional(:reason) => atom()
             }}
          | {:ok,
             nil
             | binary()
             | [nil | binary() | [any()] | integer() | Redix.Error.t()]
             | integer()
             | Redix.Error.t()}
  def command(command) do
    Redix.command(:"redix_#{random_index()}", command)
  end

  def conn_cfg() do
    host = Application.get_env(:exredis, :host, "localhost")
    port = Application.get_env(:exredis, :port, 6379)
    db = Application.get_env(:exredis, :db, 0)
    password = Application.get_env(:exredis, :password, nil)
    sync_connect = Application.get_env(:exredis, :sync_connect, false)
    exit_on_disconnection = Application.get_env(:exredis, :exit_on_disconnection, false)
    backoff_initial = Application.get_env(:exredis, :backoff_initial, 500)
    backoff_max = Application.get_env(:exredis, :backoff_max, 5000)
    timeout = Application.get_env(:exredis, :timeout, 5000)
    socket_opts = Application.get_env(:exredis, :socket_opts, [])

    host =
      case host do
        {:env, varname} -> System.get_env(varname)
        v -> v
      end

    db =
      case db do
        {:env, varname} -> System.get_env(varname) |> String.to_integer()
        v when is_integer(v) -> v
        v when is_bitstring(v) -> String.to_integer(v)
        _ -> 0
      end

    port =
      case port do
        {:env, varname} -> System.get_env(varname) |> String.to_integer()
        v when is_integer(v) -> v
        v when is_bitstring(v) -> String.to_integer(v)
        _ -> 6379
      end

    password =
      case password do
        {:env, varname} -> System.get_env(varname)
        v -> v
      end

    [
      host: host,
      port: port,
      database: db,
      password: password,
      sync_connect: sync_connect,
      exit_on_disconnection: exit_on_disconnection,
      backoff_initial: backoff_initial,
      backoff_max: backoff_max,
      timeout: timeout,
      socket_opts: socket_opts
    ]
  end

  @pool_size Application.get_env(:exredis, :pool_size, 5)
  defp random_index() do
    rem(System.unique_integer([:positive]), @pool_size)
  end
end
