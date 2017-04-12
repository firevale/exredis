defmodule Acs.MallGoods do
  use Acs.Web, :model

  @derive {Poison.Encoder, except: [:app, :user, :__meta__]}
  
  @primary_key false
  schema "mall_goods" do
    field :id, :string, primary_key: true
    field :name, :string
    field :pic, :string
    field :description, :binary

    field :price, :integer
    field :postage, :integer      #邮费
    field :stock, :integer, default: 0    #库存
    field :sold, :integer, default: 0     #售出数量
    field :reads, :integer, default: 0
    field :active, :boolean, default: false

    belongs_to :app, Acs.App, type: :string
    belongs_to :user, Acs.User, type: :integer

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:id, :name, :description, :price, :postage, :pic, :stock, :sold, :reads, :active, :app_id, :user_id])
    |> validate_required([:id, :name, :description, :price, :postage, :pic, :app_id, :user_id])
    |> foreign_key_constraint(:app_id)
    |> foreign_key_constraint(:user_id)

  end
end
