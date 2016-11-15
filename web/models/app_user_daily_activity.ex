defmodule Acs.AppUserDailyActivity do
  use Acs.Web, :model

  schema "app_user_daily_activities" do
    field :date, :date
    field :active_minutes, :integer
    field :pay_amount, :integer
    belongs_to :app_user, Acs.AppUser

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:date, :active_minutes, :pay_amount])
    |> validate_required([:date, :active_minutes, :pay_amount])
  end
end
