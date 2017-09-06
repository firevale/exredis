defmodule AcsStats.Devices do
  @moduledoc """
  The Devices context.
  """

  import Ecto.Query, warn: false
  alias AcsStats.Repo

  alias AcsStats.Devices.AppDevice

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

  alias AcsStats.Devices.AppDeviceDailyActivity

  @doc """
  Returns the list of app_device_daily_activities.

  ## Examples

      iex> list_app_device_daily_activities()
      [%AppDeviceDailyActivity{}, ...]

  """
  def list_app_device_daily_activities do
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

  alias AcsStats.Devices.DeviceInfo

  @doc """
  Returns the list of device_infos.

  ## Examples

      iex> list_device_infos()
      [%DeviceInfo{}, ...]

  """
  def list_device_infos do
    Repo.all(DeviceInfo)
  end

  @doc """
  Gets a single device_info.

  Raises `Ecto.NoResultsError` if the Device info does not exist.

  ## Examples

      iex> get_device_info!(123)
      %DeviceInfo{}

      iex> get_device_info!(456)
      ** (Ecto.NoResultsError)

  """
  def get_device_info!(id), do: Repo.get!(DeviceInfo, id)

  @doc """
  Creates a device_info.

  ## Examples

      iex> create_device_info(%{field: value})
      {:ok, %DeviceInfo{}}

      iex> create_device_info(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_device_info(attrs \\ %{}) do
    %DeviceInfo{}
    |> DeviceInfo.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a device_info.

  ## Examples

      iex> update_device_info(device_info, %{field: new_value})
      {:ok, %DeviceInfo{}}

      iex> update_device_info(device_info, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_device_info(%DeviceInfo{} = device_info, attrs) do
    device_info
    |> DeviceInfo.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a DeviceInfo.

  ## Examples

      iex> delete_device_info(device_info)
      {:ok, %DeviceInfo{}}

      iex> delete_device_info(device_info)
      {:error, %Ecto.Changeset{}}

  """
  def delete_device_info(%DeviceInfo{} = device_info) do
    Repo.delete(device_info)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking device_info changes.

  ## Examples

      iex> change_device_info(device_info)
      %Ecto.Changeset{source: %DeviceInfo{}}

  """
  def change_device_info(%DeviceInfo{} = device_info) do
    DeviceInfo.changeset(device_info, %{})
  end
end
