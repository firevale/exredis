defmodule Acs.Web.AdminWcpController do
  use Acs.Web, :controller

  alias Acs.AppWcpConfig
  alias Acs.AppWcpMessage
  alias Acs.AppWcpMessageRule
  alias Acs.RedisAppWcpConfig
  alias Acs.RedisAppWcpMessageRule
  import Acs.UploadImagePlugs 

  # add_wcp_empty_params
  def add_wcp_empty_params(conn, %{"app_id" => app_id} = wcpParams) do
    case Repo.get(App, app_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.appNotFound"})
      
      %App{} = app ->
        case Repo.get_by(AppWcpConfig, app_id: app_id) do
          nil ->
            # add new
            case AppWcpConfig.changeset(%AppWcpConfig{}, wcpParams) |> Repo.insert do
              {:ok, new_wcp} ->
                RedisAppWcpConfig.refresh(app_id)
                conn |> json(%{success: true, wcpconfig: new_wcp})

              {:error, %{errors: errors}} ->
                conn |> json(%{success: false, message: translate_errors(errors)})
            end

          %AppWcpConfig{} = config ->
            # do nothing
            conn |> json(%{success: true, wcpconfig: config})
        end
      
    end
  end
  def add_wcp_empty_params(conn, _params) do 
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # update_wcp_params
  def update_wcp_params(conn, %{"app_id" => app_id} = wcpParams) do
    case Repo.get_by(AppWcpConfig, app_id: app_id) do
      %AppWcpConfig{} = config ->
        # update
        case AppWcpConfig.changeset(config, wcpParams) |> Repo.update do
          {:ok, new_wcp} ->
            RedisAppWcpConfig.refresh(app_id)
            conn |> json(%{success: true, wcpconfig: new_wcp})

          {:error, %{errors: errors}} ->
            conn |> json(%{success: false, message: translate_errors(errors)})
        end
      
      _ -> 
        conn |> json(%{success: false, i18n_message: "error.server.configNotFound"})
    end
  end
  def update_wcp_params(conn, _params) do 
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # update_wcp_menus
  def update_wcp_menus(conn, %{"app_id" => app_id, "menu" => menu}) do
    case Repo.get_by(AppWcpConfig, app_id: app_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.configNotFound"})

      %AppWcpConfig{} = config ->
        case AppWcpConfig.changeset(config, %{menu: menu}) |> Repo.update do
          {:ok, new_wcp} ->
            RedisAppWcpConfig.refresh(app_id)
            conn |> json(%{success: true, wcpconfig: new_wcp})

          {:error, %{errors: errors}} ->
            conn |> json(%{success: false, message: translate_errors(errors)})
        end
    end
  end
  def update_wcp_menus(conn, _params) do 
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # get_message_list
  def get_message_list(conn, %{"app_id" => app_id, "page" => page, "records_per_page" => records_per_page}) do
    total = Repo.one!(from msg in AppWcpMessage, where: msg.app_id == ^app_id, select: count(msg.id))
    total_page = round(Float.ceil(total / records_per_page))

    query = from msg in AppWcpMessage,
              select: msg,
              limit: ^records_per_page,
              where: msg.app_id == ^app_id,
              offset: ^((page - 1) * records_per_page),
              order_by: [desc: msg.inserted_at]

    message = Repo.all(query)

    conn |> json(%{success: true, message: message, total: total_page})
  end
  def get_message_list(conn, _params) do 
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # get_rule_list
  def get_rule_list(conn, %{"app_id" => app_id, "page" => page, "records_per_page" => records_per_page}) do
    total = Repo.one!(from msg in AppWcpMessageRule, where: msg.app_id == ^app_id, select: count(msg.id))
    total_page = round(Float.ceil(total / records_per_page))

    query = from msg in AppWcpMessageRule,
              select: msg,
              limit: ^records_per_page,
              where: msg.app_id == ^app_id,
              offset: ^((page - 1) * records_per_page),
              order_by: [desc: msg.inserted_at]

    rules = Repo.all(query)

    conn |> json(%{success: true, rules: rules, total: total_page})
  end
  def get_rule_list(conn, _params) do 
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # update_wcp_message_rule
  def update_wcp_message_rule(conn, %{"app_id" => app_id, "keywords" => keywords, "response" => response} = rule) do
    case Repo.get(App, app_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.appNotFound"})

      %App{} = app ->
        case Repo.get_by(AppWcpMessageRule, %{app_id: app_id, keywords: keywords}) do
          nil ->
            # add new
            case AppWcpMessageRule.changeset(%AppWcpMessageRule{}, rule) |> Repo.insert do
              {:ok, new_rule} ->
                RedisAppWcpMessageRule.refresh(app_id)
                conn |> json(%{success: true, rule: new_rule})

              {:error, %{errors: errors}} ->
                conn |> json(%{success: false, message: translate_errors(errors)})
            end

          %AppWcpMessageRule{} = msgrule ->
            # update
            case AppWcpMessageRule.changeset(msgrule, rule) |> Repo.update do
              {:ok, new_rule} ->
                RedisAppWcpMessageRule.refresh(app_id)
                conn |> json(%{success: true, rule: new_rule})

              {:error, %{errors: errors}} ->
                conn |> json(%{success: false, message: translate_errors(errors)})
            end
        end
    end
  end
  def update_wcp_message_rule(conn, _params) do 
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # delete_wcp_message_rule
  def delete_wcp_message_rule(conn, %{"rule_id" => rule_id}) do
    case Repo.get(AppWcpMessageRule, rule_id) do
      %AppWcpMessageRule{} = rule ->
        case Repo.delete(rule) do
          {:ok, _} ->
            RedisAppWcpMessageRule.refresh(rule.app_id)
            conn |> json(%{success: true})

          {:error, %{errors: errors}} ->
            conn |> json(%{success: false, message: translate_errors(errors)})
        end
      _ ->
        conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
    end
  end
  def delete_wcp_message_rule(conn, _params) do 
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  plug :check_upload_image, [
    param_name: "file", 
    format: ["jpg", "jpeg", "png"],
    reformat: "jpeg"] when action in [:upload_wcp_image]
  plug :convert_base64_image, [param_name: "file"] when action in [:upload_wcp_image]
  def upload_wcp_image(conn, %{"app_id" => app_id, "file" => %{path: image_file_path}}) do
    {:ok, image_path, width, height} = 
      Utils.deploy_image_file_return_size(from: image_file_path, 
        to: "wcp/#{app_id}/", 
        low_quality: true)
    conn |> json(%{success: true, app_id: app_id, link: image_path, width: width, height: height})
  end
  def upload_wcp_image(conn, _params) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end  

  def upload_wcp_file(conn, %{"app_id" => app_id, "file" => %{path: file_path, filename: filename}}) do
    case Repo.get_by(AppWcpConfig, app_id: app_id) do
      %AppWcpConfig{} = config ->
        case Utils.deploy_wcp_file(from: file_path, filename: filename) do
          {:ok, filename} ->
            AppWcpConfig.changeset(config, %{verify_File: filename}) |> Repo.update!
            conn |> json(%{success: true, filename: filename})
          
          {:error, errinfo} ->
            conn |> json(%{success: false, errinfo: errinfo})
        end 

      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.configNotFound"})
    end
  end  

end
