defmodule Acs.Repo.Migrations.CreateAppSdkPaymentCallbacks do
  use Ecto.Migration

  def change do
    create table(:app_sdk_payment_callbacks) do

      timestamps()
    end

  end
end
