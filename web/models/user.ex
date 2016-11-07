defmodule Acs.User do
  use Acs.Web, :model

  schema "users" do
    field :user_id, :integer
    field :email, :string
    field :mobile, :string
    field :sdk, :string
    field :sdk_user_id, :string
    field :device_id, :string # for guest login
    field :encrypted_password, :string
    field :nickname, :string
    field :picture_url, :string
    field :gender_male, :boolean, default: true
    field :device_model, :string
    field :last_login_at, :utc_datetime

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:user_id, :email, :mobile, :sdk, :sdk_user_id, :device_id, :encrypted_password, 
                     :nickname, :picture_url, :gender_male, :device_model, :last_login_at])
    |> validate_required([:user_id])
  end
end
