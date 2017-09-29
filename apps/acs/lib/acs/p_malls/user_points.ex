defmodule Acs.PMalls.UserPoints do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.PMalls.PointLog

  @derive {Poison.Encoder, except: [:app, :wcs_user, :__meta__]}

  schema "pmall_user_points" do
    field :point, :integer, default: 0

    belongs_to :app, Acs.Apps.App, type: :string
    belongs_to :wcs_user, Acs.Wcs.WcsUser

    timestamps()
  end

  use Utils.Redisable

  @doc false
  def changeset(%PointLog{} = point_log, attrs) do
    point_log
    |> cast(attrs, [:point, :app_id, :wcs_user_id])
    |> validate_required([:point, :app_id, :wcs_user_id])
    |> unique_constraint(:wcs_user_id, name: :pmall_user_points_app_id_wcs_user_id_index)
  end
end
