defmodule Acs.AppUserTest do
  use Acs.ModelCase

  alias Acs.AppUser

  @valid_attrs %{active_minutes: 10, 
                 pay_amount: 0, 
                 last_pay_at: ~N[2000-02-29 00:00:00]}

  @invalid_attrs %{active_minutes: -1}

  test "changeset with valid attributes" do
    changeset = AppUser.changeset(%AppUser{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = AppUser.changeset(%AppUser{}, @invalid_attrs)
    refute changeset.valid?
  end
end
