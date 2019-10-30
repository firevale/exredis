defmodule Exredis.Helper do
  defmacro defredis(cmd, args, fun \\ nil) do
    margs = Enum.map(args, fn x -> {x, [], Redis.Helper} end)
    cmd = if is_list(cmd), do: cmd, else: [cmd]

    cmd_name =
      Enum.map(cmd, fn x -> Atom.to_charlist(x) end) |> Enum.join("_") |> String.to_atom()

    method = Enum.map(cmd, fn x -> Atom.to_string(x) |> String.upcase() end)

    if is_function(fun) do
      quote do
        def unquote(cmd_name)(unquote_splicing(margs)) do
          command = List.flatten([unquote_splicing(method) | [unquote_splicing(margs)]])
          {:ok, res} = Exredis.Helper.command(command)
          f = unquote(fun)
          f.(res)
        end
      end
    else
      quote do
        def unquote(cmd_name)(unquote_splicing(margs)) do
          command = List.flatten([unquote_splicing(method) | [unquote_splicing(margs)]])
          {:ok, res} = Exredis.Helper.command(command)
          res
        end
      end
    end
  end

  def command(command) do
    :poolboy.transaction(:exredis, fn worker ->
      Redix.command(worker, command)
    end)
  end
end
