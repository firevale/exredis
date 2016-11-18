defmodule Acs.UserSdkBinding do
  use Acs.Web, :model

  schema "user_sdk_bindings" do
    field :sdk, :string
    field :sdk_user_id, :string

    belongs_to :app, Acs.App, type: :string
    belongs_to :user, Acs.User, type: :integer

    timestamps()
  end

  @sdks Application.get_env(:acs, :sdks, [])

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:sdk, :sdk_user_id, :app_id, :user_id])
    |> validate_required([:sdk, :sdk_user_id, :app_id, :user_id])
    |> validate_inclusion(:sdk, @sdks)
  end
end
