defmodule Acs.AppSdkPaymentCallback do
  use Acs.Web, :model

  schema "app_sdk_payment_callbacks" do
    field :platform, :string
    field :sdk, :string
    field :payment_callback, :string
    
    belongs_to :app, Acs.App

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:platform, :sdk, :payment_callback])
    |> validate_required([:platform, :sdk, :payment_callback])
  end
end
