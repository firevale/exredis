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

  defp random_index() do
    rem(System.unique_integer([:positive]), 5)
  end
end