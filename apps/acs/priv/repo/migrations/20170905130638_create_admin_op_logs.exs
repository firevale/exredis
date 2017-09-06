defmodule Acs.Repo.Migrations.CreateAdminOpLogs do
  use Ecto.Migration

  def change do
    create table(:admin_op_logs) do

      timestamps()
    end

  end
end
