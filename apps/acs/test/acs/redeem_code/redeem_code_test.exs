defmodule Acs.RedeemCodeTest do
  use Acs.DataCase

  alias Acs.RedeemCode

  describe "app_redeem_codes" do
    alias Acs.RedeemCode.AppRedeemCode

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def app_redeem_code_fixture(attrs \\ %{}) do
      {:ok, app_redeem_code} =
        attrs
        |> Enum.into(@valid_attrs)
        |> RedeemCode.create_app_redeem_code()

      app_redeem_code
    end

    test "list_app_redeem_codes/0 returns all app_redeem_codes" do
      app_redeem_code = app_redeem_code_fixture()
      assert RedeemCode.list_app_redeem_codes() == [app_redeem_code]
    end

    test "get_app_redeem_code!/1 returns the app_redeem_code with given id" do
      app_redeem_code = app_redeem_code_fixture()
      assert RedeemCode.get_app_redeem_code!(app_redeem_code.id) == app_redeem_code
    end

    test "create_app_redeem_code/1 with valid data creates a app_redeem_code" do
      assert {:ok, %AppRedeemCode{} = app_redeem_code} = RedeemCode.create_app_redeem_code(@valid_attrs)
    end

    test "create_app_redeem_code/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = RedeemCode.create_app_redeem_code(@invalid_attrs)
    end

    test "update_app_redeem_code/2 with valid data updates the app_redeem_code" do
      app_redeem_code = app_redeem_code_fixture()
      assert {:ok, app_redeem_code} = RedeemCode.update_app_redeem_code(app_redeem_code, @update_attrs)
      assert %AppRedeemCode{} = app_redeem_code
    end

    test "update_app_redeem_code/2 with invalid data returns error changeset" do
      app_redeem_code = app_redeem_code_fixture()
      assert {:error, %Ecto.Changeset{}} = RedeemCode.update_app_redeem_code(app_redeem_code, @invalid_attrs)
      assert app_redeem_code == RedeemCode.get_app_redeem_code!(app_redeem_code.id)
    end

    test "delete_app_redeem_code/1 deletes the app_redeem_code" do
      app_redeem_code = app_redeem_code_fixture()
      assert {:ok, %AppRedeemCode{}} = RedeemCode.delete_app_redeem_code(app_redeem_code)
      assert_raise Ecto.NoResultsError, fn -> RedeemCode.get_app_redeem_code!(app_redeem_code.id) end
    end

    test "change_app_redeem_code/1 returns a app_redeem_code changeset" do
      app_redeem_code = app_redeem_code_fixture()
      assert %Ecto.Changeset{} = RedeemCode.change_app_redeem_code(app_redeem_code)
    end
  end

  describe "app_redeem_code_types" do
    alias Acs.RedeemCode.AppRedeemCodeType

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def app_redeem_code_type_fixture(attrs \\ %{}) do
      {:ok, app_redeem_code_type} =
        attrs
        |> Enum.into(@valid_attrs)
        |> RedeemCode.create_app_redeem_code_type()

      app_redeem_code_type
    end

    test "list_app_redeem_code_types/0 returns all app_redeem_code_types" do
      app_redeem_code_type = app_redeem_code_type_fixture()
      assert RedeemCode.list_app_redeem_code_types() == [app_redeem_code_type]
    end

    test "get_app_redeem_code_type!/1 returns the app_redeem_code_type with given id" do
      app_redeem_code_type = app_redeem_code_type_fixture()
      assert RedeemCode.get_app_redeem_code_type!(app_redeem_code_type.id) == app_redeem_code_type
    end

    test "create_app_redeem_code_type/1 with valid data creates a app_redeem_code_type" do
      assert {:ok, %AppRedeemCodeType{} = app_redeem_code_type} = RedeemCode.create_app_redeem_code_type(@valid_attrs)
    end

    test "create_app_redeem_code_type/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = RedeemCode.create_app_redeem_code_type(@invalid_attrs)
    end

    test "update_app_redeem_code_type/2 with valid data updates the app_redeem_code_type" do
      app_redeem_code_type = app_redeem_code_type_fixture()
      assert {:ok, app_redeem_code_type} = RedeemCode.update_app_redeem_code_type(app_redeem_code_type, @update_attrs)
      assert %AppRedeemCodeType{} = app_redeem_code_type
    end

    test "update_app_redeem_code_type/2 with invalid data returns error changeset" do
      app_redeem_code_type = app_redeem_code_type_fixture()
      assert {:error, %Ecto.Changeset{}} = RedeemCode.update_app_redeem_code_type(app_redeem_code_type, @invalid_attrs)
      assert app_redeem_code_type == RedeemCode.get_app_redeem_code_type!(app_redeem_code_type.id)
    end

    test "delete_app_redeem_code_type/1 deletes the app_redeem_code_type" do
      app_redeem_code_type = app_redeem_code_type_fixture()
      assert {:ok, %AppRedeemCodeType{}} = RedeemCode.delete_app_redeem_code_type(app_redeem_code_type)
      assert_raise Ecto.NoResultsError, fn -> RedeemCode.get_app_redeem_code_type!(app_redeem_code_type.id) end
    end

    test "change_app_redeem_code_type/1 returns a app_redeem_code_type changeset" do
      app_redeem_code_type = app_redeem_code_type_fixture()
      assert %Ecto.Changeset{} = RedeemCode.change_app_redeem_code_type(app_redeem_code_type)
    end
  end
end
