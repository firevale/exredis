defmodule ExredisTest do
  use ExUnit.Case
  doctest Exredis

  test "greets the world" do
    Exredis.set("hello", "world")
    assert Exredis.get("hello") == "world"
  end
end
