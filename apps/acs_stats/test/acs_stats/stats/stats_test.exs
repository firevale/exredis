defmodule AcsStats.StatsTest do
  use AcsStats.DataCase

  alias AcsStats.Stats

  describe "stats_daily_device_retentions" do
    alias AcsStats.Stats.DailyDeviceRetention

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def daily_device_retention_fixture(attrs \\ %{}) do
      {:ok, daily_device_retention} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Stats.create_daily_device_retention()

      daily_device_retention
    end

    test "list_stats_daily_device_retentions/0 returns all stats_daily_device_retentions" do
      daily_device_retention = daily_device_retention_fixture()
      assert Stats.list_stats_daily_device_retentions() == [daily_device_retention]
    end

    test "get_daily_device_retention!/1 returns the daily_device_retention with given id" do
      daily_device_retention = daily_device_retention_fixture()
      assert Stats.get_daily_device_retention!(daily_device_retention.id) == daily_device_retention
    end

    test "create_daily_device_retention/1 with valid data creates a daily_device_retention" do
      assert {:ok, %DailyDeviceRetention{} = daily_device_retention} = Stats.create_daily_device_retention(@valid_attrs)
    end

    test "create_daily_device_retention/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Stats.create_daily_device_retention(@invalid_attrs)
    end

    test "update_daily_device_retention/2 with valid data updates the daily_device_retention" do
      daily_device_retention = daily_device_retention_fixture()
      assert {:ok, daily_device_retention} = Stats.update_daily_device_retention(daily_device_retention, @update_attrs)
      assert %DailyDeviceRetention{} = daily_device_retention
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

  describe "stats_daily_device_timings" do
    alias AcsStats.Stats.DailyDeviceTiming

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def daily_device_timing_fixture(attrs \\ %{}) do
      {:ok, daily_device_timing} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Stats.create_daily_device_timing()

      daily_device_timing
    end

    test "list_stats_daily_device_timings/0 returns all stats_daily_device_timings" do
      daily_device_timing = daily_device_timing_fixture()
      assert Stats.list_stats_daily_device_timings() == [daily_device_timing]
    end

    test "get_daily_device_timing!/1 returns the daily_device_timing with given id" do
      daily_device_timing = daily_device_timing_fixture()
      assert Stats.get_daily_device_timing!(daily_device_timing.id) == daily_device_timing
    end

    test "create_daily_device_timing/1 with valid data creates a daily_device_timing" do
      assert {:ok, %DailyDeviceTiming{} = daily_device_timing} = Stats.create_daily_device_timing(@valid_attrs)
    end

    test "create_daily_device_timing/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Stats.create_daily_device_timing(@invalid_attrs)
    end

    test "update_daily_device_timing/2 with valid data updates the daily_device_timing" do
      daily_device_timing = daily_device_timing_fixture()
      assert {:ok, daily_device_timing} = Stats.update_daily_device_timing(daily_device_timing, @update_attrs)
      assert %DailyDeviceTiming{} = daily_device_timing
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

  describe "stats_daily_reports" do
    alias AcsStats.Stats.DailyReport

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def daily_report_fixture(attrs \\ %{}) do
      {:ok, daily_report} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Stats.create_daily_report()

      daily_report
    end

    test "list_stats_daily_reports/0 returns all stats_daily_reports" do
      daily_report = daily_report_fixture()
      assert Stats.list_stats_daily_reports() == [daily_report]
    end

    test "get_daily_report!/1 returns the daily_report with given id" do
      daily_report = daily_report_fixture()
      assert Stats.get_daily_report!(daily_report.id) == daily_report
    end

    test "create_daily_report/1 with valid data creates a daily_report" do
      assert {:ok, %DailyReport{} = daily_report} = Stats.create_daily_report(@valid_attrs)
    end

    test "create_daily_report/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Stats.create_daily_report(@invalid_attrs)
    end

    test "update_daily_report/2 with valid data updates the daily_report" do
      daily_report = daily_report_fixture()
      assert {:ok, daily_report} = Stats.update_daily_report(daily_report, @update_attrs)
      assert %DailyReport{} = daily_report
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

  describe "stats_daily_user_retentions" do
    alias AcsStats.Stats.DailyUserRetention

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def daily_user_retention_fixture(attrs \\ %{}) do
      {:ok, daily_user_retention} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Stats.create_daily_user_retention()

      daily_user_retention
    end

    test "list_stats_daily_user_retentions/0 returns all stats_daily_user_retentions" do
      daily_user_retention = daily_user_retention_fixture()
      assert Stats.list_stats_daily_user_retentions() == [daily_user_retention]
    end

    test "get_daily_user_retention!/1 returns the daily_user_retention with given id" do
      daily_user_retention = daily_user_retention_fixture()
      assert Stats.get_daily_user_retention!(daily_user_retention.id) == daily_user_retention
    end

    test "create_daily_user_retention/1 with valid data creates a daily_user_retention" do
      assert {:ok, %DailyUserRetention{} = daily_user_retention} = Stats.create_daily_user_retention(@valid_attrs)
    end

    test "create_daily_user_retention/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Stats.create_daily_user_retention(@invalid_attrs)
    end

    test "update_daily_user_retention/2 with valid data updates the daily_user_retention" do
      daily_user_retention = daily_user_retention_fixture()
      assert {:ok, daily_user_retention} = Stats.update_daily_user_retention(daily_user_retention, @update_attrs)
      assert %DailyUserRetention{} = daily_user_retention
    end

    test "update_daily_user_retention/2 with invalid data returns error changeset" do
      daily_user_retention = daily_user_retention_fixture()
      assert {:error, %Ecto.Changeset{}} = Stats.update_daily_user_retention(daily_user_retention, @invalid_attrs)
      assert daily_user_retention == Stats.get_daily_user_retention!(daily_user_retention.id)
    end

    test "delete_daily_user_retention/1 deletes the daily_user_retention" do
      daily_user_retention = daily_user_retention_fixture()
      assert {:ok, %DailyUserRetention{}} = Stats.delete_daily_user_retention(daily_user_retention)
      assert_raise Ecto.NoResultsError, fn -> Stats.get_daily_user_retention!(daily_user_retention.id) end
    end

    test "change_daily_user_retention/1 returns a daily_user_retention changeset" do
      daily_user_retention = daily_user_retention_fixture()
      assert %Ecto.Changeset{} = Stats.change_daily_user_retention(daily_user_retention)
    end
  end

  describe "stats_daily_user_timings" do
    alias AcsStats.Stats.DailyUserTiming

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def daily_user_timing_fixture(attrs \\ %{}) do
      {:ok, daily_user_timing} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Stats.create_daily_user_timing()

      daily_user_timing
    end

    test "list_stats_daily_user_timings/0 returns all stats_daily_user_timings" do
      daily_user_timing = daily_user_timing_fixture()
      assert Stats.list_stats_daily_user_timings() == [daily_user_timing]
    end

    test "get_daily_user_timing!/1 returns the daily_user_timing with given id" do
      daily_user_timing = daily_user_timing_fixture()
      assert Stats.get_daily_user_timing!(daily_user_timing.id) == daily_user_timing
    end

    test "create_daily_user_timing/1 with valid data creates a daily_user_timing" do
      assert {:ok, %DailyUserTiming{} = daily_user_timing} = Stats.create_daily_user_timing(@valid_attrs)
    end

    test "create_daily_user_timing/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Stats.create_daily_user_timing(@invalid_attrs)
    end

    test "update_daily_user_timing/2 with valid data updates the daily_user_timing" do
      daily_user_timing = daily_user_timing_fixture()
      assert {:ok, daily_user_timing} = Stats.update_daily_user_timing(daily_user_timing, @update_attrs)
      assert %DailyUserTiming{} = daily_user_timing
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
end
