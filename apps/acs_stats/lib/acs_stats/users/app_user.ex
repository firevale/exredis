defmodule AcsStats.Users.AppUser do
  use Ecto.Schema
  import Ecto.Changeset
  alias AcsStats.Users.AppUser


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

    has_many :daily_activities, AcsStats.Users.AppUserDailyActivity

    timestamps()
  end

  @doc false
  def changeset(%AppUser{} = app_user, attrs) do
    app_user
    |> cast(attrs, [:app_user_id, :app_user_name, :zone_id, :app_user_level, :active_seconds, :pay_amount, :reg_date,
                    :first_paid_at, :last_paid_at, :last_active_at, :app_id, :user_id, :platform])
    |> validate_number(:pay_amount, greater_than_or_equal_to: 0, message: "pay_amount should be greater than or equal to 0")
    |> validate_number(:active_seconds, greater_than_or_equal_to: 0, message: "active_seconds should be greater than or equal to 0")
    |> validate_inclusion(:platform, ~w(ios android wp8), message: "unknown platform")
  end
end
