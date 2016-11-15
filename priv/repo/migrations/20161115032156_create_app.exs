defmodule Acs.Repo.Migrations.CreateApp do
  use Ecto.Migration

  def change do
    create table(:apps, primary_key: false) do
      add :id, :string, primary_key: true
      add :secret, :string
      add :name, :string, size: 30
      add :currency, :string, size: 3 # goods currency
      add :payment_callback, :string 

      timestamps()
    end
  end
end
