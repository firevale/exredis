defmodule Wcp.Plugs.CheckMsgSignature do
  @moduledoc """
  Plug to parse xml message.
  """

  import Plug.Conn
  import Wcp.MsgParser
  import Wcp.Signature
  import Wcp.Cipher

  alias  Acs.RedisAppWcpConfig

  def init(opts) do
    opts
  end

  defp aes_key(nil) do
    nil
  end
  defp aes_key(encoding_aes_key) do
    encoding_aes_key <> "=" |> Base.decode64!
  end

  def call(conn, opts) do
    config = RedisAppWcpConfig.find(conn.params["app_id"])

    opts = Keyword.merge(opts,
      token: config.token,
      appid: config.wcp_app_id,
      aes_key: aes_key(config.aes_key))

    {:ok, xml, conn} = read_body(conn)
    msg = xml |> parse
    case msg_encrypted?(conn.params) do
      true -> decrypt_msg(conn, msg, opts)
      false -> conn |> assign(:msg, msg)
    end
  end

  defp decrypt_msg(conn, %{encrypt: msg_encrypt}, opts) do
    appid = Keyword.fetch!(opts, :appid)
    token = Keyword.fetch!(opts, :token)
    aes_key = Keyword.fetch!(opts, :aes_key)
    case msg_valid?(msg_encrypt, conn.params, token) do
      true ->
        case decrypt(msg_encrypt, aes_key) do
          {^appid, msg_decrypt} ->
            conn
            |> assign(:msg, msg_decrypt |> parse)
          _ ->
            conn
            |> send_resp(400, "decrypt msg failed")
            |> halt
        end
      false ->
        conn
        |> send_resp(400, "invalid msg")
        |> halt
    end
  end

  defp msg_encrypted?(params) do
    encrypt_type = Map.get(params, "encrypt_type")
    encrypt_type in [nil, "raw"] == false
  end

  defp msg_valid?(msg_encrypt, params, token) do
    %{"timestamp" => timestamp, "nonce" => nonce, "msg_signature" => signature} = params
    my_signature = [token, timestamp, nonce, msg_encrypt] |> sign
    my_signature == signature
  end
end
