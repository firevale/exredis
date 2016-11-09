defmodule Acs.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do
    # note:
    # user record is just a replication from redis, so we use redis generated ID as its primary key 
    create table(:users, primary_key: false) do
      add :id, :integer, primary_key: true
      add :email, :string
      add :mobile, :string
      add :encrypted_password, :string
      add :nickname, :string
      add :resident_id, :string
      add :resident_name, :string
      add :gender, :string
      add :age, :integer
      add :picture_url, :string
      add :last_login_at, :utc_datetime

      timestamps()
    end

    create index(:users, [:email], unique: true)
    create index(:users, [:mobile], unique: true)

    create table(:sdk_users) do 
      add :sdk, :string
      add :sdk_user_id, :string
      add :user_id, references(:users, type: :integer, on_delete: :delete_all)
    end

    create index(:sdk_users, [:sdk, :sdk_user_id], unique: true)
  end

end
