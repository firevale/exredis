defmodule Acs.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do
    # note:
    # user record is just a replication from redis, so we use redis generated ID as its primary key 
    create table(:users, primary_key: false) do
      add :id, :integer, primary_key: true
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

    create index(:users, [:email], unique: true)
    create index(:users, [:mobile], unique: true)
    create index(:users, [:device_id], unique: true)
    create index(:users, [:nickname])
  end

end
