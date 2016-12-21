defmodule Acs.PaymentHelper do
  require Logger

  require Utils

  alias   Utils.Httpc
  alias   Acs.Repo

  alias   Acs.App
  alias   Acs.AppOrder
  alias   Acs.AppSdkPaymentCallback

  alias   Acs.RedisApp

  @location Application.get_env(:acs, :location, "cn")

  def notify_cp(order = %AppOrder{}) do 
    case RedisApp.find(order.app_id) do 
      :nil -> 
        Logger.error "app id [#{order.app_id}] in order #{order.id} not exists"
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
              Logger.info "notify_cp #{callback_url} success, order: #{inspect order, pretty: true}"
              save_order_success(order) 
              :ok
            else 
              #TODO: send email if retry count >= 20
              save_order_failed(order, response.body) 
              Logger.error "notify_cp failed, url: #{callback_url}, params: #{inspect params}, result: #{inspect response, pretty: true}" 
              {:cp_failed, response.body}
            end
          else
            #TODO: send email if retry count >= 20
            save_order_failed(order, "#{response.status_code}") 
            Logger.error "notify_cp failed, url: #{callback_url}, params: #{inspect params}, result: #{inspect response, pretty: true}" 
            {:cp_failed, "#{response.status_code}"}
          end
        catch
          :error, %HTTPotion.HTTPError{message: "econnrefused"} ->
            Logger.error "notify_cp failed, cp payment callback site #{callback_url} is down"
            save_order_failed(order, "cp service down") 
            {:error, :exception_encountered}

          :error, %HTTPotion.HTTPError{message: "req_timedout"} ->
            Logger.error "notify_cp failed, request payment callback site #{callback_url} timeout(> 30_000 seconds)"
            save_order_failed(order, "cp service down") 
            {:error, :exception_encountered}

          :error, %HTTPotion.HTTPError{message: error_message} ->
            Logger.error "notify_cp failed, request payment callback site #{callback_url} failed: #{error_message}"
            save_order_failed(order, error_message) 
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
  end

  defp save_order_failed(order = %AppOrder{}, result) do 
    AppOrder.changeset(order, %{cp_result: result,
                                try_deliver_counter: order.try_deliver_counter + 1,
                                try_deliver_at: :calendar.local_time |> NaiveDateTime.from_erl!}) |> Repo.update!
    # save to elasticsearch
  end
end
