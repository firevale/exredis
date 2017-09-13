defmodule Acs.Wcp do
  @moduledoc """
  The Wcp context.
  """

  import Ecto.Query, warn: false
  alias Acs.Repo

  alias Acs.Wcp.AppWcpConfig

  alias Acs.Cache.CachedAppWcpConfig 
  alias Acs.Cache.CachedAppWcpUser 

  def get_app_wcp_config(app_id) do 
    CachedAppWcpConfig.get(app_id)
  end

  def create_app_wcp_config(attr) do 
    cs = AppWcpConfig.changeset(%AppWcpConfig{}, attr)  
    case Repo.insert(cs) do
      {:ok, config} ->
        CachedAppWcpConfig.refresh(config)
        {:ok, config, cs}

      v -> v
    end    
  end

  def update_app_wcp_config(%AppWcpConfig{} = config, attr) do 
    cs = AppWcpConfig.changeset(%AppWcpConfig{}, attr)  
    case Repo.update(cs) do
      {:ok, config} ->
        CachedAppWcpConfig.refresh(config)
        {:ok, config, cs}

      v -> v
    end    
  end

  def get_app_wcp_user(app_id, openid) do 
    if String.starts_with?(openid, "gh_") do
      %{openid: app_id, nickname: "系统" }
    else
      CachedAppWcpUser.get(app_id, openid)
    end
  end

end
