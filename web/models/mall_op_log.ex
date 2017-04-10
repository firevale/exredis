defmodule Acs.MallOPLog do
  use Acs.Web, :model

  @derive {Poison.Encoder, except: [:order, :user, :__meta__]}

  schema "mall_op_logs" do
    field :content, :string

    belongs_to :order, Acs.MallOrder, type: :string
    belongs_to :user, Acs.User, type: :integer

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:content, :order_id, :user_id])
    |> validate_required([:content, :order_id, :user_id])
    |> foreign_key_constraint(:order_id)
    |> foreign_key_constraint(:user_id)    
  end
end
