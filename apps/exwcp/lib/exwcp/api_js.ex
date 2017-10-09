defmodule Exwcp.ApiJs do
  @moduledoc """
  HTTP request for file api.
  """

  import Exwcp.ApiBase
  require Excache

  def ticket(wcp_config = %{wcp_app_id: wcp_app_id, wcp_app_key: _}) do
    Excache.get!("exwcp.jsapi.ticket.#{wcp_app_id}", fallback: fn(_) -> 
      case get(wcp_config, "ticket/getticket", [type: "jsapi"]) do 
        %{errcode: 0, ticket: ticket} -> 
          {:commit, ticket}

        what -> 
          error "get ticket failed: #{inspect what}"
          {:ignore, nil}
      end
    end)
  end
end
