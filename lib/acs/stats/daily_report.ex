defmodule Acs.Stats.DailyReport do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Stats.DailyReport


  schema "stats_daily_reports" do
    field :app_id, :string
    field :date, :date
    field :platform, :string

    field :dau, :integer, default: 0         # daily active user
    field :danu, :integer, default: 0        # daily active new user
    field :dapu, :integer, default: 0        # daily active paid user
    field :danpu, :integer, default: 0       # daily active new paid user
    field :dad, :integer, default: 0         # daily active devices
    field :dand, :integer, default: 0        # daily active new devices
    
    field :total_fee, :integer, default: 0   # daily paid amount sum

    has_many :user_retentions, Acs.Stats.DailyUserRetention 
    has_many :user_timings, Acs.Stats.DailyUserTiming 
    has_many :device_retentions, Acs.Stats.DailyDeviceRetention 
    has_many :device_timings, Acs.Stats.DailyDeviceTiming 

    timestamps()
  end

  @doc false
  def changeset(%DailyReport{} = daily_report, attrs) do
    daily_report
    |> cast(attrs, [:app_id, :date, :platform, :dau, :danu, :dapu, :danpu, :dad, :dand, :total_fee])
    |> validate_required([:app_id, :date, :platform])
  end
end
