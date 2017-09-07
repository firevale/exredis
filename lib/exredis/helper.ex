defmodule Exredis.Helper do
  defmacro defredis(cmd, args, fun \\ nil) do
    margs = Enum.map args, fn(x) -> {x, [], Redis.Helper} end
    cmd = if is_list(cmd), do: cmd, else: [cmd]
    cmd_name = Enum.map(cmd, fn(x) -> Atom.to_charlist(x) end)
      |> Enum.join("_") |> String.to_atom
    method = Enum.map cmd, fn(x) -> Atom.to_string(x) |> String.upcase end
    quote do
      def unquote(cmd_name)(unquote_splicing(margs)) do
        f = unquote(fun)
        command = List.flatten [unquote_splicing(method)|[unquote_splicing(margs)]]
        {:ok, res} = Exredis.Helper.command(command)
        if f, do: f.(res), else: res
      end
    end
  end

  def command(command) do
    Redix.command(:"redix_#{random_index()}", command)
  end

  def conn_cfg() do 
    host = Application.get_env(:exredis, :host, "localhost")
    port = Application.get_env(:exredis, :port, 6379)
    db = Application.get_env(:exredis, :db, 0)
    password = Application.get_env(:exredis, :password, nil)

    host = case host do 
      {:env, varname} -> System.get_env(varname)
      v -> v
    end

    db = case db do 
      {:env, varname} -> System.get_env(varname) |> String.to_integer
      v when is_integer(v) -> v
      v when is_bitstring(v) -> String.to_integer(v)
      _ -> 0
    end

    port = case port do 
      {:env, varname} -> System.get_env(varname) |> String.to_integer
      v when is_integer(v) -> v
      v when is_bitstring(v) -> String.to_integer(v)
      _ -> 6379 
    end

    password = case password do 
      {:env, varname} -> System.get_env(varname) 
      v -> v
    end

    [host: host, port: port, database: db, password: password]
  end

  defp random_index() do
    rem(System.unique_integer([:positive]), 5)
  end
end