defmodule Acs.Admin do
  @moduledoc """
  The Admin context.
  """

  import Ecto.Query, warn: false
  alias Acs.Repo

  alias Acs.AdminAuth
  alias Acs.Admin.AdminUser
  alias Acs.Admin.OpLog

  alias Acs.Accounts.User
  alias Acs.Apps.App
  alias Acs.Apps

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
        appids = 
          from au in AdminUser,
            where: au.user_id == ^user_id,
            where: au.active == true,
            where: au.admin_level >= 1,
            select: au.app_id

        where(query, [app], app.id in ^subquery(appids))
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


end
