defmodule Acs.RedisAccessTokenTest do
  use Acs.ModelCase

  require Redis
  alias   Acs.RedisAccessToken

  @app_id   "978A7D84040FE589ED0C76295131E43D"
  @user_id  100001


  test "redis access token" do

    item = %{
      app_id: @app_id,
      user_id: @user_id,
      device_id: "1234567890",
      platform: "ios",
      ttl: 115200,
      binding: %{}
    }

    token = RedisAccessToken.create(item)
    assert token.id != "" 


    token = RedisAccessToken.find(token.id)
    assert token.id != "" 


    RedisAccessToken.delete(token)

  end

end
