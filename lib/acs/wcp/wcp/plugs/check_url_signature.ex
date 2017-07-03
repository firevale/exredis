defmodule Wcp.Plugs.CheckUrlSignature do
  @moduledoc """
  Plug to check url signature.
  """

  import Plug.Conn
  import Wcp.Signature

  alias  Acs.RedisAppWcpConfig

  def init(opts) do
    opts 
  end

  def call(conn = %Plug.Conn{params: %{
    "app_id" => app_id, 
    "timestamp" => timestamp, 
    "signature" => signature,
    "nonce" => nonce}}, _opts) do
    config = RedisAppWcpConfig.find(app_id)

    my_signature = [config.token, timestamp, nonce] |> sign
    case my_signature == signature do
      true ->
        conn
      false ->
        conn
        |> send_resp(400, "")
        |> halt
    end
  end
  def call(conn, _opts), do: conn



end
