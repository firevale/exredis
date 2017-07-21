defmodule Acs.PaymentHelper do
  require Utils
  require Redis

  alias   Utils.Httpc
  alias   Acs.Repo
  alias   Acs.StatsRepo

  alias   Acs.AppOrder
  alias   Acs.Stats.AppUser
  alias   Acs.Stats.AppDevice
  alias   Acs.Stats.AppUserDailyActivity
  alias   Acs.Stats.AppDeviceDailyActivity

  alias   Acs.RedisApp
  alias   Acs.ChaoxinNotifier

  use     LogAlias
  use     Timex

  require Elasticsearch

  @location Application.get_env(:acs, :location, "cn")

  def notify_cp(order = %AppOrder{}) do
    case RedisApp.find(order.app_id) do
      nil ->
        error "app id [#{order.app_id}] in order #{order.id} not exists"
        {:error, :app_not_found}

      app ->
        update_stats_info(order)

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
          # wait 3 minutes for http response
          response = Httpc.post_msg(callback_url, params, 120_000)

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
    AppOrder.changeset(order, %{status: AppOrder.Status.delivered,
                                cp_result: "ok",
                                deliver_at: DateTime.utc_now()}) |> Repo.update!
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
        inserted_at: Timex.format!(order.inserted_at, "{YYYY}-{0M}-{0D}T{h24}:{0m}:{0s}+00:00"),
      },
      params: nil,
      id: order.id
    })
  end

  defp save_order_failed(order = %AppOrder{}, result) do
    AppOrder.changeset(order, %{cp_result: result,
                                try_deliver_counter: order.try_deliver_counter + 1,
                                try_deliver_at: DateTime.utc_now()}) |> Repo.update!
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
        inserted_at: Timex.format!(order.inserted_at, "{YYYY}-{0M}-{0D}T{h24}:{0m}:{0s}+00:00"),
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

  defp update_stats_info(%AppOrder{
    try_deliver_counter: 0, 
    app_id: app_id,
    device_id: device_id,
    user_id: user_id,
    zone_id: zone_id,
    platform: platform,
    fee: fee,
    app_user_id: app_user_id}) when is_integer(fee) and is_integer(app_user_id) do 

    now = DateTime.utc_now()
    today = Timex.local() |> Timex.to_date()

    Redis.sadd("_dapu.#{today}.#{app_id}.#{platform}", user_id)
    Redis.incrby("_totalfee.#{today}.#{app_id}.#{platform}", fee)
    
    # update app user payment info
    case StatsRepo.get(AppUser, app_user_id) do 
      %AppUser{id: ^app_user_id, app_id: ^app_id} = app_user ->
        info "payment success, update app user #{app_user_id} of app: #{app_id}, fee: #{fee}"
        AppUser.changeset(app_user, %{
          pay_amount: app_user.pay_amount + fee,
          first_paid_at: app_user.first_paid_at || now,
          last_paid_at: now,
          last_active_at: now,
          }) |> StatsRepo.update

        case StatsRepo.get_by(AppUserDailyActivity, app_user_id: app_user_id, date: today) do 
          %AppUserDailyActivity{app_user_id: ^app_user_id, date: ^today} = auda ->
            AppUserDailyActivity.changeset(auda, %{pay_amount: auda.pay_amount + fee}) |> StatsRepo.update
          _ ->
            error "can not get app user daily activity by app_user_id: #{app_user_id}, date: #{today}"
        end

        :ok
      _ -> 
        error "can not get app user by id: #{app_user_id}"
        :ok
    end

    # update app device payment info
    case StatsRepo.get_by(AppDevice, app_id: app_id, zone_id: zone_id, device_id: device_id) do 
      %AppDevice{id: app_device_id, app_id: ^app_id, zone_id: ^zone_id, device_id: ^device_id} = app_device ->
        info "payment success, update app device #{device_id} of app: #{app_id}, fee: #{fee}"
        AppDevice.changeset(app_device, %{
          pay_amount: app_device.pay_amount + fee,
          first_paid_at: app_device.first_paid_at || now,
          last_paid_at: now,
          last_active_at: now,
          }) |> StatsRepo.update

        case StatsRepo.get_by(AppDeviceDailyActivity, app_device_id: app_device_id, date: today) do 
          %AppDeviceDailyActivity{app_device_id: ^app_device_id, date: ^today} = adda ->
            AppDeviceDailyActivity.changeset(adda, %{pay_amount: adda.pay_amount + fee}) |> StatsRepo.update
          _ ->
            error "can not get app device daily activity by app_user_id: #{app_device_id}, date: #{today}"
        end

        :ok
      _ -> 
        error "can not get app device by app_id: #{app_id}, zone_id: #{zone_id}, device_id: #{device_id}"
        :ok
    end
  end
  defp update_stats_info(_), do: :ok

end
