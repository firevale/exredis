defmodule Acs.Malls do
  @moduledoc """
  The Malls context.
  """

  import Ecto.Query, warn: false
  alias Acs.Repo

  alias Acs.Malls.Mall
  alias Acs.Malls.MallOrder

  def get_order_info(order_id) do 
    query = 
      from o in MallOrder,
        left_join: details in assoc(o, :details),
        left_join: user in assoc(o, :user),
        left_join: op_logs in assoc(o, :op_logs),
        select: map(o, [:id, :goods_name, :status, :price, :final_price, :address, :currency, :paid_type, :transaction_id, :postage, :inserted_at, :snapshots,
          user: [:id, :nickname, :mobile, :email],
          details: [:id, :goods_name, :goods_pic, :price, :amount, :mall_goods_id],
          op_logs: [:id, :status, :changed_status, :content, :admin_user, :inserted_at] ]),
        where: o.id ==^order_id,
        preload: [user: user, details: details, op_logs: op_logs]

    Repo.one(query)
  end

end
