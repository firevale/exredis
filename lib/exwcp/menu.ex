defmodule Exwcp.Menu do
  @moduledoc """
  User API.
  """

  import Exwcp.ApiBase
  require Poison

  def create(wcp_config = %{wcp_app_id: _, wcp_app_key: _}, menu) when is_map(menu) do
    post(wcp_config, "menu/create", menu)
  end

  def get(wcp_config = %{wcp_app_id: _, wcp_app_key: _}) do
    get(wcp_config, "menu/get")
  end

  def delete(wcp_config = %{wcp_app_id: _, wcp_app_key: _}) do
    get(wcp_config, "menu/delete") 
  end

end
