defmodule Acs.Malls.MallGoods do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Malls.MallGoods

  @derive {Poison.Encoder, except: [:app, :user, :__meta__]}
  @primary_key false
  schema "mall_goods" do
    field :id, :string, primary_key: true
    field :name, :string
    field :pic, :string, size: 800
    field :description, :binary

    field :price, :integer
    field :currency, :string, default: "CNY"

    field :postage, :integer      #邮费
    field :stock, :integer, default: 0    #库存
    field :sold, :integer, default: 0     #售出数量
    field :reads, :integer, default: 0
    field :active, :boolean, default: false

    belongs_to :app, Acs.Apps.App, type: :string
    belongs_to :user, Acs.Accounts.User, type: :integer

    timestamps()
  end

  use Utils.Redisable

  @doc false
  def changeset(%MallGoods{} = mall_goods, attrs) do
    mall_goods
    |> cast(attrs, [:id, :name, :description, :price, :currency, :postage, :pic, :stock, :sold, :reads, :active, :app_id, :user_id])
    |> validate_required([:id, :name, :description, :price, :postage, :app_id, :user_id])
    |> foreign_key_constraint(:app_id)
    |> foreign_key_constraint(:user_id)
  end
end
