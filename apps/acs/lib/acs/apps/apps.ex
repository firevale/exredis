defmodule Acs.Apps do
  @moduledoc """
  The Apps context.
  """

  import Ecto.Query, warn: false
  alias Acs.Repo


  alias Acs.Apps.App
  alias Acs.Apps.AppOrder

  alias Acs.Cache.CachedApp

  def get_app(app_id) do 
    CachedApp.get(app_id)
  end

  def update_app_order!(%AppOrder{} = order, attr) do 
    AppOrder.changeset(order, attr) |> Repo.update!
  end

  def list_undelivered_app_orders() do 
    query = from order in AppOrder,
      select: order,
      where: order.status == 2 and
            order.try_deliver_counter < 100 and
            order.inserted_at > ago(2, "week")

    Repo.all(query) 
  end
end
