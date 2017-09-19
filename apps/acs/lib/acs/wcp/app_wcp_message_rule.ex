defmodule Acs.Wcp.AppWcpMessageRule do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Wcp.AppWcpMessageRule

  @derive {Poison.Encoder, except: [:app, :__meta__]}
  schema "app_wcp_message_rules" do
    field :keywords, :string
    field :response, :binary

    belongs_to :app, Acs.Apps.App, type: :string

    timestamps()
  end

  use Utils.Redisable

  @doc false
  def changeset(%AppWcpMessageRule{} = app_wcp_message_rule, attrs) do
    app_wcp_message_rule
    |> cast(attrs, [:keywords, :response, :app_id])
    |> validate_required([:keywords, :response])
    |> unique_constraint(:keywords, name: :app_wcp_message_rules_app_id_keywords_index)
  end
end
