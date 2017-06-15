defmodule Acs.StatsTest do
  use Acs.DataCase

  alias Acs.Stats

  describe "daily_reports" do
    alias Acs.Stats.DailyReport

    @valid_attrs %{date: ~D[2010-04-17], platform: "some platform"}
    @update_attrs %{date: ~D[2011-05-18], platform: "some updated platform"}
    @invalid_attrs %{date: nil, platform: nil}

    def daily_report_fixture(attrs \\ %{}) do
      {:ok, daily_report} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Stats.create_daily_report()

      daily_report
    end

    test "list_daily_reports/0 returns all daily_reports" do
      daily_report = daily_report_fixture()
      assert Stats.list_daily_reports() == [daily_report]
    end

    test "get_daily_report!/1 returns the daily_report with given id" do
      daily_report = daily_report_fixture()
      assert Stats.get_daily_report!(daily_report.id) == daily_report
    end

    test "create_daily_report/1 with valid data creates a daily_report" do
      assert {:ok, %DailyReport{} = daily_report} = Stats.create_daily_report(@valid_attrs)
      assert daily_report.date == ~D[2010-04-17]
      assert daily_report.platform == "some platform"
    end

    test "create_daily_report/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Stats.create_daily_report(@invalid_attrs)
    end

    test "update_daily_report/2 with valid data updates the daily_report" do
      daily_report = daily_report_fixture()
      assert {:ok, daily_report} = Stats.update_daily_report(daily_report, @update_attrs)
      assert %DailyReport{} = daily_report
      assert daily_report.date == ~D[2011-05-18]
      assert daily_report.platform == "some updated platform"
    end

    test "update_daily_report/2 with invalid data returns error changeset" do
      daily_report = daily_report_fixture()
      assert {:error, %Ecto.Changeset{}} = Stats.update_daily_report(daily_report, @invalid_attrs)
      assert daily_report == Stats.get_daily_report!(daily_report.id)
    end

    test "delete_daily_report/1 deletes the daily_report" do
      daily_report = daily_report_fixture()
      assert {:ok, %DailyReport{}} = Stats.delete_daily_report(daily_report)
      assert_raise Ecto.NoResultsError, fn -> Stats.get_daily_report!(daily_report.id) end
    end

    test "change_daily_report/1 returns a daily_report changeset" do
      daily_report = daily_report_fixture()
      assert %Ecto.Changeset{} = Stats.change_daily_report(daily_report)
    end
  end

  describe "devices" do
    alias Acs.Stats.Device

    @valid_attrs %{id: "some id"}
    @update_attrs %{id: "some updated id"}
    @invalid_attrs %{id: nil}

    def device_fixture(attrs \\ %{}) do
      {:ok, device} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Stats.create_device()

      device
    end

    test "list_devices/0 returns all devices" do
      device = device_fixture()
      assert Stats.list_devices() == [device]
    end

    test "get_device!/1 returns the device with given id" do
      device = device_fixture()
      assert Stats.get_device!(device.id) == device
    end

    test "create_device/1 with valid data creates a device" do
      assert {:ok, %Device{} = device} = Stats.create_device(@valid_attrs)
      assert device.id == "some id"
    end

    test "create_device/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Stats.create_device(@invalid_attrs)
    end

    test "update_device/2 with valid data updates the device" do
      device = device_fixture()
      assert {:ok, device} = Stats.update_device(device, @update_attrs)
      assert %Device{} = device
      assert device.id == "some updated id"
    end

    test "update_device/2 with invalid data returns error changeset" do
      device = device_fixture()
      assert {:error, %Ecto.Changeset{}} = Stats.update_device(device, @invalid_attrs)
      assert device == Stats.get_device!(device.id)
    end

    test "delete_device/1 deletes the device" do
      device = device_fixture()
      assert {:ok, %Device{}} = Stats.delete_device(device)
      assert_raise Ecto.NoResultsError, fn -> Stats.get_device!(device.id) end
    end

    test "change_device/1 returns a device changeset" do
      device = device_fixture()
      assert %Ecto.Changeset{} = Stats.change_device(device)
    end
  end
end
