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

  def log_admin_op(admin_user_id, app_id, operate_type, log) do
    OpLog.changeset(%OpLog{}, %{
      user_id: user_id, 
      app_id: app_id, 
      operate_type: operate_type, 
      log: log  
    }) |> Repo.insert
  end

end
