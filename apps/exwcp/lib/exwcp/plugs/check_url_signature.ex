defmodule Exwcp.Plugs.CheckUrlSignature do
  @moduledoc """
  Plug to check url signature.
  """

  import Plug.Conn
  import Exwcp.Signature

  def init(opts) do
    opts 
  end

  def call(conn = %Plug.Conn{params: %{
    "timestamp" => timestamp, 
    "signature" => signature,
    "nonce" => nonce}}, opts) do
    config = opts[:fetch_wcp_config_from_conn].(conn)

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
