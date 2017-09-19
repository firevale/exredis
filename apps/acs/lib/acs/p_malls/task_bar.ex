defmodule Acs.PMalls.TaskBar do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.PMalls.TaskBar


  schema "pmall_task_bars" do

    field :pic, :string
    field :name, :string
    field :sub_name, :string
    field :point, :integer, default: 0
    field :path, :string   #路径
    field :active, :boolean, default: false
    field :sort, :integer, default: 0

    belongs_to :app, Acs.Apps.App, type: :string

    timestamps()
  end

  @doc false
  def changeset(%TaskBar{} = task_bar, attrs) do
    task_bar
    |> cast(attrs, [:pic, :name, :sub_name, :point, :path, :active, :sort, :app_id])
    |> validate_required([:name, :path, :app_id])
  end
end
