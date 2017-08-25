defmodule Acs.Repo.Migrations.CreateMeishengSMS do
  use Ecto.Migration

  def change do
    create table(:meisheng_sms) do
      add :msg_id, :string, size: 100
      add :mobile, :string, size: 20
      add :template_id, :string, size: 50
      add :content, :string
      add :status, :integer
      add :status_code, :string, size: 20
      add :report_time, :utc_datetime

      timestamps()
    end

    create index(:meisheng_sms, [:msg_id, :mobile], unique: true)
    create index(:meisheng_sms, [:status])
  end
end
