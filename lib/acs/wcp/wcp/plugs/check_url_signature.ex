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

  def call(conn = %Plug.Conn{params: params}, _opts) do
    config = RedisAppWcpConfig.find(conn.params["app_id"])

    %{"timestamp" => timestamp, "nonce" => nonce,
      "signature" => signature} = params
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
end
