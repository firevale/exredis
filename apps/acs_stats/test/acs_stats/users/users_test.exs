defmodule AcsStats.UsersTest do
  use AcsStats.DataCase

  alias AcsStats.Users

  describe "app_users" do
    alias AcsStats.Users.AppUser

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def app_user_fixture(attrs \\ %{}) do
      {:ok, app_user} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Users.create_app_user()

      app_user
    end

    test "list_app_users/0 returns all app_users" do
      app_user = app_user_fixture()
      assert Users.list_app_users() == [app_user]
    end

    test "get_app_user!/1 returns the app_user with given id" do
      app_user = app_user_fixture()
      assert Users.get_app_user!(app_user.id) == app_user
    end

    test "create_app_user/1 with valid data creates a app_user" do
      assert {:ok, %AppUser{} = app_user} = Users.create_app_user(@valid_attrs)
    end

    test "create_app_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Users.create_app_user(@invalid_attrs)
    end

    test "update_app_user/2 with valid data updates the app_user" do
      app_user = app_user_fixture()
      assert {:ok, app_user} = Users.update_app_user(app_user, @update_attrs)
      assert %AppUser{} = app_user
    end

    test "update_app_user/2 with invalid data returns error changeset" do
      app_user = app_user_fixture()
      assert {:error, %Ecto.Changeset{}} = Users.update_app_user(app_user, @invalid_attrs)
      assert app_user == Users.get_app_user!(app_user.id)
    end

    test "delete_app_user/1 deletes the app_user" do
      app_user = app_user_fixture()
      assert {:ok, %AppUser{}} = Users.delete_app_user(app_user)
      assert_raise Ecto.NoResultsError, fn -> Users.get_app_user!(app_user.id) end
    end

    test "change_app_user/1 returns a app_user changeset" do
      app_user = app_user_fixture()
      assert %Ecto.Changeset{} = Users.change_app_user(app_user)
    end
  end

  describe "app_user_daily_activities" do
    alias AcsStats.Users.AppUserDailyActivity

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def app_user_daily_activity_fixture(attrs \\ %{}) do
      {:ok, app_user_daily_activity} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Users.create_app_user_daily_activity()

      app_user_daily_activity
    end

    test "list_app_user_daily_activities/0 returns all app_user_daily_activities" do
      app_user_daily_activity = app_user_daily_activity_fixture()
      assert Users.list_app_user_daily_activities() == [app_user_daily_activity]
    end

    test "get_app_user_daily_activity!/1 returns the app_user_daily_activity with given id" do
      app_user_daily_activity = app_user_daily_activity_fixture()
      assert Users.get_app_user_daily_activity!(app_user_daily_activity.id) == app_user_daily_activity
    end

    test "create_app_user_daily_activity/1 with valid data creates a app_user_daily_activity" do
      assert {:ok, %AppUserDailyActivity{} = app_user_daily_activity} = Users.create_app_user_daily_activity(@valid_attrs)
    end

    test "create_app_user_daily_activity/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Users.create_app_user_daily_activity(@invalid_attrs)
    end

    test "update_app_user_daily_activity/2 with valid data updates the app_user_daily_activity" do
      app_user_daily_activity = app_user_daily_activity_fixture()
      assert {:ok, app_user_daily_activity} = Users.update_app_user_daily_activity(app_user_daily_activity, @update_attrs)
      assert %AppUserDailyActivity{} = app_user_daily_activity
    end

    test "update_app_user_daily_activity/2 with invalid data returns error changeset" do
      app_user_daily_activity = app_user_daily_activity_fixture()
      assert {:error, %Ecto.Changeset{}} = Users.update_app_user_daily_activity(app_user_daily_activity, @invalid_attrs)
      assert app_user_daily_activity == Users.get_app_user_daily_activity!(app_user_daily_activity.id)
    end

    test "delete_app_user_daily_activity/1 deletes the app_user_daily_activity" do
      app_user_daily_activity = app_user_daily_activity_fixture()
      assert {:ok, %AppUserDailyActivity{}} = Users.delete_app_user_daily_activity(app_user_daily_activity)
      assert_raise Ecto.NoResultsError, fn -> Users.get_app_user_daily_activity!(app_user_daily_activity.id) end
    end

    test "change_app_user_daily_activity/1 returns a app_user_daily_activity changeset" do
      app_user_daily_activity = app_user_daily_activity_fixture()
      assert %Ecto.Changeset{} = Users.change_app_user_daily_activity(app_user_daily_activity)
    end
  end
end
