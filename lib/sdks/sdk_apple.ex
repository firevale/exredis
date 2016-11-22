defmodule SDKApple do 
  require Logger
  alias   Utils.Httpc
  alias   Utils.JSON 

  @production_url   "https://buy.itunes.apple.com/verifyReceipt"
  @sandbox_url      "https://sandbox.itunes.apple.com/verifyReceipt"

  def verify_receipt(receipt) do 
    request_body = %{"receipt-data": receipt} 
    try do 
      response = Httpc.post_json @production_url, request_body

      if Httpc.success?(response) do 
        response_json = JSON.decode!(response.body)

        case response_json["status"] do 
          0 -> {:valid_receipt, :production, response_json}
          21002 -> verify_sandbox_receipt(receipt) # somehow 21002 also success via sandbox purchase
          21007 -> verify_sandbox_receipt(receipt)
          code -> # other status
            Logger.error "verify result: #{code} invalid receipt #{inspect response_json, pretty: true}"
            {:error, :invalid_receipt}
        end
      else
        Logger.error "verify apple store receipt failed, http response: #{inspect response, pretty: true}"
        {:error, :network_failed}     
      end
    catch 
      :error, %HTTPotion.HTTPError{message: "econnrefused"} ->
        Logger.error "verify apple store receipt failed: apple website is not reachable"
        {:error, :network_failed}

      :error, %HTTPotion.HTTPError{message: "req_timedout"} ->
        Logger.error "verify apple store receipt failed: request apple website timeout"
        {:error, :network_failed}

      :error, %HTTPotion.HTTPError{message: error_message} ->
        Logger.error "verify apple store receipt failed: #{error_message}"
        {:error, :exception}

      e ->
        Logger.error "verify apple store receipt failed: e[#{inspect e}]"
        {:error, :exception}   

      t, e ->
        Logger.error "verify apple store receipt failed: t[#{inspect t}], m[#{inspect e}]"
        {:error, :exception}      
    end
  end

  defp verify_sandbox_receipt(receipt) do 
    response = Httpc.post_json @sandbox_url, %{"receipt-data": receipt} 

    if Httpc.success?(response) do 
      response_json = JSON.decode!(response.body)

      case response_json["status"] do 
        0 -> {:valid_receipt, :sandbox, response_json}
        code -> 
          Logger.error "verify apple store sandbox receipt failed: #{code}"
          {:error, :invalid_receipt}
      end
    else 
      Logger.error "verify apple store sandbox receipt failed, http status = #{response.status_code}"
      {:error, :network_failed}
    end
  end
end