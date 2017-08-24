defmodule Acs.Stats.AppUser do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Stats.AppUser

  schema "app_users" do
    field :app_user_id, :string
    field :app_user_name, :string
    field :app_user_level, :integer, default: 1

    field :app_id, :string
    field :user_id, :integer
    field :zone_id, :string, default: "0"

    field :active_seconds, :integer, default: 0
    field :pay_amount, :integer, default: 0
    field :reg_date, :date
    field :first_paid_at, :utc_datetime
    field :last_paid_at, :utc_datetime
    field :last_active_at, :utc_datetime

    field :platform, :string # platform that the app user inserted

    has_many :daily_activities, Acs.Stats.AppUserDailyActivity

    timestamps()
  end

  use Utils.Redisable

  @doc false
  def changeset(%AppUser{} = app_user, attrs) do
    app_user
    |> cast(attrs, [:app_user_id, :app_user_name, :zone_id, :app_user_level, :active_seconds, :pay_amount, :reg_date,
                    :first_paid_at, :last_paid_at, :last_active_at, :app_id, :user_id, :platform])
    |> validate_number(:pay_amount, greater_than_or_equal_to: 0, message: "pay_amount should be greater than or equal to 0")
    |> validate_number(:active_seconds, greater_than_or_equal_to: 0, message: "active_seconds should be greater than or equal to 0")
    |> validate_inclusion(:platform, ~w(ios android wp8), message: "unknown platform")
  end

  def init_mapping() do
    unless Elasticsearch.is_type?("acs", "app_users") do
      mapping =  %{
        _parent: %{type: "user" },
        properties: %{
          app_id: %{type: :keyword},
          zone_id: %{type: :keyword},
          game_user_id: %{type: :keyword},
          game_user_name: %{type: :text, analyzer: :ik_smart},
          game_user_level: %{type: :integer},
          pay_amount:  %{type: :integer}
        }
      }

      Elasticsearch.put_mapping(%{index: "acs", type: "app_users", mapping: mapping, params: nil})
     end
  end

  def search(query) do
    case Elasticsearch.search(%{index: "acs", type: "app_users", query: query, params: %{timeout: "1m"}}) do
      {:ok, %{hits: %{hits: hits, total: total}}} ->
        app_users = 
          Enum.map(hits, fn(%{_id: _id, _source: %{} = app_user}) -> app_user end)
        {:ok, total, app_users}
      error ->
        # error "search failed: #{inspect error, pretty: true}"
        throw(error)
   end
  end

end