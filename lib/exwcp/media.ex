defmodule Exwcp.Media do
  @moduledoc """
  Media API. Only provide download at the moment.
  """

  import Exwcp.ApiFile

  def download(wcp_config = %{wcp_app_id: _, wcp_app_key: _}, media_id) do
    get(wcp_config, "media/get", media_id: media_id)
  end
end
