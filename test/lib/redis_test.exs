defmodule Acs.RedisTest do
  use Acs.ModelCase

  require Redis
  require Utils

  alias   Acs.RedisUser

  setup_all do 
    Redis.flushdb
    :ok
  end

  @test_lock_key "test.current_user_id"

  test "redis lock_for, test key should be modified only once" do 
    1..100 |> Enum.map(fn(_n) ->
      Task.async fn() ->
        Redis.lock_for(@test_lock_key, fn() ->
          case Redis.get(@test_lock_key) do 
            :undefined ->
              Redis.incr(@test_lock_key)
            _ ->
              :do_nothing
          end
        end)
      end
    end) |> Enum.map(&Task.await/1)

    assert Redis.get(@test_lock_key) == "1" 
  end

  test "write 1000 json object should be finished within 1 seconds" do 
    user = RedisUser.create!("test2@firevale.com", "123456")    
    json = RedisUser.to_json(user)

    ts1 = Utils.unix_timestamp

    1..1_000 |> Enum.each(fn(_) ->
      Redis.hset("test_user_key", "1111", json)      
    end)

    ts2 = Utils.unix_timestamp

    assert ts2 - ts1 <= 1
  end

  @user_mobile_3 "12345678903"
  test "find 1000 users should be finished within 1 seconds" do 
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
    user = RedisUser.create!("xiaobin@firevale.com", "123456")
    assert user.id == 0

    user = RedisUser.save!(user)
    assert user.id >= 100001

    find_result = RedisUser.find!("xiaobin@firevale.com")
    assert user == find_result
   
    ts1 = Utils.unix_timestamp

    1..1000 |> Enum.each(fn(n) ->
      mobile = 18101329170 + n
      password = 123456 + n
      %RedisUser{mobile: "#{mobile}", encrypted_password: "#{password}"} |> RedisUser.save!
    end)

    ts2 = Utils.unix_timestamp

    assert ts2 - ts1 <= 1       

    assert RedisUser.exists?("18101329172")
    refute RedisUser.exists?("18101329000")

    assert_raise ArgumentError, fn() ->
      RedisUser.save!(%{find_result | mobile: "18101329172"})
    end
  end

end
