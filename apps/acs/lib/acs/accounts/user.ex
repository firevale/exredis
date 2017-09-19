defmodule Acs.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Accounts.User

  @derive {Poison.Encoder, except: [:__meta__]}
  schema "users" do
    field :email, :string
    field :mobile, :string
    field :encrypted_password, :string
    field :device_id, :string
    field :nickname, :string
    field :resident_id, :string
    field :resident_name, :string
    field :gender, :string
    field :age, :integer
    field :avatar_url, :string

    timestamps()
  end

  use Utils.Redisable

  @doc false
  def changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [:email, :mobile, :encrypted_password, :device_id, :nickname, :resident_id, :resident_name, :gender, :age, :avatar_url])
    |> validate_format(:email, ~r/^[^@]+@[^@]+$/)
    |> validate_format(:mobile, ~r/^1\d+$/)
    |> unique_constraint(:mobile)
    |> unique_constraint(:email)
    |> unique_constraint(:device_id)
  end
end
