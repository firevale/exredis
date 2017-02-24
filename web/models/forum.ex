defmodule Acs.Forum do
  use Acs.Web, :model

  schema "forums" do
    field :title, :string
    field :status, :integer

    belongs_to :app, Acs.App, type: :string
    
    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:title, :status])
    |> validate_required([:title, :status])
    |> foreign_key_constraint(:app_id)
  end
end
