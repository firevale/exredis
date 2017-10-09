defmodule ExesTest do
  use ExUnit.Case
  doctest Exes

  test "greets the world" do
    assert Exes.hello() == :world
  end
end
