defmodule Acs.AppDevice do
  use Acs.Web, :model

  schema "app_devices" do
    field :sdk, :string

    field :active_minutes, :integer, default: 0
    field :pay_amount, :integer, default: 0
    field :last_pay_at, :naive_datetime

    belongs_to :app, Acs.App
    belongs_to :device, Acs.Device

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:sdk])
    |> validate_required([:sdk])
  end
end
