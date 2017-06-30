defmodule Wcp.Media do
  @moduledoc """
  Media API. Only provide download at the moment.
  """

  import Wcp.ApiFile

  def download(app_id, media_id) do
    get(app_id, "media/get", media_id: media_id)
  end
end
