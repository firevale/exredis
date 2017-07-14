defmodule Acs.Repo.Migrations.CreateAcs.Stats.DeviceInfo do
  use Ecto.Migration

  def change do
    create table(:device_infos, primary_key: false) do
      add :id, :string, primary_key: true
      add :alias, :string
      add :total_mem_size, :string
      add :cpu_arch, :string

      timestamps()
    end

    create index(:device_infos, [:alias])
    create index(:device_infos, [:total_mem_size])
  end
end
