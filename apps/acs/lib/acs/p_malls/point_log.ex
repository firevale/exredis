defmodule Acs.PMalls.PointLog do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.PMalls.PointLog

  @derive {Poison.Encoder, except: [:app, :wcp_user, :__meta__]}

  schema "pmall_point_logs" do
    field :log_type, :string
    field :point, :integer, default: 0
    field :memo, :string   #备注

    belongs_to :app, Acs.Apps.App, type: :string
    belongs_to :wcp_user, Acs.Wcp.AppWcpUser

    timestamps()
  end

  use Utils.Redisable

  @doc false
  def changeset(%PointLog{} = point_log, attrs) do
    point_log
    |> cast(attrs, [:log_type, :point, :memo, :app_id, :wcp_user_id])
    |> validate_required([:log_type, :point, :app_id])
  end
end
