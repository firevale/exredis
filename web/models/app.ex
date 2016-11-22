defmodule Acs.App do
  use Acs.Web, :model

  @primary_key false
  schema "apps" do
    field :id, :string, primary_key: true
    field :secret, :string
    field :name, :string
    field :token_ttl, :integer, default: 604800 
    field :currency, :string, default: "CNY"
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
    |> cast(params, [:id, :secret, :name, :currency, :payment_callback])
    |> validate_required([:secret, :name, :currency])
  end
end
