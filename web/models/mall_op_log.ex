defmodule Acs.MallOPLog do
  use Acs.Web, :model

  @derive {Poison.Encoder, except: [:order, :__meta__]}

  schema "mall_op_logs" do
    field :content, :string
    field :status, :integer
    field :changed_status, :integer
    field :admin_user, :string 
    belongs_to :order, Acs.MallOrder, type: :string

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:content, :status, :changed_status,:admin_user, :order_id])
    |> validate_required([:status, :changed_status, :order_id])
    |> foreign_key_constraint(:order_id)
  end
end
