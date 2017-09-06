defmodule AcsStats.Stats do
  @moduledoc """
  The Stats context.
  """

  import Ecto.Query, warn: false
  alias AcsStats.Repo

  alias AcsStats.Stats.DailyDeviceRetention

  @doc """
  Returns the list of stats_daily_device_retentions.

  ## Examples

      iex> list_stats_daily_device_retentions()
      [%DailyDeviceRetention{}, ...]

  """
  def list_stats_daily_device_retentions do
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

  alias AcsStats.Stats.DailyDeviceTiming

  @doc """
  Returns the list of stats_daily_device_timings.

  ## Examples

      iex> list_stats_daily_device_timings()
      [%DailyDeviceTiming{}, ...]

  """
  def list_stats_daily_device_timings do
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

  alias AcsStats.Stats.DailyReport

  @doc """
  Returns the list of stats_daily_reports.

  ## Examples

      iex> list_stats_daily_reports()
      [%DailyReport{}, ...]

  """
  def list_stats_daily_reports do
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

  alias AcsStats.Stats.DailyUserRetention

  @doc """
  Returns the list of stats_daily_user_retentions.

  ## Examples

      iex> list_stats_daily_user_retentions()
      [%DailyUserRetention{}, ...]

  """
  def list_stats_daily_user_retentions do
    Repo.all(DailyUserRetention)
  end

  @doc """
  Gets a single daily_user_retention.

  Raises `Ecto.NoResultsError` if the Daily user retention does not exist.

  ## Examples

      iex> get_daily_user_retention!(123)
      %DailyUserRetention{}

      iex> get_daily_user_retention!(456)
      ** (Ecto.NoResultsError)

  """
  def get_daily_user_retention!(id), do: Repo.get!(DailyUserRetention, id)

  @doc """
  Creates a daily_user_retention.

  ## Examples

      iex> create_daily_user_retention(%{field: value})
      {:ok, %DailyUserRetention{}}

      iex> create_daily_user_retention(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_daily_user_retention(attrs \\ %{}) do
    %DailyUserRetention{}
    |> DailyUserRetention.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a daily_user_retention.

  ## Examples

      iex> update_daily_user_retention(daily_user_retention, %{field: new_value})
      {:ok, %DailyUserRetention{}}

      iex> update_daily_user_retention(daily_user_retention, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_daily_user_retention(%DailyUserRetention{} = daily_user_retention, attrs) do
    daily_user_retention
    |> DailyUserRetention.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a DailyUserRetention.

  ## Examples

      iex> delete_daily_user_retention(daily_user_retention)
      {:ok, %DailyUserRetention{}}

      iex> delete_daily_user_retention(daily_user_retention)
      {:error, %Ecto.Changeset{}}

  """
  def delete_daily_user_retention(%DailyUserRetention{} = daily_user_retention) do
    Repo.delete(daily_user_retention)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking daily_user_retention changes.

  ## Examples

      iex> change_daily_user_retention(daily_user_retention)
      %Ecto.Changeset{source: %DailyUserRetention{}}

  """
  def change_daily_user_retention(%DailyUserRetention{} = daily_user_retention) do
    DailyUserRetention.changeset(daily_user_retention, %{})
  end

  alias AcsStats.Stats.DailyUserTiming

  @doc """
  Returns the list of stats_daily_user_timings.

  ## Examples

      iex> list_stats_daily_user_timings()
      [%DailyUserTiming{}, ...]

  """
  def list_stats_daily_user_timings do
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
end
