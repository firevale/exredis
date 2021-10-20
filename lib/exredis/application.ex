defmodule Exredis.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    exredis_supervisor = Exredis.Helper.supervisor()

    children = [
      exredis_supervisor
    ]

    Supervisor.start_link(children, strategy: :one_for_one, name: Exredis.Supervisor)
  end
end
