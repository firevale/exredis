defmodule Exsm do
  use     Utils.LogAlias
  alias   Exsm.MeishengService

  @sender Application.get_env(:exsm, :provider, :none)

  def send_verify_code(mobile, code) do 
    case @sender do 
      :none ->
        error "No SMS sender configured"
        {:error, :no_provider}

      :meisheng ->
        case MeishengService.send_verify_code(mobile, code) do 
          {:ok, _msg_id} -> :ok
          _ -> {:error, :failed}
        end

      _ ->
        error "unknown SMS provider"
        {:error, :unknown_provider}
    end
  end
end
