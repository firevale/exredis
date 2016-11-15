defmodule Acs.AppUserDailyActivityTest do
  use Acs.ModelCase

  alias Acs.AppUserDailyActivity

  @valid_attrs %{active_minutes: 42, date: %{day: 17, month: 4, year: 2010}, pay_amount: 42}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = AppUserDailyActivity.changeset(%AppUserDailyActivity{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = AppUserDailyActivity.changeset(%AppUserDailyActivity{}, @invalid_attrs)
    refute changeset.valid?
  end
end
