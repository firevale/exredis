defmodule Acs.Apps.AppSdkPaymentCallback do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Apps.AppSdkPaymentCallback

  schema "app_sdk_payment_callbacks" do
    field :platform, :string
    field :sdk, :string
    field :payment_callback, :string

    belongs_to :app, Acs.Apps.App, type: :string

    timestamps()
  end

  use Utils.Redisable
  @sdks Application.get_env(:acs, :sdks, [])

  @doc false
  def changeset(%AppSdkPaymentCallback{} = app_sdk_payment_callback, attrs) do
    app_sdk_payment_callback
    |> cast(attrs, [:platform, :sdk, :payment_callback, :app_id])
    |> validate_required([:platform, :sdk, :payment_callback, :app_id])
    |> validate_inclusion(:sdk, @sdks)
  end
end
