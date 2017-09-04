defmodule Acs.PointMallGoods do
  use Acs.Web, :model

  @derive {Poison.Encoder, except: [:app, :user, :__meta__]}

  @primary_key false
  schema "point_mall_goods" do
    field :id, :string, primary_key: true
    field :name, :string
    field :pic, :string, size: 800
    field :description, :binary

    field :price, :integer
    field :currency, :string, default: "POINT"

    field :postage, :integer      #邮费
    field :stock, :integer, default: 0    #库存
    field :sold, :integer, default: 0     #售出数量
    field :reads, :integer, default: 0
    field :active, :boolean, default: false
    field :is_virtual, :boolean, default: false  #是否虚拟物品
    field :begin_time, :utc_datetime    #开始时间
    field :end_time, :utc_datetime    #结束时间

    belongs_to :app, Acs.App, type: :string
    belongs_to :user, Acs.User, type: :integer

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:id, :name, :description, :price, :currency, :postage, :pic, :stock, :sold, :reads, :active, :is_virtual, :begin_time, :end_time, :app_id, :user_id])
    |> validate_required([:id, :name, :description, :price, :postage, :begin_time, :end_time, :app_id, :user_id])
    |> foreign_key_constraint(:app_id)
    |> foreign_key_constraint(:user_id)

  end

  def init_mapping() do
    unless Elasticsearch.is_type?("pointMall", "goods") do
      mapping = %{
        properties: %{
          id: %{type: :keyword},
          app_id: %{type: :keyword},
          name: %{type: :text, analyzer: :ik_smart},
          description:  %{type: :text, analyzer: :ik_smart},
          user_id: %{type: :integer},
          active: %{type: :boolean},
          inserted_at: %{type: :date}
        }
      }

      Elasticsearch.put_mapping(%{index: "pointMall", type: "goods", mapping: mapping, params: nil})
    end
  end
end
