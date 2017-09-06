defmodule Acs.LoginCodes do
  @moduledoc """
  The LoginCodes context.
  """

  import Ecto.Query, warn: false
  alias Acs.Repo

  alias Acs.LoginCodes.AppLoginCode

  @doc """
  Returns the list of app_login_codes.

  ## Examples

      iex> list_app_login_codes()
      [%AppLoginCode{}, ...]

  """
  def list_app_login_codes do
    Repo.all(AppLoginCode)
  end

  @doc """
  Gets a single app_login_code.

  Raises `Ecto.NoResultsError` if the App login code does not exist.

  ## Examples

      iex> get_app_login_code!(123)
      %AppLoginCode{}

      iex> get_app_login_code!(456)
      ** (Ecto.NoResultsError)

  """
  def get_app_login_code!(id), do: Repo.get!(AppLoginCode, id)

  @doc """
  Creates a app_login_code.

  ## Examples

      iex> create_app_login_code(%{field: value})
      {:ok, %AppLoginCode{}}

      iex> create_app_login_code(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_app_login_code(attrs \\ %{}) do
    %AppLoginCode{}
    |> AppLoginCode.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a app_login_code.

  ## Examples

      iex> update_app_login_code(app_login_code, %{field: new_value})
      {:ok, %AppLoginCode{}}

      iex> update_app_login_code(app_login_code, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_app_login_code(%AppLoginCode{} = app_login_code, attrs) do
    app_login_code
    |> AppLoginCode.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a AppLoginCode.

  ## Examples

      iex> delete_app_login_code(app_login_code)
      {:ok, %AppLoginCode{}}

      iex> delete_app_login_code(app_login_code)
      {:error, %Ecto.Changeset{}}

  """
  def delete_app_login_code(%AppLoginCode{} = app_login_code) do
    Repo.delete(app_login_code)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking app_login_code changes.

  ## Examples

      iex> change_app_login_code(app_login_code)
      %Ecto.Changeset{source: %AppLoginCode{}}

  """
  def change_app_login_code(%AppLoginCode{} = app_login_code) do
    AppLoginCode.changeset(app_login_code, %{})
  end
end
