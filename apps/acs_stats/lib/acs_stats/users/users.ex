defmodule AcsStats.Users do
  @moduledoc """
  The Users context.
  """

  import Ecto.Query, warn: false
  alias AcsStats.Repo

  alias AcsStats.Users.AppUser

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

  alias AcsStats.Users.AppUserDailyActivity

  @doc """
  Returns the list of app_user_daily_activities.

  ## Examples

      iex> list_app_user_daily_activities()
      [%AppUserDailyActivity{}, ...]

  """
  def list_app_user_daily_activities do
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
end
