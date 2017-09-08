defmodule AcsStats.Users.AppUserDailyActivity do
  use Ecto.Schema
  import Ecto.Changeset
  alias AcsStats.Users.AppUserDailyActivity


  schema "app_user_daily_activities" do
    field :date, :date
    
    field :active_seconds, :integer, default: 0
    field :pay_amount, :integer, default: 0

    belongs_to :app_user, AcsStats.Users.AppUser

    timestamps()
  end

  use Utils.Redisable

  @doc false
  def changeset(%AppUserDailyActivity{} = app_user_daily_activity, attrs) do
    app_user_daily_activity
    |> cast(attrs, [:date, :active_seconds, :pay_amount, :app_user_id])
    |> validate_required([:date, :app_user_id])
  end
end
