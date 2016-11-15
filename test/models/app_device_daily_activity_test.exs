defmodule Acs.AppDeviceDailyActivityTest do
  use Acs.ModelCase

  alias Acs.AppDeviceDailyActivity

  @valid_attrs %{active_minutes: 42, date: %{day: 17, month: 4, year: 2010}, pay_amount: 42}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = AppDeviceDailyActivity.changeset(%AppDeviceDailyActivity{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = AppDeviceDailyActivity.changeset(%AppDeviceDailyActivity{}, @invalid_attrs)
    refute changeset.valid?
  end
end
