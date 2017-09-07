defmodule Exsm.MeishengSms do
  use Ecto.Schema
  import Ecto.Changeset
  alias Exsm.MeishengSms


  schema "meisheng_sms" do
    field :msg_id, :string
    field :mobile, :string
    field :template_id, :string
    field :content, :string
    field :status, :integer
    field :status_code, :string
    field :report_time, :utc_datetime

    timestamps()
  end

  defmodule Status do
    def delivered, do: 0
    def sent, do: 1
    def failed, do: 2
  end


  @doc false
  def changeset(%MeishengSms{} = meisheng_sms, attrs) do
    meisheng_sms
    |> cast(attrs, [:msg_id, :mobile, :template_id, :content, :status, :status_code, :report_time])
    |> validate_required([:msg_id, :mobile, :template_id, :content, :status])
  end
end
