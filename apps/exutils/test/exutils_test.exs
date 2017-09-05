defmodule ExutilsTest do
  use ExUnit.Case
  doctest Exutils

  test "greets the world" do
    assert Exutils.hello() == :world
  end
end
