defmodule Acs.App do
  use Acs.Web, :model

  @primary_key false
  schema "apps" do
    field :id, :string, primary_key: true
    field :secret, :string
    field :name, :string
    field :payment_callback, :string

    has_many :sdk_bindings, Acs.AppSdkBinding, references: :id
    has_many :goods, Acs.AppGoods, references: :id
    has_many :sdk_payment_callbacks, Acs.AppSdkPaymentCallback, references: :id

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:secret, :name, :payment_callback])
    |> validate_required([:secret, :name, :payment_callback])
  end
end
