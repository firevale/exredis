defmodule Acs.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    
    create table(:users) do
      add :email, :string, size: 50 
      add :mobile, :string, size: 20
      add :device_id, :string, size: 100
      add :encrypted_password, :string, size: 100
      add :nickname, :string, size: 50
      add :resident_id, :string, size: 25
      add :resident_name, :string, size: 20
      add :gender, :string, size: 5
      add :age, :integer
      add :avatar_url, :string

      timestamps()
    end    

    create unique_index(:users, [:email])
    create unique_index(:users, [:mobile])
    create unique_index(:users, [:device_id])
    create index(:users, [:nickname])
  end

end
