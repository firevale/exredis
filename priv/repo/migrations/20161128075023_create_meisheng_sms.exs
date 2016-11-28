defmodule Acs.Repo.Migrations.CreateMeishengSMS do
  use Ecto.Migration

  def change do
    create table(:meisheng_sms) do
      add :msg_id, :string
      add :mobile, :string
      add :template_id, :string
      add :content, :string
      add :status, :integer
      add :status_code, :string
      add :report_time, :naive_datetime

      timestamps()
    end

    create index(:meisheng_sms, [:msg_id, :mobile], unique: true)
    create index(:meisheng_sms, [:status])
  end
end
