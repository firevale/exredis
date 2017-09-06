defmodule Acs.WcpTest do
  use Acs.DataCase

  alias Acs.Wcp

  describe "app_wcp_config" do
    alias Acs.Wcp.AppWcpConfig

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def app_wcp_config_fixture(attrs \\ %{}) do
      {:ok, app_wcp_config} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Wcp.create_app_wcp_config()

      app_wcp_config
    end

    test "list_app_wcp_config/0 returns all app_wcp_config" do
      app_wcp_config = app_wcp_config_fixture()
      assert Wcp.list_app_wcp_config() == [app_wcp_config]
    end

    test "get_app_wcp_config!/1 returns the app_wcp_config with given id" do
      app_wcp_config = app_wcp_config_fixture()
      assert Wcp.get_app_wcp_config!(app_wcp_config.id) == app_wcp_config
    end

    test "create_app_wcp_config/1 with valid data creates a app_wcp_config" do
      assert {:ok, %AppWcpConfig{} = app_wcp_config} = Wcp.create_app_wcp_config(@valid_attrs)
    end

    test "create_app_wcp_config/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Wcp.create_app_wcp_config(@invalid_attrs)
    end

    test "update_app_wcp_config/2 with valid data updates the app_wcp_config" do
      app_wcp_config = app_wcp_config_fixture()
      assert {:ok, app_wcp_config} = Wcp.update_app_wcp_config(app_wcp_config, @update_attrs)
      assert %AppWcpConfig{} = app_wcp_config
    end

    test "update_app_wcp_config/2 with invalid data returns error changeset" do
      app_wcp_config = app_wcp_config_fixture()
      assert {:error, %Ecto.Changeset{}} = Wcp.update_app_wcp_config(app_wcp_config, @invalid_attrs)
      assert app_wcp_config == Wcp.get_app_wcp_config!(app_wcp_config.id)
    end

    test "delete_app_wcp_config/1 deletes the app_wcp_config" do
      app_wcp_config = app_wcp_config_fixture()
      assert {:ok, %AppWcpConfig{}} = Wcp.delete_app_wcp_config(app_wcp_config)
      assert_raise Ecto.NoResultsError, fn -> Wcp.get_app_wcp_config!(app_wcp_config.id) end
    end

    test "change_app_wcp_config/1 returns a app_wcp_config changeset" do
      app_wcp_config = app_wcp_config_fixture()
      assert %Ecto.Changeset{} = Wcp.change_app_wcp_config(app_wcp_config)
    end
  end

  describe "app_wcp_message_rule" do
    alias Acs.Wcp.AppWcpMessageRule

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def app_wcp_message_rule_fixture(attrs \\ %{}) do
      {:ok, app_wcp_message_rule} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Wcp.create_app_wcp_message_rule()

      app_wcp_message_rule
    end

    test "list_app_wcp_message_rule/0 returns all app_wcp_message_rule" do
      app_wcp_message_rule = app_wcp_message_rule_fixture()
      assert Wcp.list_app_wcp_message_rule() == [app_wcp_message_rule]
    end

    test "get_app_wcp_message_rule!/1 returns the app_wcp_message_rule with given id" do
      app_wcp_message_rule = app_wcp_message_rule_fixture()
      assert Wcp.get_app_wcp_message_rule!(app_wcp_message_rule.id) == app_wcp_message_rule
    end

    test "create_app_wcp_message_rule/1 with valid data creates a app_wcp_message_rule" do
      assert {:ok, %AppWcpMessageRule{} = app_wcp_message_rule} = Wcp.create_app_wcp_message_rule(@valid_attrs)
    end

    test "create_app_wcp_message_rule/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Wcp.create_app_wcp_message_rule(@invalid_attrs)
    end

    test "update_app_wcp_message_rule/2 with valid data updates the app_wcp_message_rule" do
      app_wcp_message_rule = app_wcp_message_rule_fixture()
      assert {:ok, app_wcp_message_rule} = Wcp.update_app_wcp_message_rule(app_wcp_message_rule, @update_attrs)
      assert %AppWcpMessageRule{} = app_wcp_message_rule
    end

    test "update_app_wcp_message_rule/2 with invalid data returns error changeset" do
      app_wcp_message_rule = app_wcp_message_rule_fixture()
      assert {:error, %Ecto.Changeset{}} = Wcp.update_app_wcp_message_rule(app_wcp_message_rule, @invalid_attrs)
      assert app_wcp_message_rule == Wcp.get_app_wcp_message_rule!(app_wcp_message_rule.id)
    end

    test "delete_app_wcp_message_rule/1 deletes the app_wcp_message_rule" do
      app_wcp_message_rule = app_wcp_message_rule_fixture()
      assert {:ok, %AppWcpMessageRule{}} = Wcp.delete_app_wcp_message_rule(app_wcp_message_rule)
      assert_raise Ecto.NoResultsError, fn -> Wcp.get_app_wcp_message_rule!(app_wcp_message_rule.id) end
    end

    test "change_app_wcp_message_rule/1 returns a app_wcp_message_rule changeset" do
      app_wcp_message_rule = app_wcp_message_rule_fixture()
      assert %Ecto.Changeset{} = Wcp.change_app_wcp_message_rule(app_wcp_message_rule)
    end
  end

  describe "app_wcp_messages" do
    alias Acs.Wcp.AppWcpMessage

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def app_wcp_message_fixture(attrs \\ %{}) do
      {:ok, app_wcp_message} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Wcp.create_app_wcp_message()

      app_wcp_message
    end

    test "list_app_wcp_messages/0 returns all app_wcp_messages" do
      app_wcp_message = app_wcp_message_fixture()
      assert Wcp.list_app_wcp_messages() == [app_wcp_message]
    end

    test "get_app_wcp_message!/1 returns the app_wcp_message with given id" do
      app_wcp_message = app_wcp_message_fixture()
      assert Wcp.get_app_wcp_message!(app_wcp_message.id) == app_wcp_message
    end

    test "create_app_wcp_message/1 with valid data creates a app_wcp_message" do
      assert {:ok, %AppWcpMessage{} = app_wcp_message} = Wcp.create_app_wcp_message(@valid_attrs)
    end

    test "create_app_wcp_message/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Wcp.create_app_wcp_message(@invalid_attrs)
    end

    test "update_app_wcp_message/2 with valid data updates the app_wcp_message" do
      app_wcp_message = app_wcp_message_fixture()
      assert {:ok, app_wcp_message} = Wcp.update_app_wcp_message(app_wcp_message, @update_attrs)
      assert %AppWcpMessage{} = app_wcp_message
    end

    test "update_app_wcp_message/2 with invalid data returns error changeset" do
      app_wcp_message = app_wcp_message_fixture()
      assert {:error, %Ecto.Changeset{}} = Wcp.update_app_wcp_message(app_wcp_message, @invalid_attrs)
      assert app_wcp_message == Wcp.get_app_wcp_message!(app_wcp_message.id)
    end

    test "delete_app_wcp_message/1 deletes the app_wcp_message" do
      app_wcp_message = app_wcp_message_fixture()
      assert {:ok, %AppWcpMessage{}} = Wcp.delete_app_wcp_message(app_wcp_message)
      assert_raise Ecto.NoResultsError, fn -> Wcp.get_app_wcp_message!(app_wcp_message.id) end
    end

    test "change_app_wcp_message/1 returns a app_wcp_message changeset" do
      app_wcp_message = app_wcp_message_fixture()
      assert %Ecto.Changeset{} = Wcp.change_app_wcp_message(app_wcp_message)
    end
  end

  describe "app_wcp_users" do
    alias Acs.Wcp.AppWcpUser

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def app_wcp_user_fixture(attrs \\ %{}) do
      {:ok, app_wcp_user} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Wcp.create_app_wcp_user()

      app_wcp_user
    end

    test "list_app_wcp_users/0 returns all app_wcp_users" do
      app_wcp_user = app_wcp_user_fixture()
      assert Wcp.list_app_wcp_users() == [app_wcp_user]
    end

    test "get_app_wcp_user!/1 returns the app_wcp_user with given id" do
      app_wcp_user = app_wcp_user_fixture()
      assert Wcp.get_app_wcp_user!(app_wcp_user.id) == app_wcp_user
    end

    test "create_app_wcp_user/1 with valid data creates a app_wcp_user" do
      assert {:ok, %AppWcpUser{} = app_wcp_user} = Wcp.create_app_wcp_user(@valid_attrs)
    end

    test "create_app_wcp_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Wcp.create_app_wcp_user(@invalid_attrs)
    end

    test "update_app_wcp_user/2 with valid data updates the app_wcp_user" do
      app_wcp_user = app_wcp_user_fixture()
      assert {:ok, app_wcp_user} = Wcp.update_app_wcp_user(app_wcp_user, @update_attrs)
      assert %AppWcpUser{} = app_wcp_user
    end

    test "update_app_wcp_user/2 with invalid data returns error changeset" do
      app_wcp_user = app_wcp_user_fixture()
      assert {:error, %Ecto.Changeset{}} = Wcp.update_app_wcp_user(app_wcp_user, @invalid_attrs)
      assert app_wcp_user == Wcp.get_app_wcp_user!(app_wcp_user.id)
    end

    test "delete_app_wcp_user/1 deletes the app_wcp_user" do
      app_wcp_user = app_wcp_user_fixture()
      assert {:ok, %AppWcpUser{}} = Wcp.delete_app_wcp_user(app_wcp_user)
      assert_raise Ecto.NoResultsError, fn -> Wcp.get_app_wcp_user!(app_wcp_user.id) end
    end

    test "change_app_wcp_user/1 returns a app_wcp_user changeset" do
      app_wcp_user = app_wcp_user_fixture()
      assert %Ecto.Changeset{} = Wcp.change_app_wcp_user(app_wcp_user)
    end
  end
end
