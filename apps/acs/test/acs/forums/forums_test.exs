defmodule Acs.ForumsTest do
  use Acs.DataCase

  alias Acs.Forums

  describe "forums" do
    alias Acs.Forums.Forum

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def forum_fixture(attrs \\ %{}) do
      {:ok, forum} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Forums.create_forum()

      forum
    end

    test "list_forums/0 returns all forums" do
      forum = forum_fixture()
      assert Forums.list_forums() == [forum]
    end

    test "get_forum!/1 returns the forum with given id" do
      forum = forum_fixture()
      assert Forums.get_forum!(forum.id) == forum
    end

    test "create_forum/1 with valid data creates a forum" do
      assert {:ok, %Forum{} = forum} = Forums.create_forum(@valid_attrs)
    end

    test "create_forum/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Forums.create_forum(@invalid_attrs)
    end

    test "update_forum/2 with valid data updates the forum" do
      forum = forum_fixture()
      assert {:ok, forum} = Forums.update_forum(forum, @update_attrs)
      assert %Forum{} = forum
    end

    test "update_forum/2 with invalid data returns error changeset" do
      forum = forum_fixture()
      assert {:error, %Ecto.Changeset{}} = Forums.update_forum(forum, @invalid_attrs)
      assert forum == Forums.get_forum!(forum.id)
    end

    test "delete_forum/1 deletes the forum" do
      forum = forum_fixture()
      assert {:ok, %Forum{}} = Forums.delete_forum(forum)
      assert_raise Ecto.NoResultsError, fn -> Forums.get_forum!(forum.id) end
    end

    test "change_forum/1 returns a forum changeset" do
      forum = forum_fixture()
      assert %Ecto.Changeset{} = Forums.change_forum(forum)
    end
  end

  describe "forum_sections" do
    alias Acs.Forums.ForumSection

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def forum_section_fixture(attrs \\ %{}) do
      {:ok, forum_section} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Forums.create_forum_section()

      forum_section
    end

    test "list_forum_sections/0 returns all forum_sections" do
      forum_section = forum_section_fixture()
      assert Forums.list_forum_sections() == [forum_section]
    end

    test "get_forum_section!/1 returns the forum_section with given id" do
      forum_section = forum_section_fixture()
      assert Forums.get_forum_section!(forum_section.id) == forum_section
    end

    test "create_forum_section/1 with valid data creates a forum_section" do
      assert {:ok, %ForumSection{} = forum_section} = Forums.create_forum_section(@valid_attrs)
    end

    test "create_forum_section/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Forums.create_forum_section(@invalid_attrs)
    end

    test "update_forum_section/2 with valid data updates the forum_section" do
      forum_section = forum_section_fixture()
      assert {:ok, forum_section} = Forums.update_forum_section(forum_section, @update_attrs)
      assert %ForumSection{} = forum_section
    end

    test "update_forum_section/2 with invalid data returns error changeset" do
      forum_section = forum_section_fixture()
      assert {:error, %Ecto.Changeset{}} = Forums.update_forum_section(forum_section, @invalid_attrs)
      assert forum_section == Forums.get_forum_section!(forum_section.id)
    end

    test "delete_forum_section/1 deletes the forum_section" do
      forum_section = forum_section_fixture()
      assert {:ok, %ForumSection{}} = Forums.delete_forum_section(forum_section)
      assert_raise Ecto.NoResultsError, fn -> Forums.get_forum_section!(forum_section.id) end
    end

    test "change_forum_section/1 returns a forum_section changeset" do
      forum_section = forum_section_fixture()
      assert %Ecto.Changeset{} = Forums.change_forum_section(forum_section)
    end
  end

  describe "forum_posts" do
    alias Acs.Forums.ForumPost

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def forum_post_fixture(attrs \\ %{}) do
      {:ok, forum_post} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Forums.create_forum_post()

      forum_post
    end

    test "list_forum_posts/0 returns all forum_posts" do
      forum_post = forum_post_fixture()
      assert Forums.list_forum_posts() == [forum_post]
    end

    test "get_forum_post!/1 returns the forum_post with given id" do
      forum_post = forum_post_fixture()
      assert Forums.get_forum_post!(forum_post.id) == forum_post
    end

    test "create_forum_post/1 with valid data creates a forum_post" do
      assert {:ok, %ForumPost{} = forum_post} = Forums.create_forum_post(@valid_attrs)
    end

    test "create_forum_post/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Forums.create_forum_post(@invalid_attrs)
    end

    test "update_forum_post/2 with valid data updates the forum_post" do
      forum_post = forum_post_fixture()
      assert {:ok, forum_post} = Forums.update_forum_post(forum_post, @update_attrs)
      assert %ForumPost{} = forum_post
    end

    test "update_forum_post/2 with invalid data returns error changeset" do
      forum_post = forum_post_fixture()
      assert {:error, %Ecto.Changeset{}} = Forums.update_forum_post(forum_post, @invalid_attrs)
      assert forum_post == Forums.get_forum_post!(forum_post.id)
    end

    test "delete_forum_post/1 deletes the forum_post" do
      forum_post = forum_post_fixture()
      assert {:ok, %ForumPost{}} = Forums.delete_forum_post(forum_post)
      assert_raise Ecto.NoResultsError, fn -> Forums.get_forum_post!(forum_post.id) end
    end

    test "change_forum_post/1 returns a forum_post changeset" do
      forum_post = forum_post_fixture()
      assert %Ecto.Changeset{} = Forums.change_forum_post(forum_post)
    end
  end

  describe "forum_comments" do
    alias Acs.Forums.ForumComment

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def forum_comment_fixture(attrs \\ %{}) do
      {:ok, forum_comment} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Forums.create_forum_comment()

      forum_comment
    end

    test "list_forum_comments/0 returns all forum_comments" do
      forum_comment = forum_comment_fixture()
      assert Forums.list_forum_comments() == [forum_comment]
    end

    test "get_forum_comment!/1 returns the forum_comment with given id" do
      forum_comment = forum_comment_fixture()
      assert Forums.get_forum_comment!(forum_comment.id) == forum_comment
    end

    test "create_forum_comment/1 with valid data creates a forum_comment" do
      assert {:ok, %ForumComment{} = forum_comment} = Forums.create_forum_comment(@valid_attrs)
    end

    test "create_forum_comment/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Forums.create_forum_comment(@invalid_attrs)
    end

    test "update_forum_comment/2 with valid data updates the forum_comment" do
      forum_comment = forum_comment_fixture()
      assert {:ok, forum_comment} = Forums.update_forum_comment(forum_comment, @update_attrs)
      assert %ForumComment{} = forum_comment
    end

    test "update_forum_comment/2 with invalid data returns error changeset" do
      forum_comment = forum_comment_fixture()
      assert {:error, %Ecto.Changeset{}} = Forums.update_forum_comment(forum_comment, @invalid_attrs)
      assert forum_comment == Forums.get_forum_comment!(forum_comment.id)
    end

    test "delete_forum_comment/1 deletes the forum_comment" do
      forum_comment = forum_comment_fixture()
      assert {:ok, %ForumComment{}} = Forums.delete_forum_comment(forum_comment)
      assert_raise Ecto.NoResultsError, fn -> Forums.get_forum_comment!(forum_comment.id) end
    end

    test "change_forum_comment/1 returns a forum_comment changeset" do
      forum_comment = forum_comment_fixture()
      assert %Ecto.Changeset{} = Forums.change_forum_comment(forum_comment)
    end
  end

  describe "forum_managers" do
    alias Acs.Forums.ForumManager

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def forum_manager_fixture(attrs \\ %{}) do
      {:ok, forum_manager} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Forums.create_forum_manager()

      forum_manager
    end

    test "list_forum_managers/0 returns all forum_managers" do
      forum_manager = forum_manager_fixture()
      assert Forums.list_forum_managers() == [forum_manager]
    end

    test "get_forum_manager!/1 returns the forum_manager with given id" do
      forum_manager = forum_manager_fixture()
      assert Forums.get_forum_manager!(forum_manager.id) == forum_manager
    end

    test "create_forum_manager/1 with valid data creates a forum_manager" do
      assert {:ok, %ForumManager{} = forum_manager} = Forums.create_forum_manager(@valid_attrs)
    end

    test "create_forum_manager/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Forums.create_forum_manager(@invalid_attrs)
    end

    test "update_forum_manager/2 with valid data updates the forum_manager" do
      forum_manager = forum_manager_fixture()
      assert {:ok, forum_manager} = Forums.update_forum_manager(forum_manager, @update_attrs)
      assert %ForumManager{} = forum_manager
    end

    test "update_forum_manager/2 with invalid data returns error changeset" do
      forum_manager = forum_manager_fixture()
      assert {:error, %Ecto.Changeset{}} = Forums.update_forum_manager(forum_manager, @invalid_attrs)
      assert forum_manager == Forums.get_forum_manager!(forum_manager.id)
    end

    test "delete_forum_manager/1 deletes the forum_manager" do
      forum_manager = forum_manager_fixture()
      assert {:ok, %ForumManager{}} = Forums.delete_forum_manager(forum_manager)
      assert_raise Ecto.NoResultsError, fn -> Forums.get_forum_manager!(forum_manager.id) end
    end

    test "change_forum_manager/1 returns a forum_manager changeset" do
      forum_manager = forum_manager_fixture()
      assert %Ecto.Changeset{} = Forums.change_forum_manager(forum_manager)
    end
  end

  describe "user_favorite_posts" do
    alias Acs.Forums.UserFavoritePost

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def user_favorite_post_fixture(attrs \\ %{}) do
      {:ok, user_favorite_post} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Forums.create_user_favorite_post()

      user_favorite_post
    end

    test "list_user_favorite_posts/0 returns all user_favorite_posts" do
      user_favorite_post = user_favorite_post_fixture()
      assert Forums.list_user_favorite_posts() == [user_favorite_post]
    end

    test "get_user_favorite_post!/1 returns the user_favorite_post with given id" do
      user_favorite_post = user_favorite_post_fixture()
      assert Forums.get_user_favorite_post!(user_favorite_post.id) == user_favorite_post
    end

    test "create_user_favorite_post/1 with valid data creates a user_favorite_post" do
      assert {:ok, %UserFavoritePost{} = user_favorite_post} = Forums.create_user_favorite_post(@valid_attrs)
    end

    test "create_user_favorite_post/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Forums.create_user_favorite_post(@invalid_attrs)
    end

    test "update_user_favorite_post/2 with valid data updates the user_favorite_post" do
      user_favorite_post = user_favorite_post_fixture()
      assert {:ok, user_favorite_post} = Forums.update_user_favorite_post(user_favorite_post, @update_attrs)
      assert %UserFavoritePost{} = user_favorite_post
    end

    test "update_user_favorite_post/2 with invalid data returns error changeset" do
      user_favorite_post = user_favorite_post_fixture()
      assert {:error, %Ecto.Changeset{}} = Forums.update_user_favorite_post(user_favorite_post, @invalid_attrs)
      assert user_favorite_post == Forums.get_user_favorite_post!(user_favorite_post.id)
    end

    test "delete_user_favorite_post/1 deletes the user_favorite_post" do
      user_favorite_post = user_favorite_post_fixture()
      assert {:ok, %UserFavoritePost{}} = Forums.delete_user_favorite_post(user_favorite_post)
      assert_raise Ecto.NoResultsError, fn -> Forums.get_user_favorite_post!(user_favorite_post.id) end
    end

    test "change_user_favorite_post/1 returns a user_favorite_post changeset" do
      user_favorite_post = user_favorite_post_fixture()
      assert %Ecto.Changeset{} = Forums.change_user_favorite_post(user_favorite_post)
    end
  end
end
