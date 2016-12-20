defmodule SDKApple do 
  require Logger
  alias   Utils.Httpc
  alias   Utils.JSON 

  @production_url   "https://buy.itunes.apple.com/verifyReceipt"
  @sandbox_url      "https://sandbox.itunes.apple.com/verifyReceipt"

  def verify_receipt(receipt) do 
    response = Httpc.post_json @production_url, %{"receipt-data": receipt}

    if Httpc.success?(response) do 
      response_json = JSON.decode!(response.body)

      case response_json["status"] do 
        0 -> {:ok, translate_apple_response(response_json)}
        21002 -> verify_sandbox_receipt(receipt) # somehow 21002 also success via sandbox purchase
        21007 -> verify_sandbox_receipt(receipt)
        code -> # other status
          Logger.error "verify result: #{code} invalid receipt #{inspect response_json, pretty: true}"
          {:error, :invalid_receipt}
      end
    else
      Logger.error "verify apple store receipt failed, http response: #{inspect response, pretty: true}"
      {:error, :network}     
    end
  end

  defp verify_sandbox_receipt(receipt) do 
    response = Httpc.post_json @sandbox_url, %{"receipt-data": receipt} 

    if Httpc.success?(response) do 
      response_json = JSON.decode!(response.body)

      case response_json["status"] do 
        0 -> {:ok, translate_apple_response(response_json)}
        code -> 
          Logger.error "verify apple store sandbox receipt failed: #{code}"
          {:error, :invalid_receipt}
      end
    else 
      Logger.error "verify apple store sandbox receipt failed, http status = #{response.status_code}"
      {:error, :network}
    end
  end

  defp translate_apple_response(%{"receipt" => %{
    "product_id" => product_id,
    "original_transaction_id" => transaction_id}}) do 
    %{product_id: product_id, 
      transaction_id: transaction_id, 
      receipt_type: "Production"}
  end
  defp translate_apple_response(%{"receipt" => %{
    "product_id" => product_id,
    "transaction_id" => transaction_id}}) do 
    %{product_id: product_id, 
      transaction_id: transaction_id, 
      receipt_type: "Production"}
  end
  defp translate_apple_response(%{"receipt" => %{
    "in_app" => [%{
      "product_id" => product_id,
      "original_transaction_id" => transaction_id}],
    "receipt_type" => receipt_type}}) do 
    %{product_id: product_id, 
      transaction_id: transaction_id, 
      receipt_type: receipt_type}
  end
  defp translate_apple_response(%{"receipt" => %{
    "in_app" => [%{
      "product_id" => product_id,
      "transaction_id" => transaction_id}],
    "receipt_type" => receipt_type}}) do 
    %{product_id: product_id, 
      transaction_id: transaction_id, 
      receipt_type: receipt_type}
  end
  defp translate_apple_response(_), do: %{}

end