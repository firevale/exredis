defmodule Acs.LoginCodesTest do
  use Acs.DataCase

  alias Acs.LoginCodes

  describe "app_login_codes" do
    alias Acs.LoginCodes.AppLoginCode

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def app_login_code_fixture(attrs \\ %{}) do
      {:ok, app_login_code} =
        attrs
        |> Enum.into(@valid_attrs)
        |> LoginCodes.create_app_login_code()

      app_login_code
    end

    test "list_app_login_codes/0 returns all app_login_codes" do
      app_login_code = app_login_code_fixture()
      assert LoginCodes.list_app_login_codes() == [app_login_code]
    end

    test "get_app_login_code!/1 returns the app_login_code with given id" do
      app_login_code = app_login_code_fixture()
      assert LoginCodes.get_app_login_code!(app_login_code.id) == app_login_code
    end

    test "create_app_login_code/1 with valid data creates a app_login_code" do
      assert {:ok, %AppLoginCode{} = app_login_code} = LoginCodes.create_app_login_code(@valid_attrs)
    end

    test "create_app_login_code/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = LoginCodes.create_app_login_code(@invalid_attrs)
    end

    test "update_app_login_code/2 with valid data updates the app_login_code" do
      app_login_code = app_login_code_fixture()
      assert {:ok, app_login_code} = LoginCodes.update_app_login_code(app_login_code, @update_attrs)
      assert %AppLoginCode{} = app_login_code
    end

    test "update_app_login_code/2 with invalid data returns error changeset" do
      app_login_code = app_login_code_fixture()
      assert {:error, %Ecto.Changeset{}} = LoginCodes.update_app_login_code(app_login_code, @invalid_attrs)
      assert app_login_code == LoginCodes.get_app_login_code!(app_login_code.id)
    end

    test "delete_app_login_code/1 deletes the app_login_code" do
      app_login_code = app_login_code_fixture()
      assert {:ok, %AppLoginCode{}} = LoginCodes.delete_app_login_code(app_login_code)
      assert_raise Ecto.NoResultsError, fn -> LoginCodes.get_app_login_code!(app_login_code.id) end
    end

    test "change_app_login_code/1 returns a app_login_code changeset" do
      app_login_code = app_login_code_fixture()
      assert %Ecto.Changeset{} = LoginCodes.change_app_login_code(app_login_code)
    end
  end
end
