defmodule Acs.Wcp do
  @moduledoc """
  The Wcp context.
  """

  import Ecto.Query, warn: false
  alias Acs.Repo

  alias Acs.Wcp.AppWcpConfig

  @doc """
  Returns the list of app_wcp_config.

  ## Examples

      iex> list_app_wcp_config()
      [%AppWcpConfig{}, ...]

  """
  def list_app_wcp_config do
    Repo.all(AppWcpConfig)
  end

  @doc """
  Gets a single app_wcp_config.

  Raises `Ecto.NoResultsError` if the App wcp config does not exist.

  ## Examples

      iex> get_app_wcp_config!(123)
      %AppWcpConfig{}

      iex> get_app_wcp_config!(456)
      ** (Ecto.NoResultsError)

  """
  def get_app_wcp_config!(id), do: Repo.get!(AppWcpConfig, id)

  @doc """
  Creates a app_wcp_config.

  ## Examples

      iex> create_app_wcp_config(%{field: value})
      {:ok, %AppWcpConfig{}}

      iex> create_app_wcp_config(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_app_wcp_config(attrs \\ %{}) do
    %AppWcpConfig{}
    |> AppWcpConfig.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a app_wcp_config.

  ## Examples

      iex> update_app_wcp_config(app_wcp_config, %{field: new_value})
      {:ok, %AppWcpConfig{}}

      iex> update_app_wcp_config(app_wcp_config, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_app_wcp_config(%AppWcpConfig{} = app_wcp_config, attrs) do
    app_wcp_config
    |> AppWcpConfig.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a AppWcpConfig.

  ## Examples

      iex> delete_app_wcp_config(app_wcp_config)
      {:ok, %AppWcpConfig{}}

      iex> delete_app_wcp_config(app_wcp_config)
      {:error, %Ecto.Changeset{}}

  """
  def delete_app_wcp_config(%AppWcpConfig{} = app_wcp_config) do
    Repo.delete(app_wcp_config)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking app_wcp_config changes.

  ## Examples

      iex> change_app_wcp_config(app_wcp_config)
      %Ecto.Changeset{source: %AppWcpConfig{}}

  """
  def change_app_wcp_config(%AppWcpConfig{} = app_wcp_config) do
    AppWcpConfig.changeset(app_wcp_config, %{})
  end

  alias Acs.Wcp.AppWcpMessageRule

  @doc """
  Returns the list of app_wcp_message_rule.

  ## Examples

      iex> list_app_wcp_message_rule()
      [%AppWcpMessageRule{}, ...]

  """
  def list_app_wcp_message_rule do
    Repo.all(AppWcpMessageRule)
  end

  @doc """
  Gets a single app_wcp_message_rule.

  Raises `Ecto.NoResultsError` if the App wcp message rule does not exist.

  ## Examples

      iex> get_app_wcp_message_rule!(123)
      %AppWcpMessageRule{}

      iex> get_app_wcp_message_rule!(456)
      ** (Ecto.NoResultsError)

  """
  def get_app_wcp_message_rule!(id), do: Repo.get!(AppWcpMessageRule, id)

  @doc """
  Creates a app_wcp_message_rule.

  ## Examples

      iex> create_app_wcp_message_rule(%{field: value})
      {:ok, %AppWcpMessageRule{}}

      iex> create_app_wcp_message_rule(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_app_wcp_message_rule(attrs \\ %{}) do
    %AppWcpMessageRule{}
    |> AppWcpMessageRule.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a app_wcp_message_rule.

  ## Examples

      iex> update_app_wcp_message_rule(app_wcp_message_rule, %{field: new_value})
      {:ok, %AppWcpMessageRule{}}

      iex> update_app_wcp_message_rule(app_wcp_message_rule, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_app_wcp_message_rule(%AppWcpMessageRule{} = app_wcp_message_rule, attrs) do
    app_wcp_message_rule
    |> AppWcpMessageRule.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a AppWcpMessageRule.

  ## Examples

      iex> delete_app_wcp_message_rule(app_wcp_message_rule)
      {:ok, %AppWcpMessageRule{}}

      iex> delete_app_wcp_message_rule(app_wcp_message_rule)
      {:error, %Ecto.Changeset{}}

  """
  def delete_app_wcp_message_rule(%AppWcpMessageRule{} = app_wcp_message_rule) do
    Repo.delete(app_wcp_message_rule)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking app_wcp_message_rule changes.

  ## Examples

      iex> change_app_wcp_message_rule(app_wcp_message_rule)
      %Ecto.Changeset{source: %AppWcpMessageRule{}}

  """
  def change_app_wcp_message_rule(%AppWcpMessageRule{} = app_wcp_message_rule) do
    AppWcpMessageRule.changeset(app_wcp_message_rule, %{})
  end

  alias Acs.Wcp.AppWcpMessage

  @doc """
  Returns the list of app_wcp_messages.

  ## Examples

      iex> list_app_wcp_messages()
      [%AppWcpMessage{}, ...]

  """
  def list_app_wcp_messages do
    Repo.all(AppWcpMessage)
  end

  @doc """
  Gets a single app_wcp_message.

  Raises `Ecto.NoResultsError` if the App wcp message does not exist.

  ## Examples

      iex> get_app_wcp_message!(123)
      %AppWcpMessage{}

      iex> get_app_wcp_message!(456)
      ** (Ecto.NoResultsError)

  """
  def get_app_wcp_message!(id), do: Repo.get!(AppWcpMessage, id)

  @doc """
  Creates a app_wcp_message.

  ## Examples

      iex> create_app_wcp_message(%{field: value})
      {:ok, %AppWcpMessage{}}

      iex> create_app_wcp_message(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_app_wcp_message(attrs \\ %{}) do
    %AppWcpMessage{}
    |> AppWcpMessage.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a app_wcp_message.

  ## Examples

      iex> update_app_wcp_message(app_wcp_message, %{field: new_value})
      {:ok, %AppWcpMessage{}}

      iex> update_app_wcp_message(app_wcp_message, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_app_wcp_message(%AppWcpMessage{} = app_wcp_message, attrs) do
    app_wcp_message
    |> AppWcpMessage.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a AppWcpMessage.

  ## Examples

      iex> delete_app_wcp_message(app_wcp_message)
      {:ok, %AppWcpMessage{}}

      iex> delete_app_wcp_message(app_wcp_message)
      {:error, %Ecto.Changeset{}}

  """
  def delete_app_wcp_message(%AppWcpMessage{} = app_wcp_message) do
    Repo.delete(app_wcp_message)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking app_wcp_message changes.

  ## Examples

      iex> change_app_wcp_message(app_wcp_message)
      %Ecto.Changeset{source: %AppWcpMessage{}}

  """
  def change_app_wcp_message(%AppWcpMessage{} = app_wcp_message) do
    AppWcpMessage.changeset(app_wcp_message, %{})
  end

  alias Acs.Wcp.AppWcpUser

  @doc """
  Returns the list of app_wcp_users.

  ## Examples

      iex> list_app_wcp_users()
      [%AppWcpUser{}, ...]

  """
  def list_app_wcp_users do
    Repo.all(AppWcpUser)
  end

  @doc """
  Gets a single app_wcp_user.

  Raises `Ecto.NoResultsError` if the App wcp user does not exist.

  ## Examples

      iex> get_app_wcp_user!(123)
      %AppWcpUser{}

      iex> get_app_wcp_user!(456)
      ** (Ecto.NoResultsError)

  """
  def get_app_wcp_user!(id), do: Repo.get!(AppWcpUser, id)

  @doc """
  Creates a app_wcp_user.

  ## Examples

      iex> create_app_wcp_user(%{field: value})
      {:ok, %AppWcpUser{}}

      iex> create_app_wcp_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_app_wcp_user(attrs \\ %{}) do
    %AppWcpUser{}
    |> AppWcpUser.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a app_wcp_user.

  ## Examples

      iex> update_app_wcp_user(app_wcp_user, %{field: new_value})
      {:ok, %AppWcpUser{}}

      iex> update_app_wcp_user(app_wcp_user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_app_wcp_user(%AppWcpUser{} = app_wcp_user, attrs) do
    app_wcp_user
    |> AppWcpUser.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a AppWcpUser.

  ## Examples

      iex> delete_app_wcp_user(app_wcp_user)
      {:ok, %AppWcpUser{}}

      iex> delete_app_wcp_user(app_wcp_user)
      {:error, %Ecto.Changeset{}}

  """
  def delete_app_wcp_user(%AppWcpUser{} = app_wcp_user) do
    Repo.delete(app_wcp_user)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking app_wcp_user changes.

  ## Examples

      iex> change_app_wcp_user(app_wcp_user)
      %Ecto.Changeset{source: %AppWcpUser{}}

  """
  def change_app_wcp_user(%AppWcpUser{} = app_wcp_user) do
    AppWcpUser.changeset(app_wcp_user, %{})
  end
end
