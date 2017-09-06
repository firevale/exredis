defmodule Acs.Wcp.AppWcpMessage do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Wcp.AppWcpMessage

  @derive {Poison.Encoder, except: [:app, :__meta__]}

  schema "app_wcp_messages" do
    field :from, :string
    field :to, :string
    field :msg_type, :string
    field :content, :binary
    field :create_time, :integer

    belongs_to :app, Acs.Apps.App, type: :string

    timestamps()
  end

  use Utils.Redisable

  @doc false
  def changeset(%AppWcpMessage{} = app_wcp_message, attrs) do
    app_wcp_message
    |> cast(attrs, [:from, :to, :msg_type, :content, :create_time, :app_id])
    |> validate_required([:from, :to, :msg_type, :content])
  end
end
