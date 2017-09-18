defmodule AcsWeb.HuaweiAuthBind do
  use     AcsWeb, :controller
  require SDKHuawei

  def bind(%Plug.Conn{
              private: %{
                acs_app: %App{} = app,
                acs_device_id: device_id,
                acs_platform: platform}} = conn, 
            %{"hw_access_token" => huawei_access_token}) do
    with %{success: true, user_id: huawei_user_id} <- SDKHuawei.validate_session(huawei_access_token),
         {:ok, user} <- Accounts.bind_sdk_user(%{
           sdk: :huawei, 
           sdk_user_id: huawei_user_id, 
           email: nil,
           mobile: nil, 
           }),
         access_token <- Auth.create_access_token(%{
           app_id: app.id,
           user_id: user.id,
           device_id: device_id,
           platform: platform,
           ttl: app.token_ttl,
           binding:  %{huawei: %{access_token: huawei_access_token, user_id: huawei_user_id}}
         })
    do 
      conn |> json(%{
        success: true,
        access_token: access_token.id,
        expires_at: AccessToken.expired_at(access_token),
        user_id: "#{user.id}",
        user_email: user.email,
        nick_name:  user.nickname,
        is_anonymous: false,
        sdk: :huawei,
        binding: access_token.binding              
      })
    else
      _ ->
        conn |> json(%{success: false, message: "something went wrong"}) 
    end
  end 
  def bind(conn, _params), do: conn |> json(%{success: false, message: "invalid request"})

end