defmodule Acs.Admin.OpLog do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Admin.OpLog

  @derive {Poison.Encoder, except: [:app, :user, :__meta__]}

  schema "admin_op_logs" do
    field :operate_type, :string
    field :log, :map

    belongs_to :app, Acs.Apps.App, type: :string
    belongs_to :user, Acs.Accounts.User, type: :integer

    timestamps()
  end

  use Utils.Redisable

  @doc false
  def changeset(%OpLog{} = op_log, attrs) do
    op_log
    |> cast(attrs, [:operate_type, :log, :app_id, :user_id])
    |> validate_required([:operate_type, :log, :app_id, :user_id])
    |> foreign_key_constraint(:app_id)
  end
end
