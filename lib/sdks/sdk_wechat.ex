defmodule SDKWechat do
  use     LogAlias
  require Utils

  alias Utils.Httpc
  alias Acs.Repo
  alias Acs.AppOrder
  alias Acs.MallOrder

  @wechat_config      Application.get_env(:acs, :wechat)
  @prepay_url         @wechat_config[:prepay_url]
  # @check_url          @wechat_config[:check_url]
  # @close_url          @wechat_config[:close_url]
  # @refund_url         @wechat_config[:refund_url]
  # @refundquery_url    @wechat_config[:refundquery_url]
  @trade_type         "APP"

  # @status_paid AppOrder.Status.paid()

  def mallprepay(order_id, wechat_info, ip_address, notify_url) do
    case Repo.get(MallOrder, order_id) do
      order = %MallOrder{} ->
        # update order info (paid channel)
        MallOrder.changeset(order, %{paid_type: "wechat"}) |> Repo.update!

        params = %{
          appid: wechat_info.app_id,
          body: order.goods_name,
          mch_id: wechat_info.partnerid,
          nonce_str: Utils.nonce,
          notify_url: notify_url,
          out_trade_no: order.id,
          spbill_create_ip: ip_address,
          total_fee: order.final_price,
          trade_type: @trade_type,
        }

        req_params = params_with_sign(params, wechat_info.sign_key)

        req_data = """
          <xml>
            #{Enum.map_join(req_params, "", fn({k, v}) -> "<#{k}>#{v}</#{k}>" end)}
          </xml>
        """

        response = Httpc.post(@prepay_url, body: req_data)

        d "wechat prepay, response: #{inspect response.body, pretty: true}"
        with true <- Httpc.success?(response),
             {:ok, prepay_id} <- get_prepay_id(response.body)
        do
          resign_params = re_sign(wechat_info.app_id, wechat_info.partnerid, prepay_id, wechat_info.sign_key)
          {:ok, wechat_info.partnerid, prepay_id, resign_params[:noncestr], resign_params[:timestamp], resign_params[:sign]}
        else
          _ -> {:error, "get prepay id failed"}
        end
      _ ->
        {:error, "order not found"}
    end
  end

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
          trade_type: @trade_type,
        }

        req_params = params_with_sign(params, wechat_info.sign_key)

        req_data = """
          <xml>
            #{Enum.map_join(req_params, "", fn({k, v}) -> "<#{k}>#{v}</#{k}>" end)}
          </xml>
        """

        response = Httpc.post(@prepay_url, body: req_data)

        d "wechat prepay, response: #{inspect response.body, pretty: true}"
        with true <- Httpc.success?(response),
             {:ok, prepay_id} <- get_prepay_id(response.body)
        do
          resign_params = re_sign(wechat_info.app_id, wechat_info.partnerid, prepay_id, wechat_info.sign_key)
          {:ok, wechat_info.partnerid, prepay_id, resign_params[:noncestr], resign_params[:timestamp], resign_params[:sign]}
        else
          _ -> {:error, "get prepay id failed"}
        end
      _ ->
        {:error, "order not found"}
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

    params_with_sign(params, sign_key)
  end

  def check_sign(xml, sign_key) do
    their_sign = xml[:sign]

    case String.upcase(Utils.md5_sign("#{make_param_string(xml)}&key=#{sign_key}")) do
      ^their_sign -> :ok
      _ -> {:error, "signature not match"}
    end
  end

  defp get_prepay_id(resultstr) do
    result = resultstr |> XmlUtils.convert

    case result[:return_code] do
      "SUCCESS" ->
        {:ok, result[:prepay_id]}
      _ ->
        {:error, result[:return_msg]}
    end
  end

  def params_with_sign(params, sign_key) do
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
