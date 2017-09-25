defmodule Acs.Repo.Migrations.CreatePmallLuckyDrawOrders do
  use Ecto.Migration

  def change do
    create table(:pmall_lucky_draw_orders) do

      add :name, :string, size: 200
      add :pic, :string, size: 200
      add :status, :integer, default: 0   #状态  -1已关闭 0待支付 1已支付 2待收货 3待确认 4已完成
      add :address, :map   #地址 json格式
      add :paid_at, :utc_datetime #支付时间
      add :deliver_at, :utc_datetime #递送时间
      add :close_at, :utc_datetime #关闭时间(手动／自动关闭)

      add :app_id, references(:apps, type: :string, on_delete: :delete_all), size: 40
      add :wcp_user_id, references(:app_wcp_users, on_delete: :nothing)
      add :lucky_draw_id, references(:pmall_lucky_draws, on_delete: :nothing)

      timestamps()
    end

    create index(:pmall_lucky_draw_orders, [:app_id])
    create index(:pmall_lucky_draw_orders, [:app_id, :wcp_user_id])
    create index(:pmall_lucky_draw_orders, [:app_id, :wcp_user_id, :lucky_draw_id])

  end
end
