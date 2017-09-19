defmodule ExserviceTest do
  use ExUnit.Case
  doctest Exservice

  test "greets the world" do
    assert Exservice.hello() == :world
  end
end
