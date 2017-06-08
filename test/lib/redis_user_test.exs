defmodule Acs.Web.RedisUserTest do
  use Acs.ModelCase

  require Redis
  require Utils
  alias   Utils.JSON
  alias   Acs.RedisUser
  alias   Acs.App

  @user_mobile_3 "12345678903"
  test "find 1000 users should be finished within 1 seconds" do
    # delete user if already exists
    with user = %RedisUser{} <- RedisUser.find(@user_mobile_3),
    do: RedisUser.delete(user.id)

    RedisUser.create!(@user_mobile_3, "123456") |> RedisUser.save!

    ts1 = Utils.unix_timestamp
    1..1_000 |> Enum.each(fn(_) ->
      RedisUser.find(@user_mobile_3)
    end)
    ts2 = Utils.unix_timestamp

    assert ts2 - ts1 <= 1

    find_result = RedisUser.find!(@user_mobile_3)

    assert find_result.mobile == @user_mobile_3
  end

  test "create/save/restore/delete redis user" do
    case Repo.get(App, "test-app") do
      nil ->
        App.changeset(%App{}, %{id: "test-app", name: "test app", secret: "123456"}) |> Repo.insert!
      %App{} = app ->
        App.changeset(app, %{id: "test-app", name: "test app", secret: "123456"}) |> Repo.update!
    end

    email = "xiaobin@firevale.com"
    with user = %RedisUser{} <- RedisUser.find(email) do
      RedisUser.delete!(user.id)
    end

    user = RedisUser.create!(email, "123456")
    assert user.id == 0

    user = RedisUser.save!(user)
    assert user.id >= 100001

    find_result = RedisUser.find!(email)
    assert _user = find_result

    ts1 = Utils.unix_timestamp

    # saving to mysql
    1..100 |> Enum.each(fn(n) ->
      mobile = 18101329170 + n
      password = 123456 + n
      with user = %RedisUser{} <- RedisUser.find("#{mobile}"), do: RedisUser.delete(user.id)
      %RedisUser{mobile: "#{mobile}", encrypted_password: "#{password}"} |> RedisUser.save!
    end)

    ts2 = Utils.unix_timestamp
    assert ts2 - ts1 <= 1

    assert RedisUser.exists?("18101329172")
    refute RedisUser.exists?("18101329000")

    assert_raise Ecto.InvalidChangesetError, fn() ->
      RedisUser.save!(%{find_result | mobile: "18101329172"})
    end

    RedisUser.delete!("18101329172")

    test_user = RedisUser.find!("xiaobin@firevale.com")
    test_user = %{test_user | mobile: "18101329172"}
    RedisUser.save!(test_user)

    1..1000 |> Enum.each(fn(n) ->
      mobile = 18101329170 + n
      RedisUser.bind_sdk_user(%{
        sdk: "qq",
        app_id: "test-app",
        sdk_user_id: "#{262356+n}",
        email: nil,
        mobile: "#{mobile}",
        nickname: "qq#{262356 + n}",
        device_id: nil,
        avatar_url: nil
      })
    end)

    test_user = RedisUser.find!("xiaobin@firevale.com")

    assert test_user.mobile == "18101329172"
    refute test_user.bindings == %{}

    Redis.del "fvac.user.#{test_user.id}"

    # should recover user data from mysql db
    test_user = RedisUser.find!("xiaobin@firevale.com")
    assert test_user.mobile == "18101329172"
  end

  test "redis model can add/remove fields as needed" do
    json_str = %{id: 10001, email: "xxx@firevale.com", scope: "xxx", unlock_token: "yyyy", timezone: "", picture_url: ""} |> JSON.encode!
    user = RedisUser.from_json(json_str)
    assert user.email == "xxx@firevale.com"
  end

  test "parse account id type" do
    assert RedisUser.parse_account_id("18101329172") == :mobile
    assert RedisUser.parse_account_id("18002344990") == :mobile
    assert RedisUser.parse_account_id("xiaobin@firevale.com") == :email
    assert RedisUser.parse_account_id("idfa.xaadsfadsfadsfadsfadsf") == :device
    assert RedisUser.parse_account_id("idfv.xaadsfadsfadsfadsfadsf") == :device
    assert RedisUser.parse_account_id("android_id.xaadsfadsfadsfadsfadsf") == :device
  end

end
