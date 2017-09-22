defmodule Acs.PMalls.LuckyDraw do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.PMalls.LuckyDraw
  
  @derive {Poison.Encoder, except: [:app, :__meta__]}

  schema "pmall_lucky_draws" do
    field :name, :string
    field :pic, :string
    field :num, :integer, default: 0
    field :rate, :integer, default: 0

    belongs_to :app, Acs.Apps.App, type: :string

    timestamps()
  end

  use Utils.Redisable

  @doc false
  def changeset(%LuckyDraw{} = lucky_draw, attrs) do
    lucky_draw
    |> cast(attrs, [:name, :pic, :num, :rate, :app_id])
    |> validate_required([:name, :app_id])
  end
end
