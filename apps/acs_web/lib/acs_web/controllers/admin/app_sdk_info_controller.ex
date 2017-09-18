defmodule AcsWeb.Admin.AppSdkInfoController do
  use AcsWeb, :controller
  require Exsdks
  alias Acs.Admin

  def generate_dummy_sdk_info(conn, %{"sdk" => sdk}) do 
    conn |> json(%{success: true, binding: Exsdks.generate_sdk_info(sdk)})
  end

  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "facebook", 
                                  "binding" => %{"app_id" => _, "app_secret" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "facebook", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "ggplay", 
                                  "binding" => %{"key" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "ggplay", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "ndcom", 
                                  "binding" => %{"app_id" => _, "app_key" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "ndcom", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "itools", 
                                  "binding" => %{"app_id" => _, "app_key" => _, "rsa_key" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "itools", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "cc", 
                                  "binding" => %{"app_id" => _, "app_key" => _, "pay_key" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "cc", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "tbt", 
                                  "binding" => %{"app_id" => _, "app_key" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "tbt", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "pp", 
                                  "binding" => %{"app_id" => _, "app_key" => _, "pay_key" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "pp", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "xy", 
                                  "binding" => %{"app_id" => _, "app_key" => _, "pay_key" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "xy", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "ky", 
                                  "binding" => %{"app_id" => _, "app_key" => _, "md5_key" => _, "rsa_key" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "ky", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "yyh", 
                                  "binding" => %{"app_id" => _, "app_key" => _, "pay_id" => _, "pay_key" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "yyh", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "i4", 
                                  "binding" => %{"app_id" => _, "app_key" => _, "rsa_key" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "i4", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "haima", 
                                  "binding" => %{"app_id" => _, "app_key" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "haima", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "iiapple", 
                                  "binding" => %{"app_id" => _, "app_key" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "iiapple", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "baidu", 
                                  "binding" => %{"app_id" => _, "app_key" => _, "app_secret" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "baidu", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "oppo", 
                                  "binding" => %{"app_id" => _, "app_key" => _, "app_secret" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "oppo", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "downjoy", 
                                  "binding" => %{"app_id" => _, "app_key" => _, "app_secret" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "downjoy", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "qh360", 
                                  "binding" => %{"app_id" => _, "app_key" => _, "app_secret" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "qh360", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "uc", 
                                  "binding" => %{"app_id" => _, "app_key" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "uc", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "youku", 
                                  "binding" => %{"app_id" => _, "app_key" => _, "app_secret" => _, "pay_key" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "youku", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "anzhi", 
                                  "binding" => %{"app_key" => _, "app_secret" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "anzhi", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "gfan", 
                                  "binding" => %{"app_uid" => _, "app_key" => _, "app_secret" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "gfan", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "huawei", 
                                  "binding" => %{"app_id" => _, "app_key" => _, "pay_id" => _, "pay_pub_key" => _, "pay_priv_key" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "huawei", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "htc", 
                                  "binding" => %{"game_code" => _, "pub_key" => _, "priv_key" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "htc", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "iyouxi", 
                                  "binding" => %{"client_id" => _, "client_secret" => _, "app_key" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "iyouxi", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "coolpad", 
                                  "binding" => %{"app_id" => _, "app_key" => _, "pay_pub_key" => _, "pay_priv_key" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "coolpad", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "xiaomi", 
                                  "binding" => %{"app_id" => _, "app_key" => _, "app_secret" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "xiaomi", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "wdj", 
                                  "binding" => %{"app_id" => _, "app_key" => _, "rsa_key" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "wdj", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "mumayi", 
                                  "binding" => %{"app_id" => _, "app_key" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "mumayi", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "lenovo", 
                                  "binding" => %{"app_id" => _, "app_key" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "lenovo", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "meizu", 
                                  "binding" => %{"app_id" => _, "app_key" => _, "app_secret" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "meizu", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "vivo", 
                                  "binding" => %{"app_id" => _, "cp_id" => _, "cp_key" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "vivo", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "sogou", 
                                  "binding" => %{"app_id" => _, "app_key" => _, "app_secret" => _, "pay_key" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "sogou", binding)
  end
  def update_app_sdk_info(conn, %{"app_id" => app_id, 
                                  "sdk" => "wechat", 
                                  "binding" => %{"partnerid" => _, "app_id" => _, "app_secret" => _, "signature" => _, "package_name" => _, "sign_key" => _} = binding}) do 
    _update_app_sdk_info(conn, app_id, "wechat", binding)
  end
  def update_app_sdk_info(conn, _params) do 
    conn |> send_resp(500, "bad request") |> halt 
  end

  defp _update_app_sdk_info(%Plug.Conn{private: %{acs_admin_id: acs_admin_id}} = conn, app_id, sdk, binding) do 
    case Apps.get_app_sdk_binding(app_id, sdk) do 
      nil ->
        case Apps.add_app_sdk_binding(app_id, sdk, binding) do 
          {:ok, sdk_binding} ->
            Admin.log_admin_operation(acs_admin_id, app_id, "add_app_sdk_info", %{sdk: sdk, binding: sdk_binding})
            conn |> json(%{success: true, binding: binding})

          {:error, %{errors: errors}} ->
            conn |> json(%{success: false, message: translate_errors(errors)})
        end

      sdk_binding ->
        case Apps.update_app_sdk_binding(sdk_binding, %{binding: binding}) do 
          {:ok, sdk_binding} ->
            Admin.log_admin_operation(acs_admin_id, app_id, "update_app_sdk_info", %{sdk: sdk, binding: sdk_binding})
            conn |> json(%{success: true, binding: binding})

          {:error, %{errors: errors}} ->
            conn |> json(%{success: false, message: translate_errors(errors)})
        end
    end
  end

end