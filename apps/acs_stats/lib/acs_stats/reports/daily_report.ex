defmodule AcsStats.Reports.DailyReport do
  use Ecto.Schema
  import Ecto.Changeset
  alias AcsStats.Reports.DailyReport


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

    has_many :user_retentions, AcsStats.Reports.DailyUserRetention, foreign_key: :report_id  #1，2，3，5，7，14，30
    has_many :user_timings, AcsStats.Reports.DailyUserTiming  # 0-5，5-10，10-15～ 55-60，60+
    has_many :device_retentions, AcsStats.Reports.DailyDeviceRetention 
    has_many :device_timings, AcsStats.Reports.DailyDeviceTiming 

    timestamps()
  end

  @doc false
  def changeset(%DailyReport{} = daily_report, attrs) do
    daily_report
    |> cast(attrs, [:app_id, :date, :platform, :dau, :danu, :dapu, :danpu, :dad, :dand, :total_fee])
    |> validate_required([:app_id, :date, :platform])
  end
end
