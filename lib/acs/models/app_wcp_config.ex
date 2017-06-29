defmodule Acs.AppWcpConfig do
  use Acs.Web, :model

  @derive {Poison.Encoder, except: [:app, :__meta__]}

  schema "app_wcp_configs" do
    field :wcp_app_id, :string
    field :wcp_app_key, :string
    field :token, :string
    field :aes_key, :string

    field :menu, :map

    field :subscribed_response, :string
    field :scan_response, :string
    field :default_response, :string

    field :new_code_template, :string
    field :owned_code_template, :string
    field :no_code_template, :string

    belongs_to :app, Acs.App, type: :string

    timestamps()
  end

  use Utils.Jsonable

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:wcp_app_id, :wcp_app_key, :token, :aes_key, :menu, :subscribed_response, :scan_response, 
                    :default_response, :new_code_template, :owned_code_template, :no_code_template, :app_id])
    |> validate_required([:wcp_app_id, :wcp_app_key, :app_id])
    |> unique_constraint(:wcp_app_id)
  end
end
