defmodule Acs.Wcp.AppWcpUser do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Wcp.AppWcpUser

  @derive {Poison.Encoder, except: [:app, :__meta__]}

  schema "app_wcp_users" do
    field :openid, :string       
    field :nickname, :string
    field :sex, :integer
    field :avatar_url, :string
    field :city, :string
    field :country, :string
    field :tf_email, :string

    belongs_to :app, Acs.Apps.App, type: :string

    timestamps()
  end

  use Utils.Redisable

  @doc false
  def changeset(%AppWcpUser{} = app_wcp_user, attrs) do
    app_wcp_user
    |> cast(attrs, [:openid, :nickname, :sex, :avatar_url, :city, :country, :app_id, :tf_email])
    |> validate_required([:app_id])
  end
end
