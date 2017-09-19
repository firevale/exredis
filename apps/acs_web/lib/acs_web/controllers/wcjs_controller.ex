defmodule AcsWeb.WcjsController do
  use AcsWeb, :controller

  alias Acs.Wcp

  def signature(conn, %{"app_id" => app_id, "wcp_app_id" => wcp_app_id, "url" => url}) do 
    case Wcp.get_app_wcp_config(app_id) do 
      %AppWcpConfig{wcp_app_id: ^wcp_app_id} = config ->  
        case Exwcp.ApiJs.ticket(config) do 
          nil ->
            conn |> json(%{success: false})

          ticket -> 
            noncestr = Utils.generate_token(8)
            timestamp = Utils.unix_timestamp()
            params = [noncestr: noncestr, jsapi_ticket: ticket, timestamp: timestamp, url: url] 
            str = params |> Enum.sort |> Enum.map_join("&", fn({k, v}) -> 
              "#{k}=#{v}"
            end) 
            signature = :crypto.hash(:sha, str) |> Base.encode16(case: :lower)
            conn |> json(%{
              success: true,
              nonceStr: noncestr,
              timestamp: timestamp,
              signature: signature
            })
        end
      _ ->
        conn |> json(%{success: false})
    end
  end

end