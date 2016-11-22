defmodule Acs.Repo.Migrations.CreateApp do
  use Ecto.Migration

  def change do
    create table(:apps, primary_key: false) do
      add :id, :string, primary_key: true
      add :secret, :string
      add :name, :string, size: 30
      add :token_ttl, :integer, default: 604800
      add :currency, :string, size: 5 # goods currency
      add :payment_callback, :string 

      timestamps()
    end
  end
end
