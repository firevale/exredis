defmodule ExredisTest do
  use ExUnit.Case
  doctest Exredis

  test "greets the world" do
    assert Exredis.hello() == :world
  end
end
