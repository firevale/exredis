defmodule Acs.MeishengSms do
  use Acs.Web, :model

  schema "meisheng_sms" do
    field :msg_id, :string
    field :mobile, :string
    field :template_id, :string
    field :content, :string
    field :status, :integer
    field :status_code, :string
    field :report_time, :naive_datetime

    timestamps()
  end

  defmodule Status do 
    def delivered, do: 0
    def sent, do: 1
    def failed, do: 2
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:msg_id, :mobile, :template_id, :content, :status, :status_code, :report_time])
    |> validate_required([:msg_id, :mobile, :template_id, :content, :status])
  end
end
