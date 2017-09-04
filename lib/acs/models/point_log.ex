defmodule Acs.PointLog do
  use Acs.Web, :model

  @derive {Poison.Encoder, except: [:app, :user, :__meta__]}

  schema "point_logs" do

    field :log_type, :string
    field :point, :integer, default: 0
    field :memo, :string   #备注

    belongs_to :app, Acs.App, type: :string
    belongs_to :user, Acs.User, type: :integer

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:log_type, :point, :memo, :app_id, :user_id])
    |> validate_required([:log_type, :point, :app_id, :user_id])
  end
end
