defmodule Acs.PaymentHelper do
  require Logger

  require Utils

  alias   Utils.Httpc
  alias   Acs.Repo

  alias   Acs.App
  alias   Acs.AppOrder
  alias   Acs.AppSdkPaymentCallback

  alias   Acs.RedisApp
  alias   Acs.ChaoxinNotifier

  use     LogAlias
  use     Timex

  require Elasticsearch

  @location Application.get_env(:acs, :location, "cn")

  def notify_cp(order = %AppOrder{}) do 
    case RedisApp.find(order.app_id) do 
      :nil -> 
        error "app id [#{order.app_id}] in order #{order.id} not exists"
        {:error, :app_not_found}

      app -> 
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

        sign = Utils.md5_sign("#{sign_str}#{app.secret}")
        params = Map.merge(order_map, %{sign: sign})

        callback_url = case app.sdk_payment_callbacks["#{order.platform}-#{order.sdk}"] do 
                         nil -> app.payment_callback
                         ("http" <> _) = v -> v
                         _ -> app.payment_callback
                       end

        try do 
          response = Httpc.post_msg callback_url, params

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
            #TODO: send email if retry count >= 20
            save_order_failed(order, "#{inspect response, pretty: true}") 
            chaoxin_notify(app, order, "[#{app.name}], 调用CP发货接口\"#{callback_url}\"失败, response: #{inspect response, pretty: true}")
            Logger.error "notify_cp failed, url: #{callback_url}, params: #{inspect params}, result: #{inspect response, pretty: true}" 
            {:cp_failed, "#{response.status_code}"}
          end
        catch
          :error, %HTTPotion.HTTPError{message: "econnrefused"} ->
            Logger.error "notify_cp failed, cp payment callback site #{callback_url} is down"
            save_order_failed(order, "cp service down") 
            chaoxin_notify(app, order, "[#{app.name}], 调用CP发货接口\"#{callback_url}\"失败, 无法建立连接")
            {:error, :exception_encountered}

          :error, %HTTPotion.HTTPError{message: "req_timedout"} ->
            Logger.error "notify_cp failed, request payment callback site #{callback_url} timeout(> 30_000 seconds)"
            save_order_failed(order, "cp service down") 
            chaoxin_notify(app, order, "[#{app.name}], 调用CP发货接口\"#{callback_url}\"失败, 请求超时")
            {:error, :exception_encountered}

          :error, %HTTPotion.HTTPError{message: error_message} ->
            Logger.error "notify_cp failed, request payment callback site #{callback_url} failed: #{error_message}"
            save_order_failed(order, error_message) 
            chaoxin_notify(app, order, "[#{app.name}], 调用CP发货接口\"#{callback_url}\"失败: #{error_message}")
            {:error, :exception_encountered}

          t, e ->
            save_order_failed(order, "exception encountered") 
            Logger.error "notify_cp failed, error type: #{inspect t} error: #{inspect e}, params: #{inspect params}" 
            {:error, :exception_encountered}
        end
    end
  end

  defp save_order_success(order = %AppOrder{}) do 
    AppOrder.changeset(order, %{status: AppOrder.Status.delivered, 
                                cp_result: "ok",
                                deliver_at: :calendar.local_time |> NaiveDateTime.from_erl!}) |> Repo.update!
    # save to elasticsearch
    Elasticsearch.index(%{
      index: "acs",
      type: "orders",
      doc: %{
        app_id: order.app_id,
        user_id: order.user_id,
        app_user_id: order.app_user_id,
        sdk_user_id: order.sdk_user_id,
        goods_id: order.goods_id,
        device_id: order.device_id,
        cp_order_id: order.cp_order_id,
        transaction_id: order.transaction_id,
        created_at: Timex.format!(order.created_at, "{YYYY}-{0M}-{0D}T{h24}:{0m}:{0s}+08:00"),
      },
      params: nil,
      id: order.id
    })
  end

  defp save_order_failed(order = %AppOrder{}, result) do 
    AppOrder.changeset(order, %{cp_result: result,
                                try_deliver_counter: order.try_deliver_counter + 1,
                                try_deliver_at: :calendar.local_time |> NaiveDateTime.from_erl!}) |> Repo.update!
    # save to elasticsearch
    Elasticsearch.index(%{
      index: "acs",
      type: "orders",
      doc: %{
        app_id: order.app_id,
        user_id: order.user_id,
        app_user_id: order.app_user_id,
        sdk_user_id: order.sdk_user_id,
        goods_id: order.goods_id,
        device_id: order.device_id,
        cp_order_id: order.cp_order_id,
        transaction_id: order.transaction_id,
        created_at: Timex.format!(order.created_at, "{YYYY}-{0M}-{0D}T{h24}:{0m}:{0s}+08:00"),
      },
      params: nil,
      id: order.id
    })      
  end

  defp chaoxin_notify(%{chaoxin_group_id: nil}, %{try_deliver_counter: 10}, msg) do 
    ChaoxinNotifier.send_text_msg(msg)
  end
  defp chaoxin_notify(%{chaoxin_group_id: chaoxin_group_id}, %{try_deliver_counter: 10}, msg) do 
    ChaoxinNotifier.send_text_msg(msg, chaoxin_group_id)
  end
  defp chaoxin_notify(_, _, _), do: :ok

end
