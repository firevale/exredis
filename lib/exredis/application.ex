defmodule Exredis.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    import Supervisor.Spec

    pool_size = Application.get_env(:exredis, :pool_size, 5)
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

    redix_workers = for i <- 0..(pool_size - 1) do
      worker(Redix, [[host: host, port: port, database: db, password: password], [name: :"redix_#{i}"]], id: {Redix, i})
    end

    Supervisor.start_link(redix_workers, strategy: :one_for_one, name: Exredis.Supervisor)
  end
end
