defmodule Acs.AdminTest do
  use Acs.DataCase

  alias Acs.Admin

  describe "users" do
    alias Acs.Admin.User

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def user_fixture(attrs \\ %{}) do
      {:ok, user} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Admin.create_user()

      user
    end

    test "list_users/0 returns all users" do
      user = user_fixture()
      assert Admin.list_users() == [user]
    end

    test "get_user!/1 returns the user with given id" do
      user = user_fixture()
      assert Admin.get_user!(user.id) == user
    end

    test "create_user/1 with valid data creates a user" do
      assert {:ok, %User{} = user} = Admin.create_user(@valid_attrs)
    end

    test "create_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Admin.create_user(@invalid_attrs)
    end

    test "update_user/2 with valid data updates the user" do
      user = user_fixture()
      assert {:ok, user} = Admin.update_user(user, @update_attrs)
      assert %User{} = user
    end

    test "update_user/2 with invalid data returns error changeset" do
      user = user_fixture()
      assert {:error, %Ecto.Changeset{}} = Admin.update_user(user, @invalid_attrs)
      assert user == Admin.get_user!(user.id)
    end

    test "delete_user/1 deletes the user" do
      user = user_fixture()
      assert {:ok, %User{}} = Admin.delete_user(user)
      assert_raise Ecto.NoResultsError, fn -> Admin.get_user!(user.id) end
    end

    test "change_user/1 returns a user changeset" do
      user = user_fixture()
      assert %Ecto.Changeset{} = Admin.change_user(user)
    end
  end

  describe "users" do
    alias Acs.Admin.Setting

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def setting_fixture(attrs \\ %{}) do
      {:ok, setting} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Admin.create_setting()

      setting
    end

    test "list_users/0 returns all users" do
      setting = setting_fixture()
      assert Admin.list_users() == [setting]
    end

    test "get_setting!/1 returns the setting with given id" do
      setting = setting_fixture()
      assert Admin.get_setting!(setting.id) == setting
    end

    test "create_setting/1 with valid data creates a setting" do
      assert {:ok, %Setting{} = setting} = Admin.create_setting(@valid_attrs)
    end

    test "create_setting/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Admin.create_setting(@invalid_attrs)
    end

    test "update_setting/2 with valid data updates the setting" do
      setting = setting_fixture()
      assert {:ok, setting} = Admin.update_setting(setting, @update_attrs)
      assert %Setting{} = setting
    end

    test "update_setting/2 with invalid data returns error changeset" do
      setting = setting_fixture()
      assert {:error, %Ecto.Changeset{}} = Admin.update_setting(setting, @invalid_attrs)
      assert setting == Admin.get_setting!(setting.id)
    end

    test "delete_setting/1 deletes the setting" do
      setting = setting_fixture()
      assert {:ok, %Setting{}} = Admin.delete_setting(setting)
      assert_raise Ecto.NoResultsError, fn -> Admin.get_setting!(setting.id) end
    end

    test "change_setting/1 returns a setting changeset" do
      setting = setting_fixture()
      assert %Ecto.Changeset{} = Admin.change_setting(setting)
    end
  end

  describe "op_logs" do
    alias Acs.Admin.OpLog

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def op_log_fixture(attrs \\ %{}) do
      {:ok, op_log} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Admin.create_op_log()

      op_log
    end

    test "list_op_logs/0 returns all op_logs" do
      op_log = op_log_fixture()
      assert Admin.list_op_logs() == [op_log]
    end

    test "get_op_log!/1 returns the op_log with given id" do
      op_log = op_log_fixture()
      assert Admin.get_op_log!(op_log.id) == op_log
    end

    test "create_op_log/1 with valid data creates a op_log" do
      assert {:ok, %OpLog{} = op_log} = Admin.create_op_log(@valid_attrs)
    end

    test "create_op_log/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Admin.create_op_log(@invalid_attrs)
    end

    test "update_op_log/2 with valid data updates the op_log" do
      op_log = op_log_fixture()
      assert {:ok, op_log} = Admin.update_op_log(op_log, @update_attrs)
      assert %OpLog{} = op_log
    end

    test "update_op_log/2 with invalid data returns error changeset" do
      op_log = op_log_fixture()
      assert {:error, %Ecto.Changeset{}} = Admin.update_op_log(op_log, @invalid_attrs)
      assert op_log == Admin.get_op_log!(op_log.id)
    end

    test "delete_op_log/1 deletes the op_log" do
      op_log = op_log_fixture()
      assert {:ok, %OpLog{}} = Admin.delete_op_log(op_log)
      assert_raise Ecto.NoResultsError, fn -> Admin.get_op_log!(op_log.id) end
    end

    test "change_op_log/1 returns a op_log changeset" do
      op_log = op_log_fixture()
      assert %Ecto.Changeset{} = Admin.change_op_log(op_log)
    end
  end
end
