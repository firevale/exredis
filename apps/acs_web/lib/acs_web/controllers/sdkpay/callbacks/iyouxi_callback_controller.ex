defmodule AcsWeb.SdkPay.IYouxiCallbackController do
  use     AcsWeb, :controller
  require SDKIYouxi
  alias   Acs.Apps
  alias   Acs.Apps.AppSdkBinding

  plug    :set_xml_header

  defp set_xml_header(conn, _options) do 
    conn |> put_resp_header("content-type", "application/xml")
  end

  ##################################################################### IF1 CALLBACK  #####################################################################
  def if1_callback(%Plug.Conn{private: %{acs_app: %App{} = app}} = conn, 
                   %{"cp_order_id" => order_id, 
                     "correlator" => correlator,
                     "order_time" => _order_time} = params) do
    case Apps.get_app_sdk_binding(app.id, "iyouxi") do
      %AppSdkBinding{binding: %{"app_key" => app_key}} ->
        if SDKIYouxi.verify_signature_if1(app_key, params) do
          case Repo.get(AppOrder, order_id) do
            order = %AppOrder{} ->
              fee = (order.price / 100) |> :erlang.float_to_binary([decimals: 2, compact: true])

              result = ~s(
              <sms_pay_check_resp>

                <cp_order_id>#{order_id}</cp_order_id>

                <correlator>#{correlator}</correlator>

                <game_account>#{order.sdk_user_id}</game_account>

                <fee>#{fee}</fee>

                <if_pay>0</if_pay>

                <order_time>#{Timex.format!(Timex.local, "%Y%m%d%H%M%S", :strftime)}</order_time>

              </sms_pay_check_resp>
              )

              conn |> text(result)

            _ -> 
              Logger.error "order is not found, params: #{inspect params, pretty: true}"
              conn |> text("fail") 
          end 
        else #{verify signature failed}
          Logger.error "verify iyouxi payment signature failed, params: #{inspect params, pretty: true}"
          conn |> text("fail")  
        end
      _ -> #{client_id invalid}
        Logger.error "invalid client config, params: #{inspect params, pretty: true}"
        conn |> text("fail") 
    end
  end

  def if1_callback(conn, params) do
    Logger.error "receive invalid iyouxi notification, params: #{inspect params, pretty: true}"
    conn |> text("fail") 
  end

  ##################################################################### IF2 CALLBACK  #####################################################################
  def if2_callback(conn, %{"method" => "check"} = params) do 
    if1_callback(conn, params)
  end

  def if2_callback(%Plug.Conn{private: %{acs_app: %App{} = app}} = conn, 
                   %{"cp_order_id" => order_id, 
                     "correlator" => correlator, 
                     "result_code" => "00",
                     "method" => "callback",
                     "fee" => fee} = params) do

    resp =  fn(result_code) ->
              conn |> text(~s(
                  <cp_notify_resp>

                    <h_ret>#{result_code}</h_ret>

                    <cp_order_id>#{order_id}</cp_order_id>

                  </cp_notify_resp>
                )) 
            end

    case Apps.get_app_sdk_binding(app.id, "iyouxi") do
      %AppSdkBinding{binding: %{"app_key" => app_key}} ->
        if SDKIYouxi.verify_signature_if2(app_key, params) do
          case Repo.get(AppOrder, order_id) do
            order = %AppOrder{} ->
              {price, _} = Float.parse(fee)

              {:ok, order} = AppOrder.changeset(order, %{
                status: AppOrder.Status.paid,
                paid_at: DateTime.utc_now(),
                transaction_id: "iyouxi." <> correlator, 
                fee: round(price * 100)
              }) |> Repo.update

              PaymentHelper.notify_cp(order)
              resp.(0)
            _ -> 
              Logger.error "order is not found, params: #{inspect params, pretty: true}"
              resp.(3) 
          end 
        else 
          Logger.error "verify iyouxi payment signature failed, params: #{inspect params, pretty: true}"
          resp.(4)  
        end

      _ -> 
        Logger.error "invalid client config, params: #{inspect params, pretty: true}"
        resp.(5) 
    end
  end

  def if2_callback(conn, %{"cp_order_id" => order_id} = params) do  
    Logger.error "receive invalid iyouxi payment notifications, params: #{inspect params, pretty: true}"
    conn |> text(~s(
      <cp_notify_resp>

        <h_ret>0</h_ret>

        <cp_order_id>#{order_id}</cp_order_id>

      </cp_notify_resp>
    ))
  end

  def if2_callback(conn, params) do
    Logger.error "receive invalid iyouxi payment notifications, params: #{inspect params, pretty: true}"
    conn |> text(~s(
      <cp_notify_resp>

        <h_ret>0</h_ret>

      </cp_notify_resp>
    ))
  end

end