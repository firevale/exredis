defmodule AcsWeb.WandoujiaAuthBind do
  use     AcsWeb, :controller
  require SDKWandoujia
  alias   Acs.Apps

  def bind(%Plug.Conn{private: %{acs_app: %App{} = app,
                                 acs_device_id: device_id,
                                 acs_platform: platform}} = conn, 
           %{"wdj_access_token" => wdj_access_token,
             "wdj_user_id" => wdj_user_id}) do
     with %AppSdkBinding{binding: %{"app_id" => wdj_app_id}} <- Apps.get_app_sdk_binding(app.id, "wdj"),
         true <- SDKWandoujia.validate_session(wdj_app_id, wdj_user_id, wdj_access_token),
         {:ok, user} <- Accounts.bind_sdk_user(%{
           sdk: :wdj, 
           sdk_user_id: wdj_user_id, 
           email: nil,
           mobile: nil, 
           }),
         access_token <- Auth.create_access_token(%{
           app_id: app.id,
           user_id: user.id,
           device_id: device_id,
           platform: platform,
           ttl: app.token_ttl,
           binding:  %{wdj: %{access_token: wdj_access_token, user_id: wdj_user_id}}
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
        sdk: :wdj,
        binding: access_token.binding              
      })
    else
      _ ->
        conn |> json(%{success: false, message: "something went wrong"}) 
    end             
  end 
  def bind(conn, _params), do: conn |> json(%{success: false, message: "invalid request"})

end