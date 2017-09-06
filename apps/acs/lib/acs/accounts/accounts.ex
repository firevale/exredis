defmodule Acs.Accounts do
  @moduledoc """
  The Accounts context.
  """

  import Ecto.Query, warn: false
  alias Acs.Repo

  alias Acs.Accounts.User

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

  alias Acs.Accounts.UserAddress

  @doc """
  Returns the list of user_addresses.

  ## Examples

      iex> list_user_addresses()
      [%UserAddress{}, ...]

  """
  def list_user_addresses do
    Repo.all(UserAddress)
  end

  @doc """
  Gets a single user_address.

  Raises `Ecto.NoResultsError` if the User address does not exist.

  ## Examples

      iex> get_user_address!(123)
      %UserAddress{}

      iex> get_user_address!(456)
      ** (Ecto.NoResultsError)

  """
  def get_user_address!(id), do: Repo.get!(UserAddress, id)

  @doc """
  Creates a user_address.

  ## Examples

      iex> create_user_address(%{field: value})
      {:ok, %UserAddress{}}

      iex> create_user_address(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_user_address(attrs \\ %{}) do
    %UserAddress{}
    |> UserAddress.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a user_address.

  ## Examples

      iex> update_user_address(user_address, %{field: new_value})
      {:ok, %UserAddress{}}

      iex> update_user_address(user_address, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_user_address(%UserAddress{} = user_address, attrs) do
    user_address
    |> UserAddress.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a UserAddress.

  ## Examples

      iex> delete_user_address(user_address)
      {:ok, %UserAddress{}}

      iex> delete_user_address(user_address)
      {:error, %Ecto.Changeset{}}

  """
  def delete_user_address(%UserAddress{} = user_address) do
    Repo.delete(user_address)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user_address changes.

  ## Examples

      iex> change_user_address(user_address)
      %Ecto.Changeset{source: %UserAddress{}}

  """
  def change_user_address(%UserAddress{} = user_address) do
    UserAddress.changeset(user_address, %{})
  end

  alias Acs.Accounts.UserSdkBinding

  @doc """
  Returns the list of user_sdk_bindings.

  ## Examples

      iex> list_user_sdk_bindings()
      [%UserSdkBinding{}, ...]

  """
  def list_user_sdk_bindings do
    Repo.all(UserSdkBinding)
  end

  @doc """
  Gets a single user_sdk_binding.

  Raises `Ecto.NoResultsError` if the User sdk binding does not exist.

  ## Examples

      iex> get_user_sdk_binding!(123)
      %UserSdkBinding{}

      iex> get_user_sdk_binding!(456)
      ** (Ecto.NoResultsError)

  """
  def get_user_sdk_binding!(id), do: Repo.get!(UserSdkBinding, id)

  @doc """
  Creates a user_sdk_binding.

  ## Examples

      iex> create_user_sdk_binding(%{field: value})
      {:ok, %UserSdkBinding{}}

      iex> create_user_sdk_binding(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_user_sdk_binding(attrs \\ %{}) do
    %UserSdkBinding{}
    |> UserSdkBinding.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a user_sdk_binding.

  ## Examples

      iex> update_user_sdk_binding(user_sdk_binding, %{field: new_value})
      {:ok, %UserSdkBinding{}}

      iex> update_user_sdk_binding(user_sdk_binding, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_user_sdk_binding(%UserSdkBinding{} = user_sdk_binding, attrs) do
    user_sdk_binding
    |> UserSdkBinding.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a UserSdkBinding.

  ## Examples

      iex> delete_user_sdk_binding(user_sdk_binding)
      {:ok, %UserSdkBinding{}}

      iex> delete_user_sdk_binding(user_sdk_binding)
      {:error, %Ecto.Changeset{}}

  """
  def delete_user_sdk_binding(%UserSdkBinding{} = user_sdk_binding) do
    Repo.delete(user_sdk_binding)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user_sdk_binding changes.

  ## Examples

      iex> change_user_sdk_binding(user_sdk_binding)
      %Ecto.Changeset{source: %UserSdkBinding{}}

  """
  def change_user_sdk_binding(%UserSdkBinding{} = user_sdk_binding) do
    UserSdkBinding.changeset(user_sdk_binding, %{})
  end
end
