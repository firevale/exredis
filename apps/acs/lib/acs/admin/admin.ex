defmodule Acs.Admin do
  @moduledoc """
  The Admin context.
  """

  import Ecto.Query, warn: false
  alias Acs.Repo

  alias Acs.Admin.User

  @doc """
  Returns the list of users.

  ## Examples

      iex> list_users()
      [%User{}, ...]

  """
  def list_users do
    Repo.all(User)
  end

  @doc """
  Gets a single user.

  Raises `Ecto.NoResultsError` if the User does not exist.

  ## Examples

      iex> get_user!(123)
      %User{}

      iex> get_user!(456)
      ** (Ecto.NoResultsError)

  """
  def get_user!(id), do: Repo.get!(User, id)

  @doc """
  Creates a user.

  ## Examples

      iex> create_user(%{field: value})
      {:ok, %User{}}

      iex> create_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a user.

  ## Examples

      iex> update_user(user, %{field: new_value})
      {:ok, %User{}}

      iex> update_user(user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_user(%User{} = user, attrs) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a User.

  ## Examples

      iex> delete_user(user)
      {:ok, %User{}}

      iex> delete_user(user)
      {:error, %Ecto.Changeset{}}

  """
  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user changes.

  ## Examples

      iex> change_user(user)
      %Ecto.Changeset{source: %User{}}

  """
  def change_user(%User{} = user) do
    User.changeset(user, %{})
  end

  alias Acs.Admin.Setting

  @doc """
  Returns the list of users.

  ## Examples

      iex> list_users()
      [%Setting{}, ...]

  """
  def list_users do
    Repo.all(Setting)
  end

  @doc """
  Gets a single setting.

  Raises `Ecto.NoResultsError` if the Setting does not exist.

  ## Examples

      iex> get_setting!(123)
      %Setting{}

      iex> get_setting!(456)
      ** (Ecto.NoResultsError)

  """
  def get_setting!(id), do: Repo.get!(Setting, id)

  @doc """
  Creates a setting.

  ## Examples

      iex> create_setting(%{field: value})
      {:ok, %Setting{}}

      iex> create_setting(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_setting(attrs \\ %{}) do
    %Setting{}
    |> Setting.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a setting.

  ## Examples

      iex> update_setting(setting, %{field: new_value})
      {:ok, %Setting{}}

      iex> update_setting(setting, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_setting(%Setting{} = setting, attrs) do
    setting
    |> Setting.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Setting.

  ## Examples

      iex> delete_setting(setting)
      {:ok, %Setting{}}

      iex> delete_setting(setting)
      {:error, %Ecto.Changeset{}}

  """
  def delete_setting(%Setting{} = setting) do
    Repo.delete(setting)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking setting changes.

  ## Examples

      iex> change_setting(setting)
      %Ecto.Changeset{source: %Setting{}}

  """
  def change_setting(%Setting{} = setting) do
    Setting.changeset(setting, %{})
  end

  alias Acs.Admin.OpLog

  @doc """
  Returns the list of op_logs.

  ## Examples

      iex> list_op_logs()
      [%OpLog{}, ...]

  """
  def list_op_logs do
    Repo.all(OpLog)
  end

  @doc """
  Gets a single op_log.

  Raises `Ecto.NoResultsError` if the Op log does not exist.

  ## Examples

      iex> get_op_log!(123)
      %OpLog{}

      iex> get_op_log!(456)
      ** (Ecto.NoResultsError)

  """
  def get_op_log!(id), do: Repo.get!(OpLog, id)

  @doc """
  Creates a op_log.

  ## Examples

      iex> create_op_log(%{field: value})
      {:ok, %OpLog{}}

      iex> create_op_log(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_op_log(attrs \\ %{}) do
    %OpLog{}
    |> OpLog.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a op_log.

  ## Examples

      iex> update_op_log(op_log, %{field: new_value})
      {:ok, %OpLog{}}

      iex> update_op_log(op_log, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_op_log(%OpLog{} = op_log, attrs) do
    op_log
    |> OpLog.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a OpLog.

  ## Examples

      iex> delete_op_log(op_log)
      {:ok, %OpLog{}}

      iex> delete_op_log(op_log)
      {:error, %Ecto.Changeset{}}

  """
  def delete_op_log(%OpLog{} = op_log) do
    Repo.delete(op_log)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking op_log changes.

  ## Examples

      iex> change_op_log(op_log)
      %Ecto.Changeset{source: %OpLog{}}

  """
  def change_op_log(%OpLog{} = op_log) do
    OpLog.changeset(op_log, %{})
  end
end
