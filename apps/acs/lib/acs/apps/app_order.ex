defmodule Acs.Apps.AppOrder do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Apps.AppOrder

  defmodule Status do
    def delivered, do: 0
    def created, do: 1
    def paid, do: 2
    def cheat, do: 403
  end

  @derive {Poison.Encoder, except: [:app, :user, :goods, :__meta__]}

  @primary_key false
  schema "app_orders" do
    field :id, :string, primary_key: true
    field :platform, :string
    field :device_id, :string
    field :sdk, :string
    field :sdk_user_id, :string
    field :cp_order_id, :string
    field :zone_id, :string
    field :market, :string
    field :status, :integer
    field :paid_at, :utc_datetime
    field :deliver_at, :utc_datetime
    field :try_deliver_at, :utc_datetime
    field :try_deliver_counter, :integer, default: 0
    field :price, :integer, default: 0
    field :currency, :string
    field :goods_name, :string
    field :debug_mode, :boolean, default: false
    field :paid_channel, :string
    field :fee, :integer
    field :transaction_currency, :string
    field :transaction_id, :string
    field :transaction_status, :string
    field :cp_result, :string
    field :app_user_id, :integer

    belongs_to :app,  Acs.Apps.App, type: :string
    belongs_to :user, Acs.Accounts.User, type: :integer
    belongs_to :goods, Acs.Goods, type: :string

    timestamps()
  end

  @platforms Application.get_env(:acs, :platforms, [])
  @sdks Application.get_env(:acs, :sdks, [])

  @doc false
  def changeset(%AppOrder{} = app_order, attrs) do
    app_order
    |> cast(attrs, [:id, :platform, :device_id, :sdk, :sdk_user_id, :cp_order_id, :zone_id, :market, :status, 
      :paid_at, :deliver_at, :try_deliver_at, :try_deliver_counter, :price, :currency, :goods_name,
      :debug_mode, :paid_channel, :fee, :transaction_currency, :transaction_id, :transaction_status,
      :cp_result, :app_user_id, :app_id, :user_id, :goods_id])
    |> validate_required([:id, :platform, :cp_order_id, :app_id, :user_id])
    |> validate_inclusion(:sdk, @sdks)
    |> validate_inclusion(:platform, @platforms)
  end
end
