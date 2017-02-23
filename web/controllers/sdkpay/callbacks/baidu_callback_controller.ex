defmodule Acs.SdkPay.BaiduCallbackController do
  use     Acs.Web, :controller
  require SDKBaidu

  def purchase_callback(%Plug.Conn{private: %{acs_app: %RedisApp{} = app}} = conn,
                        %{"AppID" => baidu_app_id,
                          "Content" => content,
                          "CooperatorOrderSerial" => order_id,
                          "OrderSerial" => trans_no} = params) do
    case app.sdk_bindings.baidu do
      %{"app_secret" => app_secret} ->
        resp_baidu =
          fn(result_code, message) ->
            conn |> json(%{
              "AppID" => String.to_integer(baidu_app_id),
              "ResultCode" => result_code,
              "ResultMessage" => message,
              "Sign" => Utils.md5_sign("#{baidu_app_id}#{result_code}#{app_secret}"),
              "Content" => ""
            })
          end

        if SDKBaidu.validate_payment(app_secret, params) do
          content = content |> Base.decode64! |> JSON.decode!

          case content["OrderStatus"] do
            1 ->
              case Repo.get(AppOrder, order_id) do
                order = %AppOrder{} ->
                  if String.starts_with?(content["ExtInfo"], order.cp_order_id) do
                    {:ok, order} = AppOrder.changeset(order, %{
                                    status: AppOrder.Status.paid,
                                    paid_at: :calendar.local_time |> NaiveDateTime.from_erl!,
                                    transaction_id: "baidu." <> trans_no,
                                    fee: round(String.to_float(content["OrderMoney"] |> to_string) * 100)
                                   }) |> Repo.update

                    PaymentHelper.notify_cp(order)
                    resp_baidu.(1, "success")
                  else #{ cp_order_id mismatch}
                    Logger.error "cp_order_id mismatch, ours: #{order.cp_order_id}, theirs: #{content["ExtInfo"]}"
                    resp_baidu.(4, "cp_order_id mismatch")
                  end
                _ ->
                  Logger.error "order is not found, params: #{inspect params, pretty: true}"
                  resp_baidu.(5, "order is not found")
              end
            _ ->
              Logger.info "receive baidu payment fail notification, params: #{inspect params, pretty: true}"
              resp_baidu.(6, "invalid order status")
          end
        else
          Logger.error "verify baidu payment signature failed, params: #{inspect params, pretty: true}"
          resp_baidu.(2, "verify signature failed")
        end
      _ ->
        Logger.error "receive invalid baidu payment notifications, params: #{inspect params, pretty: true}"
        conn |> json(%{"ResultCode" => 3, "ResultMsg" => "invalid notification address"})
    end
  end

  def purchase_callback(conn, params) do
    Logger.error "receive invalid baidu payment notifications, params: #{inspect params, pretty: true}"
    conn |> json(%{"ResultCode" => 9, "ResultMsg" => "notify params not match"})
  end

end
