defmodule Acs.Repo.Migrations.CreateMeishengSmsMo do
  use Ecto.Migration

  def change do
    create table(:meisheng_sms_mo) do
      add :mobile, :string
      add :recv_code, :string
      add :content, :string
      add :recv_time, :naive_datetime

      timestamps()
    end

  end
end
