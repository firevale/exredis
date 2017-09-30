defmodule Acs.Wcp.AppWcpUser do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Wcp.AppWcpUser

  @derive {Poison.Encoder, except: [:app, :__meta__]}

  schema "app_wcp_users" do
    field :openid, :string       
    field :unionid, :string
    field :nickname, :string
    field :sex, :integer
    field :avatar_url, :string
    field :city, :string
    field :country, :string
    field :tf_email, :string

    belongs_to :app, Acs.Apps.App, type: :string
    belongs_to :user, Acs.Accounts.User

    timestamps()
  end

  use Utils.Redisable

  @doc false
  def changeset(%AppWcpUser{} = app_wcp_user, attrs) do
    app_wcp_user
    |> cast(attrs, [:openid, :unionid, :nickname, :sex, :avatar_url, :city, :country, :app_id, :user_id, :tf_email])
    |> validate_required([:app_id, :openid])
    |> foreign_key_constraint(:user_id)
    |> unique_constraint(:unionid, name: :app_wcp_users_app_id_unionid_index)
    |> unique_constraint(:openid, name: :app_wcp_users_app_id_openid_index)
    |> unique_constraint(:user_id, name: :app_wcp_users_app_id_user_id_index)
  end
end
