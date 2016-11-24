defmodule Acs.SdkPay.AppOrderController do
  use    Acs.Web, :controller

  plug :fetch_app_id
  plug :fetch_app
  plug :fetch_user
  plug :create_order

  defp create_order(%Plug.Conn{private: %{acs_user: %RedisUser{} = user,
                                          acs_app: %RedisApp{} = app,
                                          acs_platform: platform,
                                          acs_device_id: device_id},
                               params: %{"cp_order_id" => cp_order_id} = params
                     } = conn, _options) do 
    case Repo.get_by(AppUser, app_id: app.id, user_id: user.id) do 
      nil ->
        Logger.error "can't find app user for app: #{app.id}, user_id: #{user.id}"
        conn |> send_resp(500, "server internal error") |> halt 

      %AppUser{} = appUser ->
        order_info = %{
          id: Utils.generate_token(16),
          app_id: app.id, 
          user_id: user.id, 
          platform: platform,
          app_user_id: appUser.id,
          device_id: device_id,
          sdk: params["sdk"] || "firevale",
          cp_order_id: cp_order_id, 
          status: AppOrder.Status.created,
          price: params["price_in_cent"],
          paid_channel: params["channel"],
          currency: app.currency,
          goods_name: params["product_name"] || params["product_id"] || params["goods_id"],
        }

        order_info = case params["goods_id"] do # Q传 wp8版本无此参数
                      nil -> order_info
                      goods_id ->
                        case Repo.get(AppGoods, goods_id) do 
                          nil -> order_info
                          %AppGoods{} = goods_info ->
                            %{order_info | goods_id: goods_id,
                                           goods_name: goods_info.name,
                                           price: goods_info.price
                            }
                        end
                    end                        
        
        {:ok, app_order} = AppOrder.changeset(%AppOrder{}, order_info) |> Repo.insert

        conn |> put_private(:acs_app_order, app_order)
    end    
  end
  defp create_order(%Plug.Conn{} = conn, _options) do 
    conn |> send_resp(400, "bad request") |> halt 
  end

  #vivo订单
  def add_vivo_order(%Plug.Conn{private: %{acs_app_order: app_order, acs_app: app}} = conn, params) do 
    case app.sdk_bindings.vivo do
      nil ->
        Logger.error "can't get app vivo binding info for app: #{inspect app, pretty: true}"
        conn |> json(%{success: false, message: "application vivo binding not set"})

      %{"app_id" => vivo_app_id, "cp_id" => vivo_cp_id, "cp_key" => vivo_cp_key} ->
        create_time = Timex.format!(Timex.local, "%Y%m%d%H%M%S", :strftime)        
        notify_url = params["notifyUrl"] || ""

        post_params = %{"version" => "1.0.0", 
                        "cpId" => vivo_cp_id, 
                        "appId" => vivo_app_id, 
                        "cpOrderNumber" => app_order.id, 
                        "notifyUrl" => notify_url,
                        "orderTime" => create_time, 
                        "orderAmount" => app_order.price |> to_string , 
                        "orderTitle" => app_order.goods_name,
                        "orderDesc" => app_order.goods_name, 
                        "extInfo" => app_order.id 
                        }

        sign_string = post_params |> Enum.sort  |> Enum.map_join("&", fn({k, v}) -> "#{k}=#{v}" end)
        vivo_cp_key_md5 = Utils.md5_sign(vivo_cp_key)
        sign = Utils.md5_sign(sign_string <> "&" <> vivo_cp_key_md5)
        post_params = Map.put(post_params, "signMethod", "MD5")
        post_params = Map.put(post_params, "signature", sign)
        
        try do 
          response = Httpc.post_msg("https://pay.vivo.com.cn/vcoin/trade", post_params)
          if Httpc.success?(response) do 
            resp_string = String.replace(response.body, "'", "\"")
            case JSON.decode(resp_string) do 
              {:ok, res} -> 
                if res["respCode"] == 200 || res["respCode"] == "200" do 
                  conn |> json(%{success: true, 
                                 order_id: app_order.id, 
                                 accessKey: res["accessKey"], 
                                 orderNumber: res["orderNumber"], 
                                 orderAmount: res["orderAmount"], 
                                 signature: res["signature"]})
                else
                  Logger.error "create vivo order failed, res: #{inspect res, pretty: true}"
                  conn |> json(%{success: false, message: "VIVO create order failed, respCode == #{res["respCode"]}"})
                end
              _ -> 
                Logger.error "create vivo order failed, res: #{resp_string}"
                conn |> json(%{success: false, message: "VIVO create order failed, respString == #{resp_string}"})
            end 
          else
            Logger.error "create vivo order failed, response: #{inspect response, pretty: true}"
            conn |> json(%{success: false, message: "http request VIVO create order failed"})
          end
        catch
          :error, e ->
            Logger.error "create vivo order exception, #{inspect e}"
            conn |> json(%{success: false, message: "http request VIVO create order exception"})
        end

      x ->
        Logger.error "invalid vivo binding data structure: #{inspect x, pretty: true}"
        conn |> send_resp(500, "server internal error") 
    end  
  end

  #魅族带签名的订单
  def add_meizu_order(%Plug.Conn{private: %{acs_app_order: app_order, acs_app: app}} = conn, 
                      %{"product_id" => product_id} = params) do 
    case app.sdk_bindings.meizu do
      nil ->
        Logger.error "can't get app meizu binding info for app: #{inspect app, pretty: true}"
        conn |> json(%{success: false, message: "application meizu binding not set"})        

      %{"app_id" => meizu_app_id, "app_key" => _meizu_app_key, "app_secret" => meizu_app_secret} ->
        create_time = Utils.unix_timestamp
        subject = "购买" <> app_order.goods_name
        
        meizu_params = %{"app_id" => meizu_app_id, 
                         "buy_amount" => 1, 
                         "cp_order_id" => app_order.id, 
                         "create_time" => create_time, 
                         "pay_type" => 0, 
                         "product_body" => "", 
                         "product_id" => product_id, 
                         "product_per_price" => app_order.price, 
                         "product_subject" => subject, 
                         "product_unit" => "", 
                         "total_price" => app_order.price |> to_string, 
                         "uid" => params["sdk_user_id"], 
                         "user_info" => app_order.id
                        }

        sign_string = meizu_params |> Enum.sort  |> Enum.map_join("&", fn({k, v}) -> "#{k}=#{v}" end)
        sign = Utils.md5_sign(sign_string <> ":" <> meizu_app_secret)
        meizu_params = Map.put(meizu_params, "sign_type", "md5")
        meizu_params = Map.put(meizu_params, "sign", sign)

        conn |> json(%{success: true, params: meizu_params})

      x ->
        Logger.error "invalid vivo binding data structure: #{inspect x, pretty: true}"
        conn |> send_resp(500, "server internal error") 
    end     
  end

  

  # api interface
  def add_order(%Plug.Conn{private: %{acs_app_order: app_order}} = conn, _params) do 
    conn |> json(%{success: true, order_id: app_order.id})
  end

end