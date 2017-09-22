defmodule Acs.Admin do
  @moduledoc """
  The Admin context.
  """

  import Ecto.Query, warn: false
  alias Acs.Repo
  use Utils.LogAlias

  alias Acs.AdminAuth
  alias Acs.Admin.AdminUser
  alias Acs.Admin.OpLog
  alias Acs.Admin.Setting

  alias Acs.Accounts.User
  alias Acs.Apps.App
  alias Acs.Apps

  alias Acs.Cache.CachedAdminSetting

  def add_admin_user(app_id, user_id, email, level) do 
    admin_user = Repo.get_by(AdminUser, app_id: app_id, user_id: user_id) || %AdminUser{}
    res = AdminUser.changeset(admin_user, %{
      app_id: app_id,
      user_id: user_id, 
      account_id: email,
      admin_level: level,
      active: true
    }) |> Repo.insert_or_update()
    
    AdminAuth.refresh_admin_ids()
    AdminAuth.refresh_admin_level(user_id, app_id)

    res
  end

  def delete_admin_user(app_id, admin_user_id) do 
    case Repo.get(AdminUser, admin_user_id) do 
      nil -> 
        {:error, :admin_user_not_exists}

      %AdminUser{} = admin_user ->
        res = AdminUser.changeset(admin_user, %{active: false}) |> Repo.update
        AdminAuth.refresh_admin_ids()
        AdminAuth.refresh_admin_level(admin_user.user_id, app_id)
        res
    end
  end

  def log_admin_operation(admin_user_id, app_id, operate_type, log) do
    OpLog.changeset(%OpLog{}, %{
      user_id: admin_user_id, 
      app_id: app_id, 
      operate_type: operate_type, 
      log: log  
    }) |> Repo.insert!
  end

  def list_app_admin_users(app_id) do 
    query = 
      from au in AdminUser,
        left_join: user in assoc(au, :user),
        select: map(au, [:id, :account_id, :admin_level, :app_id, :inserted_at,
                         user: [:id, :nickname, :mobile, :email] ]),
        where: not is_nil(au.app_id) and au.admin_level != 1 and au.app_id == ^app_id,
        where: au.active == true,
        order_by: [desc: au.inserted_at],
        preload: [user: user]

    Repo.all(query)    
  end

  def list_admin_apps(user_id) when is_integer(user_id) do 
    admin_level = AdminAuth.get_admin_level(user_id)
    
    query =  
      from app in App,
        order_by: [desc: app.inserted_at],
        where: app.active == true,
        select: map(app, [:id, :name, :icon])

    query =
      if admin_level > 1  do
        appids = Repo.all(
          from au in AdminUser,
            where: au.user_id == ^user_id,
            where: au.active == true,
            where: au.admin_level >= 1,
            select: au.app_id)

        where(query, [app], app.id in ^appids)
      else
        query
      end

    Repo.all(query)
  end

  def get_app_info(app_id) do
    app = Apps.get_fat_app(app_id)

    sdk_bindings = 
      app.sdk_bindings 
        |> Enum.map(fn(%{sdk: sdk} = x) ->
            binding = 
              Exsdks.generate_sdk_info(sdk) 
                |> Map.merge(x.binding |> Poison.encode!() |> Poison.decode!(keys: :atoms))
            Map.put(x, :binding, binding)
          end)

    Map.put(app, :sdk_bindings, sdk_bindings)    
  end

  def search_user(app_id, keyword) do 
    query = from au in AdminUser,
      select: au.user_id,
      where: au.admin_level == 1 or au.app_id == ^app_id,
      where: au.active == true

    admin_user_ids = Repo.all(query)

    query = from user in User,
            select: map(user, [:id, :nickname, :email, :mobile, :inserted_at]),
            where: not user.id in ^admin_user_ids,
            where: like(user.email, ^"%#{keyword}%") or like(user.mobile, ^"%#{keyword}%"),
            order_by: [desc: user.inserted_at]

    Repo.all(query)
  end

  def get_setting(app_id, setting_name) do
    case Repo.get_by(Setting, name: setting_name, app_id: app_id) do
      %Setting{} = setting ->
        {:ok, setting}
      _ ->
        nil
    end
  end

  def get_settings_by_group(nil, group), do: nil
  def get_settings_by_group(_ , nil), do: nil
  def get_settings_by_group(app_id, group) do
    query = from s in Setting,
             select: map(s, [:id, :name, :value, :group, :memo, :active, app: [:id]]),
             where: s.app_id == ^app_id and s.group == ^group,
             order_by: [{:desc, s.id}]
    Repo.all(query)
  end

  def delete_setting(app_id, setting_name) do
    case CachedAdminSetting.del(app_id, setting_name) do
      {:ok, _} ->
        :ok
      
      {:error, %{errors: errors}} ->
        {:error, errors}
    end
  end

  def add_setting(app_id, params) do
    with setting <- params |> Map.put("active", true) |> Map.put("name", params.setting_name) |> Map.put("value", params.setting_value) |> Map.put("app_id", app_id),
      {:ok, setting} <- Setting.changeset(%Setting{}, setting) |> Repo.insert
    do
      # add to redis
      CachedAdminSetting.get(app_id, params.setting_name)
      {:ok, setting}
    else
      nil -> :illegal
      {:error, %{errors: errors}} -> {:error, errors}
    end
  end

  def update_setting_by_name(app_id, params) do
    case get_setting(app_id, params["setting_name"]) do
      nil ->
        # add new
        setting = Map.put(params, "name", params["setting_name"]) |> Map.put("value", params["setting_value"]) |> Map.put("app_id", app_id)
        case Setting.changeset(%Setting{}, setting) |> Repo.insert do
          {:ok, _} ->
            CachedAdminSetting.refresh(app_id, params["setting_name"])
            {:addok, setting}
          {:error, %{errors: errors}} ->
            {:error, errors}
          _ ->
            :badrequest 
        end

      {:ok, setting} ->
        # update
        case Setting.changeset(setting, %{active: params["active"], value: params["setting_value"]}) |> Repo.update() do
          {:ok, _} ->
            CachedAdminSetting.refresh(app_id, params["setting_name"]) 
            {:updateok, setting}
          {:error, %{errors: errors}} ->
            {:error, errors}
        end
    end
  end

  def update_setting(setting_id, setting_value, active) do
    with %Setting{} = setting <- Repo.get(Setting, setting_id),
      {:ok, _} <- Setting.changeset(setting, %{active: active, value: setting_value}) |> Repo.update()
    do
      # refresh redis
      CachedAdminSetting.refresh(setting.app_id, setting.name)
      :ok
    else
      nil -> nil
      {:error, _} -> :error
    end
  end

end
