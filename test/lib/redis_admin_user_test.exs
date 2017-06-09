defmodule Acs.Web.RedisAdminUserTest do
  use Acs.ModelCase

  require Redis
  alias   Acs.RedisAdminUser

  @user_id  100001

  test "RedisAdminUser" do

    admin_level = RedisAdminUser.get_admin_level(@user_id)
    assert admin_level >= 0 


    if(admin_level > 1) do
      admin_appids = RedisAdminUser.get_admin_appids(@user_id)
      assert length(admin_appids) >= 1 
    end

    admin_level = RedisAdminUser.refresh(@user_id, nil, true)
    assert admin_level >= 0 


  end



end
