defmodule Acs.AppWcpMessage do
  use Acs.Web, :model

  @derive {Poison.Encoder, except: [:app, :__meta__]}

  schema "app_wcp_messages" do
    field :from, :string
    field :to, :string
    field :msg_type, :string
    field :content, :binary
    field :create_time, :integer

    belongs_to :app, Acs.App, type: :string

    timestamps()
  end

  use Utils.Redisable

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:from, :to, :msg_type, :content, :create_time, :app_id])
    |> validate_required([:from, :to, :msg_type, :content])
  end
end
