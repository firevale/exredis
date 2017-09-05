defmodule ExtcpTest do
  use ExUnit.Case
  doctest Extcp

  test "greets the world" do
    assert Extcp.hello() == :world
  end
end
