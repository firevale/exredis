defmodule Acs.Stats do
  @moduledoc """
  The boundary for the Stats system.
  """

  import Ecto.Query, warn: false
  alias Acs.Repo

  alias Acs.Stats.DailyReport

  @doc """
  Returns the list of daily_reports.

  ## Examples

      iex> list_daily_reports()
      [%DailyReport{}, ...]

  """
  def list_daily_reports do
    Repo.all(DailyReport)
  end

  @doc """
  Gets a single daily_report.

  Raises `Ecto.NoResultsError` if the Daily report does not exist.

  ## Examples

      iex> get_daily_report!(123)
      %DailyReport{}

      iex> get_daily_report!(456)
      ** (Ecto.NoResultsError)

  """
  def get_daily_report!(id), do: Repo.get!(DailyReport, id)

  @doc """
  Creates a daily_report.

  ## Examples

      iex> create_daily_report(%{field: value})
      {:ok, %DailyReport{}}

      iex> create_daily_report(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_daily_report(attrs \\ %{}) do
    %DailyReport{}
    |> DailyReport.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a daily_report.

  ## Examples

      iex> update_daily_report(daily_report, %{field: new_value})
      {:ok, %DailyReport{}}

      iex> update_daily_report(daily_report, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_daily_report(%DailyReport{} = daily_report, attrs) do
    daily_report
    |> DailyReport.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a DailyReport.

  ## Examples

      iex> delete_daily_report(daily_report)
      {:ok, %DailyReport{}}

      iex> delete_daily_report(daily_report)
      {:error, %Ecto.Changeset{}}

  """
  def delete_daily_report(%DailyReport{} = daily_report) do
    Repo.delete(daily_report)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking daily_report changes.

  ## Examples

      iex> change_daily_report(daily_report)
      %Ecto.Changeset{source: %DailyReport{}}

  """
  def change_daily_report(%DailyReport{} = daily_report) do
    DailyReport.changeset(daily_report, %{})
  end

  alias Acs.Stats.Device

  @doc """
  Returns the list of devices.

  ## Examples

      iex> list_devices()
      [%Device{}, ...]

  """
  def list_devices do
    Repo.all(Device)
  end

  @doc """
  Gets a single device.

  Raises `Ecto.NoResultsError` if the Device does not exist.

  ## Examples

      iex> get_device!(123)
      %Device{}

      iex> get_device!(456)
      ** (Ecto.NoResultsError)

  """
  def get_device!(id), do: Repo.get!(Device, id)

  @doc """
  Creates a device.

  ## Examples

      iex> create_device(%{field: value})
      {:ok, %Device{}}

      iex> create_device(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_device(attrs \\ %{}) do
    %Device{}
    |> Device.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a device.

  ## Examples

      iex> update_device(device, %{field: new_value})
      {:ok, %Device{}}

      iex> update_device(device, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_device(%Device{} = device, attrs) do
    device
    |> Device.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Device.

  ## Examples

      iex> delete_device(device)
      {:ok, %Device{}}

      iex> delete_device(device)
      {:error, %Ecto.Changeset{}}

  """
  def delete_device(%Device{} = device) do
    Repo.delete(device)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking device changes.

  ## Examples

      iex> change_device(device)
      %Ecto.Changeset{source: %Device{}}

  """
  def change_device(%Device{} = device) do
    Device.changeset(device, %{})
  end

  alias Acs.Stats.AppDevice

  @doc """
  Returns the list of app_devices.

  ## Examples

      iex> list_app_devices()
      [%AppDevice{}, ...]

  """
  def list_app_devices do
    Repo.all(AppDevice)
  end

  @doc """
  Gets a single app_device.

  Raises `Ecto.NoResultsError` if the App device does not exist.

  ## Examples

      iex> get_app_device!(123)
      %AppDevice{}

      iex> get_app_device!(456)
      ** (Ecto.NoResultsError)

  """
  def get_app_device!(id), do: Repo.get!(AppDevice, id)

  @doc """
  Creates a app_device.

  ## Examples

      iex> create_app_device(%{field: value})
      {:ok, %AppDevice{}}

      iex> create_app_device(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_app_device(attrs \\ %{}) do
    %AppDevice{}
    |> AppDevice.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a app_device.

  ## Examples

      iex> update_app_device(app_device, %{field: new_value})
      {:ok, %AppDevice{}}

      iex> update_app_device(app_device, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_app_device(%AppDevice{} = app_device, attrs) do
    app_device
    |> AppDevice.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a AppDevice.

  ## Examples

      iex> delete_app_device(app_device)
      {:ok, %AppDevice{}}

      iex> delete_app_device(app_device)
      {:error, %Ecto.Changeset{}}

  """
  def delete_app_device(%AppDevice{} = app_device) do
    Repo.delete(app_device)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking app_device changes.

  ## Examples

      iex> change_app_device(app_device)
      %Ecto.Changeset{source: %AppDevice{}}

  """
  def change_app_device(%AppDevice{} = app_device) do
    AppDevice.changeset(app_device, %{})
  end

  alias Acs.Stats.AppUser

  @doc """
  Returns the list of app_users.

  ## Examples

      iex> list_app_users()
      [%AppUser{}, ...]

  """
  def list_app_users do
    Repo.all(AppUser)
  end

  @doc """
  Gets a single app_user.

  Raises `Ecto.NoResultsError` if the App user does not exist.

  ## Examples

      iex> get_app_user!(123)
      %AppUser{}

      iex> get_app_user!(456)
      ** (Ecto.NoResultsError)

  """
  def get_app_user!(id), do: Repo.get!(AppUser, id)

  @doc """
  Creates a app_user.

  ## Examples

      iex> create_app_user(%{field: value})
      {:ok, %AppUser{}}

      iex> create_app_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_app_user(attrs \\ %{}) do
    %AppUser{}
    |> AppUser.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a app_user.

  ## Examples

      iex> update_app_user(app_user, %{field: new_value})
      {:ok, %AppUser{}}

      iex> update_app_user(app_user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_app_user(%AppUser{} = app_user, attrs) do
    app_user
    |> AppUser.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a AppUser.

  ## Examples

      iex> delete_app_user(app_user)
      {:ok, %AppUser{}}

      iex> delete_app_user(app_user)
      {:error, %Ecto.Changeset{}}

  """
  def delete_app_user(%AppUser{} = app_user) do
    Repo.delete(app_user)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking app_user changes.

  ## Examples

      iex> change_app_user(app_user)
      %Ecto.Changeset{source: %AppUser{}}

  """
  def change_app_user(%AppUser{} = app_user) do
    AppUser.changeset(app_user, %{})
  end

  alias Acs.Stats.AppUserDailyActivity

  @doc """
  Returns the list of app_usrs_aaa.

  ## Examples

      iex> list_app_usrs_aaa()
      [%AppUserDailyActivity{}, ...]

  """
  def list_app_usrs_aaa do
    Repo.all(AppUserDailyActivity)
  end

  @doc """
  Gets a single app_user_daily_activity.

  Raises `Ecto.NoResultsError` if the App user daily activity does not exist.

  ## Examples

      iex> get_app_user_daily_activity!(123)
      %AppUserDailyActivity{}

      iex> get_app_user_daily_activity!(456)
      ** (Ecto.NoResultsError)

  """
  def get_app_user_daily_activity!(id), do: Repo.get!(AppUserDailyActivity, id)

  @doc """
  Creates a app_user_daily_activity.

  ## Examples

      iex> create_app_user_daily_activity(%{field: value})
      {:ok, %AppUserDailyActivity{}}

      iex> create_app_user_daily_activity(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_app_user_daily_activity(attrs \\ %{}) do
    %AppUserDailyActivity{}
    |> AppUserDailyActivity.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a app_user_daily_activity.

  ## Examples

      iex> update_app_user_daily_activity(app_user_daily_activity, %{field: new_value})
      {:ok, %AppUserDailyActivity{}}

      iex> update_app_user_daily_activity(app_user_daily_activity, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_app_user_daily_activity(%AppUserDailyActivity{} = app_user_daily_activity, attrs) do
    app_user_daily_activity
    |> AppUserDailyActivity.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a AppUserDailyActivity.

  ## Examples

      iex> delete_app_user_daily_activity(app_user_daily_activity)
      {:ok, %AppUserDailyActivity{}}

      iex> delete_app_user_daily_activity(app_user_daily_activity)
      {:error, %Ecto.Changeset{}}

  """
  def delete_app_user_daily_activity(%AppUserDailyActivity{} = app_user_daily_activity) do
    Repo.delete(app_user_daily_activity)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking app_user_daily_activity changes.

  ## Examples

      iex> change_app_user_daily_activity(app_user_daily_activity)
      %Ecto.Changeset{source: %AppUserDailyActivity{}}

  """
  def change_app_user_daily_activity(%AppUserDailyActivity{} = app_user_daily_activity) do
    AppUserDailyActivity.changeset(app_user_daily_activity, %{})
  end

  alias Acs.Stats.AppDeviceDailyActivity

  @doc """
  Returns the list of app_usrs_aaa_aaa.

  ## Examples

      iex> list_app_usrs_aaa_aaa()
      [%AppDeviceDailyActivity{}, ...]

  """
  def list_app_usrs_aaa_aaa do
    Repo.all(AppDeviceDailyActivity)
  end

  @doc """
  Gets a single app_device_daily_activity.

  Raises `Ecto.NoResultsError` if the App device daily activity does not exist.

  ## Examples

      iex> get_app_device_daily_activity!(123)
      %AppDeviceDailyActivity{}

      iex> get_app_device_daily_activity!(456)
      ** (Ecto.NoResultsError)

  """
  def get_app_device_daily_activity!(id), do: Repo.get!(AppDeviceDailyActivity, id)

  @doc """
  Creates a app_device_daily_activity.

  ## Examples

      iex> create_app_device_daily_activity(%{field: value})
      {:ok, %AppDeviceDailyActivity{}}

      iex> create_app_device_daily_activity(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_app_device_daily_activity(attrs \\ %{}) do
    %AppDeviceDailyActivity{}
    |> AppDeviceDailyActivity.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a app_device_daily_activity.

  ## Examples

      iex> update_app_device_daily_activity(app_device_daily_activity, %{field: new_value})
      {:ok, %AppDeviceDailyActivity{}}

      iex> update_app_device_daily_activity(app_device_daily_activity, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_app_device_daily_activity(%AppDeviceDailyActivity{} = app_device_daily_activity, attrs) do
    app_device_daily_activity
    |> AppDeviceDailyActivity.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a AppDeviceDailyActivity.

  ## Examples

      iex> delete_app_device_daily_activity(app_device_daily_activity)
      {:ok, %AppDeviceDailyActivity{}}

      iex> delete_app_device_daily_activity(app_device_daily_activity)
      {:error, %Ecto.Changeset{}}

  """
  def delete_app_device_daily_activity(%AppDeviceDailyActivity{} = app_device_daily_activity) do
    Repo.delete(app_device_daily_activity)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking app_device_daily_activity changes.

  ## Examples

      iex> change_app_device_daily_activity(app_device_daily_activity)
      %Ecto.Changeset{source: %AppDeviceDailyActivity{}}

  """
  def change_app_device_daily_activity(%AppDeviceDailyActivity{} = app_device_daily_activity) do
    AppDeviceDailyActivity.changeset(app_device_daily_activity, %{})
  end

  alias Acs.Stats.DailyUserRetention

  @doc """
  Returns the list of daily_retentions.

  ## Examples

      iex> list_daily_retentions()
      [%DailyUserRetention{}, ...]

  """
  def list_daily_retentions do
    Repo.all(DailyUserRetention)
  end

  @doc """
  Gets a single daily_retentions.

  Raises `Ecto.NoResultsError` if the Daily retentions does not exist.

  ## Examples

      iex> get_daily_retentions!(123)
      %DailyUserRetention{}

      iex> get_daily_retentions!(456)
      ** (Ecto.NoResultsError)

  """
  def get_daily_retentions!(id), do: Repo.get!(DailyUserRetention, id)

  @doc """
  Creates a daily_retentions.

  ## Examples

      iex> create_daily_retentions(%{field: value})
      {:ok, %DailyUserRetention{}}

      iex> create_daily_retentions(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_daily_retentions(attrs \\ %{}) do
    %DailyUserRetention{}
    |> DailyUserRetention.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a daily_retentions.

  ## Examples

      iex> update_daily_retentions(daily_retentions, %{field: new_value})
      {:ok, %DailyUserRetention{}}

      iex> update_daily_retentions(daily_retentions, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_daily_retentions(%DailyUserRetention{} = daily_retentions, attrs) do
    daily_retentions
    |> DailyUserRetention.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a DailyUserRetention.

  ## Examples

      iex> delete_daily_retentions(daily_retentions)
      {:ok, %DailyUserRetention{}}

      iex> delete_daily_retentions(daily_retentions)
      {:error, %Ecto.Changeset{}}

  """
  def delete_daily_retentions(%DailyUserRetention{} = daily_retentions) do
    Repo.delete(daily_retentions)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking daily_retentions changes.

  ## Examples

      iex> change_daily_retentions(daily_retentions)
      %Ecto.Changeset{source: %DailyUserRetention{}}

  """
  def change_daily_retentions(%DailyUserRetention{} = daily_retentions) do
    DailyUserRetention.changeset(daily_retentions, %{})
  end

  alias Acs.Stats.DailyUserTiming

  @doc """
  Returns the list of daily_user_timings.

  ## Examples

      iex> list_daily_user_timings()
      [%DailyUserTiming{}, ...]

  """
  def list_daily_user_timings do
    Repo.all(DailyUserTiming)
  end

  @doc """
  Gets a single daily_user_timing.

  Raises `Ecto.NoResultsError` if the Daily user timing does not exist.

  ## Examples

      iex> get_daily_user_timing!(123)
      %DailyUserTiming{}

      iex> get_daily_user_timing!(456)
      ** (Ecto.NoResultsError)

  """
  def get_daily_user_timing!(id), do: Repo.get!(DailyUserTiming, id)

  @doc """
  Creates a daily_user_timing.

  ## Examples

      iex> create_daily_user_timing(%{field: value})
      {:ok, %DailyUserTiming{}}

      iex> create_daily_user_timing(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_daily_user_timing(attrs \\ %{}) do
    %DailyUserTiming{}
    |> DailyUserTiming.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a daily_user_timing.

  ## Examples

      iex> update_daily_user_timing(daily_user_timing, %{field: new_value})
      {:ok, %DailyUserTiming{}}

      iex> update_daily_user_timing(daily_user_timing, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_daily_user_timing(%DailyUserTiming{} = daily_user_timing, attrs) do
    daily_user_timing
    |> DailyUserTiming.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a DailyUserTiming.

  ## Examples

      iex> delete_daily_user_timing(daily_user_timing)
      {:ok, %DailyUserTiming{}}

      iex> delete_daily_user_timing(daily_user_timing)
      {:error, %Ecto.Changeset{}}

  """
  def delete_daily_user_timing(%DailyUserTiming{} = daily_user_timing) do
    Repo.delete(daily_user_timing)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking daily_user_timing changes.

  ## Examples

      iex> change_daily_user_timing(daily_user_timing)
      %Ecto.Changeset{source: %DailyUserTiming{}}

  """
  def change_daily_user_timing(%DailyUserTiming{} = daily_user_timing) do
    DailyUserTiming.changeset(daily_user_timing, %{})
  end

  alias Acs.Stats.DailyDeviceTiming

  @doc """
  Returns the list of daily_device_timings.

  ## Examples

      iex> list_daily_device_timings()
      [%DailyDeviceTiming{}, ...]

  """
  def list_daily_device_timings do
    Repo.all(DailyDeviceTiming)
  end

  @doc """
  Gets a single daily_device_timing.

  Raises `Ecto.NoResultsError` if the Daily device timing does not exist.

  ## Examples

      iex> get_daily_device_timing!(123)
      %DailyDeviceTiming{}

      iex> get_daily_device_timing!(456)
      ** (Ecto.NoResultsError)

  """
  def get_daily_device_timing!(id), do: Repo.get!(DailyDeviceTiming, id)

  @doc """
  Creates a daily_device_timing.

  ## Examples

      iex> create_daily_device_timing(%{field: value})
      {:ok, %DailyDeviceTiming{}}

      iex> create_daily_device_timing(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_daily_device_timing(attrs \\ %{}) do
    %DailyDeviceTiming{}
    |> DailyDeviceTiming.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a daily_device_timing.

  ## Examples

      iex> update_daily_device_timing(daily_device_timing, %{field: new_value})
      {:ok, %DailyDeviceTiming{}}

      iex> update_daily_device_timing(daily_device_timing, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_daily_device_timing(%DailyDeviceTiming{} = daily_device_timing, attrs) do
    daily_device_timing
    |> DailyDeviceTiming.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a DailyDeviceTiming.

  ## Examples

      iex> delete_daily_device_timing(daily_device_timing)
      {:ok, %DailyDeviceTiming{}}

      iex> delete_daily_device_timing(daily_device_timing)
      {:error, %Ecto.Changeset{}}

  """
  def delete_daily_device_timing(%DailyDeviceTiming{} = daily_device_timing) do
    Repo.delete(daily_device_timing)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking daily_device_timing changes.

  ## Examples

      iex> change_daily_device_timing(daily_device_timing)
      %Ecto.Changeset{source: %DailyDeviceTiming{}}

  """
  def change_daily_device_timing(%DailyDeviceTiming{} = daily_device_timing) do
    DailyDeviceTiming.changeset(daily_device_timing, %{})
  end

  alias Acs.Stats.DailyDeviceRetention

  @doc """
  Returns the list of daily_device_retentions.

  ## Examples

      iex> list_daily_device_retentions()
      [%DailyDeviceRetention{}, ...]

  """
  def list_daily_device_retentions do
    Repo.all(DailyDeviceRetention)
  end

  @doc """
  Gets a single daily_device_retention.

  Raises `Ecto.NoResultsError` if the Daily device retention does not exist.

  ## Examples

      iex> get_daily_device_retention!(123)
      %DailyDeviceRetention{}

      iex> get_daily_device_retention!(456)
      ** (Ecto.NoResultsError)

  """
  def get_daily_device_retention!(id), do: Repo.get!(DailyDeviceRetention, id)

  @doc """
  Creates a daily_device_retention.

  ## Examples

      iex> create_daily_device_retention(%{field: value})
      {:ok, %DailyDeviceRetention{}}

      iex> create_daily_device_retention(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_daily_device_retention(attrs \\ %{}) do
    %DailyDeviceRetention{}
    |> DailyDeviceRetention.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a daily_device_retention.

  ## Examples

      iex> update_daily_device_retention(daily_device_retention, %{field: new_value})
      {:ok, %DailyDeviceRetention{}}

      iex> update_daily_device_retention(daily_device_retention, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_daily_device_retention(%DailyDeviceRetention{} = daily_device_retention, attrs) do
    daily_device_retention
    |> DailyDeviceRetention.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a DailyDeviceRetention.

  ## Examples

      iex> delete_daily_device_retention(daily_device_retention)
      {:ok, %DailyDeviceRetention{}}

      iex> delete_daily_device_retention(daily_device_retention)
      {:error, %Ecto.Changeset{}}

  """
  def delete_daily_device_retention(%DailyDeviceRetention{} = daily_device_retention) do
    Repo.delete(daily_device_retention)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking daily_device_retention changes.

  ## Examples

      iex> change_daily_device_retention(daily_device_retention)
      %Ecto.Changeset{source: %DailyDeviceRetention{}}

  """
  def change_daily_device_retention(%DailyDeviceRetention{} = daily_device_retention) do
    DailyDeviceRetention.changeset(daily_device_retention, %{})
  end
end
