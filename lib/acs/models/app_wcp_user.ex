defmodule Acs.AppWcpUser do
  use Acs.Web, :model

  @derive {Poison.Encoder, except: [:app, :__meta__]}

  schema "app_wcp_users" do
    field :openid, :string       
    field :nickname, :string
    field :sex, :integer
    field :avatar_url, :string
    field :city, :string
    field :country, :string
    field :tf_email, :string

    belongs_to :app, Acs.App, type: :string

    timestamps()
  end

  use Utils.Redisable

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:openid, :nickname, :sex, :avatar_url, :city, :country, :app_id, :tf_email])
    |> validate_required([:app_id])
  end
end
