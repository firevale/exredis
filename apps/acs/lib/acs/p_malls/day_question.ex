defmodule Acs.PMalls.DayQuestion do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.PMalls.DayQuestion

  schema "pmall_day_questions" do
    field :question, :string
    field :correct, :integer, default: 0
    field :a1, :string, size: 200
    field :a2, :string, size: 200
    field :a3, :string, size: 200
    field :a4, :string, size: 200
    field :a5, :string, size: 200
    field :a6, :string, size: 200
    field :reads, :integer, default: 0
    field :bingo, :integer, default: 0

    belongs_to :app, Acs.Apps.App, type: :string

    timestamps()
  end

  use Utils.Redisable

  @doc false
  def changeset(%DayQuestion{} = day_question, attrs) do
    day_question
    |> cast(attrs, [:question, :correct, :a1, :a2, :a3, :a4, :a5, :a6, :reads, :bingo, :app_id])
    |> validate_required([:question, :correct, :a1, :a2, :app_id])
  end
end
