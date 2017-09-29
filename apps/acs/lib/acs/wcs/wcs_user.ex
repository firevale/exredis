defmodule Acs.Wcs.WcsUser do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Wcs.WcsUser

  @derive {Poison.Encoder, except: [:app, :user, :__meta__]}

  schema "wcs_users" do
    field :openid, :string       
    field :unionid, :string
    field :nickname, :string
    field :sex, :integer
    field :avatar_url, :string
    field :city, :string
    field :country, :string

    belongs_to :app, Acs.Apps.App, type: :string
    belongs_to :user, Acs.Accounts.User

    timestamps()
  end

  use Utils.Redisable

  @doc false
  def changeset(%WcsUser{} = app_wcp_user, attrs) do
    app_wcp_user
    |> cast(attrs, [:openid, :unionid, :nickname, :sex, :avatar_url, :city, :country, :app_id, :user_id])
    |> validate_required([:openid, :app_id])
    |> foreign_key_constraint(:user_id)
    |> unique_constraint(:unionid, name: :wcs_users_app_id_unionid_index)
    |> unique_constraint(:openid, name: :wcs_users_app_id_openid_index)
    |> unique_constraint(:user_id, name: :wcs_users_app_id_user_id_index)
  end
end
