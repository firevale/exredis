defmodule Acs.AppSdkBinding do
  use Acs.Web, :model

  schema "app_sdk_bindings" do
    field :sdk, :string
    field :bindings, :map
    
    belongs_to :app, Acs.App

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:sdk, :bindings])
    |> validate_required([:sdk, :bindings])
  end
end
