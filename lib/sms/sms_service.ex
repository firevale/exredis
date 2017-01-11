defmodule Acs.SmsService do 
  
  require Logger
  alias   Acs.MeishengSmsSender

  @sender Application.get_env(:acs, :sm_provider, :none)

  def send_verify_code(mobile, code) do 
    case @sender do 
      :none ->
        Logger.error "No SMS sender configured"
        :error

      :meisheng ->
        case MeishengSmsSender.send_verify_code(mobile, code) do 
          {:ok, _msg_id} -> :ok
          _ -> :error
        end

      _ ->
        Logger.error "unknown SMS provider"
        :error
    end
  end
 
end