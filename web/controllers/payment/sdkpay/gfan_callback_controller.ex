defmodule Acs.SdkPay.GfanCallbackController do
  use     Acs.Web, :controller
  require SDKGFan
  import  SweetXml

  def purchase_callback(%Plug.Conn{private: %{acs_app: %RedisApp{} = app}} = conn, 
                        %{"notify_data" => notify_data} = params) do
    case app.sdk_bindings.gfan do 
      %{"app_uid" => app_uid} ->
        if SDKGFan.validate_payment(app_uid, params) do
          xmlresult = notify_data 
            |> xpath(~x"//notify", 
                      order_id: ~x"./order_id/text()[1]", 
                      cost: ~x"./cost/text()[1]",
                      appkey: ~x"./appkey/text()[1]", 
                      create_time:  ~x"./create_time/text()[1]")
            |> Enum.into(%{}, fn({k, v}) -> {k, (v |> to_string |> String.strip)} end)

          order_id = xmlresult.order_id

          case Repo.get(AppOrder, order_id) do 
            order = %AppOrder{} ->
              {:ok, order} = AppOrder.changeset(order, %{
                status: AppOrder.Status.paid,
                paid_at: :calendar.local_time |> NaiveDateTime.from_erl!,
                transaction_id: "gfan." <> order_id, 
                fee: round(String.to_integer(xmlresult.cost |> to_string) * 10)
              }) |> Repo.update

              PaymentHelper.notify_cp(order)
              conn |> text("<response><ErrorCode>1</ErrorCode><ErrorDesc>Success</ErrorDesc></response>")

            _ -> 
              Logger.error "order is not found, params: #{inspect params, pretty: true}"
              conn |> text("<response><ErrorCode>0</ErrorCode><ErrorDesc>failed</ErrorDesc></response>") 
          end 
        else 
          Logger.error "verify tbt payment signature failed, params: #{inspect params, pretty: true}"
          conn |> text("<response><ErrorCode>0</ErrorCode><ErrorDesc>failed</ErrorDesc></response>")  
        end
      _ -> 
        Logger.error "receive invalid tbt payment notifications, params: #{inspect params, pretty: true}"
        conn |> text("<response><ErrorCode>0</ErrorCode><ErrorDesc>failed</ErrorDesc></response>") 
    end
  end
 def purchase_callback(conn, _), do: conn |> text("<response><ErrorCode>0</ErrorCode><ErrorDesc>failed</ErrorDesc></response>") 
 
end