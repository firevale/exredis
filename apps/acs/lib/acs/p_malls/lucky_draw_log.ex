defmodule Acs.PMalls.LuckyDrawLog do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.PMalls.LuckyDrawLog
  
  @derive {Poison.Encoder, except: [:app, :wcp_user, :__meta__]}

  schema "pmall_lucky_draw_logs" do
    field :name, :string
    field :pic, :string
    field :status, :integer, default: 0

    belongs_to :app, Acs.Apps.App, type: :string
    belongs_to :wcp_user, Acs.Wcp.AppWcpUser
    belongs_to :lucky_draw, Acs.PMalls.LuckyDraw

    timestamps()
  end

  use Utils.Redisable

  @doc false
  def changeset(%LuckyDrawLog{} = lucky_draw_log, attrs) do
    lucky_draw_log
    |> cast(attrs, [:name, :pic, :status, :app_id, :wcp_user_id, :lucky_draw_id])
    |> validate_required([:name, :pic, :status, :app_id, :wcp_user_id, :lucky_draw_id])
  end
end
