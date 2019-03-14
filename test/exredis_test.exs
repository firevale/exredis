defmodule ExredisTest do
  use ExUnit.Case
  doctest Exredis

  test "greets the world" do
    Exredis.set("hello", "world")
    assert Exredis.get("hello") == "world"

    Exredis.del("aa")
    Exredis.sadd("aa", "bb")
    assert Exredis.scard("aa") == 1
  end

  test "lock" do
    for x <- 1..10 do
      spawn(fn ->
        Exredis.lock_for!("xxx", fn ->
          IO.puts("#{inspect(self())} lock do #{x}")
          :timer.sleep(50)
        end)
      end)
    end

    :timer.sleep(10000)
  end
end
