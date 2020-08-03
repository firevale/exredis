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

  def pipeline(commands) do
    :poolboy.transaction(:exredis, fn worker ->
      Redix.pipeline(worker, commands)
    end)
  end

  def supervisor() do
    config =
      Application.get_all_env(:exredis)
      |> Confex.Resolver.resolve!()

    unless config[:url] do
      raise "redis url is not configured!"
    end

    redis_url_opts =
      Keyword.get(config, :url)
      |> Redix.URI.opts_from_uri()

    pool_args = Keyword.get(config, :pool, [])

    pool_args =
      [size: 5, max_overflow: 20]
      |> Keyword.merge(pool_args)

    pool_args = pool_args ++ [name: {:local, :exredis}, worker_module: Redix]

    redix_opts =
      config
      |> Keyword.delete(:pool)
      |> Keyword.delete(:url)
      |> Keyword.merge(redis_url_opts)
      |> Keyword.put(:socket_opts, keepalive: true)
      |> Keyword.put(:sync_connect, true)

    {id, start, restart, shutdown, type, modules} =
      :poolboy.child_spec(:exredis, pool_args, redix_opts)

    %{
      id: id,
      start: start,
      restart: restart,
      shutdown: shutdown,
      type: type,
      modules: modules
    }
  end
end
