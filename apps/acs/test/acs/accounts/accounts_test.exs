defmodule Acs.AccountsTest do
  use Acs.DataCase

  alias Acs.Accounts

  describe "users" do
    alias Acs.Accounts.User

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def user_fixture(attrs \\ %{}) do
      {:ok, user} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Accounts.create_user()

      user
    end

    test "list_users/0 returns all users" do
      user = user_fixture()
      assert Accounts.list_users() == [user]
    end

    test "get_user!/1 returns the user with given id" do
      user = user_fixture()
      assert Accounts.get_user!(user.id) == user
    end

    test "create_user/1 with valid data creates a user" do
      assert {:ok, %User{} = user} = Accounts.create_user(@valid_attrs)
    end

    test "create_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Accounts.create_user(@invalid_attrs)
    end

    test "update_user/2 with valid data updates the user" do
      user = user_fixture()
      assert {:ok, user} = Accounts.update_user(user, @update_attrs)
      assert %User{} = user
    end

    test "update_user/2 with invalid data returns error changeset" do
      user = user_fixture()
      assert {:error, %Ecto.Changeset{}} = Accounts.update_user(user, @invalid_attrs)
      assert user == Accounts.get_user!(user.id)
    end

    test "delete_user/1 deletes the user" do
      user = user_fixture()
      assert {:ok, %User{}} = Accounts.delete_user(user)
      assert_raise Ecto.NoResultsError, fn -> Accounts.get_user!(user.id) end
    end

    test "change_user/1 returns a user changeset" do
      user = user_fixture()
      assert %Ecto.Changeset{} = Accounts.change_user(user)
    end
  end

  describe "user_addresses" do
    alias Acs.Accounts.UserAddress

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def user_address_fixture(attrs \\ %{}) do
      {:ok, user_address} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Accounts.create_user_address()

      user_address
    end

    test "list_user_addresses/0 returns all user_addresses" do
      user_address = user_address_fixture()
      assert Accounts.list_user_addresses() == [user_address]
    end

    test "get_user_address!/1 returns the user_address with given id" do
      user_address = user_address_fixture()
      assert Accounts.get_user_address!(user_address.id) == user_address
    end

    test "create_user_address/1 with valid data creates a user_address" do
      assert {:ok, %UserAddress{} = user_address} = Accounts.create_user_address(@valid_attrs)
    end

    test "create_user_address/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Accounts.create_user_address(@invalid_attrs)
    end

    test "update_user_address/2 with valid data updates the user_address" do
      user_address = user_address_fixture()
      assert {:ok, user_address} = Accounts.update_user_address(user_address, @update_attrs)
      assert %UserAddress{} = user_address
    end

    test "update_user_address/2 with invalid data returns error changeset" do
      user_address = user_address_fixture()
      assert {:error, %Ecto.Changeset{}} = Accounts.update_user_address(user_address, @invalid_attrs)
      assert user_address == Accounts.get_user_address!(user_address.id)
    end

    test "delete_user_address/1 deletes the user_address" do
      user_address = user_address_fixture()
      assert {:ok, %UserAddress{}} = Accounts.delete_user_address(user_address)
      assert_raise Ecto.NoResultsError, fn -> Accounts.get_user_address!(user_address.id) end
    end

    test "change_user_address/1 returns a user_address changeset" do
      user_address = user_address_fixture()
      assert %Ecto.Changeset{} = Accounts.change_user_address(user_address)
    end
  end

  describe "user_sdk_bindings" do
    alias Acs.Accounts.UserSdkBinding

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def user_sdk_binding_fixture(attrs \\ %{}) do
      {:ok, user_sdk_binding} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Accounts.create_user_sdk_binding()

      user_sdk_binding
    end

    test "list_user_sdk_bindings/0 returns all user_sdk_bindings" do
      user_sdk_binding = user_sdk_binding_fixture()
      assert Accounts.list_user_sdk_bindings() == [user_sdk_binding]
    end

    test "get_user_sdk_binding!/1 returns the user_sdk_binding with given id" do
      user_sdk_binding = user_sdk_binding_fixture()
      assert Accounts.get_user_sdk_binding!(user_sdk_binding.id) == user_sdk_binding
    end

    test "create_user_sdk_binding/1 with valid data creates a user_sdk_binding" do
      assert {:ok, %UserSdkBinding{} = user_sdk_binding} = Accounts.create_user_sdk_binding(@valid_attrs)
    end

    test "create_user_sdk_binding/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Accounts.create_user_sdk_binding(@invalid_attrs)
    end

    test "update_user_sdk_binding/2 with valid data updates the user_sdk_binding" do
      user_sdk_binding = user_sdk_binding_fixture()
      assert {:ok, user_sdk_binding} = Accounts.update_user_sdk_binding(user_sdk_binding, @update_attrs)
      assert %UserSdkBinding{} = user_sdk_binding
    end

    test "update_user_sdk_binding/2 with invalid data returns error changeset" do
      user_sdk_binding = user_sdk_binding_fixture()
      assert {:error, %Ecto.Changeset{}} = Accounts.update_user_sdk_binding(user_sdk_binding, @invalid_attrs)
      assert user_sdk_binding == Accounts.get_user_sdk_binding!(user_sdk_binding.id)
    end

    test "delete_user_sdk_binding/1 deletes the user_sdk_binding" do
      user_sdk_binding = user_sdk_binding_fixture()
      assert {:ok, %UserSdkBinding{}} = Accounts.delete_user_sdk_binding(user_sdk_binding)
      assert_raise Ecto.NoResultsError, fn -> Accounts.get_user_sdk_binding!(user_sdk_binding.id) end
    end

    test "change_user_sdk_binding/1 returns a user_sdk_binding changeset" do
      user_sdk_binding = user_sdk_binding_fixture()
      assert %Ecto.Changeset{} = Accounts.change_user_sdk_binding(user_sdk_binding)
    end
  end
end
