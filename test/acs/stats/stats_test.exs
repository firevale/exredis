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

  describe "app_devices" do
    alias Acs.Stats.AppDevice

    @valid_attrs %{app_id: "some app_id", zone_id: "some zone_id"}
    @update_attrs %{app_id: "some updated app_id", zone_id: "some updated zone_id"}
    @invalid_attrs %{app_id: nil, zone_id: nil}

    def app_device_fixture(attrs \\ %{}) do
      {:ok, app_device} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Stats.create_app_device()

      app_device
    end

    test "list_app_devices/0 returns all app_devices" do
      app_device = app_device_fixture()
      assert Stats.list_app_devices() == [app_device]
    end

    test "get_app_device!/1 returns the app_device with given id" do
      app_device = app_device_fixture()
      assert Stats.get_app_device!(app_device.id) == app_device
    end

    test "create_app_device/1 with valid data creates a app_device" do
      assert {:ok, %AppDevice{} = app_device} = Stats.create_app_device(@valid_attrs)
      assert app_device.app_id == "some app_id"
      assert app_device.zone_id == "some zone_id"
    end

    test "create_app_device/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Stats.create_app_device(@invalid_attrs)
    end

    test "update_app_device/2 with valid data updates the app_device" do
      app_device = app_device_fixture()
      assert {:ok, app_device} = Stats.update_app_device(app_device, @update_attrs)
      assert %AppDevice{} = app_device
      assert app_device.app_id == "some updated app_id"
      assert app_device.zone_id == "some updated zone_id"
    end

    test "update_app_device/2 with invalid data returns error changeset" do
      app_device = app_device_fixture()
      assert {:error, %Ecto.Changeset{}} = Stats.update_app_device(app_device, @invalid_attrs)
      assert app_device == Stats.get_app_device!(app_device.id)
    end

    test "delete_app_device/1 deletes the app_device" do
      app_device = app_device_fixture()
      assert {:ok, %AppDevice{}} = Stats.delete_app_device(app_device)
      assert_raise Ecto.NoResultsError, fn -> Stats.get_app_device!(app_device.id) end
    end

    test "change_app_device/1 returns a app_device changeset" do
      app_device = app_device_fixture()
      assert %Ecto.Changeset{} = Stats.change_app_device(app_device)
    end
  end

  describe "app_users" do
    alias Acs.Stats.AppUser

    @valid_attrs %{app_id: "some app_id", zone_id: "some zone_id"}
    @update_attrs %{app_id: "some updated app_id", zone_id: "some updated zone_id"}
    @invalid_attrs %{app_id: nil, zone_id: nil}

    def app_user_fixture(attrs \\ %{}) do
      {:ok, app_user} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Stats.create_app_user()

      app_user
    end

    test "list_app_users/0 returns all app_users" do
      app_user = app_user_fixture()
      assert Stats.list_app_users() == [app_user]
    end

    test "get_app_user!/1 returns the app_user with given id" do
      app_user = app_user_fixture()
      assert Stats.get_app_user!(app_user.id) == app_user
    end

    test "create_app_user/1 with valid data creates a app_user" do
      assert {:ok, %AppUser{} = app_user} = Stats.create_app_user(@valid_attrs)
      assert app_user.app_id == "some app_id"
      assert app_user.zone_id == "some zone_id"
    end

    test "create_app_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Stats.create_app_user(@invalid_attrs)
    end

    test "update_app_user/2 with valid data updates the app_user" do
      app_user = app_user_fixture()
      assert {:ok, app_user} = Stats.update_app_user(app_user, @update_attrs)
      assert %AppUser{} = app_user
      assert app_user.app_id == "some updated app_id"
      assert app_user.zone_id == "some updated zone_id"
    end

    test "update_app_user/2 with invalid data returns error changeset" do
      app_user = app_user_fixture()
      assert {:error, %Ecto.Changeset{}} = Stats.update_app_user(app_user, @invalid_attrs)
      assert app_user == Stats.get_app_user!(app_user.id)
    end

    test "delete_app_user/1 deletes the app_user" do
      app_user = app_user_fixture()
      assert {:ok, %AppUser{}} = Stats.delete_app_user(app_user)
      assert_raise Ecto.NoResultsError, fn -> Stats.get_app_user!(app_user.id) end
    end

    test "change_app_user/1 returns a app_user changeset" do
      app_user = app_user_fixture()
      assert %Ecto.Changeset{} = Stats.change_app_user(app_user)
    end
  end

  describe "app_usrs_aaa" do
    alias Acs.Stats.AppUserDailyActivity

    @valid_attrs %{app_id: "some app_id", zone_id: "some zone_id"}
    @update_attrs %{app_id: "some updated app_id", zone_id: "some updated zone_id"}
    @invalid_attrs %{app_id: nil, zone_id: nil}

    def app_user_daily_activity_fixture(attrs \\ %{}) do
      {:ok, app_user_daily_activity} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Stats.create_app_user_daily_activity()

      app_user_daily_activity
    end

    test "list_app_usrs_aaa/0 returns all app_usrs_aaa" do
      app_user_daily_activity = app_user_daily_activity_fixture()
      assert Stats.list_app_usrs_aaa() == [app_user_daily_activity]
    end

    test "get_app_user_daily_activity!/1 returns the app_user_daily_activity with given id" do
      app_user_daily_activity = app_user_daily_activity_fixture()
      assert Stats.get_app_user_daily_activity!(app_user_daily_activity.id) == app_user_daily_activity
    end

    test "create_app_user_daily_activity/1 with valid data creates a app_user_daily_activity" do
      assert {:ok, %AppUserDailyActivity{} = app_user_daily_activity} = Stats.create_app_user_daily_activity(@valid_attrs)
      assert app_user_daily_activity.app_id == "some app_id"
      assert app_user_daily_activity.zone_id == "some zone_id"
    end

    test "create_app_user_daily_activity/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Stats.create_app_user_daily_activity(@invalid_attrs)
    end

    test "update_app_user_daily_activity/2 with valid data updates the app_user_daily_activity" do
      app_user_daily_activity = app_user_daily_activity_fixture()
      assert {:ok, app_user_daily_activity} = Stats.update_app_user_daily_activity(app_user_daily_activity, @update_attrs)
      assert %AppUserDailyActivity{} = app_user_daily_activity
      assert app_user_daily_activity.app_id == "some updated app_id"
      assert app_user_daily_activity.zone_id == "some updated zone_id"
    end

    test "update_app_user_daily_activity/2 with invalid data returns error changeset" do
      app_user_daily_activity = app_user_daily_activity_fixture()
      assert {:error, %Ecto.Changeset{}} = Stats.update_app_user_daily_activity(app_user_daily_activity, @invalid_attrs)
      assert app_user_daily_activity == Stats.get_app_user_daily_activity!(app_user_daily_activity.id)
    end

    test "delete_app_user_daily_activity/1 deletes the app_user_daily_activity" do
      app_user_daily_activity = app_user_daily_activity_fixture()
      assert {:ok, %AppUserDailyActivity{}} = Stats.delete_app_user_daily_activity(app_user_daily_activity)
      assert_raise Ecto.NoResultsError, fn -> Stats.get_app_user_daily_activity!(app_user_daily_activity.id) end
    end

    test "change_app_user_daily_activity/1 returns a app_user_daily_activity changeset" do
      app_user_daily_activity = app_user_daily_activity_fixture()
      assert %Ecto.Changeset{} = Stats.change_app_user_daily_activity(app_user_daily_activity)
    end
  end

  describe "app_usrs_aaa_aaa" do
    alias Acs.Stats.AppDeviceDailyActivity

    @valid_attrs %{app_id: "some app_id", zone_id: "some zone_id"}
    @update_attrs %{app_id: "some updated app_id", zone_id: "some updated zone_id"}
    @invalid_attrs %{app_id: nil, zone_id: nil}

    def app_device_daily_activity_fixture(attrs \\ %{}) do
      {:ok, app_device_daily_activity} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Stats.create_app_device_daily_activity()

      app_device_daily_activity
    end

    test "list_app_usrs_aaa_aaa/0 returns all app_usrs_aaa_aaa" do
      app_device_daily_activity = app_device_daily_activity_fixture()
      assert Stats.list_app_usrs_aaa_aaa() == [app_device_daily_activity]
    end

    test "get_app_device_daily_activity!/1 returns the app_device_daily_activity with given id" do
      app_device_daily_activity = app_device_daily_activity_fixture()
      assert Stats.get_app_device_daily_activity!(app_device_daily_activity.id) == app_device_daily_activity
    end

    test "create_app_device_daily_activity/1 with valid data creates a app_device_daily_activity" do
      assert {:ok, %AppDeviceDailyActivity{} = app_device_daily_activity} = Stats.create_app_device_daily_activity(@valid_attrs)
      assert app_device_daily_activity.app_id == "some app_id"
      assert app_device_daily_activity.zone_id == "some zone_id"
    end

    test "create_app_device_daily_activity/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Stats.create_app_device_daily_activity(@invalid_attrs)
    end

    test "update_app_device_daily_activity/2 with valid data updates the app_device_daily_activity" do
      app_device_daily_activity = app_device_daily_activity_fixture()
      assert {:ok, app_device_daily_activity} = Stats.update_app_device_daily_activity(app_device_daily_activity, @update_attrs)
      assert %AppDeviceDailyActivity{} = app_device_daily_activity
      assert app_device_daily_activity.app_id == "some updated app_id"
      assert app_device_daily_activity.zone_id == "some updated zone_id"
    end

    test "update_app_device_daily_activity/2 with invalid data returns error changeset" do
      app_device_daily_activity = app_device_daily_activity_fixture()
      assert {:error, %Ecto.Changeset{}} = Stats.update_app_device_daily_activity(app_device_daily_activity, @invalid_attrs)
      assert app_device_daily_activity == Stats.get_app_device_daily_activity!(app_device_daily_activity.id)
    end

    test "delete_app_device_daily_activity/1 deletes the app_device_daily_activity" do
      app_device_daily_activity = app_device_daily_activity_fixture()
      assert {:ok, %AppDeviceDailyActivity{}} = Stats.delete_app_device_daily_activity(app_device_daily_activity)
      assert_raise Ecto.NoResultsError, fn -> Stats.get_app_device_daily_activity!(app_device_daily_activity.id) end
    end

    test "change_app_device_daily_activity/1 returns a app_device_daily_activity changeset" do
      app_device_daily_activity = app_device_daily_activity_fixture()
      assert %Ecto.Changeset{} = Stats.change_app_device_daily_activity(app_device_daily_activity)
    end
  end

  describe "daily_retentions" do
    alias Acs.Stats.DailyUserRetention

    @valid_attrs %{app_id: "some app_id", date: ~D[2010-04-17], nday: 42, platform: "some platform", retention: 42}
    @update_attrs %{app_id: "some updated app_id", date: ~D[2011-05-18], nday: 43, platform: "some updated platform", retention: 43}
    @invalid_attrs %{app_id: nil, date: nil, nday: nil, platform: nil, retention: nil}

    def daily_retentions_fixture(attrs \\ %{}) do
      {:ok, daily_retentions} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Stats.create_daily_retentions()

      daily_retentions
    end

    test "list_daily_retentions/0 returns all daily_retentions" do
      daily_retentions = daily_retentions_fixture()
      assert Stats.list_daily_retentions() == [daily_retentions]
    end

    test "get_daily_retentions!/1 returns the daily_retentions with given id" do
      daily_retentions = daily_retentions_fixture()
      assert Stats.get_daily_retentions!(daily_retentions.id) == daily_retentions
    end

    test "create_daily_retentions/1 with valid data creates a daily_retentions" do
      assert {:ok, %DailyUserRetention{} = daily_retentions} = Stats.create_daily_retentions(@valid_attrs)
      assert daily_retentions.app_id == "some app_id"
      assert daily_retentions.date == ~D[2010-04-17]
      assert daily_retentions.nday == 42
      assert daily_retentions.platform == "some platform"
      assert daily_retentions.retention == 42
    end

    test "create_daily_retentions/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Stats.create_daily_retentions(@invalid_attrs)
    end

    test "update_daily_retentions/2 with valid data updates the daily_retentions" do
      daily_retentions = daily_retentions_fixture()
      assert {:ok, daily_retentions} = Stats.update_daily_retentions(daily_retentions, @update_attrs)
      assert %DailyUserRetention{} = daily_retentions
      assert daily_retentions.app_id == "some updated app_id"
      assert daily_retentions.date == ~D[2011-05-18]
      assert daily_retentions.nday == 43
      assert daily_retentions.platform == "some updated platform"
      assert daily_retentions.retention == 43
    end

    test "update_daily_retentions/2 with invalid data returns error changeset" do
      daily_retentions = daily_retentions_fixture()
      assert {:error, %Ecto.Changeset{}} = Stats.update_daily_retentions(daily_retentions, @invalid_attrs)
      assert daily_retentions == Stats.get_daily_retentions!(daily_retentions.id)
    end

    test "delete_daily_retentions/1 deletes the daily_retentions" do
      daily_retentions = daily_retentions_fixture()
      assert {:ok, %DailyUserRetention{}} = Stats.delete_daily_retentions(daily_retentions)
      assert_raise Ecto.NoResultsError, fn -> Stats.get_daily_retentions!(daily_retentions.id) end
    end

    test "change_daily_retentions/1 returns a daily_retentions changeset" do
      daily_retentions = daily_retentions_fixture()
      assert %Ecto.Changeset{} = Stats.change_daily_retentions(daily_retentions)
    end
  end

  describe "daily_user_timings" do
    alias Acs.Stats.DailyUserTiming

    @valid_attrs %{counter: 42, nmin: 42}
    @update_attrs %{counter: 43, nmin: 43}
    @invalid_attrs %{counter: nil, nmin: nil}

    def daily_user_timing_fixture(attrs \\ %{}) do
      {:ok, daily_user_timing} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Stats.create_daily_user_timing()

      daily_user_timing
    end

    test "list_daily_user_timings/0 returns all daily_user_timings" do
      daily_user_timing = daily_user_timing_fixture()
      assert Stats.list_daily_user_timings() == [daily_user_timing]
    end

    test "get_daily_user_timing!/1 returns the daily_user_timing with given id" do
      daily_user_timing = daily_user_timing_fixture()
      assert Stats.get_daily_user_timing!(daily_user_timing.id) == daily_user_timing
    end

    test "create_daily_user_timing/1 with valid data creates a daily_user_timing" do
      assert {:ok, %DailyUserTiming{} = daily_user_timing} = Stats.create_daily_user_timing(@valid_attrs)
      assert daily_user_timing.counter == 42
      assert daily_user_timing.nmin == 42
    end

    test "create_daily_user_timing/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Stats.create_daily_user_timing(@invalid_attrs)
    end

    test "update_daily_user_timing/2 with valid data updates the daily_user_timing" do
      daily_user_timing = daily_user_timing_fixture()
      assert {:ok, daily_user_timing} = Stats.update_daily_user_timing(daily_user_timing, @update_attrs)
      assert %DailyUserTiming{} = daily_user_timing
      assert daily_user_timing.counter == 43
      assert daily_user_timing.nmin == 43
    end

    test "update_daily_user_timing/2 with invalid data returns error changeset" do
      daily_user_timing = daily_user_timing_fixture()
      assert {:error, %Ecto.Changeset{}} = Stats.update_daily_user_timing(daily_user_timing, @invalid_attrs)
      assert daily_user_timing == Stats.get_daily_user_timing!(daily_user_timing.id)
    end

    test "delete_daily_user_timing/1 deletes the daily_user_timing" do
      daily_user_timing = daily_user_timing_fixture()
      assert {:ok, %DailyUserTiming{}} = Stats.delete_daily_user_timing(daily_user_timing)
      assert_raise Ecto.NoResultsError, fn -> Stats.get_daily_user_timing!(daily_user_timing.id) end
    end

    test "change_daily_user_timing/1 returns a daily_user_timing changeset" do
      daily_user_timing = daily_user_timing_fixture()
      assert %Ecto.Changeset{} = Stats.change_daily_user_timing(daily_user_timing)
    end
  end

  describe "daily_device_timings" do
    alias Acs.Stats.DailyDeviceTiming

    @valid_attrs %{counter: 42, nmin: 42}
    @update_attrs %{counter: 43, nmin: 43}
    @invalid_attrs %{counter: nil, nmin: nil}

    def daily_device_timing_fixture(attrs \\ %{}) do
      {:ok, daily_device_timing} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Stats.create_daily_device_timing()

      daily_device_timing
    end

    test "list_daily_device_timings/0 returns all daily_device_timings" do
      daily_device_timing = daily_device_timing_fixture()
      assert Stats.list_daily_device_timings() == [daily_device_timing]
    end

    test "get_daily_device_timing!/1 returns the daily_device_timing with given id" do
      daily_device_timing = daily_device_timing_fixture()
      assert Stats.get_daily_device_timing!(daily_device_timing.id) == daily_device_timing
    end

    test "create_daily_device_timing/1 with valid data creates a daily_device_timing" do
      assert {:ok, %DailyDeviceTiming{} = daily_device_timing} = Stats.create_daily_device_timing(@valid_attrs)
      assert daily_device_timing.counter == 42
      assert daily_device_timing.nmin == 42
    end

    test "create_daily_device_timing/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Stats.create_daily_device_timing(@invalid_attrs)
    end

    test "update_daily_device_timing/2 with valid data updates the daily_device_timing" do
      daily_device_timing = daily_device_timing_fixture()
      assert {:ok, daily_device_timing} = Stats.update_daily_device_timing(daily_device_timing, @update_attrs)
      assert %DailyDeviceTiming{} = daily_device_timing
      assert daily_device_timing.counter == 43
      assert daily_device_timing.nmin == 43
    end

    test "update_daily_device_timing/2 with invalid data returns error changeset" do
      daily_device_timing = daily_device_timing_fixture()
      assert {:error, %Ecto.Changeset{}} = Stats.update_daily_device_timing(daily_device_timing, @invalid_attrs)
      assert daily_device_timing == Stats.get_daily_device_timing!(daily_device_timing.id)
    end

    test "delete_daily_device_timing/1 deletes the daily_device_timing" do
      daily_device_timing = daily_device_timing_fixture()
      assert {:ok, %DailyDeviceTiming{}} = Stats.delete_daily_device_timing(daily_device_timing)
      assert_raise Ecto.NoResultsError, fn -> Stats.get_daily_device_timing!(daily_device_timing.id) end
    end

    test "change_daily_device_timing/1 returns a daily_device_timing changeset" do
      daily_device_timing = daily_device_timing_fixture()
      assert %Ecto.Changeset{} = Stats.change_daily_device_timing(daily_device_timing)
    end
  end

  describe "daily_device_retentions" do
    alias Acs.Stats.DailyDeviceRetention

    @valid_attrs %{nday: 42, retention: 42}
    @update_attrs %{nday: 43, retention: 43}
    @invalid_attrs %{nday: nil, retention: nil}

    def daily_device_retention_fixture(attrs \\ %{}) do
      {:ok, daily_device_retention} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Stats.create_daily_device_retention()

      daily_device_retention
    end

    test "list_daily_device_retentions/0 returns all daily_device_retentions" do
      daily_device_retention = daily_device_retention_fixture()
      assert Stats.list_daily_device_retentions() == [daily_device_retention]
    end

    test "get_daily_device_retention!/1 returns the daily_device_retention with given id" do
      daily_device_retention = daily_device_retention_fixture()
      assert Stats.get_daily_device_retention!(daily_device_retention.id) == daily_device_retention
    end

    test "create_daily_device_retention/1 with valid data creates a daily_device_retention" do
      assert {:ok, %DailyDeviceRetention{} = daily_device_retention} = Stats.create_daily_device_retention(@valid_attrs)
      assert daily_device_retention.nday == 42
      assert daily_device_retention.retention == 42
    end

    test "create_daily_device_retention/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Stats.create_daily_device_retention(@invalid_attrs)
    end

    test "update_daily_device_retention/2 with valid data updates the daily_device_retention" do
      daily_device_retention = daily_device_retention_fixture()
      assert {:ok, daily_device_retention} = Stats.update_daily_device_retention(daily_device_retention, @update_attrs)
      assert %DailyDeviceRetention{} = daily_device_retention
      assert daily_device_retention.nday == 43
      assert daily_device_retention.retention == 43
    end

    test "update_daily_device_retention/2 with invalid data returns error changeset" do
      daily_device_retention = daily_device_retention_fixture()
      assert {:error, %Ecto.Changeset{}} = Stats.update_daily_device_retention(daily_device_retention, @invalid_attrs)
      assert daily_device_retention == Stats.get_daily_device_retention!(daily_device_retention.id)
    end

    test "delete_daily_device_retention/1 deletes the daily_device_retention" do
      daily_device_retention = daily_device_retention_fixture()
      assert {:ok, %DailyDeviceRetention{}} = Stats.delete_daily_device_retention(daily_device_retention)
      assert_raise Ecto.NoResultsError, fn -> Stats.get_daily_device_retention!(daily_device_retention.id) end
    end

    test "change_daily_device_retention/1 returns a daily_device_retention changeset" do
      daily_device_retention = daily_device_retention_fixture()
      assert %Ecto.Changeset{} = Stats.change_daily_device_retention(daily_device_retention)
    end
  end
end
