defmodule Acs.Wcs.WcsUser do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Wcs.WcsUser

  @derive {Poison.Encoder, except: [:app, :__meta__]}

  schema "wcs_users" do
    field :openid, :string       
    field :unionid, :string
    field :nickname, :string
    field :sex, :integer
    field :avatar_url, :string
    field :city, :string
    field :country, :string

    belongs_to :user, Acs.Accounts.User

    timestamps()
  end

  use Utils.Redisable

  @doc false
  def changeset(%WcsUser{} = app_wcp_user, attrs) do
    app_wcp_user
    |> cast(attrs, [:openid, :unionid, :nickname, :sex, :avatar_url, :city, :country, :user_id])
    |> validate_required([:openid])
    |> foreign_key_constraint(:user_id)
    |> unique_constraint(:unionid)
    |> unique_constraint(:openid)
  end
end
