defmodule Acs.Repo.Migrations.CreateAcs.Stats.DeviceInfo do
  use Ecto.Migration

  def change do
    create table(:device_infos, primary_key: false) do
      add :id, :string, size: 100, primary_key: true
      add :alias, :string, size: 100
      add :total_mem_size, :integer
      add :cpu_arch, :string

      timestamps()
    end

    create index(:device_infos, [:alias])
    create index(:device_infos, [:total_mem_size])
  end
end