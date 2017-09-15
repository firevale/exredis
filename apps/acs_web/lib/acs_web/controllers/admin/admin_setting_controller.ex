defmodule AcsWeb.Admin.AdminSettingController do
  use AcsWeb, :controller

  # get setting
  def get_setting(conn, %{"setting_name" => setting_name}) do
    case Admin.get_setting(setting_name) do
      {:ok, setting} ->
        conn |> json(%{success: true, setting: setting})
      nil ->
        conn |> json(%{success: false, i18n_message: "admin.setting.notFound"})
    end
  end
  def get_setting(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # get setting from redis
  def get_setting_from_redis(conn, %{"setting_name" => setting_name}) do
    setting = CachedAdminSetting.get(setting_name)
    conn |> json(%{success: true, setting: setting})
  end
  def get_setting_from_redis(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # get settings
  def get_settings_by_group(conn, %{"group" => group}) do
      settings = Admin.get_settings_by_group(group)
      conn |> json(%{success: true, settings: settings})
  end
  def get_settings_by_group(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # delete_setting
  def delete_setting(conn, %{"setting_name" => setting_name}) do
    case Admin.delete_setting(setting_name) do
      :ok ->
        conn |> json(%{success: true, i18n_message: "admin.setting.deleteOk"})
      
      {:error, errors} ->
        conn |> json(%{success: false, message: translate_errors(errors)})
    end
  end
  def delete_setting(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # add setting
  def add_setting(conn, %{"setting_name" => _setting_name, 
                        "setting_value" => _setting_value,
                        "group" => _group} = params) do
    case Admin.add_setting(params) do
      {:ok, setting} ->
        conn |> json(%{success: true, setting: setting})
      :illegal ->
        conn |> json(%{success: false, i18n_message: "error.server.illegal"})
      {:error, errors} ->
        conn |> json(%{success: false, i18n_message: translate_errors(errors)})
    end
  end
  def add_setting(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # update setting
  def update_setting_by_name(conn, %{"setting_name" => _setting_name,
                            "setting_value" => _setting_value,
                            "group" => _group,
                            "active" => _active} = setting) do
    case Admin.update_setting_by_name(setting) do
      {:addok, setting} ->
        conn |> json(%{success: true, setting: setting, i18n_message: "admin.setting.addOk"})
      {:updateok, setting} ->
        conn |> json(%{success: true, setting: setting, i18n_message: "admin.setting.updateOk"})
      {:error, errors} ->
        conn |> json(%{success: false, i18n_message: translate_errors(errors)})
      :badrequest ->
        conn |> json(%{success: false, i18n_message: "error.server.networkError"})
    end
  end
  def update_setting_by_name(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end
  def update_setting(conn, %{"setting_id" => setting_id,
                            "setting_value" => setting_value,
                            "active" => active}) do
    case Admin.update_setting(setting_id, setting_value, active) do
      :ok ->
        conn |> json(%{success: true, i18n_message: "admin.setting.updateOk"})
      nil ->
        conn |> json(%{success: false, i18n_message: "admin.setting.notFound"})
      :error ->
        conn |> json(%{success: false, i18n_message: "error.server.networkError"})
    end
  end
  def update_setting(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

end
