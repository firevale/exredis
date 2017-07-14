defmodule Acs.Web.AppAdminChannel do
  use Acs.Web, :channel

  require Utils
  alias   Acs.RedisDevice

  def join("app:" <> _, %{"access_token" => _access_token,
                          "user_id" => user_id,
                          "app_id" => app_id} = payload, socket) do
    info "receive app admin channel join request, payload: #{inspect payload}"

    if authorized?(payload) do
      Logger.metadata(user_id: user_id)
      Logger.metadata(app_id: app_id)

      {:ok, socket |> assign(:user_id, user_id)
                   |> assign(:app_id, app_id)
      }
    else
      error "received unauthorized payload: #{inspect payload}"
      {:error, %{reason: "unauthorized"}}
    end
  end

  def join(_channel, payload, _socket) do
    error "can't handle join with payload: #{inspect payload}"
    {:error, %{reason: "unknown payload"}}
  end

  def handle_in(_command, _payload, socket), do: {:noreply, socket}

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (weblogs:lobby).
  # def handle_in("shout", payload, socket) do
  #   broadcast socket, "shout", payload
  #   {:noreply, socket}
  # end

  def terminate(_reason, _socket), do: :ok

  # Add authorization logic here as required.
  defp authorized?(%{"access_token" => access_token_id,
                     "user_id" => user_id}) do
    user_id = String.to_integer(user_id)
    case RedisAccessToken.find(access_token_id) do
      %{user_id: ^user_id} -> true
      _ -> false
    end
  end
end
