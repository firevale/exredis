defmodule Acs.Accounts.UserSdkBinding do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Accounts.UserSdkBinding

  @derive {Poison.Encoder, except: [:__meta__, :user]}
  schema "user_sdk_bindings" do
    field :sdk, :string
    field :sdk_user_id, :string
    field :nickname, :string

    belongs_to :user, Acs.Accounts.User

    timestamps()
  end

  use Utils.Redisable

  @sdks Application.get_env(:acs, :sdks, [])

  @doc false
  def changeset(%UserSdkBinding{} = user_sdk_binding, attrs) do
    user_sdk_binding
    |> cast(attrs, [:sdk, :sdk_user_id, :user_id, :nickname])
    |> validate_required([:sdk, :sdk_user_id, :user_id])
    |> validate_inclusion(:sdk, @sdks)
    |> foreign_key_constraint(:user_id)
    |> unique_constraint(:sdk_user_id, name: :user_sdk_bindings_sdk_sdk_user_id_index)
  end
end
