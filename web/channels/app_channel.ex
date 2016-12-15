defmodule Acs.AppChannel do
  use Acs.Web, :channel

  require Utils

  def join("app:" <> app_id, %{"access_token" => access_token, 
                               "user_id" => user_id, 
                               "device_id" => device_id,
                               "device_model" => device_model,
                               "os_ver" => os_ver,
                               "platform" => platform} = payload, socket) do
    if authorized?(payload) do
       Logger.metadata(user_id: user_id) 
       Logger.metadata(app_id: app_id) 
       Logger.metadata(device_id: device_id) 
      {:ok, socket |> assign(:user_id, user_id)
                   |> assign(:app_id, app_id)
                   |> assign(:device_id, device_id)
                   |> assign(:join_at, Utils.unix_timestamp) 
                   |> assign(:device_model, device_model) 
                   |> assign(:os_ver, os_ver) 
                   |> assign(:platform, platform) 
      }
    else
      Logger.error "received unauthorized payload: #{inspect payload, pretty: true}"
      {:error, %{reason: "unauthorized"}}
    end
  end

  def join(_channel, payload, _socket) do 
    Logger.error "can't handle join with payload: #{inspect payload}"
    {:error, %{reason: "unknown payload"}}
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("reset", %{"access_token" => access_token, 
                           "user_id" => user_id, 
                           "device_id" => device_id,
                           "device_model" => device_model,
                           "os_ver" => os_ver,
                           "platform" => platform} = payload, socket) do
      Logger.metadata(user_id: user_id) 
      do_stat(socket)
      {:noreply, socket |> assign(:user_id, user_id)
                        |> assign(:join_at, Utils.unix_timestamp)
      }
  end

  def handle_in(_command, _payload, socket), do: {:noreply, socket}

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (weblogs:lobby).
  # def handle_in("shout", payload, socket) do
  #   broadcast socket, "shout", payload
  #   {:noreply, socket}
  # end

  def terminate(reason, %{assigns: %{user_id: _, device_id: _, app_id: _, join_at: _}} = socket) do 
    do_stat(socket)
    :ok
  end
  def terminate(_reason, _socket), do: :ok

  defp do_stat(%{assigns: %{user_id: user_id, device_id: device_id, app_id: app_id, join_at: join_at}}) do 
    now = Utils.unix_timestamp
    d "user: #{user_id} online_time: #{now - join_at}"
  end
  defp do_stat(_socket), do: :ok

  # Add authorization logic here as required.
  defp authorized?(%{"access_token" => access_token_id, 
                     "device_id" => device_id,
                     "user_id" => user_id}) do
    user_id = String.to_integer(user_id)
    case RedisAccessToken.find(access_token_id) do 
      %{device_id: ^device_id, user_id: ^user_id} = token -> true
      _ -> false
    end
  end
end
