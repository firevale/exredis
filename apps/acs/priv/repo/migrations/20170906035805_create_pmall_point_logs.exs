defmodule Acs.Repo.Migrations.CreatePmallPointLogs do
  use Ecto.Migration

  def change do
    create table(:pmall_point_logs) do

      timestamps()
    end

  end
end
