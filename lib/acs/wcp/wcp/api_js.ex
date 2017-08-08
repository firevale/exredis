defmodule Wcp.ApiJs do
  @moduledoc """
  HTTP request for file api.
  """

  import Wcp.ApiBase
  require Cachex
  use LogAlias

  def ticket(app_id) do
    Cachex.get!(:default, "acs.wcp.jsapi.ticket.#{app_id}", fallback: fn(_) -> 
      case get(app_id, "ticket/getticket", [type: "jsapi"]) do 
        %{errcode: 0, ticket: ticket} -> 
          {:commit, ticket}

        what -> 
          error "get ticket failed: #{inspect what}"
          {:ignore, nil}
      end
    end)
  end
end
