defmodule Acs.Malls do
  @moduledoc """
  The Malls context.
  """

  import Ecto.Query, warn: false
  alias Acs.Repo

  alias Acs.Malls.Mall

  @doc """
  Returns the list of malls.

  ## Examples

      iex> list_malls()
      [%Mall{}, ...]

  """
  def list_malls do
    Repo.all(Mall)
  end

  @doc """
  Gets a single mall.

  Raises `Ecto.NoResultsError` if the Mall does not exist.

  ## Examples

      iex> get_mall!(123)
      %Mall{}

      iex> get_mall!(456)
      ** (Ecto.NoResultsError)

  """
  def get_mall!(id), do: Repo.get!(Mall, id)

  @doc """
  Creates a mall.

  ## Examples

      iex> create_mall(%{field: value})
      {:ok, %Mall{}}

      iex> create_mall(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_mall(attrs \\ %{}) do
    %Mall{}
    |> Mall.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a mall.

  ## Examples

      iex> update_mall(mall, %{field: new_value})
      {:ok, %Mall{}}

      iex> update_mall(mall, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_mall(%Mall{} = mall, attrs) do
    mall
    |> Mall.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Mall.

  ## Examples

      iex> delete_mall(mall)
      {:ok, %Mall{}}

      iex> delete_mall(mall)
      {:error, %Ecto.Changeset{}}

  """
  def delete_mall(%Mall{} = mall) do
    Repo.delete(mall)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking mall changes.

  ## Examples

      iex> change_mall(mall)
      %Ecto.Changeset{source: %Mall{}}

  """
  def change_mall(%Mall{} = mall) do
    Mall.changeset(mall, %{})
  end

  alias Acs.Malls.MallOrder

  @doc """
  Returns the list of mall_orders.

  ## Examples

      iex> list_mall_orders()
      [%MallOrder{}, ...]

  """
  def list_mall_orders do
    Repo.all(MallOrder)
  end

  @doc """
  Gets a single mall_order.

  Raises `Ecto.NoResultsError` if the Mall order does not exist.

  ## Examples

      iex> get_mall_order!(123)
      %MallOrder{}

      iex> get_mall_order!(456)
      ** (Ecto.NoResultsError)

  """
  def get_mall_order!(id), do: Repo.get!(MallOrder, id)

  @doc """
  Creates a mall_order.

  ## Examples

      iex> create_mall_order(%{field: value})
      {:ok, %MallOrder{}}

      iex> create_mall_order(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_mall_order(attrs \\ %{}) do
    %MallOrder{}
    |> MallOrder.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a mall_order.

  ## Examples

      iex> update_mall_order(mall_order, %{field: new_value})
      {:ok, %MallOrder{}}

      iex> update_mall_order(mall_order, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_mall_order(%MallOrder{} = mall_order, attrs) do
    mall_order
    |> MallOrder.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a MallOrder.

  ## Examples

      iex> delete_mall_order(mall_order)
      {:ok, %MallOrder{}}

      iex> delete_mall_order(mall_order)
      {:error, %Ecto.Changeset{}}

  """
  def delete_mall_order(%MallOrder{} = mall_order) do
    Repo.delete(mall_order)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking mall_order changes.

  ## Examples

      iex> change_mall_order(mall_order)
      %Ecto.Changeset{source: %MallOrder{}}

  """
  def change_mall_order(%MallOrder{} = mall_order) do
    MallOrder.changeset(mall_order, %{})
  end

  alias Acs.Malls.MallOrderDetail

  @doc """
  Returns the list of mall_order_details.

  ## Examples

      iex> list_mall_order_details()
      [%MallOrderDetail{}, ...]

  """
  def list_mall_order_details do
    Repo.all(MallOrderDetail)
  end

  @doc """
  Gets a single mall_order_detail.

  Raises `Ecto.NoResultsError` if the Mall order detail does not exist.

  ## Examples

      iex> get_mall_order_detail!(123)
      %MallOrderDetail{}

      iex> get_mall_order_detail!(456)
      ** (Ecto.NoResultsError)

  """
  def get_mall_order_detail!(id), do: Repo.get!(MallOrderDetail, id)

  @doc """
  Creates a mall_order_detail.

  ## Examples

      iex> create_mall_order_detail(%{field: value})
      {:ok, %MallOrderDetail{}}

      iex> create_mall_order_detail(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_mall_order_detail(attrs \\ %{}) do
    %MallOrderDetail{}
    |> MallOrderDetail.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a mall_order_detail.

  ## Examples

      iex> update_mall_order_detail(mall_order_detail, %{field: new_value})
      {:ok, %MallOrderDetail{}}

      iex> update_mall_order_detail(mall_order_detail, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_mall_order_detail(%MallOrderDetail{} = mall_order_detail, attrs) do
    mall_order_detail
    |> MallOrderDetail.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a MallOrderDetail.

  ## Examples

      iex> delete_mall_order_detail(mall_order_detail)
      {:ok, %MallOrderDetail{}}

      iex> delete_mall_order_detail(mall_order_detail)
      {:error, %Ecto.Changeset{}}

  """
  def delete_mall_order_detail(%MallOrderDetail{} = mall_order_detail) do
    Repo.delete(mall_order_detail)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking mall_order_detail changes.

  ## Examples

      iex> change_mall_order_detail(mall_order_detail)
      %Ecto.Changeset{source: %MallOrderDetail{}}

  """
  def change_mall_order_detail(%MallOrderDetail{} = mall_order_detail) do
    MallOrderDetail.changeset(mall_order_detail, %{})
  end

  alias Acs.Malls.MallGoods

  @doc """
  Returns the list of mall_goods.

  ## Examples

      iex> list_mall_goods()
      [%MallGoods{}, ...]

  """
  def list_mall_goods do
    Repo.all(MallGoods)
  end

  @doc """
  Gets a single mall_goods.

  Raises `Ecto.NoResultsError` if the Mall goods does not exist.

  ## Examples

      iex> get_mall_goods!(123)
      %MallGoods{}

      iex> get_mall_goods!(456)
      ** (Ecto.NoResultsError)

  """
  def get_mall_goods!(id), do: Repo.get!(MallGoods, id)

  @doc """
  Creates a mall_goods.

  ## Examples

      iex> create_mall_goods(%{field: value})
      {:ok, %MallGoods{}}

      iex> create_mall_goods(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_mall_goods(attrs \\ %{}) do
    %MallGoods{}
    |> MallGoods.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a mall_goods.

  ## Examples

      iex> update_mall_goods(mall_goods, %{field: new_value})
      {:ok, %MallGoods{}}

      iex> update_mall_goods(mall_goods, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_mall_goods(%MallGoods{} = mall_goods, attrs) do
    mall_goods
    |> MallGoods.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a MallGoods.

  ## Examples

      iex> delete_mall_goods(mall_goods)
      {:ok, %MallGoods{}}

      iex> delete_mall_goods(mall_goods)
      {:error, %Ecto.Changeset{}}

  """
  def delete_mall_goods(%MallGoods{} = mall_goods) do
    Repo.delete(mall_goods)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking mall_goods changes.

  ## Examples

      iex> change_mall_goods(mall_goods)
      %Ecto.Changeset{source: %MallGoods{}}

  """
  def change_mall_goods(%MallGoods{} = mall_goods) do
    MallGoods.changeset(mall_goods, %{})
  end

  alias Acs.Malls.MallOrderLog

  @doc """
  Returns the list of mall_order_logs.

  ## Examples

      iex> list_mall_order_logs()
      [%MallOrderLog{}, ...]

  """
  def list_mall_order_logs do
    Repo.all(MallOrderLog)
  end

  @doc """
  Gets a single mall_order_log.

  Raises `Ecto.NoResultsError` if the Mall order log does not exist.

  ## Examples

      iex> get_mall_order_log!(123)
      %MallOrderLog{}

      iex> get_mall_order_log!(456)
      ** (Ecto.NoResultsError)

  """
  def get_mall_order_log!(id), do: Repo.get!(MallOrderLog, id)

  @doc """
  Creates a mall_order_log.

  ## Examples

      iex> create_mall_order_log(%{field: value})
      {:ok, %MallOrderLog{}}

      iex> create_mall_order_log(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_mall_order_log(attrs \\ %{}) do
    %MallOrderLog{}
    |> MallOrderLog.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a mall_order_log.

  ## Examples

      iex> update_mall_order_log(mall_order_log, %{field: new_value})
      {:ok, %MallOrderLog{}}

      iex> update_mall_order_log(mall_order_log, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_mall_order_log(%MallOrderLog{} = mall_order_log, attrs) do
    mall_order_log
    |> MallOrderLog.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a MallOrderLog.

  ## Examples

      iex> delete_mall_order_log(mall_order_log)
      {:ok, %MallOrderLog{}}

      iex> delete_mall_order_log(mall_order_log)
      {:error, %Ecto.Changeset{}}

  """
  def delete_mall_order_log(%MallOrderLog{} = mall_order_log) do
    Repo.delete(mall_order_log)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking mall_order_log changes.

  ## Examples

      iex> change_mall_order_log(mall_order_log)
      %Ecto.Changeset{source: %MallOrderLog{}}

  """
  def change_mall_order_log(%MallOrderLog{} = mall_order_log) do
    MallOrderLog.changeset(mall_order_log, %{})
  end
end
