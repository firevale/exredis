defmodule Acs.OperateLog do
  use Acs.Web, :model

  @derive {Poison.Encoder, except: [:app, :user, :__meta__]}

  schema "operate_logs" do
    field :operate_type, :string
    field :log, :map

    belongs_to :app, Acs.App, type: :string
    belongs_to :user, Acs.User, type: :integer

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:operate_type, :log, :app_id, :user_id])
    |> validate_required([:operate_type, :log, :app_id, :user_id])
    |> foreign_key_constraint(:app_id)
  end
end
