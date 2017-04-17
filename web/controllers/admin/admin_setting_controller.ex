defmodule Acs.AdminSettingController do
  use Acs.Web, :controller

  alias Acs.AdminSetting
  alias Acs.RedisSetting

  # get setting
  def get_setting(conn, %{"setting_name" => setting_name}) do

    case Repo.get_by(AdminSetting, name: setting_name) do
      %AdminSetting{} = setting ->
        conn |> json(%{success: true, setting: setting})
      _ ->
        conn |> json(%{success: false, i18n_message: "admin.setting.notFound"})
    end
  end
  def get_setting(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # get setting from redis
  def get_setting_from_redis(conn, %{"setting_name" => setting_name}) do
    setting = RedisSetting.find(setting_name)
    conn |> json(%{success: true, setting: setting})
  end
  def get_setting_from_redis(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # get settings
  def get_settings_by_group(conn, %{"group" => group}) do
     query = from s in AdminSetting,
              where: s.group == ^group,
              order_by: [{:desc, s.id}]
      settings = Repo.all(query)

      conn |> json(%{success: true, settings: settings})
  end
  def get_settings_by_group(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # delete_setting
  def delete_setting(conn, %{"setting_name" => setting_name}) do
    case RedisSetting.del(setting_name) do
      {:ok, _} ->
        conn |> json(%{success: true, i18n_message: "admin.setting.deleteOk"})
      
      {:error, %{errors: errors}} ->
        conn |> json(%{success: false, message: translate_errors(errors)})
    end
  end
  def delete_setting(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # add setting
  def add_setting(conn, %{"setting_name" => setting_name, 
                        "setting_value" => setting_value,
                        "group" => group} = params) do
    with setting <- params |> Map.put("active", true) |> Map.put("name", setting_name) |> Map.put("value", setting_value),
      {:ok, setting} <- AdminSetting.changeset(%AdminSetting{}, setting) |> Repo.insert
    do
      # add to redis
      RedisSetting.find(setting_name)

      conn |> json(%{success: true, setting: setting})
    else
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.illegal"})
      {:error, %{errors: errors}} ->
        conn |> json(%{success: false, i18n_message: translate_errors(errors)})
    end
  end
  def add_setting(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # update setting
  def update_setting_by_name(conn, %{"setting_name" => setting_name,
                            "setting_value" => setting_value,
                            "group" => group,
                            "active" => active} = setting) do
    case Repo.get_by(AdminSetting, name: setting_name) do
      nil ->
        # add new
        setting = setting |> Map.put("name", setting_name) |> Map.put("value", setting_value)
        case AdminSetting.changeset(%AdminSetting{}, setting) |> Repo.insert do
          {:ok, _} ->
            RedisSetting.refresh(setting_name)
            conn |> json(%{success: true, setting: setting, i18n_message: "admin.setting.addOk"})
          {:error, %{errors: errors}} ->
            conn |> json(%{success: false, i18n_message: translate_errors(errors)})
          _ -> 
            conn |> json(%{success: false, i18n_message: "error.server.networkError"})
        end

      %AdminSetting{} = setting ->
        # update
        case AdminSetting.changeset(setting,%{active: active, value: setting_value}) |> Repo.update() do
          {:ok, _} ->
            RedisSetting.refresh(setting_name) 
            conn |> json(%{success: true, setting: setting, i18n_message: "admin.setting.updateOk"})
          {:error, %{errors: errors}} ->
            conn |> json(%{success: false, i18n_message: translate_errors(errors)})
        end
    end
  end
  def update_setting_by_name(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end
  def update_setting(conn, %{"setting_id" => setting_id,
                            "setting_value" => setting_value,
                            "active" => active} = setting) do

    with %AdminSetting{} = setting <- Repo.get(AdminSetting, setting_id),
      {:ok, _} <- AdminSetting.changeset(setting,%{active: active, value: setting_value}) |> Repo.update()
    do
      # refresh redis
      RedisSetting.refresh(setting.name)

      conn |> json(%{success: true, i18n_message: "admin.setting.updateOk"})
    else
      nil ->
        conn |> json(%{success: false, i18n_message: "admin.setting.notFound"})
      {:error, _} ->
        conn |> json(%{success: false, i18n_message: "error.server.networkError"})
    end
  end
  def update_setting(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

end
