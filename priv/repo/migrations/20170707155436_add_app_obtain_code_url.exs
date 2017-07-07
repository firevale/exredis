defmodule Acs.Repo.Migrations.AddAppWcpUser do
  use Ecto.Migration

  def change do
    alter table(:apps) do 
      add :obtain_code_url, :string
    end
  end
end
