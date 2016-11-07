defmodule Acs.RedisTest do
  use ExUnit.Case, async: true

  require Redis

  setup_all do 
    Redis.flushdb
    :ok
  end

  @test_key "current_user_id"

  test "redis lock_for, test key should be modified only once" do 
    1..500 |> Enum.map(fn(_n) ->
      Task.async fn() ->
        Redis.lock_for(@test_key, fn() ->
          case Redis.get(@test_key) do 
            :undefined ->
              Redis.incr(@test_key)
            _ ->
              :do_nothing
          end
        end)
      end
    end) |> Enum.map(&Task.await/1)

    assert Redis.get(@test_key) == "1" 
  end

end
