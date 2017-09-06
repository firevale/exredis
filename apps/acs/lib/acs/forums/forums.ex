defmodule Acs.Forums do
  @moduledoc """
  The Forums context.
  """

  import Ecto.Query, warn: false
  alias Acs.Repo

  alias Acs.Forums.Forum

  @doc """
  Returns the list of forums.

  ## Examples

      iex> list_forums()
      [%Forum{}, ...]

  """
  def list_forums do
    Repo.all(Forum)
  end

  @doc """
  Gets a single forum.

  Raises `Ecto.NoResultsError` if the Forum does not exist.

  ## Examples

      iex> get_forum!(123)
      %Forum{}

      iex> get_forum!(456)
      ** (Ecto.NoResultsError)

  """
  def get_forum!(id), do: Repo.get!(Forum, id)

  @doc """
  Creates a forum.

  ## Examples

      iex> create_forum(%{field: value})
      {:ok, %Forum{}}

      iex> create_forum(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_forum(attrs \\ %{}) do
    %Forum{}
    |> Forum.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a forum.

  ## Examples

      iex> update_forum(forum, %{field: new_value})
      {:ok, %Forum{}}

      iex> update_forum(forum, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_forum(%Forum{} = forum, attrs) do
    forum
    |> Forum.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Forum.

  ## Examples

      iex> delete_forum(forum)
      {:ok, %Forum{}}

      iex> delete_forum(forum)
      {:error, %Ecto.Changeset{}}

  """
  def delete_forum(%Forum{} = forum) do
    Repo.delete(forum)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking forum changes.

  ## Examples

      iex> change_forum(forum)
      %Ecto.Changeset{source: %Forum{}}

  """
  def change_forum(%Forum{} = forum) do
    Forum.changeset(forum, %{})
  end

  alias Acs.Forums.ForumSection

  @doc """
  Returns the list of forum_sections.

  ## Examples

      iex> list_forum_sections()
      [%ForumSection{}, ...]

  """
  def list_forum_sections do
    Repo.all(ForumSection)
  end

  @doc """
  Gets a single forum_section.

  Raises `Ecto.NoResultsError` if the Forum section does not exist.

  ## Examples

      iex> get_forum_section!(123)
      %ForumSection{}

      iex> get_forum_section!(456)
      ** (Ecto.NoResultsError)

  """
  def get_forum_section!(id), do: Repo.get!(ForumSection, id)

  @doc """
  Creates a forum_section.

  ## Examples

      iex> create_forum_section(%{field: value})
      {:ok, %ForumSection{}}

      iex> create_forum_section(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_forum_section(attrs \\ %{}) do
    %ForumSection{}
    |> ForumSection.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a forum_section.

  ## Examples

      iex> update_forum_section(forum_section, %{field: new_value})
      {:ok, %ForumSection{}}

      iex> update_forum_section(forum_section, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_forum_section(%ForumSection{} = forum_section, attrs) do
    forum_section
    |> ForumSection.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a ForumSection.

  ## Examples

      iex> delete_forum_section(forum_section)
      {:ok, %ForumSection{}}

      iex> delete_forum_section(forum_section)
      {:error, %Ecto.Changeset{}}

  """
  def delete_forum_section(%ForumSection{} = forum_section) do
    Repo.delete(forum_section)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking forum_section changes.

  ## Examples

      iex> change_forum_section(forum_section)
      %Ecto.Changeset{source: %ForumSection{}}

  """
  def change_forum_section(%ForumSection{} = forum_section) do
    ForumSection.changeset(forum_section, %{})
  end

  alias Acs.Forums.ForumPost

  @doc """
  Returns the list of forum_posts.

  ## Examples

      iex> list_forum_posts()
      [%ForumPost{}, ...]

  """
  def list_forum_posts do
    Repo.all(ForumPost)
  end

  @doc """
  Gets a single forum_post.

  Raises `Ecto.NoResultsError` if the Forum post does not exist.

  ## Examples

      iex> get_forum_post!(123)
      %ForumPost{}

      iex> get_forum_post!(456)
      ** (Ecto.NoResultsError)

  """
  def get_forum_post!(id), do: Repo.get!(ForumPost, id)

  @doc """
  Creates a forum_post.

  ## Examples

      iex> create_forum_post(%{field: value})
      {:ok, %ForumPost{}}

      iex> create_forum_post(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_forum_post(attrs \\ %{}) do
    %ForumPost{}
    |> ForumPost.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a forum_post.

  ## Examples

      iex> update_forum_post(forum_post, %{field: new_value})
      {:ok, %ForumPost{}}

      iex> update_forum_post(forum_post, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_forum_post(%ForumPost{} = forum_post, attrs) do
    forum_post
    |> ForumPost.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a ForumPost.

  ## Examples

      iex> delete_forum_post(forum_post)
      {:ok, %ForumPost{}}

      iex> delete_forum_post(forum_post)
      {:error, %Ecto.Changeset{}}

  """
  def delete_forum_post(%ForumPost{} = forum_post) do
    Repo.delete(forum_post)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking forum_post changes.

  ## Examples

      iex> change_forum_post(forum_post)
      %Ecto.Changeset{source: %ForumPost{}}

  """
  def change_forum_post(%ForumPost{} = forum_post) do
    ForumPost.changeset(forum_post, %{})
  end

  alias Acs.Forums.ForumComment

  @doc """
  Returns the list of forum_comments.

  ## Examples

      iex> list_forum_comments()
      [%ForumComment{}, ...]

  """
  def list_forum_comments do
    Repo.all(ForumComment)
  end

  @doc """
  Gets a single forum_comment.

  Raises `Ecto.NoResultsError` if the Forum comment does not exist.

  ## Examples

      iex> get_forum_comment!(123)
      %ForumComment{}

      iex> get_forum_comment!(456)
      ** (Ecto.NoResultsError)

  """
  def get_forum_comment!(id), do: Repo.get!(ForumComment, id)

  @doc """
  Creates a forum_comment.

  ## Examples

      iex> create_forum_comment(%{field: value})
      {:ok, %ForumComment{}}

      iex> create_forum_comment(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_forum_comment(attrs \\ %{}) do
    %ForumComment{}
    |> ForumComment.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a forum_comment.

  ## Examples

      iex> update_forum_comment(forum_comment, %{field: new_value})
      {:ok, %ForumComment{}}

      iex> update_forum_comment(forum_comment, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_forum_comment(%ForumComment{} = forum_comment, attrs) do
    forum_comment
    |> ForumComment.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a ForumComment.

  ## Examples

      iex> delete_forum_comment(forum_comment)
      {:ok, %ForumComment{}}

      iex> delete_forum_comment(forum_comment)
      {:error, %Ecto.Changeset{}}

  """
  def delete_forum_comment(%ForumComment{} = forum_comment) do
    Repo.delete(forum_comment)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking forum_comment changes.

  ## Examples

      iex> change_forum_comment(forum_comment)
      %Ecto.Changeset{source: %ForumComment{}}

  """
  def change_forum_comment(%ForumComment{} = forum_comment) do
    ForumComment.changeset(forum_comment, %{})
  end

  alias Acs.Forums.ForumManager

  @doc """
  Returns the list of forum_managers.

  ## Examples

      iex> list_forum_managers()
      [%ForumManager{}, ...]

  """
  def list_forum_managers do
    Repo.all(ForumManager)
  end

  @doc """
  Gets a single forum_manager.

  Raises `Ecto.NoResultsError` if the Forum manager does not exist.

  ## Examples

      iex> get_forum_manager!(123)
      %ForumManager{}

      iex> get_forum_manager!(456)
      ** (Ecto.NoResultsError)

  """
  def get_forum_manager!(id), do: Repo.get!(ForumManager, id)

  @doc """
  Creates a forum_manager.

  ## Examples

      iex> create_forum_manager(%{field: value})
      {:ok, %ForumManager{}}

      iex> create_forum_manager(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_forum_manager(attrs \\ %{}) do
    %ForumManager{}
    |> ForumManager.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a forum_manager.

  ## Examples

      iex> update_forum_manager(forum_manager, %{field: new_value})
      {:ok, %ForumManager{}}

      iex> update_forum_manager(forum_manager, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_forum_manager(%ForumManager{} = forum_manager, attrs) do
    forum_manager
    |> ForumManager.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a ForumManager.

  ## Examples

      iex> delete_forum_manager(forum_manager)
      {:ok, %ForumManager{}}

      iex> delete_forum_manager(forum_manager)
      {:error, %Ecto.Changeset{}}

  """
  def delete_forum_manager(%ForumManager{} = forum_manager) do
    Repo.delete(forum_manager)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking forum_manager changes.

  ## Examples

      iex> change_forum_manager(forum_manager)
      %Ecto.Changeset{source: %ForumManager{}}

  """
  def change_forum_manager(%ForumManager{} = forum_manager) do
    ForumManager.changeset(forum_manager, %{})
  end

  alias Acs.Forums.UserFavoritePost

  @doc """
  Returns the list of user_favorite_posts.

  ## Examples

      iex> list_user_favorite_posts()
      [%UserFavoritePost{}, ...]

  """
  def list_user_favorite_posts do
    Repo.all(UserFavoritePost)
  end

  @doc """
  Gets a single user_favorite_post.

  Raises `Ecto.NoResultsError` if the User favorite post does not exist.

  ## Examples

      iex> get_user_favorite_post!(123)
      %UserFavoritePost{}

      iex> get_user_favorite_post!(456)
      ** (Ecto.NoResultsError)

  """
  def get_user_favorite_post!(id), do: Repo.get!(UserFavoritePost, id)

  @doc """
  Creates a user_favorite_post.

  ## Examples

      iex> create_user_favorite_post(%{field: value})
      {:ok, %UserFavoritePost{}}

      iex> create_user_favorite_post(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_user_favorite_post(attrs \\ %{}) do
    %UserFavoritePost{}
    |> UserFavoritePost.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a user_favorite_post.

  ## Examples

      iex> update_user_favorite_post(user_favorite_post, %{field: new_value})
      {:ok, %UserFavoritePost{}}

      iex> update_user_favorite_post(user_favorite_post, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_user_favorite_post(%UserFavoritePost{} = user_favorite_post, attrs) do
    user_favorite_post
    |> UserFavoritePost.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a UserFavoritePost.

  ## Examples

      iex> delete_user_favorite_post(user_favorite_post)
      {:ok, %UserFavoritePost{}}

      iex> delete_user_favorite_post(user_favorite_post)
      {:error, %Ecto.Changeset{}}

  """
  def delete_user_favorite_post(%UserFavoritePost{} = user_favorite_post) do
    Repo.delete(user_favorite_post)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user_favorite_post changes.

  ## Examples

      iex> change_user_favorite_post(user_favorite_post)
      %Ecto.Changeset{source: %UserFavoritePost{}}

  """
  def change_user_favorite_post(%UserFavoritePost{} = user_favorite_post) do
    UserFavoritePost.changeset(user_favorite_post, %{})
  end
end
