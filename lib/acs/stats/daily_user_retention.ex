defmodule Acs.Stats.DailyUserRetention do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Stats.DailyUserRetention


  schema "stats_daily_user_retentions" do
    field :nday, :integer
    field :retention, :integer
    belongs_to :report, Acs.Stats.DailyReport
    timestamps()
  end
  
  use Utils.Redisable

  @doc false
  def changeset(%DailyUserRetention{} = daily_retentions, attrs) do
    daily_retentions
    |> cast(attrs, [:nday, :retention])
    |> validate_required([:nday, :retention])
  end
end
