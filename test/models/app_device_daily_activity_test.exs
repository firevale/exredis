defmodule Acs.AppDeviceDailyActivityTest do
  use Acs.ModelCase

  alias Acs.AppDeviceDailyActivity

  @valid_attrs %{active_seconds: 42, date: ~D[2015-04-21], pay_amount: 42, app_device_id: 121234}
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
