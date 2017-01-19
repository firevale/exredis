defmodule Acs.Device do
  use Acs.Web, :model

  @primary_key false
  schema "devices" do
    field :id, :string, primary_key: true
    field :model, :string
    field :platform, :string
    field :os, :string
    field :created_at, :naive_datetime

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:id, :model, :platform, :os, :created_at])
    |> validate_required([:model, :platform])
  end
end
