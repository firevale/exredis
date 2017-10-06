defmodule Acs.Wcp do
  @moduledoc """
  The Wcp context.
  """

  import Ecto.Query, warn: false
  alias Acs.Repo

  alias Acs.Wcp.AppWcpConfig
  alias Acs.Wcp.AppWcpUser
  alias Acs.Wcp.AppWcpMessageRule

  alias Acs.Cache.CachedAppWcpConfig 
  alias Acs.Cache.CachedAppWcpUser 
  alias Acs.Cache.CachedAppWcpMessageRule

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
    cs = AppWcpConfig.changeset(config, attr)  
    case Repo.update(cs) do
      {:ok, config} ->
        CachedAppWcpConfig.refresh(config)
        {:ok, config, cs}

      v -> v
    end    
  end

  def get_app_wcp_user(wcp_user_id) do 
    CachedAppWcpUser.get(wcp_user_id)
  end
  def get_app_wcp_user(app_id, openid: openid) do 
    if String.starts_with?(openid, "gh_") do
      %{openid: app_id, nickname: "系统" }
    else
      CachedAppWcpUser.get_by_openid(app_id, openid)
    end
  end
  def get_app_wcp_user(app_id, email: email) do 
    CachedAppWcpUser.get_by_email(app_id, email)
  end

  def create_app_wcp_user!(attr) do 
    wcp_user = AppWcpUser.changeset(%AppWcpUser{}, attr) 
      |> Repo.insert!(on_conflict: :replace_all)  
    CachedAppWcpUser.refresh(wcp_user)
  end

  def update_app_wcp_user!(%AppWcpUser{} = wcp_user, attr) do 
    new_wcp_user = AppWcpUser.changeset(wcp_user, attr) |> Repo.update!  
    CachedAppWcpUser.refresh(new_wcp_user)
  end

  def list_wcp_message_rules(app_id, page, records_per_page) do 
    total = Repo.one!(from rule in AppWcpMessageRule, 
      where: rule.app_id == ^app_id, 
      select: count(rule.id))

    total_page = round(Float.ceil(total / records_per_page))

    query = from rule in AppWcpMessageRule,
              select: rule,
              limit: ^records_per_page,
              where: rule.app_id == ^app_id,
              offset: ^((page - 1) * records_per_page),
              order_by: [desc: rule.inserted_at]

    {:ok, total_page, Repo.all(query)}
  end

  def get_wcp_message_rule(""), do: nil
  def get_wcp_message_rule(nil), do: nil
  def get_wcp_message_rule(rule_id) do 
    Repo.get(AppWcpMessageRule, rule_id)  
  end

  def create_wcp_message_rule(attr) do 
    cs = AppWcpMessageRule.changeset(%AppWcpMessageRule{}, attr)  
    case Repo.insert(cs) do
      {:ok, rule} ->
        CachedAppWcpMessageRule.refresh(rule.app_id)
        {:ok, rule, cs}

      v -> v
    end    
  end

  def update_wcp_message_rule(%AppWcpMessageRule{} = rule, attr) do 
    cs = AppWcpMessageRule.changeset(rule, attr)  
    case Repo.update(cs) do
      {:ok, new_rule} ->
        CachedAppWcpMessageRule.refresh(new_rule.app_id)
        {:ok, new_rule, cs}

      v -> v
    end    
  end

  def delete_wcp_message_rule(%AppWcpMessageRule{} = rule) do 
    result = Repo.delete(rule)
    CachedAppWcpMessageRule.refresh(rule.app_id)
    result
  end

end
