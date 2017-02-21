defmodule Acs.Repo.Migrations.AppAddActiveFlag do
  use Ecto.Migration

  def change do
    alter table(:apps) do 
      add :active, :boolean, default: true
      add :has_forum, :boolean, default: false
      add :has_mall, :boolean, default: false
    end
  end
end
