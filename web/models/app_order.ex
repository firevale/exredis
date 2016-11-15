defmodule Acs.AppOrder do
  use Acs.Web, :model

  require NaiveDateTime

  @primary_key false
  schema "app_orders" do
    field :id, :string, primary_key: true
    field :platform, :string
    field :sdk, :string
    field :cp_order_id, :string
    field :status, :integer
    field :paid_at, :naive_datetime
    field :deliver_at, :naive_datetime
    field :paid_channel, :string
    field :fee, :integer
    field :currency, :string
    field :transaction_id, :string
    field :transaction_status, :string

    belongs_to :app_user, Acs.AppUser
    belongs_to :goods, Acs.Goods

    timestamps()
  end

  @platforms Application.get_env(:acs, :platforms, [])
  @sdks Application.get_env(:acs, :sdks, [])

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:id, :platform, :sdk, :cp_order_id, :status, :paid_at, :deliver_at, 
                     :paid_channel, :fee, :currency, :transaction_id, :transaction_status])
    |> validate_required([:id, :platform, :cp_order_id])
    |> validate_inclusion(:sdk, @sdks)
    |> validate_inclusion(:platform, @platforms)

  end
end
