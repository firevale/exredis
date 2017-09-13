defmodule AcsWeb.PaymentHelper do
  require Utils
  require Exredis

  alias   Utils.Httpc
  alias   Utils.Crypto

  alias   Acs.Apps.AppOrder
  alias   Acs.Cache.CachedAppSdkPaymentCallback
  alias   Exservice.Chaoxin
  alias   Acs.Cache.CachedApp

  use     Utils.LogAlias
  use     Timex

  require Acs.Search.ESOrder
  require AcsStats

  @location Application.get_env(:acs, :location, "cn")

  def notify_cp(order = %AppOrder{}) do
    case CachedApp.get(order.app_id) do
      nil ->
        error "app id [#{order.app_id}] in order #{order.id} not exists"
        {:error, :app_not_found}

      app ->
        try do 
          AcsStats.log_app_user_payment(Timex.local() |> Timex.to_date(), 
            order.app_id,
            order.zone_id,
            order.user_id, 
            order.platform,
            String.to_integer(order.fee))
        catch
          _, _ ->
            error "update stats info of order failed: #{inspect order}"
        end

        total_fee = case Integer.parse("#{order.fee}") do
                      :error -> 0
                      {fee, _} -> round(fee / 100)
                    end

        order_map = %{
          app_id: order.app_id,
          order_id: order.id,
          cp_order_id: order.cp_order_id,
          zone_id: order.zone_id,
          trade_no: order.transaction_id,
          trade_status: order.transaction_status,
          amount: order.price,
          platform: order.platform,
          location: @location,
          currency: order.currency,
          fee: order.fee,
          user_id: order.user_id,
          market: order.market,
          total_fee: total_fee
        }

        # make sure sorted by key
        sign_str = order_map |> Enum.sort
                             |> Enum.map_join("&", fn({key, value}) -> "#{key}=#{value}" end)

        sign = Crypto.md5_sign("#{sign_str}#{app.secret}")
        params = Map.merge(order_map, %{sign: sign})

        callback_url = case CachedAppSdkPaymentCallback.get(order.app_id, order.platform, order.sdk) do
                         ("http" <> _) = v -> v
                         _ -> app.payment_callback
                       end

        try do
          # wait 3 minutes for http response
          response = Httpc.post_form(callback_url, params, 180_000)

          if Httpc.success?(response) do
            if Regex.match?(~r/ok/iu, response.body) do
              info "notify_cp #{callback_url} success, order: #{inspect order, pretty: true}"
              save_order_success(order)
              :ok
            else
              #TODO: send email if retry count >= 20
              save_order_failed(order, response.body)
              chaoxin_notify(app, order, "[#{app.name}], 调用CP发货接口\"#{callback_url}\"失败, 返回: #{response.body}")
              error "notify_cp failed, url: #{callback_url}, params: #{inspect params}, result: #{inspect response, pretty: true}"
              {:cp_failed, response.body}
            end
          else
            save_order_failed(order, "#{inspect response, pretty: true}")
            chaoxin_notify(app, order, "[#{app.name}], 调用CP发货接口\"#{callback_url}\"失败, response: #{inspect response, pretty: true}")
            error "notify_cp failed, url: #{callback_url}, params: #{inspect params}, result: #{inspect response, pretty: true}"
            {:cp_failed, "#{inspect response, pretty: true}"}
          end
        catch
          :error, %HTTPotion.HTTPError{message: "econnrefused"} ->
            error "notify_cp failed, cp payment callback site #{callback_url} is down"
            save_order_failed(order, "cp service down")
            chaoxin_notify(app, order, "[#{app.name}], 调用CP发货接口\"#{callback_url}\"失败, 无法建立连接")
            {:error, :exception_encountered}

          :error, %HTTPotion.HTTPError{message: "req_timedout"} ->
            error "notify_cp failed, request payment callback site #{callback_url} timeout(> 30_000 seconds)"
            save_order_failed(order, "cp service down")
            chaoxin_notify(app, order, "[#{app.name}], 调用CP发货接口\"#{callback_url}\"失败, 请求超时")
            {:error, :exception_encountered}

          :error, %HTTPotion.HTTPError{message: error_message} ->
            error "notify_cp failed, request payment callback site #{callback_url} failed: #{error_message}"
            save_order_failed(order, error_message)
            chaoxin_notify(app, order, "[#{app.name}], 调用CP发货接口\"#{callback_url}\"失败: #{error_message}")
            {:error, :exception_encountered}

          t, e ->
            save_order_failed(order, "exception encountered")
            error "notify_cp failed, error type: #{inspect t} error: #{inspect e}, params: #{inspect params}"
            {:error, :exception_encountered}
        end
    end
  end

  defp save_order_success(order = %AppOrder{}) do
    order = Acs.Apps.update_app_order!(order, %{
      status: AppOrder.Status.delivered(),
      cp_result: "ok",
      deliver_at: DateTime.utc_now()})
    Acs.Search.ESOrder.index(order)
  end

  defp save_order_failed(order = %AppOrder{}, result) do
    order = Acs.Apps.update_app_order!(order, %{
      cp_result: result,
      try_deliver_counter: order.try_deliver_counter + 1,
      try_deliver_at: DateTime.utc_now()}) 
    Acs.Search.ESOrder.index(order)
  end

  defp chaoxin_notify(%{chaoxin_group_id: nil}, %{try_deliver_counter: 10}, msg) do
    Chaoxin.send_text_msg(msg)
  end
  defp chaoxin_notify(%{chaoxin_group_id: chaoxin_group_id}, %{try_deliver_counter: 10}, msg) do
    Chaoxin.send_text_msg(msg, chaoxin_group_id)
  end
  defp chaoxin_notify(_, _, _), do: :ok
end
