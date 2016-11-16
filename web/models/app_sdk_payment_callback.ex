defmodule Acs.AppSdkPaymentCallback do
  use Acs.Web, :model

  schema "app_sdk_payment_callbacks" do
    field :platform, :string
    field :sdk, :string
    field :payment_callback, :string

    belongs_to :app, Acs.App, type: :string

    timestamps()
  end

  @sdks Application.get_env(:acs, :sdks, [])

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:platform, :sdk, :payment_callback])
    |> validate_required([:platform, :sdk, :payment_callback])
    |> validate_inclusion(:sdk, @sdks)
  end
end
