defmodule Acs.Apps do
  @moduledoc """
  The Apps context.
  """

  import Ecto.Query, warn: false
  alias Acs.Repo


  alias Acs.Apps.App
  alias Acs.Apps.AppOrder

  alias Acs.Forums
  alias Acs.Forums.Forum

  alias Acs.Malls
  alias Acs.Malls.Mall

  alias Acs.PMalls
  alias Acs.PMalls.PMall

  alias Acs.Cache.CachedApp

  def get_app(app_id) do 
    CachedApp.get(app_id)
  end

  def get_fat_app(app_id) do 
    CachedApp.get_fat(app_id)
  end

  def create_app(attr) do 
    cs = App.changeset(%App{}, attr)  

    case Repo.insert(cs) do
      {:ok, app} ->
        CachedApp.refresh(app.id)
        update_app_features!(app)
        {:ok, app, cs}

      v -> v
    end    
  end

  def update_app(%App{} = app, attr) do 
    cs = App.changeset(%App{}, attr)  
    case Repo.update(cs) do
      {:ok, app} ->
        CachedApp.refresh(app.id)
        update_app_features!(app)
        {:ok, app, cs}

      v -> v
    end    
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

  defp update_app_features!(app) do
    update_app_forum!(app)  
    update_app_mall!(app)
  end

  defp update_app_forum!(%{id: app_id, alias: forum_id, has_forum: true} = app) when is_bitstring(forum_id) do 
    case Forums.get_app_forum(app_id) do 
      nil ->
        Forums.create_forum!(forum_id, app.name || app.forum_name, app_id)

      %Forum{app_id: ^app_id} -> 
        Forums.update_forum(forum_id, %{id: forum_id, active: true})
    end
  end
  defp update_app_forum!(%{id: app_id, alias: forum_id, has_forum: false} = app) do 
    case Forums.get_app_forum(app_id) do 
      nil ->
        :do_nothing

      %Forum{app_id: ^app_id} -> 
        Forums.update_forum(forum_id, %{id: forum_id, active: false})
    end
  end

  defp update_app_mall!(%{id: app_id, alias: mall_id, has_mall: true} = app) when is_bitstring(mall_id) do 

  end
end
