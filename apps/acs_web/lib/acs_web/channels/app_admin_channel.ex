defmodule AcsWeb.AppAdminChannel do
  use AcsWeb, :channel

  require Utils
  alias   Acs.AdminUser

  def join("admin.app:" <> _, %{"access_token" => access_token,
                                "app_id" => app_id} = payload, socket) do
    info "receive app admin channel join request, payload: #{inspect payload}"
    case RedisAccessToken.find(access_token) do 
      %{user_id: user_id} ->
        query = from au in AdminUser,
          select: count(au.id),
          where: au.user_id == ^user_id,
          where: au.active == true

        case Repo.one!(query) do 
          1 -> 
            {:ok, socket |> assign(:user_id, user_id)
                         |> assign(:app_id, app_id)}
          _ ->
            {:error, %{reason: "unauthorized"}}
        end
      _ ->
        {:error, %{reason: "unauthorized"}}
    end
  end

  def join(channel, payload, _socket) do
    error "can't handle join for #{channel} with payload: #{inspect payload}"
    {:error, %{reason: "unknown payload"}}
  end

  def handle_in(_command, _payload, socket), do: {:noreply, socket}


  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (weblogs:lobby).
  # def handle_in("shout", payload, socket) do
  #   broadcast socket, "shout", payload
  #   {:noreply, socket}
  # end
  def handle_info(%{event: event, payload: payload}, socket) do
    # d "push message: #{event}, #{inspect payload}"
    push socket, event, payload
    {:noreply, socket}
  end

  def terminate(_reason, _socket), do: :ok
end
