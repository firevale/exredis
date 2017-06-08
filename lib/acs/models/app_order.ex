defmodule Acs.AppOrder do
  use Acs.Web, :model

  require NaiveDateTime

  defmodule Status do
    def delivered, do: 0
    def created, do: 1
    def paid, do: 2
    def cheat, do: 403
  end

  @derive {Poison.Encoder, except: [:app, :user, :app_user, :goods, :__meta__]}

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

    belongs_to :app,  Acs.App, type: :string
    belongs_to :user, Acs.User, type: :integer
    belongs_to :goods, Acs.Goods, type: :string

    timestamps()
  end

  @platforms Application.get_env(:acs, :platforms, [])
  @sdks Application.get_env(:acs, :sdks, [])

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:id, :platform, :device_id, :sdk, :sdk_user_id, :cp_order_id, :zone_id, :market, :status, 
                     :paid_at, :deliver_at, :try_deliver_at, :try_deliver_counter, :price, :currency, :goods_name,
                     :debug_mode, :paid_channel, :fee, :transaction_currency, :transaction_id, :transaction_status,
                     :app_id, :user_id, :app_user_id, :goods_id, :cp_result])
    |> validate_required([:id, :platform, :cp_order_id, :app_id, :user_id])
    |> validate_inclusion(:sdk, @sdks)
    |> validate_inclusion(:platform, @platforms)

  end

  def init_mapping() do
   unless Elasticsearch.is_index?("acs") do
      settings = %{
        number_of_shards: 5,
        number_of_replicas: 1,
      }

      orders_mapping = %{
        properties: %{
          app_id: %{type: :keyword},
          user_id: %{type: :keyword},
          goods_id: %{type: :keyword},
          device_id: %{type: :keyword},
          cp_order_id: %{type: :text},
          transaction_id: %{type: :text},
          app_user_id: %{type: :keyword},
          sdk_user_id: %{type: :keyword},
          inserted_at: %{type: :date},
        }
      }

      Elasticsearch.create_index("acs", settings, %{
        orders: orders_mapping
      })
    end
  end
end
