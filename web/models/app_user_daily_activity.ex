defmodule Acs.AppUserDailyActivity do
  use Acs.Web, :model

  schema "app_user_daily_activities" do
    field :date, :date
    field :active_seconds, :integer, default: 0
    field :pay_amount, :integer, default: 0
    belongs_to :app_user, Acs.AppUser

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:date, :active_seconds, :pay_amount, :app_user_id])
    |> validate_required([:date, :app_user_id])
  end
end
