defmodule Acs.AppOrder do
  use Acs.Web, :model

  @primary_key false
  schema "orders" do
    field :id, :string, primary_key: true
    field :platform, :string
    field :sdk, :string
    field :cp_order_id, :string
    field :status, :integer
    field :paid_at, Ecto.DateTime
    field :deliver_at, Ecto.DateTime
    field :paid_channel, :string
    field :fee, :integer
    field :currency, :string
    field :transaction_id, :string
    field :transaction_status, :string

    belongs_to :app_user, Acs.AppUser
    belongs_to :goods, Acs.Goods

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:id, :platform, :sdk, :cp_order_id, :paid_at, :deliver_at, :paid_channel, :fee, :currency, :transaction_id, :transaction_status])
    |> validate_required([:id, :platform, :sdk, :cp_order_id, :paid_at, :deliver_at, :paid_channel, :fee, :currency, :transaction_id, :transaction_status])
  end
end
