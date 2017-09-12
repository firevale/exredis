defmodule AcsWeb.AdminWcpController do
  use AcsWeb, :controller

  # add_wcp_empty_params
  def add_wcp_empty_params(conn, %{"app_id" => app_id} = wcpParams) do
    case Repo.get(App, app_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.appNotFound"})

      %App{} ->
        case Repo.get_by(AppWcpConfig, app_id: app_id) do
          nil ->
            # add new
            case AppWcpConfig.changeset(%AppWcpConfig{}, wcpParams) |> Repo.insert do
              {:ok, new_wcp} ->
                CachedAppWcpConfig.refresh(app_id)
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
  def update_wcp_params(%Plug.Conn{private: %{acs_admin_id: acs_admin_id}} = conn, %{"app_id" => app_id} = wcpParams) do
    case Repo.get_by(AppWcpConfig, app_id: app_id) do
      %AppWcpConfig{} = config ->
        # update
        changed = AppWcpConfig.changeset(config, wcpParams)
        case changed |> Repo.update do
          {:ok, new_wcp} ->
            AdminController.add_operate_log(acs_admin_id, app_id, "update_wcp_params", changed.changes)
            CachedAppWcpConfig.refresh(app_id)
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
  def update_wcp_menus(%Plug.Conn{private: %{acs_admin_id: acs_admin_id}} = conn, %{"app_id" => app_id, "menu" => menu}) do
    case Repo.get_by(AppWcpConfig, app_id: app_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.configNotFound"})

      %AppWcpConfig{} = config ->
        case AppWcpConfig.changeset(config, %{menu: menu}) |> Repo.update do
          {:ok, new_wcp} ->
            AdminController.add_operate_log(acs_admin_id, app_id, "update_wcp_menus", %{menu: menu})
            CachedAppWcpConfig.refresh(app_id)
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
  def get_message_list(conn, %{"app_id" => app_id, "keyword" => keyword, "sorts" => sorts, "page" => page, "records_per_page" => records_per_page}) do
    build_sort =
      fn (key, exp) ->
        order_by = Map.get(sorts,key)
        Map.put_new(exp, key, %{order: order_by})
      end
    sort = Enum.reduce(Map.keys(sorts), Map.new, build_sort)

    query = %{
      query: %{
        bool: %{
          must: [ %{term: %{app_id: app_id}}, %{exists: %{field: "from.id"}}],
          should: [],
          minimum_should_match: 0,
          boost: 1.0,
        },
      },
      sort: sort,
      from: (page - 1) * records_per_page,
      size: records_per_page,
    }

    query =
      if String.length(keyword)>0 do
        query1 = update_in(query.query.bool.minimum_should_match, fn _v -> 1 end)
        update_in(query1.query.bool.should, fn should ->
          condition =
            [
              %{match: %{content: keyword}},
              %{term: %{"from.openid": keyword}},
              %{match: %{"from.nickname": keyword}},
              %{match: %{"to.nickname": keyword}},
              %{term: %{"to.openid": keyword}}
            ]
          should ++ condition
        end)
      else
        query
      end

    case Search.search_wcp_message(query) do
      {:ok, total, messages} ->
        total_page = round(Float.ceil(total/records_per_page))
        json(conn, %{success: true, messages: messages, total: total_page})
      _ ->
        json(conn, %{success: false})
    end
  end
  def get_message_list(conn, _params) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  defp _fetch_wcp_user(app_id, open_id) do
    if String.starts_with?(open_id, "gh_") do
      %{openid: app_id, nickname: "系统" }
    else
      CachedAppWcpUser.get(app_id, open_id)
    end
  end
  def import_message_list() do
    max_id = Repo.one!( from msg in AppWcpMessage, select: max(msg.id))
    Enum.map_every(0..max_id, 100, fn current_id ->
      query = 
        from msg in AppWcpMessage,
          select: %{app_id: msg.app_id, from: msg.from, to: msg.to, inserted_at: msg.inserted_at, msg_type: msg.msg_type, content: msg.content},
          limit: 100,
          where: msg.id >= ^current_id,
          order_by: [msg.id]

       messages = Repo.all(query)
       d "正在导入 ID:#{current_id}"
       if messages && messages != [] do
        Enum.map(messages, fn msg ->
          from = _fetch_wcp_user(msg.app_id, msg.from)
          to = _fetch_wcp_user(msg.app_id, msg.to)
          ESWcpMessage.index(%{
            from: from,
            to: to,
            msg_type: msg.msg_type,
            content: msg.content,
            inserted_at: msg.inserted_at,
            app_id: msg.app_id})
        end)
       end
    end)
  end


  def get_user_message_list(conn, %{"app_id" => app_id,  "open_id" => open_id}) do
    query = %{
      query: %{
        bool: %{
          must: %{term: %{app_id: app_id}},
          should: [
            %{term: %{"from.openid": open_id}},
            %{term: %{"to.openid": open_id}}
          ],
          minimum_should_match: 1,
          boost: 1.0,
        },
      },
      sort: %{inserted_at: %{order: :asc}},
      size: 10000,
    }

    case Search.search_wcp_message(query) do
      {:ok, _total, messages} ->
        json(conn, %{success: true, messages: messages})
      _ ->
        json(conn, %{success: false})
    end
  end

  def reply_user_message(%Plug.Conn{private: %{acs_admin_id: acs_admin_id}} = conn,
                          %{"app_id" => app_id,  "open_id" => open_id, "content" => content}) do
    admin_user = CachedUser.get(acs_admin_id) |> Map.take([:nickname, :age, :email])
    case Repo.get_by(AppWcpUser, app_id: app_id, openid: open_id) do
      %AppWcpUser{} = wcp_user ->
        resp = Exwcp.Message.Custom.send_text(app_id, open_id, content)
        case resp do
          %{errcode: 0, errmsg: "ok"} ->
            message = %{
              admin_user: admin_user,
              from: %{openid: "#", nickname: "系统"},
              to: wcp_user,
              msg_type: "text",
              content: content,
              inserted_at: Ecto.DateTime.utc,
              app_id: app_id
             }
            ESWcpMessage.index(message)
            json(conn, %{success: true, message: message})
          %{} = err ->
            json(conn, %{success: false, message: err})
        end
      _ ->
        json(conn, %{success: false, message: "wcp_user不存在"})
    end
  end

  # delete_wcp_message
  def delete_wcp_message(%Plug.Conn{private: %{acs_admin_id: acs_admin_id, acs_app_id: app_id}} = conn, %{"message_id" => message_id} = params) do
    case Repo.get(AppWcpMessage, message_id) do
      %AppWcpMessage{} = message ->
        case Repo.delete(message) do
          {:ok, _} ->
            AdminController.add_operate_log(acs_admin_id, app_id, "delete_wcp_message", params)
            conn |> json(%{success: true})

          {:error, %{errors: errors}} ->
            conn |> json(%{success: false, message: translate_errors(errors)})
        end
      _ ->
        conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
    end
  end
  def delete_wcp_message(conn, _params) do
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
  def update_wcp_message_rule(%Plug.Conn{private: %{acs_admin_id: acs_admin_id}} = conn, %{"app_id" => app_id, "keywords" => keywords, "response" => _response} = rule) do
    d "rule: #{inspect rule, pretty: true}"
    case Repo.get(App, app_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.appNotFound"})

      %App{} ->
        case Repo.get_by(AppWcpMessageRule, %{app_id: app_id, keywords: keywords}) do
          nil ->
            # add new
            case AppWcpMessageRule.changeset(%AppWcpMessageRule{}, rule) |> Repo.insert do
              {:ok, new_rule} ->
                AdminController.add_operate_log(acs_admin_id, app_id, "update_wcp_message_rule", rule)
                CachedAppWcpMessageRule.refresh(app_id)
                conn |> json(%{success: true, rule: new_rule})

              {:error, %{errors: errors}} ->
                conn |> json(%{success: false, message: translate_errors(errors)})
            end

          %AppWcpMessageRule{} = msgrule ->
            # update
            changed = AppWcpMessageRule.changeset(msgrule, rule)
            case changed |> Repo.update do
              {:ok, new_rule} ->
                AdminController.add_operate_log(acs_admin_id, app_id, "update_wcp_message_rule", changed.changes)
                CachedAppWcpMessageRule.refresh(app_id)
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
  def delete_wcp_message_rule(%Plug.Conn{private: %{acs_admin_id: acs_admin_id, acs_app_id: app_id}} = conn, %{"rule_id" => rule_id} = params) do
    case Repo.get(AppWcpMessageRule, rule_id) do
      %AppWcpMessageRule{} = rule ->
        case Repo.delete(rule) do
          {:ok, _} ->
            AdminController.add_operate_log(acs_admin_id, app_id, "delete_wcp_message_rule", params)
            CachedAppWcpMessageRule.refresh(rule.app_id)
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
    case Repo.get_by(AppWcpConfig, app_id: app_id) do
      %AppWcpConfig{} = config ->
        case DeployUploadedFile.deploy_wcp_file(from: file_path, filename: filename) do
          {:ok, filename} ->
            AppWcpConfig.changeset(config, %{verify_File: filename}) |> Repo.update!
            AdminController.add_operate_log(acs_admin_id, app_id, "upload_wcp_file", %{verify_File: filename})
            conn |> json(%{success: true, filename: filename})

          {:error, errinfo} ->
            conn |> json(%{success: false, errinfo: errinfo})
        end

      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.configNotFound"})
    end
  end

  def get_wcp_menu(conn, %{"app_id" => app_id}) do
    case Repo.get_by(AppWcpConfig, app_id: app_id) do
      %AppWcpConfig{} = config ->
        result = Menu.get(app_id)
        if(result.menu) do
          AppWcpConfig.changeset(config, %{menu: result.menu}) |> Repo.update!
          conn |> json(%{success: true, menu: result.menu})
        else
          conn |> json(%{success: false, message: result})
        end

      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.configNotFound"})
    end
  end

  def update_wcp_menu(%Plug.Conn{private: %{acs_admin_id: acs_admin_id}} = conn, %{"app_id" => app_id, "menu" => menu}) do
    case Repo.get_by(AppWcpConfig, app_id: app_id) do
      %AppWcpConfig{} = config ->
        result = Menu.create(app_id, menu)
        if(result.errcode == 0) do
          AppWcpConfig.changeset(config, %{menu: menu}) |> Repo.update!
          AdminController.add_operate_log(acs_admin_id, app_id, "update_wcp_menu", %{menu: menu})
          conn |> json(%{success: true, result: result})
        else
          conn |> json(%{success: false, message: result.errmsg})
        end

      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.configNotFound"})
    end
  end

end