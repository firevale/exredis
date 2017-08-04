defmodule Acs.ItcApp do
  use Acs.Web, :model

  @derive {Poison.Encoder, except: [:app, :__meta__]}

  schema "itc_apps" do
    field :itc_app_id, :string
    field :itc_login, :string
    field :itc_password, :string
    field :num_testers, :integer
    field :active, :boolean, default: false

    belongs_to :app, Acs.App, type: :string

    timestamps()
  end

  use Utils.Redisable

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:itc_app_id, :itc_login, :itc_password, :app_id, :num_testers, :active])
    |> validate_required([:itc_app_id, :itc_login, :itc_password, :app_id])
    |> foreign_key_constraint(:app_id)
  end

end
