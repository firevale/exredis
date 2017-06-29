defmodule Wcp.Media do
  @moduledoc """
  Media API. Only provide download at the moment.
  """

  import Wcp.ApiFile

  def download(media_id) do
    get "media/get", media_id: media_id
  end
end
