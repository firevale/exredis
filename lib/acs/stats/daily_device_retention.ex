defmodule Acs.Stats.DailyDeviceRetention do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Stats.DailyDeviceRetention


  schema "stats_daily_device_retentions" do
    field :nday, :integer
    field :retention, :integer

    belongs_to :report, Acs.Stats.DailyReport

    timestamps()
  end
  
  use Utils.Redisable

  @doc false
  def changeset(%DailyDeviceRetention{} = daily_device_retention, attrs) do
    daily_device_retention
    |> cast(attrs, [:nday, :retention, :report_id])
    |> validate_required([:nday, :retention, :report_id])
  end
end
