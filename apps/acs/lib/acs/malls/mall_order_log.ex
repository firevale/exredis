defmodule Acs.Malls.MallOrderLog do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Malls.MallOrderLog


  schema "mall_order_logs" do

    field :content, :map
    field :status, :integer
    field :changed_status, :integer
    field :admin_user, :string 
    belongs_to :mall_order, Acs.Malls.MallOrder, type: :string

    timestamps()
  end

  @doc false
  def changeset(%MallOrderLog{} = mall_order_log, attrs) do
    mall_order_log
    |> cast(attrs, [:content, :status, :changed_status, :admin_user, :mall_order_id])
    |> validate_required([:status, :changed_status, :mall_order_id])
    |> foreign_key_constraint(:mall_order_id)
  end
end
