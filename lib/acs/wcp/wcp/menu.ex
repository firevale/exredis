defmodule Wcp.Menu do
  @moduledoc """
  User API.
  """

  import Wcp.ApiBase
  require Poison
  use LogAlias

  def create(app_id, menu) when is_map(menu) do
    post(app_id, "menu/create", menu)
  end

  def get(app_id) do
    get(app_id, "menu/get")
  end

  def delete(app_id) do
    get(app_id, "menu/delete") 
  end

end
