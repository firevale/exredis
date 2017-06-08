defmodule Acs.Web.RedisTest do
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
end