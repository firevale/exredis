defmodule Acs.AppUser do
  use Acs.Web, :model


  schema "app_users" do
    field :app_user_id, :string
    field :app_zone_id, :string

    field :active_minutes, :integer, default: 0
    field :pay_amount, :integer, default: 0
    field :last_pay_at, :naive_datetime

    belongs_to :app, Acs.App
    belongs_to :user, Acs.User

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:app_user_id, :app_zone_id, :active_minutes, :pay_amount, :last_pay_at])
    |> validate_number(:pay_amount, greater_than_or_equal_to: 0, message: "pay_amount should be greater than or equal to 0")
    |> validate_number(:active_minutes, greater_than_or_equal_to: 0, message: "active_minutes should be greater than or equal to 0")
  end
end
