defmodule Acs.MeishengSmsMo do
  use Acs.Web, :model

  schema "meisheng_sms_mo" do
    field :mobile, :string
    field :recv_code, :string
    field :content, :string
    field :recv_time, :utc_datetime

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:mobile, :recv_code, :content, :recv_time])
    |> validate_required([:mobile, :recv_code, :content, :recv_time])
  end
end
