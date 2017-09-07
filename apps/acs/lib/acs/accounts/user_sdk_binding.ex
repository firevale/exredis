defmodule Acs.Accounts.UserSdkBinding do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Accounts.UserSdkBinding

  schema "user_sdk_bindings" do
    field :sdk, :string
    field :sdk_user_id, :string

    belongs_to :user, Acs.Accounts.User, type: :integer

    timestamps()
  end

  use Utils.Redisable

  @sdks Application.get_env(:acs, :sdks, [])

  @doc false
  def changeset(%UserSdkBinding{} = user_sdk_binding, attrs) do
    user_sdk_binding
    |> cast(attrs, [:sdk, :sdk_user_id, :user_id])
    |> validate_required([:sdk, :sdk_user_id, :user_id])
    |> validate_inclusion(:sdk, @sdks)
    |> foreign_key_constraint(:user_id)
  end
end
