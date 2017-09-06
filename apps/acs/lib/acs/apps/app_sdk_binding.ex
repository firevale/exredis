defmodule Acs.Apps.AppSdkBinding do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Apps.AppSdkBinding

  @derive {Poison.Encoder, except: [:app, :__meta__]}
  schema "app_sdk_bindings" do
    field :sdk, :string
    field :binding, :map

    belongs_to :app, Acs.Apps.App, type: :string

    timestamps()
  end

  @sdks Application.get_env(:acs, :sdks, [])

  @doc false
  def changeset(%AppSdkBinding{} = app_sdk_binding, attrs) do
    app_sdk_binding
    |> cast(attrs, [:sdk, :binding, :app_id])
    |> validate_required([:sdk, :binding, :app_id])
    |> validate_inclusion(:sdk, @sdks)
  end
end
