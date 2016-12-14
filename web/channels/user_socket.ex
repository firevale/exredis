defmodule Acs.UserSocket do
  use Phoenix.Socket
  use LogAlias

  alias Acs.RedisAccessToken
  alias Acs.RedisUser
  alias Acs.RedisApp

  ## Channels
  # channel "room:*", Acs.RoomChannel
  channel "app:*", Acs.AppChannel

  ## Transports
  transport :websocket, Phoenix.Transports.WebSocket
  # transport :longpoll, Phoenix.Transports.LongPoll

  # Socket params are passed from the client and can
  # be used to verify and authenticate a user. After
  # verification, you can put default assigns into
  # the socket that will be set for all channels, ie
  #
  #     {:ok, assign(socket, :user_id, verified_user_id)}
  #
  # To deny connection, return `:error`.
  #
  # See `Phoenix.Token` documentation for examples in
  # performing token verification on connect.

  def connect(%{"app_id" => app_id}, socket) do 
    case RedisApp.find(app_id) do 
      %{id: ^app_id} = app ->
        {:ok, socket |> assign(:app_id, app_id)}
      _ ->
        :error
    end
  end

  # def connect(%{"access_token_id" => token_id,
  #               "device_id" => device_id,
  #               "device_model" => device_model, 
  #               "os_ver" => os_ver, 
  #               "platform" => platform}, socket) do 

  #   case RedisAccessToken.find(token_id) do 
  #     %{device_id: ^device_id} = token ->
  #       {:ok, socket |> assign(:user_id, token.user_id)
  #                    |> assign(:app_id, token.app_id)
  #                    |> assign(:device_id, device_id)
  #                    |> assign(:os_ver, os_ver)
  #                    |> assign(:platform, platform)}
  #     _ ->
  #       :error
  #   end
  # end

  def connect(params, socket) do
    d "websocket connection params: #{inspect params, pretty: true}"
    :error
  end

  # Socket id's are topics that allow you to identify all sockets for a given user:
  #
  #     def id(socket), do: "users_socket:#{socket.assigns.user_id}"
  #
  # Would allow you to broadcast a "disconnect" event and terminate
  # all active sockets and channels for a given user:
  #
  #     Acs.Endpoint.broadcast("users_socket:#{user.id}", "disconnect", %{})
  #
  # Returning `nil` makes this socket anonymous.
  def id(%{assigns: %{user_id: user_id}}), do: "user_socket:#{user_id}" 
  def id(_socket), do: nil
end
