defmodule Acs.Application do
  @moduledoc """
  The Acs Application Service.

  The acs system business domain lives in this application.

  Exposes API to clients such as the `AcsWeb` application
  for use in channels, controllers, and elsewhere.
  """
  use Application

  def start(_type, _args) do
    import Supervisor.Spec, warn: false

    res = Supervisor.start_link([
      supervisor(Acs.Repo, []),
    ], strategy: :one_for_one, name: Acs.Supervisor)
    Ecto.Migrator.run(Acs.Repo, Path.join(["#{:code.priv_dir(:acs)}", "repo", "migrations"]), :up, all: true)
    res
  end
end
