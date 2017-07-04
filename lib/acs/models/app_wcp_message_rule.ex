defmodule Acs.AppWcpMessageRule do
  use Acs.Web, :model

  @derive {Poison.Encoder, except: [:app, :__meta__]}

  schema "app_wcp_message_rules" do
    field :keywords, :string
    field :response, :string

    belongs_to :app, Acs.App, type: :string

    timestamps()
  end

  use Utils.Jsonable

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:keywords, :response, :app_id])
    |> validate_required([:keywords, :response])
    |> unique_constraint(:keywords, name: :app_wcp_message_rules_app_id_keywords_index)
  end
end
