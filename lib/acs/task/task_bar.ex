defmodule Acs.TaskBar do
  use Acs.Web, :model

  schema "task_bars" do

    field :pic, :string
    field :name, :string
    field :sub_name, :string
    field :point, :integer, default: 0
    field :path, :string   #路径
    field :active, :boolean, default: false
    field :sort, :integer, default: 0

    belongs_to :app, Acs.App, type: :string

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:pic, :name, :sub_name, :point, :path, :active, :sort])
    |> validate_required([:name, :path, :app_id])
  end
end
