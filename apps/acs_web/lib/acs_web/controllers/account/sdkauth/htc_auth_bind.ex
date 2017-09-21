defmodule AcsWeb.HtcAuthBind do
  use     AcsWeb, :controller
  alias   Utils.Crypto
  alias   Acs.Apps

  def bind(%Plug.Conn{
              private: %{
                acs_app: %App{} = app,
                acs_device_id: device_id,
                acs_platform: platform}} = conn, 
            %{"htc_session_id" => htc_session_id,
              "htc_user_id" => htc_user_id,
              "htc_account" => htc_account,
              "htc_account_sign" => htc_account_sign}) do
    with %AppSdkBinding{binding: %{"pub_key" => htc_pub_key}} <- Apps.get_app_sdk_binding(app.id, "htc"),
         true <- Crypto.rsa_public_verify2(htc_pub_key, htc_account, htc_account_sign),
         {:ok, user} <- Accounts.bind_sdk_user(%{
           sdk: "htc", 
           sdk_user_id: htc_user_id, 
           email: nil,
           mobile: nil, 
           }),
         access_token <- Auth.create_access_token(%{
           app_id: app.id,
           user_id: user.id,
           device_id: device_id,
           platform: platform,
           ttl: app.token_ttl,
           binding:  %{htc: %{session_id: htc_session_id, user_id: htc_user_id}}
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
        sdk: "htc",
        binding: access_token.binding              
      })
    else
      _ ->
        conn |> json(%{success: false, message: "something went wrong"}) 
    end
  end 
  def bind(conn, _params), do: conn |> json(%{success: false, message: "invalid request"})

end