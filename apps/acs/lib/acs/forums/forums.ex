defmodule Acs.Forums do
  @moduledoc """
  The Forums context.
  """

  import Ecto.Query, warn: false
  alias Acs.Repo

  alias Acs.Cache.CachedForum
  alias Acs.Cache.CachedForumSection

  def get_forum(forum_id) do 
    CachedForum.get(forum_id)
  end

  def get_forum_section(forum_section_id) do 
    CachedForumSection.get(forum_section_id)
  end


end
