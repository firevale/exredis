defmodule Acs.AppUser do
  use Acs.Web, :model

  schema "app_users" do
    field :app_user_id, :string
    field :app_user_name, :string

    field :app_user_level, :integer, default: 1

    field :active_seconds, :integer, default: 0
    field :pay_amount, :integer, default: 0
    field :create_date, :date
    field :last_pay_at, :naive_datetime
    
    belongs_to :app, Acs.App, type: :string
    belongs_to :user, Acs.User, type: :integer
    field :zone_id, :string

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:app_user_id, :app_user_name, :zone_id, :app_user_level, :active_seconds, :pay_amount, :create_date, :last_pay_at, :app_id, :user_id])
    |> validate_number(:pay_amount, greater_than_or_equal_to: 0, message: "pay_amount should be greater than or equal to 0")
    |> validate_number(:active_seconds, greater_than_or_equal_to: 0, message: "active_seconds should be greater than or equal to 0")
  end
end
