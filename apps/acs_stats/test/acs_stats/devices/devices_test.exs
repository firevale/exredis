defmodule AcsStats.DevicesTest do
  use AcsStats.DataCase

  alias AcsStats.Devices

  describe "app_devices" do
    alias AcsStats.Devices.AppDevice

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def app_device_fixture(attrs \\ %{}) do
      {:ok, app_device} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Devices.create_app_device()

      app_device
    end

    test "list_app_devices/0 returns all app_devices" do
      app_device = app_device_fixture()
      assert Devices.list_app_devices() == [app_device]
    end

    test "get_app_device!/1 returns the app_device with given id" do
      app_device = app_device_fixture()
      assert Devices.get_app_device!(app_device.id) == app_device
    end

    test "create_app_device/1 with valid data creates a app_device" do
      assert {:ok, %AppDevice{} = app_device} = Devices.create_app_device(@valid_attrs)
    end

    test "create_app_device/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Devices.create_app_device(@invalid_attrs)
    end

    test "update_app_device/2 with valid data updates the app_device" do
      app_device = app_device_fixture()
      assert {:ok, app_device} = Devices.update_app_device(app_device, @update_attrs)
      assert %AppDevice{} = app_device
    end

    test "update_app_device/2 with invalid data returns error changeset" do
      app_device = app_device_fixture()
      assert {:error, %Ecto.Changeset{}} = Devices.update_app_device(app_device, @invalid_attrs)
      assert app_device == Devices.get_app_device!(app_device.id)
    end

    test "delete_app_device/1 deletes the app_device" do
      app_device = app_device_fixture()
      assert {:ok, %AppDevice{}} = Devices.delete_app_device(app_device)
      assert_raise Ecto.NoResultsError, fn -> Devices.get_app_device!(app_device.id) end
    end

    test "change_app_device/1 returns a app_device changeset" do
      app_device = app_device_fixture()
      assert %Ecto.Changeset{} = Devices.change_app_device(app_device)
    end
  end

  describe "app_device_daily_activities" do
    alias AcsStats.Devices.AppDeviceDailyActivity

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def app_device_daily_activity_fixture(attrs \\ %{}) do
      {:ok, app_device_daily_activity} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Devices.create_app_device_daily_activity()

      app_device_daily_activity
    end

    test "list_app_device_daily_activities/0 returns all app_device_daily_activities" do
      app_device_daily_activity = app_device_daily_activity_fixture()
      assert Devices.list_app_device_daily_activities() == [app_device_daily_activity]
    end

    test "get_app_device_daily_activity!/1 returns the app_device_daily_activity with given id" do
      app_device_daily_activity = app_device_daily_activity_fixture()
      assert Devices.get_app_device_daily_activity!(app_device_daily_activity.id) == app_device_daily_activity
    end

    test "create_app_device_daily_activity/1 with valid data creates a app_device_daily_activity" do
      assert {:ok, %AppDeviceDailyActivity{} = app_device_daily_activity} = Devices.create_app_device_daily_activity(@valid_attrs)
    end

    test "create_app_device_daily_activity/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Devices.create_app_device_daily_activity(@invalid_attrs)
    end

    test "update_app_device_daily_activity/2 with valid data updates the app_device_daily_activity" do
      app_device_daily_activity = app_device_daily_activity_fixture()
      assert {:ok, app_device_daily_activity} = Devices.update_app_device_daily_activity(app_device_daily_activity, @update_attrs)
      assert %AppDeviceDailyActivity{} = app_device_daily_activity
    end

    test "update_app_device_daily_activity/2 with invalid data returns error changeset" do
      app_device_daily_activity = app_device_daily_activity_fixture()
      assert {:error, %Ecto.Changeset{}} = Devices.update_app_device_daily_activity(app_device_daily_activity, @invalid_attrs)
      assert app_device_daily_activity == Devices.get_app_device_daily_activity!(app_device_daily_activity.id)
    end

    test "delete_app_device_daily_activity/1 deletes the app_device_daily_activity" do
      app_device_daily_activity = app_device_daily_activity_fixture()
      assert {:ok, %AppDeviceDailyActivity{}} = Devices.delete_app_device_daily_activity(app_device_daily_activity)
      assert_raise Ecto.NoResultsError, fn -> Devices.get_app_device_daily_activity!(app_device_daily_activity.id) end
    end

    test "change_app_device_daily_activity/1 returns a app_device_daily_activity changeset" do
      app_device_daily_activity = app_device_daily_activity_fixture()
      assert %Ecto.Changeset{} = Devices.change_app_device_daily_activity(app_device_daily_activity)
    end
  end

  describe "device_infos" do
    alias AcsStats.Devices.DeviceInfo

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def device_info_fixture(attrs \\ %{}) do
      {:ok, device_info} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Devices.create_device_info()

      device_info
    end

    test "list_device_infos/0 returns all device_infos" do
      device_info = device_info_fixture()
      assert Devices.list_device_infos() == [device_info]
    end

    test "get_device_info!/1 returns the device_info with given id" do
      device_info = device_info_fixture()
      assert Devices.get_device_info!(device_info.id) == device_info
    end

    test "create_device_info/1 with valid data creates a device_info" do
      assert {:ok, %DeviceInfo{} = device_info} = Devices.create_device_info(@valid_attrs)
    end

    test "create_device_info/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Devices.create_device_info(@invalid_attrs)
    end

    test "update_device_info/2 with valid data updates the device_info" do
      device_info = device_info_fixture()
      assert {:ok, device_info} = Devices.update_device_info(device_info, @update_attrs)
      assert %DeviceInfo{} = device_info
    end

    test "update_device_info/2 with invalid data returns error changeset" do
      device_info = device_info_fixture()
      assert {:error, %Ecto.Changeset{}} = Devices.update_device_info(device_info, @invalid_attrs)
      assert device_info == Devices.get_device_info!(device_info.id)
    end

    test "delete_device_info/1 deletes the device_info" do
      device_info = device_info_fixture()
      assert {:ok, %DeviceInfo{}} = Devices.delete_device_info(device_info)
      assert_raise Ecto.NoResultsError, fn -> Devices.get_device_info!(device_info.id) end
    end

    test "change_device_info/1 returns a device_info changeset" do
      device_info = device_info_fixture()
      assert %Ecto.Changeset{} = Devices.change_device_info(device_info)
    end
  end
end
