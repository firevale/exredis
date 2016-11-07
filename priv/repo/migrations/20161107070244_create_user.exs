defmodule Acs.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :user_id, :integer
      add :email, :string
      add :mobile, :string
      add :sdk, :string
      add :sdk_user_id, :string
      add :device_id, :string 
      add :encrypted_password, :string
      add :nickname, :string
      add :picture_url, :string
      add :gender_male, :boolean, default: true
      add :device_model, :string
      add :last_login_at, :utc_datetime

      timestamps()
    end

    create index(:users, [:user_id], unique: true)
    create index(:users, [:email], unique: true)
    create index(:users, [:mobile], unique: true)
    create index(:users, [:sdk, :sdk_user_id], unique: true)
    create index(:users, [:device_id], unique: true)
  end
end
