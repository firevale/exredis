defmodule SDKAlipay do
  require Logger
  import  SweetXml
  require Utils
  use     LogAlias
  alias   Utils.Httpc

  @verify_gateway_ssl "https://mapi.alipay.com/gateway.do?service=notify_verify"
  @verify_gateway     "http://notify.alipay.com/trade/notify_query.do"

  @alipay_config      Application.get_env(:acs, :alipay)
  @key_root           @alipay_config[:certs_root]
  @notify_url         @alipay_config[:notify_url]
  @callback_url       @alipay_config[:callback_url]
  @merchant_url       @alipay_config[:merchant_url]

  @config  %{
    gateway: "http://wappaygw.alipay.com/service/rest.htm",
    service_direct: "alipay.wap.trade.create.direct",
    service_auth_and_execute: "alipay.wap.auth.authAndExecute",
    partner_id: "2088411392957036",
    seller_email: "albertma@firevale.com",
    key: "qhjlbz1r2tgy5sdymqbz3upjpoztw7fa", # only for MD5
    private_key: "#{@key_root}/alipay_our_private_key.pem",
    public_key: "#{@key_root}/alipay_our_public_key.pem",
    alipay_public_key: "#{@key_root}/alipay_public_key.pem",
    sign_type: "0001", # RSA encryption
    input_charset: "utf-8",
    cacert: "#{@key_root}/alipay_cacert.pem",
    transport: "http"
  }

  def direct(out_trade_no, subject, total_fee) do
    merchant_url = String.replace(@merchant_url, "{order_id}", out_trade_no)
    callback_url = String.replace(@callback_url, "{order_id}", out_trade_no)
    do_direct(out_trade_no, subject, total_fee, merchant_url, callback_url, @notify_url)
  end
  def direct(out_trade_no, subject, total_fee, %{
    "merchant_url" => merchant_url,
    "callback_url" => callback_url,
    "notify_url" => notify_url,
  }), do: do_direct(out_trade_no, subject, total_fee, merchant_url, callback_url, notify_url)
  def direct(out_trade_no, subject, total_fee, %{
    "merchant_url" => merchant_url,
    "callback_url" => callback_url,
  }), do: do_direct(out_trade_no, subject, total_fee, merchant_url, callback_url, @notify_url)
  def direct(out_trade_no, subject, total_fee, %{
    "merchant_url" => merchant_url,
  }) do
    callback_url = String.replace(@callback_url, "{order_id}", out_trade_no)
    do_direct(out_trade_no, subject, total_fee, merchant_url, callback_url, @notify_url)
  end

  defp do_direct(out_trade_no, subject, total_fee, merchant_url, callback_url, notify_url) do
    req_id = Utils.generate_token

    req_data = """
      <direct_trade_create_req>
        <notify_url>#{notify_url}</notify_url>
        <call_back_url>#{callback_url}</call_back_url>
        <seller_account_name>#{@config.seller_email}</seller_account_name>
        <out_trade_no>#{out_trade_no}</out_trade_no>
        <subject>#{subject}</subject>
        <total_fee>#{:erlang.float_to_binary(total_fee, [decimals: 2])}</total_fee>
        <merchant_url>#{merchant_url}</merchant_url>
      </direct_trade_create_req>
    """ |> String.trim

    info "alipay, request data: #{req_data}"

    param_tokens = [
      service: @config[:service_direct],
      partner: @config[:partner_id],
      sec_id: @config[:sign_type],
      format: "xml",
      v: "2.0",
      req_id: req_id,
      req_data: req_data,
      _input_charset: @config[:input_charset]
    ]

    response = Httpc.post_msg(@config[:gateway], params_with_sign(param_tokens))

    if Httpc.success?(response) do
      info "alipay direct success, response: #{inspect response.body, pretty: true}"
      {:ok, response.body}
    else
      error "alipay direct failed, response: #{inspect response, pretty: true}"
      {:error, nil}
    end
  end

  def get_request_token(result) do
    query = URI.decode_query(result)

    if query["res_data"] do
      res_data = case @config[:sign_type] do
                   "0001" ->
                      key_file = Application.app_dir(:acs, @config[:private_key])
                      Utils.rsa_priv_decrypt(key_file, query["res_data"])
                   _ ->
                     query["res_data"]
                 end

      token = res_data |> xpath(~x"/direct_trade_create_res/request_token/text()[1]")
                       |> to_string
                       |> String.strip

      {:ok, token}
    else
      error "get_request_token, invalid result: #{inspect query}"
      {:error, :empty_res_data}
    end
  end

  def auth_and_execute(request_token) do
    req_data = "<auth_and_execute_req><request_token>#{request_token}</request_token></auth_and_execute_req>"

    params = [
      service: @config[:service_auth_and_execute],
      partner: @config[:partner_id],
      sec_id: @config[:sign_type],
      format: "xml",
      v: "2.0",
      req_id: Utils.generate_token,
      req_data: req_data,
      _input_charset: @config[:input_charset]
    ]

    signed_params = params_with_sign(params)

    # return redirect url
    @config[:gateway] <> "?" <> URI.encode_query(signed_params)
  end

  def verify_notify(%{"notify_data" => notify_data, "sec_id" => sec_id} = params) do
    notify_data
      = case sec_id do
          "0001" ->
            key_file = Application.app_dir(:acs, @config[:private_key])
            Utils.rsa_priv_decrypt(key_file, notify_data)
          _ -> notify_data
        end

    params = Map.put(params, "notify_data", notify_data)

    if verify_notify_sign(params) do
      notify =
        notify_data
          |> xpath(~x"//notify",
                notify_id: ~x"./notify_id/text()[1]",
                trade_no: ~x"./trade_no/text()[1]",
                out_trade_no: ~x"./out_trade_no/text()[1]",
                trade_status: ~x"./trade_status/text()[1]",
                total_fee:  ~x"./total_fee/text()[1]")
          |> Enum.into(%{}, fn({k, v}) -> {k, (v |> to_string |> String.strip)} end)

      cond do
        is_nil(notify.notify_id) ->
          error "notify id is nil in #{inspect notify_data}"
          {:error, :invalid_notify_id}
        is_valid_notify_id(notify.notify_id) ->
          {:ok, notify}
        true ->
          error "invalid notify id: #{notify.notify_id}"
          {:error, :invalid_notify_id}
      end
    else
      error "verify alipay notify signature failed"
      {:error, :invalid_sign}
    end
  end

  defp verify_notify_sign(%{"sign" => sign, "sec_id" => sec_id} = params) do
    param_string = Enum.map_join(~w(service v sec_id notify_data), "&", &("#{&1}=#{params[&1]}"))

    case sec_id do
      "MD5" ->
        sign == Utils.md5_sign("#{param_string}#{@config[:key]}")
      x when x in ["RSA", "0001"] ->
        key_file = Application.app_dir(:acs, @config[:alipay_public_key])
        Utils.rsa_public_verify(key_file, param_string, sign)
      _ ->
        false
    end
  end

  defp is_valid_notify_id(nil), do: false
  defp is_valid_notify_id(""), do: false
  defp is_valid_notify_id(notify_id) do
    response = Httpc.get(@verify_gateway_ssl <> "&partner=#{@config[:partner_id]}&notify_id=#{notify_id}")
    Httpc.success?(response) && Regex.match?(~r/true$/, response.body)
  end

  defp params_with_sign(params) do
    sign = case params[:sec_id] do
      "MD5" ->
        Utils.md5_sign("#{make_param_string(params)}#{@config[:key]}")
      x when x in ["0001", "RSA"] ->
        key_file = Application.app_dir(:acs, @config[:private_key])
        Utils.rsa_priv_sign(key_file, make_param_string(params))
      _ ->
        "invald"
    end

    [{:sign, sign} | params]
  end

  defp make_param_string(params) do
    params
      |> Enum.reject(fn({_k, v}) -> is_nil(v) or v == "" end)
      |> Enum.sort_by(fn({k, _}) -> k end)
      |> Enum.map(fn({k, v}) -> "#{k}=#{v}" end)
      |> Enum.join("&")
  end

end
