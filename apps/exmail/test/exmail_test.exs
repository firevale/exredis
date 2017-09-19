defmodule ExmailTest do
  use ExUnit.Case
  doctest Exmail

  test "greets the world" do
    assert Exmail.hello() == :world
  end
end
