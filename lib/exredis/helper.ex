defmodule Exredis.Helper do
  defmacro defredis(cmd, args) do
    margs = Enum.map(args, fn x -> {x, [], Redis.Helper} end)
    cmd = if is_list(cmd), do: cmd, else: [cmd]

    cmd_name =
      Enum.map(cmd, fn x -> Atom.to_string(x) end) |> Enum.join("_") |> String.to_atom()

    method = Enum.map(cmd, fn x -> Atom.to_string(x) |> String.upcase() end)

    quote do
      def unquote(cmd_name)(unquote_splicing(margs)) do
        command = List.flatten([unquote_splicing(method) | [unquote_splicing(margs)]])
        {:ok, res} = RedixCluster.command(command)
        res
      end
    end
  end

  defmacro defredis(cmd, args, fun) do
    margs = Enum.map(args, fn x -> {x, [], Redis.Helper} end)
    cmd = if is_list(cmd), do: cmd, else: [cmd]

    cmd_name =
      Enum.map(cmd, fn x -> Atom.to_string(x) end) |> Enum.join("_") |> String.to_atom()

    method = Enum.map(cmd, fn x -> Atom.to_string(x) |> String.upcase() end)

    quote do
      def unquote(cmd_name)(unquote_splicing(margs)) do
        f = unquote(fun)
        command = List.flatten([unquote_splicing(method) | [unquote_splicing(margs)]])
        {:ok, res} = RedixCluster.command(command)
        f.(res)
      end
    end
  end
end
