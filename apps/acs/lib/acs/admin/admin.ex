defmodule Acs.Admin do
  @moduledoc """
  The Admin context.
  """

  import Ecto.Query, warn: false
  alias Acs.Repo

  alias Acs.Admin.AdminUser
  alias Acs.Admin.OpLog

  def add_admin_user(app_id, user_id, email, level) do 
    admin_user = Repo.get_by(AdminUser, app_id: app_id, user_id: user_id) || %AdminUser{}
    AdminUser.changeset(admin_user, %{
      app_id: app_id,
      user_id: user_id, 
      account_id: email,
      level: level,
      active: true
    }) |> Repo.insert_or_update()
  end

  def delete_admin_user(app_id, user_id) do 
    case Repo.get_by(AdminUser, app_id: app_id, user_id: user_id) do 
      nil -> {:error, :admin_user_not_exists}
      %AdminUser{} = admin_user ->
        AdminUser.changeset(admin_user, %{active: false}) |> Repo.update
    end
  end

  def log_admin_operation(admin_user_id, app_id, operate_type, log) do
    OpLog.changeset(%OpLog{}, %{
      user_id: admin_user_id, 
      app_id: app_id, 
      operate_type: operate_type, 
      log: log  
    }) |> Repo.insert
  end

  def list_app_admin_users(app_id) do 
    query = 
      from au in AdminUser,
        left_join: user in assoc(au, :user),
        select: map(au, [:id, :account_id, :admin_level, :app_id, :inserted_at,
                         user: [:id, :nickname, :mobile, :email] ]),
        where: not is_nil(au.app_id) and au.admin_level != 1 and au.app_id == ^app_id,
        order_by: [desc: au.inserted_at],
        preload: [user: user]

    Repo.all(query)    
  end

  def list_admin_app_ids(user_id) when is_integer(user_id) do
    query = 
      from au in AdminUser,
        where: au.user_id == ^user_id,
        where: au.active == true,
        where: au.admin_level >= 1,
        select: au.app_id

    Repo.all(query)
  end


end
