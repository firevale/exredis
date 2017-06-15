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
end
