defmodule Acs.PMalls do
  @moduledoc """
  The PMalls context.
  """

  import Ecto.Query, warn: false
  alias Acs.Repo

  alias Acs.PMalls.PMallOrder

  @doc """
  Returns the list of pmall_orders.

  ## Examples

      iex> list_pmall_orders()
      [%PMallOrder{}, ...]

  """
  def list_pmall_orders do
    Repo.all(PMallOrder)
  end

  @doc """
  Gets a single p_mall_order.

  Raises `Ecto.NoResultsError` if the P mall order does not exist.

  ## Examples

      iex> get_p_mall_order!(123)
      %PMallOrder{}

      iex> get_p_mall_order!(456)
      ** (Ecto.NoResultsError)

  """
  def get_p_mall_order!(id), do: Repo.get!(PMallOrder, id)

  @doc """
  Creates a p_mall_order.

  ## Examples

      iex> create_p_mall_order(%{field: value})
      {:ok, %PMallOrder{}}

      iex> create_p_mall_order(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_p_mall_order(attrs \\ %{}) do
    %PMallOrder{}
    |> PMallOrder.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a p_mall_order.

  ## Examples

      iex> update_p_mall_order(p_mall_order, %{field: new_value})
      {:ok, %PMallOrder{}}

      iex> update_p_mall_order(p_mall_order, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_p_mall_order(%PMallOrder{} = p_mall_order, attrs) do
    p_mall_order
    |> PMallOrder.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a PMallOrder.

  ## Examples

      iex> delete_p_mall_order(p_mall_order)
      {:ok, %PMallOrder{}}

      iex> delete_p_mall_order(p_mall_order)
      {:error, %Ecto.Changeset{}}

  """
  def delete_p_mall_order(%PMallOrder{} = p_mall_order) do
    Repo.delete(p_mall_order)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking p_mall_order changes.

  ## Examples

      iex> change_p_mall_order(p_mall_order)
      %Ecto.Changeset{source: %PMallOrder{}}

  """
  def change_p_mall_order(%PMallOrder{} = p_mall_order) do
    PMallOrder.changeset(p_mall_order, %{})
  end

  alias Acs.PMalls.PointLog

  @doc """
  Returns the list of point_logs.

  ## Examples

      iex> list_point_logs()
      [%PointLog{}, ...]

  """
  def list_point_logs do
    Repo.all(PointLog)
  end

  @doc """
  Gets a single point_log.

  Raises `Ecto.NoResultsError` if the Point log does not exist.

  ## Examples

      iex> get_point_log!(123)
      %PointLog{}

      iex> get_point_log!(456)
      ** (Ecto.NoResultsError)

  """
  def get_point_log!(id), do: Repo.get!(PointLog, id)

  @doc """
  Creates a point_log.

  ## Examples

      iex> create_point_log(%{field: value})
      {:ok, %PointLog{}}

      iex> create_point_log(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_point_log(attrs \\ %{}) do
    %PointLog{}
    |> PointLog.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a point_log.

  ## Examples

      iex> update_point_log(point_log, %{field: new_value})
      {:ok, %PointLog{}}

      iex> update_point_log(point_log, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_point_log(%PointLog{} = point_log, attrs) do
    point_log
    |> PointLog.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a PointLog.

  ## Examples

      iex> delete_point_log(point_log)
      {:ok, %PointLog{}}

      iex> delete_point_log(point_log)
      {:error, %Ecto.Changeset{}}

  """
  def delete_point_log(%PointLog{} = point_log) do
    Repo.delete(point_log)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking point_log changes.

  ## Examples

      iex> change_point_log(point_log)
      %Ecto.Changeset{source: %PointLog{}}

  """
  def change_point_log(%PointLog{} = point_log) do
    PointLog.changeset(point_log, %{})
  end

  alias Acs.PMalls.PMallGoods

  @doc """
  Returns the list of pmall_goods.

  ## Examples

      iex> list_pmall_goods()
      [%PMallGoods{}, ...]

  """
  def list_pmall_goods do
    Repo.all(PMallGoods)
  end

  @doc """
  Gets a single p_mall_goods.

  Raises `Ecto.NoResultsError` if the P mall goods does not exist.

  ## Examples

      iex> get_p_mall_goods!(123)
      %PMallGoods{}

      iex> get_p_mall_goods!(456)
      ** (Ecto.NoResultsError)

  """
  def get_p_mall_goods!(id), do: Repo.get!(PMallGoods, id)

  @doc """
  Creates a p_mall_goods.

  ## Examples

      iex> create_p_mall_goods(%{field: value})
      {:ok, %PMallGoods{}}

      iex> create_p_mall_goods(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_p_mall_goods(attrs \\ %{}) do
    %PMallGoods{}
    |> PMallGoods.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a p_mall_goods.

  ## Examples

      iex> update_p_mall_goods(p_mall_goods, %{field: new_value})
      {:ok, %PMallGoods{}}

      iex> update_p_mall_goods(p_mall_goods, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_p_mall_goods(%PMallGoods{} = p_mall_goods, attrs) do
    p_mall_goods
    |> PMallGoods.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a PMallGoods.

  ## Examples

      iex> delete_p_mall_goods(p_mall_goods)
      {:ok, %PMallGoods{}}

      iex> delete_p_mall_goods(p_mall_goods)
      {:error, %Ecto.Changeset{}}

  """
  def delete_p_mall_goods(%PMallGoods{} = p_mall_goods) do
    Repo.delete(p_mall_goods)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking p_mall_goods changes.

  ## Examples

      iex> change_p_mall_goods(p_mall_goods)
      %Ecto.Changeset{source: %PMallGoods{}}

  """
  def change_p_mall_goods(%PMallGoods{} = p_mall_goods) do
    PMallGoods.changeset(p_mall_goods, %{})
  end

  alias Acs.PMalls.TaskBar

  @doc """
  Returns the list of pmall_task_bars.

  ## Examples

      iex> list_pmall_task_bars()
      [%TaskBar{}, ...]

  """
  def list_pmall_task_bars do
    Repo.all(TaskBar)
  end

  @doc """
  Gets a single task_bar.

  Raises `Ecto.NoResultsError` if the Task bar does not exist.

  ## Examples

      iex> get_task_bar!(123)
      %TaskBar{}

      iex> get_task_bar!(456)
      ** (Ecto.NoResultsError)

  """
  def get_task_bar!(id), do: Repo.get!(TaskBar, id)

  @doc """
  Creates a task_bar.

  ## Examples

      iex> create_task_bar(%{field: value})
      {:ok, %TaskBar{}}

      iex> create_task_bar(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_task_bar(attrs \\ %{}) do
    %TaskBar{}
    |> TaskBar.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a task_bar.

  ## Examples

      iex> update_task_bar(task_bar, %{field: new_value})
      {:ok, %TaskBar{}}

      iex> update_task_bar(task_bar, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_task_bar(%TaskBar{} = task_bar, attrs) do
    task_bar
    |> TaskBar.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a TaskBar.

  ## Examples

      iex> delete_task_bar(task_bar)
      {:ok, %TaskBar{}}

      iex> delete_task_bar(task_bar)
      {:error, %Ecto.Changeset{}}

  """
  def delete_task_bar(%TaskBar{} = task_bar) do
    Repo.delete(task_bar)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking task_bar changes.

  ## Examples

      iex> change_task_bar(task_bar)
      %Ecto.Changeset{source: %TaskBar{}}

  """
  def change_task_bar(%TaskBar{} = task_bar) do
    TaskBar.changeset(task_bar, %{})
  end
end
