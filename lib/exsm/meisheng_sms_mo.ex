defmodule Exsm.MeishengSmsMo do
  use Ecto.Schema
  import Ecto.Changeset
  alias Exsm.MeishengSmsMo


  schema "meisheng_sms_mo" do
    field :mobile, :string
    field :recv_code, :string
    field :content, :string
    field :recv_time, :utc_datetime

    timestamps()
  end

  @doc false
  def changeset(%MeishengSmsMo{} = meisheng_sms_mo, attrs) do
    meisheng_sms_mo
    |> cast(attrs, [:mobile, :recv_code, :content, :recv_time])
    |> validate_required([:mobile, :recv_code, :content, :recv_time])
  end
end
