defmodule SDKWechat do
  use     LogAlias
  require Utils

  alias Utils.Httpc
  alias Acs.Repo
  alias Acs.AppOrder
  alias Acs.RedisApp

  @wechat_config      Application.get_env(:acs, :wechat)
  @prepay_url         @wechat_config[:prepay_url]
  @check_url          @wechat_config[:check_url]
  @close_url          @wechat_config[:close_url]
  @refund_url         @wechat_confi[:refund_url]
  @refundquery_url    @wechat_confi[:refundquery_url]

  @config  %{
    trade_type: "APP"
  }

  @status_paid AppOrder.Status.paid()

  def prepay(order_id, wechat_info, ip_address, notify_url) do
    case Repo.get(AppOrder, order_id) do
      order = %AppOrder{} ->
        # update order info (paid channel)
        AppOrder.changeset(order, %{paid_channel: "wechat"}) |> Repo.update!

        params = %{
          appid: wechat_info.app_id,
          body: order.goods_name,
          mch_id: wechat_info.partnerid,
          nonce_str: Utils.nonce,
          notify_url: notify_url,
          out_trade_no: order.id,
          spbill_create_ip: ip_address,
          total_fee: order.price,
          trade_type: @config[:trade_type]
        }

        req_params = params_with_sign(params, wechat_info.sign_key)

        req_data = """
          <xml>
            #{Enum.map_join(req_params, "", fn({k, v}) -> "<#{k}>#{v}</#{k}>" end)}
          </xml>
        """

        response = Httpc.post(@prepay_url, body: req_data)

        d "wechat prepay, response: #{inspect response.body, pretty: true}"
        if Httpc.success?(response) do
          case get_prepay_id(response.body) do
            {:ok, prepay_id} ->
              resign_params = re_sign(wechat_info.app_id, wechat_info.partnerid, prepay_id, wechat_info.sign_key)
              {:ok, wechat_info.partnerid, prepay_id, resign_params[:noncestr], resign_params[:timestamp], resign_params[:sign]}
            {:error, return_msg} ->
              d "wechat, get_prepay_id error: #{return_msg}"
              {:error, return_msg}
            _ ->
              {:error, "wechat prepay, get_prepay_id fail"}
          end
        else
          {:error, nil}
        end
      _ ->
        {:error, "order not found"}
    end
  end

  def on_notify(result_str) do
    result = XmlUtils.convert(result_str)

    case result[:return_code] do
      "SUCCESS" ->
        case Repo.get(AppOrder, result[:out_trade_no]) do
          order = %AppOrder{} ->
            wechat_info = RedisApp.find(order.app_id).sdk_bindings[:wechat]
            if is_nil(wechat_info) do
              {:error, "Wechat pay is not supported"}
            else
              # check sign
              case check_sign(result, wechat_info.sign_key) do
                :ok ->
                  if result[:result_code] == "SUCCESS" do
                    # update order status
                    AppOrder.changeset(order, %{
                      status: @status_paid,
                      paid_at: :calendar.local_time |> NaiveDateTime.from_erl!,
                      transaction_id: "wechat." <> result[:transaction_id],
                      paid_channel: "wechat",
                      fee: result[:total_fee],
                      transaction_currency: result[:fee_type]
                    }) |> Repo.update!

                    Acs.PaymentHelper.notify_cp(order)

                    {:ok, "OK"}
                  else
                    {:error, result[:err_code_des]}
                  end
                _ ->
                  {:error, "invalid signature"}
              end
            end
          _ ->
            {:error, "order not exists"}
        end
      _ ->
        {:error, result[:return_msg]}
    end
  end

  def re_sign(app_id, partnerid, prepay_id, sign_key) do
      # re sign
      params = %{
        appid: app_id,
        noncestr: Utils.nonce,
        package: "Sign=WXPay",
        partnerid: partnerid,
        prepayid: prepay_id,
        timestamp: Utils.unix_timestamp
      }

      params_with_sign(params,sign_key)
  end

  def check_sign(xml, sign_key) do
    their_sign = xml[:sign]

    case String.upcase(Utils.md5_sign("#{make_param_string(xml)}&key=#{sign_key}")) do
      ^their_sign -> :ok
      _ -> {:error, :not_match}
    end
  end

  def create_xml_reply(code, msg) do
    """
      <xml>
        <return_code><![CDATA[#{code}]]></return_code>
        <return_msg><![CDATA[#{msg}]]></return_msg>
      </xml>
    """
  end

  defp get_prepay_id(resultstr) do
    result = resultstr |> XmlUtils.convert

    case result[:return_code] do
      "SUCCESS" ->
          {:ok, result[:prepay_id]}
        _ ->  {:error, result[:return_msg]}
    end
  end

  defp params_with_sign(params, sign_key) do
    sign = "#{make_param_string(params)}&key=#{sign_key}" |> Utils.md5_sign |> String.upcase
    Map.put(params, :sign, sign)
  end

  defp make_param_string(params) do
    params |> Enum.reject(fn({k, v}) -> v == "" or is_nil(v) or k == :sign end)
           |> Enum.sort_by(fn({k, _}) -> k end)
           |> Enum.map(fn({k, v}) -> "#{k}=#{v}" end)
           |> Enum.join("&")
  end

end
