defmodule AcsWeb.Admin.WcpController do
  use AcsWeb, :controller

  alias Acs.Admin
  alias Acs.Wcp
  alias Acs.Apps
  alias Acs.Accounts

  alias Acs.Apps.App
  alias Acs.Wcp.AppWcpConfig

  # create_app_wcp_config
  def create_app_wcp_config(%Plug.Conn{private: %{acs_admin_id: acs_admin_id}} = conn, %{"app_id" => app_id} = wcpParams) do
    case Apps.get_app(app_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.appNotFound"})

      %App{} ->
        case Wcp.get_app_wcp_config(app_id) do
          nil ->
            case Wcp.create_app_wcp_config(wcpParams) do 
              {:ok, wcp_config, changeset} ->
                Admin.log_admin_operation(acs_admin_id, app_id, "create_app_wcp_config", changeset.changes)
                conn |> json(%{success: true, wcpconfig: wcp_config})

              {:error, %{errors: errors}} ->
                conn |> json(%{success: false, message: translate_errors(errors)})
            end

          %AppWcpConfig{} = config ->
            conn |> json(%{success: true, wcpconfig: config})
        end
    end
  end
  def create_app_wcp_config(conn, _params) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # update_app_wcp_config
  def update_app_wcp_config(%Plug.Conn{private: %{acs_admin_id: acs_admin_id}} = conn, %{"app_id" => app_id} = wcpParams) do
    case Wcp.get_app_wcp_config(app_id) do
      %AppWcpConfig{} = config ->
        case Wcp.update_app_wcp_config(config, wcpParams) do 
          {:ok, wcp_config, changeset} -> 
            Admin.log_admin_operation(acs_admin_id, app_id, "update_app_wcp_config", changeset.changes)
            conn |> json(%{success: true, wcpconfig: wcp_config})

          {:error, %{errors: errors}} ->
            conn |> json(%{success: false, message: translate_errors(errors)})
        end

      _ ->
        conn |> json(%{success: false, i18n_message: "error.server.configNotFound"})
    end
  end
  def update_app_wcp_config(conn, _params) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # list_wcp_user_messages
  def list_wcp_user_messages(conn, %{"app_id" => app_id, "keyword" => keyword, "sorts" => sorts, "page" => page, "records_per_page" => records_per_page}) do
    case Search.search_wcp_message(keyword: keyword, app_id: app_id, sorts: sorts, page: page, records_per_page: records_per_page) do
      {:ok, total, messages} ->
        total_page = round(Float.ceil(total/records_per_page))
        json(conn, %{success: true, messages: messages, total: total_page})
      _ ->
        json(conn, %{success: false})
    end
  end
  def list_wcp_user_messages(conn, _params) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  def list_user_wcp_messages(conn, %{"app_id" => app_id,  "open_id" => open_id}) do
    case Search.search_user_wcp_message(app_id: app_id, openid: open_id) do
      {:ok, _total, messages} ->
        json(conn, %{success: true, messages: messages})
      _ ->
        json(conn, %{success: false})
    end
  end

  def reply_user_wcp_message(%Plug.Conn{private: %{acs_admin_id: acs_admin_id}} = conn,
                          %{"app_id" => app_id,  "open_id" => open_id, "content" => content}) do

    admin_user = Accounts.get_user(acs_admin_id) |> Map.take([:nickname, :age, :email])
    
    with config = %AppWcpConfig{} <- Wcp.get_app_wcp_config(app_id),
         wcp_user = %AppWcpUser{} <- Wcp.get_app_wcp_user(app_id, openid: open_id)
    do
      case Exwcp.Message.Custom.send_text(config, open_id, content) do
        %{errcode: 0, errmsg: "ok"} ->
          message = %{
            admin_user: admin_user,
            from: %{openid: "gh_#{acs_admin_id}", nickname: admin_user.email},
            to: wcp_user,
            msg_type: "text",
            content: content,
            inserted_at: Ecto.DateTime.utc,
            app_id: app_id
           }
          ESWcpMessage.index(message)
          conn |> json(%{success: true, message: message})
        %{} = err ->
          conn |> json(%{success: false, message: err})
      end
    else 
      _ ->
        conn |> json(%{success: false, message: "wcp_user不存在"})
    end
  end

  # list_wcp_message_rules
  def list_wcp_message_rules(conn, %{"app_id" => app_id, "page" => page, "records_per_page" => records_per_page}) do
    {:ok, total, rules} = Wcp.list_wcp_message_rules(app_id, page, records_per_page)
    total_page = round(Float.ceil(total / records_per_page))
    conn |> json(%{success: true, rules: rules, total: total_page})
  end
  def list_wcp_message_rules(conn, _params) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # update_wcp_message_rule
  def update_wcp_message_rule(%Plug.Conn{private: %{acs_admin_id: acs_admin_id}} = conn, 
    %{"id" => rule_id, "app_id" => app_id, "keywords" => _keywords, "response" => _response} = rule) do
    d "rule: #{inspect rule, pretty: true}"
    case Apps.get_app(app_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.appNotFound"})

      %App{} ->
        case Wcp.get_wcp_message_rule(rule_id) do
          nil ->
            case Wcp.create_wcp_message_rule(rule) do 
              {:ok, rule, _changeset} -> 
                Admin.log_admin_operation(acs_admin_id, app_id, "add_wcp_message_rule", rule)
                conn |> json(%{success: true, rule: rule})

              {:error, %{errors: errors}} ->
                conn |> json(%{success: false, message: translate_errors(errors)})
            end

          %AppWcpMessageRule{} = msgrule ->
            case Wcp.update_wcp_message_rule(msgrule, rule) do 
              {:ok, new_rule, changeset} ->
                Admin.log_admin_operation(acs_admin_id, app_id, "update_wcp_message_rule", changeset.changes)
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
  def delete_wcp_message_rule(%Plug.Conn{private: %{acs_admin_id: acs_admin_id, acs_app_id: app_id}} = conn, %{"rule_id" => rule_id}) do
    case Wcp.get_wcp_message_rule(rule_id) do
      %AppWcpMessageRule{} = rule ->
        case Wcp.delete_wcp_message_rule(rule) do
          {:ok, _} ->
            Admin.log_admin_operation(acs_admin_id, app_id, "delete_wcp_message_rule", rule)
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
      DeployUploadedFile.deploy_image_file_return_size(from: image_file_path,
        to: "wcp/#{app_id}/",
        low_quality: true)
    conn |> json(%{success: true, app_id: app_id, link: image_path, width: width, height: height})
  end
  def upload_wcp_image(conn, _params) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  def upload_wcp_file(%Plug.Conn{private: %{acs_admin_id: acs_admin_id}} = conn, %{"app_id" => app_id, "file" => %{path: file_path, filename: filename}}) do
    case Wcp.get_app_wcp_config(app_id) do
      %AppWcpConfig{} = config ->
        case DeployUploadedFile.deploy_wcp_file(from: file_path, filename: filename) do
          {:ok, filename} ->
            case Wcp.update_app_wcp_config(config, %{verify_File: filename}) do 
              {:ok, _config, _changeset} -> 
                Admin.log_admin_operation(acs_admin_id, app_id, "upload_wcp_file", %{verify_File: filename})
                conn |> json(%{success: true, filename: filename})
              
              {:error, %{errors: errors}} ->
                conn |> json(%{success: false, message: translate_errors(errors)})
            end

          {:error, errinfo} ->
            conn |> json(%{success: false, errinfo: errinfo})
        end

      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.configNotFound"})
    end
  end

  def get_wcp_menu(conn, %{"app_id" => app_id}) do
    case Wcp.get_app_wcp_config(app_id) do
      %AppWcpConfig{} = config ->
        result = Exwcp.Menu.get(config)
        if result.menu do
          Wcp.update_app_wcp_config(config, %{menu: result.menu})
          conn |> json(%{success: true, menu: result.menu})
        else
          conn |> json(%{success: false, message: result})
        end

      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.configNotFound"})
    end
  end

  def update_wcp_menu(%Plug.Conn{private: %{acs_admin_id: acs_admin_id}} = conn, %{"app_id" => app_id, "menu" => menu}) do
    case Wcp.get_app_wcp_config(app_id)  do
      %AppWcpConfig{} = config ->
        result = Exwcp.Menu.create(config, menu)

        if result.errcode == 0 do
          Wcp.update_app_wcp_config(config, %{menu: menu})
          Admin.log_admin_operation(acs_admin_id, app_id, "update_wcp_menu", %{menu: menu})
          conn |> json(%{success: true, result: result})
        else
          conn |> json(%{success: false, message: result.errmsg})
        end

      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.configNotFound"})
    end
  end

end