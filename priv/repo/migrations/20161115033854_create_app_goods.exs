defmodule Acs.Repo.Migrations.CreateAppGoods do
  use Ecto.Migration

  def change do
    create table(:app_goods, primary_key: false) do 
      add :id, :string, size: 100, primary_key: true
      add :name, :string
      add :description, :string
      add :price, :integer
      add :icon, :string      

      add :app_id, references(:apps, type: :string, on_delete: :delete_all), size: 40

      timestamps()
    end

    create index(:app_goods, [:app_id])
    create index(:app_goods, [:app_id, :id], unique: true)
  end
end
