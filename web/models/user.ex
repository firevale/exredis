defmodule Acs.User do
  use   Acs.Web, :model
  alias Acs.Repo

  @primary_key false
  schema "users" do
    field :id, :integer, primary_key: true
    field :email, :string
    field :mobile, :string
    field :encrypted_password, :string
    field :nickname, :string
    field :resident_id, :string
    field :resident_name, :string
    field :gender, :string
    field :age, :integer
    field :picture_url, :string
    field :last_login_at, :utc_datetime

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:id, :email, :mobile, :encrypted_password, :nickname, :resident_id, :resident_name, 
                     :gender, :age, :picture_url, :last_login_at])
    |> validate_required([:id])
  end

  def to_map(%__MODULE__{} = user) do 
    %{
      user_id: user.user_id,
      email: user.email,
      mobile: user.mobile,
      sdk: user.sdk,
      sdk_user_id: user.sdk_user_id,
      device_id: user.device_id,
      encrypted_password: user.encrypted_password,
      nickname: user.nickname,
      picture_url: user.picture_url,
      gender_male: user.gender_male,
      device_model: user.device_model,
      last_login_at: user.last_login_at,
      inserted_at: user.inserted_at,
      updated_at: user.updated_at,
    }
  end
end
