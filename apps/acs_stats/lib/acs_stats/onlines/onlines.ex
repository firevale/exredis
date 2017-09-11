defmodule AcsStats.Onlines do
  @moduledoc """
  Acs keeps the contexts that define your domain
  and business logic.

  Contexts are also responsible for managing your data, regardless
  if it comes from the database, an external API or others.
  """

  require Exredis

  def add_online_user(node, app_id, platform, user_id) do 
    Exredis.setbit(key(node, app_id), user_id, 1)
    Exredis.setbit(key(node, app_id, platform), user_id, 1)
  end

  def remove_online_user(node, app_id, platform, user_id) do 
    Exredis.setbit(key(node, app_id), user_id, 0)
    Exredis.setbit(key(node, app_id, platform), user_id, 0)
  end

  def remove_online_node(node) do 
    for key <- Exredis.keys("acs.online_counter.*.#{node}") do 
      Exredis.del(key)
    end
  end

  def get_online_user_number(app_id) do
    for key <- Exredis.keys("acs.online_counter.#{app_id}.*") do 
      Exredis.bitcount(key)
    end |> Enum.sum()
  end
  def get_online_user_number(app_id, platform) do
    for key <- Exredis.keys("acs.ponline_counter.#{app_id}.#{platform}.*") do 
      Exredis.bitcount(key)
    end |> Enum.sum()
  end
  

  defp key(node, app_id) do 
    "acs.online_counter.#{app_id}.#{node}"
  end
  defp key(node, app_id, platform) do 
    "acs.ponline_counter.#{app_id}.#{platform}.#{node}"
  end

end
