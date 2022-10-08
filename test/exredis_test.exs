defmodule ExredisTest do
  use ExUnit.Case
  doctest Exredis

  setup do
    # {:ok, _} = start_supervised(Exredis.Helper.supervisor(), shutdown: 30_000)
    :ok
  end

  test "greets the world" do
    Exredis.set("hello", "world")
    assert Exredis.get("hello") == "world"

    Exredis.del("aa")
    Exredis.sadd("aa", "bb")
    assert Exredis.scard("aa") == 1
  end
end
