defmodule Acs.User do
  use   Acs.Web, :model
  # alias Acs.Repo
  alias Acs.UserSdkBinding
  alias Acs.RedisUser

  @email_check_regex ~r/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/iu

  @primary_key false
  schema "users" do
    field :id, :integer, primary_key: true
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

    has_many :sdk_bindings, UserSdkBinding, references: :id

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:id, :email, :mobile, :encrypted_password, :nickname, :device_id, 
                     :resident_id, :resident_name, :gender, :age, :avatar_url])
    |> validate_required([:id])
    |> validate_format(:email, @email_check_regex)
    |> validate_format(:mobile, ~r/^\d+/)
  end


end
