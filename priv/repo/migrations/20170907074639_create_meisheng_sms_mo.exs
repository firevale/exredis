defmodule Exsm.Repo.Migrations.CreateMeishengSmsMo do
  use Ecto.Migration

  def change do
    create table(:meisheng_sms_mo) do
      add :mobile, :string, size: 20
      add :recv_code, :string, size: 20
      add :content, :string
      add :recv_time, :utc_datetime

      timestamps()
    end
  end
end
