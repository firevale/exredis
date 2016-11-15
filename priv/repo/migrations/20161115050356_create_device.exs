defmodule Acs.Repo.Migrations.CreateDevice do
  use Ecto.Migration

  def change do
    create table(:devices, primary_key: false) do
      add :id, :string, primary_key: true
      add :model, :string
      add :platform, :string

      timestamps()
    end
  end
end
