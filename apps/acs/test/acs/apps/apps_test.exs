defmodule Acs.AppsTest do
  use Acs.DataCase

  alias Acs.Apps

  describe "apps" do
    alias Acs.Apps.App

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def app_fixture(attrs \\ %{}) do
      {:ok, app} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Apps.create_app()

      app
    end

    test "list_apps/0 returns all apps" do
      app = app_fixture()
      assert Apps.list_apps() == [app]
    end

    test "get_app!/1 returns the app with given id" do
      app = app_fixture()
      assert Apps.get_app!(app.id) == app
    end

    test "create_app/1 with valid data creates a app" do
      assert {:ok, %App{} = app} = Apps.create_app(@valid_attrs)
    end

    test "create_app/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Apps.create_app(@invalid_attrs)
    end

    test "update_app/2 with valid data updates the app" do
      app = app_fixture()
      assert {:ok, app} = Apps.update_app(app, @update_attrs)
      assert %App{} = app
    end

    test "update_app/2 with invalid data returns error changeset" do
      app = app_fixture()
      assert {:error, %Ecto.Changeset{}} = Apps.update_app(app, @invalid_attrs)
      assert app == Apps.get_app!(app.id)
    end

    test "delete_app/1 deletes the app" do
      app = app_fixture()
      assert {:ok, %App{}} = Apps.delete_app(app)
      assert_raise Ecto.NoResultsError, fn -> Apps.get_app!(app.id) end
    end

    test "change_app/1 returns a app changeset" do
      app = app_fixture()
      assert %Ecto.Changeset{} = Apps.change_app(app)
    end
  end

  describe "apps" do
    alias Acs.Apps.AppOrder

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def app_order_fixture(attrs \\ %{}) do
      {:ok, app_order} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Apps.create_app_order()

      app_order
    end

    test "list_apps/0 returns all apps" do
      app_order = app_order_fixture()
      assert Apps.list_apps() == [app_order]
    end

    test "get_app_order!/1 returns the app_order with given id" do
      app_order = app_order_fixture()
      assert Apps.get_app_order!(app_order.id) == app_order
    end

    test "create_app_order/1 with valid data creates a app_order" do
      assert {:ok, %AppOrder{} = app_order} = Apps.create_app_order(@valid_attrs)
    end

    test "create_app_order/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Apps.create_app_order(@invalid_attrs)
    end

    test "update_app_order/2 with valid data updates the app_order" do
      app_order = app_order_fixture()
      assert {:ok, app_order} = Apps.update_app_order(app_order, @update_attrs)
      assert %AppOrder{} = app_order
    end

    test "update_app_order/2 with invalid data returns error changeset" do
      app_order = app_order_fixture()
      assert {:error, %Ecto.Changeset{}} = Apps.update_app_order(app_order, @invalid_attrs)
      assert app_order == Apps.get_app_order!(app_order.id)
    end

    test "delete_app_order/1 deletes the app_order" do
      app_order = app_order_fixture()
      assert {:ok, %AppOrder{}} = Apps.delete_app_order(app_order)
      assert_raise Ecto.NoResultsError, fn -> Apps.get_app_order!(app_order.id) end
    end

    test "change_app_order/1 returns a app_order changeset" do
      app_order = app_order_fixture()
      assert %Ecto.Changeset{} = Apps.change_app_order(app_order)
    end
  end

  describe "apps" do
    alias Acs.Apps.AppGoods

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def app_goods_fixture(attrs \\ %{}) do
      {:ok, app_goods} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Apps.create_app_goods()

      app_goods
    end

    test "list_apps/0 returns all apps" do
      app_goods = app_goods_fixture()
      assert Apps.list_apps() == [app_goods]
    end

    test "get_app_goods!/1 returns the app_goods with given id" do
      app_goods = app_goods_fixture()
      assert Apps.get_app_goods!(app_goods.id) == app_goods
    end

    test "create_app_goods/1 with valid data creates a app_goods" do
      assert {:ok, %AppGoods{} = app_goods} = Apps.create_app_goods(@valid_attrs)
    end

    test "create_app_goods/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Apps.create_app_goods(@invalid_attrs)
    end

    test "update_app_goods/2 with valid data updates the app_goods" do
      app_goods = app_goods_fixture()
      assert {:ok, app_goods} = Apps.update_app_goods(app_goods, @update_attrs)
      assert %AppGoods{} = app_goods
    end

    test "update_app_goods/2 with invalid data returns error changeset" do
      app_goods = app_goods_fixture()
      assert {:error, %Ecto.Changeset{}} = Apps.update_app_goods(app_goods, @invalid_attrs)
      assert app_goods == Apps.get_app_goods!(app_goods.id)
    end

    test "delete_app_goods/1 deletes the app_goods" do
      app_goods = app_goods_fixture()
      assert {:ok, %AppGoods{}} = Apps.delete_app_goods(app_goods)
      assert_raise Ecto.NoResultsError, fn -> Apps.get_app_goods!(app_goods.id) end
    end

    test "change_app_goods/1 returns a app_goods changeset" do
      app_goods = app_goods_fixture()
      assert %Ecto.Changeset{} = Apps.change_app_goods(app_goods)
    end
  end

  describe "apps" do
    alias Acs.Apps.AppNews

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def app_news_fixture(attrs \\ %{}) do
      {:ok, app_news} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Apps.create_app_news()

      app_news
    end

    test "list_apps/0 returns all apps" do
      app_news = app_news_fixture()
      assert Apps.list_apps() == [app_news]
    end

    test "get_app_news!/1 returns the app_news with given id" do
      app_news = app_news_fixture()
      assert Apps.get_app_news!(app_news.id) == app_news
    end

    test "create_app_news/1 with valid data creates a app_news" do
      assert {:ok, %AppNews{} = app_news} = Apps.create_app_news(@valid_attrs)
    end

    test "create_app_news/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Apps.create_app_news(@invalid_attrs)
    end

    test "update_app_news/2 with valid data updates the app_news" do
      app_news = app_news_fixture()
      assert {:ok, app_news} = Apps.update_app_news(app_news, @update_attrs)
      assert %AppNews{} = app_news
    end

    test "update_app_news/2 with invalid data returns error changeset" do
      app_news = app_news_fixture()
      assert {:error, %Ecto.Changeset{}} = Apps.update_app_news(app_news, @invalid_attrs)
      assert app_news == Apps.get_app_news!(app_news.id)
    end

    test "delete_app_news/1 deletes the app_news" do
      app_news = app_news_fixture()
      assert {:ok, %AppNews{}} = Apps.delete_app_news(app_news)
      assert_raise Ecto.NoResultsError, fn -> Apps.get_app_news!(app_news.id) end
    end

    test "change_app_news/1 returns a app_news changeset" do
      app_news = app_news_fixture()
      assert %Ecto.Changeset{} = Apps.change_app_news(app_news)
    end
  end

  describe "apps" do
    alias Acs.Apps.AppQuestion

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def app_question_fixture(attrs \\ %{}) do
      {:ok, app_question} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Apps.create_app_question()

      app_question
    end

    test "list_apps/0 returns all apps" do
      app_question = app_question_fixture()
      assert Apps.list_apps() == [app_question]
    end

    test "get_app_question!/1 returns the app_question with given id" do
      app_question = app_question_fixture()
      assert Apps.get_app_question!(app_question.id) == app_question
    end

    test "create_app_question/1 with valid data creates a app_question" do
      assert {:ok, %AppQuestion{} = app_question} = Apps.create_app_question(@valid_attrs)
    end

    test "create_app_question/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Apps.create_app_question(@invalid_attrs)
    end

    test "update_app_question/2 with valid data updates the app_question" do
      app_question = app_question_fixture()
      assert {:ok, app_question} = Apps.update_app_question(app_question, @update_attrs)
      assert %AppQuestion{} = app_question
    end

    test "update_app_question/2 with invalid data returns error changeset" do
      app_question = app_question_fixture()
      assert {:error, %Ecto.Changeset{}} = Apps.update_app_question(app_question, @invalid_attrs)
      assert app_question == Apps.get_app_question!(app_question.id)
    end

    test "delete_app_question/1 deletes the app_question" do
      app_question = app_question_fixture()
      assert {:ok, %AppQuestion{}} = Apps.delete_app_question(app_question)
      assert_raise Ecto.NoResultsError, fn -> Apps.get_app_question!(app_question.id) end
    end

    test "change_app_question/1 returns a app_question changeset" do
      app_question = app_question_fixture()
      assert %Ecto.Changeset{} = Apps.change_app_question(app_question)
    end
  end

  describe "apps" do
    alias Acs.Apps.AppGoodsProductId

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def app_goods_product_id_fixture(attrs \\ %{}) do
      {:ok, app_goods_product_id} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Apps.create_app_goods_product_id()

      app_goods_product_id
    end

    test "list_apps/0 returns all apps" do
      app_goods_product_id = app_goods_product_id_fixture()
      assert Apps.list_apps() == [app_goods_product_id]
    end

    test "get_app_goods_product_id!/1 returns the app_goods_product_id with given id" do
      app_goods_product_id = app_goods_product_id_fixture()
      assert Apps.get_app_goods_product_id!(app_goods_product_id.id) == app_goods_product_id
    end

    test "create_app_goods_product_id/1 with valid data creates a app_goods_product_id" do
      assert {:ok, %AppGoodsProductId{} = app_goods_product_id} = Apps.create_app_goods_product_id(@valid_attrs)
    end

    test "create_app_goods_product_id/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Apps.create_app_goods_product_id(@invalid_attrs)
    end

    test "update_app_goods_product_id/2 with valid data updates the app_goods_product_id" do
      app_goods_product_id = app_goods_product_id_fixture()
      assert {:ok, app_goods_product_id} = Apps.update_app_goods_product_id(app_goods_product_id, @update_attrs)
      assert %AppGoodsProductId{} = app_goods_product_id
    end

    test "update_app_goods_product_id/2 with invalid data returns error changeset" do
      app_goods_product_id = app_goods_product_id_fixture()
      assert {:error, %Ecto.Changeset{}} = Apps.update_app_goods_product_id(app_goods_product_id, @invalid_attrs)
      assert app_goods_product_id == Apps.get_app_goods_product_id!(app_goods_product_id.id)
    end

    test "delete_app_goods_product_id/1 deletes the app_goods_product_id" do
      app_goods_product_id = app_goods_product_id_fixture()
      assert {:ok, %AppGoodsProductId{}} = Apps.delete_app_goods_product_id(app_goods_product_id)
      assert_raise Ecto.NoResultsError, fn -> Apps.get_app_goods_product_id!(app_goods_product_id.id) end
    end

    test "change_app_goods_product_id/1 returns a app_goods_product_id changeset" do
      app_goods_product_id = app_goods_product_id_fixture()
      assert %Ecto.Changeset{} = Apps.change_app_goods_product_id(app_goods_product_id)
    end
  end

  describe "apps" do
    alias Acs.Apps.AppSdkBinding

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def app_sdk_binding_fixture(attrs \\ %{}) do
      {:ok, app_sdk_binding} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Apps.create_app_sdk_binding()

      app_sdk_binding
    end

    test "list_apps/0 returns all apps" do
      app_sdk_binding = app_sdk_binding_fixture()
      assert Apps.list_apps() == [app_sdk_binding]
    end

    test "get_app_sdk_binding!/1 returns the app_sdk_binding with given id" do
      app_sdk_binding = app_sdk_binding_fixture()
      assert Apps.get_app_sdk_binding!(app_sdk_binding.id) == app_sdk_binding
    end

    test "create_app_sdk_binding/1 with valid data creates a app_sdk_binding" do
      assert {:ok, %AppSdkBinding{} = app_sdk_binding} = Apps.create_app_sdk_binding(@valid_attrs)
    end

    test "create_app_sdk_binding/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Apps.create_app_sdk_binding(@invalid_attrs)
    end

    test "update_app_sdk_binding/2 with valid data updates the app_sdk_binding" do
      app_sdk_binding = app_sdk_binding_fixture()
      assert {:ok, app_sdk_binding} = Apps.update_app_sdk_binding(app_sdk_binding, @update_attrs)
      assert %AppSdkBinding{} = app_sdk_binding
    end

    test "update_app_sdk_binding/2 with invalid data returns error changeset" do
      app_sdk_binding = app_sdk_binding_fixture()
      assert {:error, %Ecto.Changeset{}} = Apps.update_app_sdk_binding(app_sdk_binding, @invalid_attrs)
      assert app_sdk_binding == Apps.get_app_sdk_binding!(app_sdk_binding.id)
    end

    test "delete_app_sdk_binding/1 deletes the app_sdk_binding" do
      app_sdk_binding = app_sdk_binding_fixture()
      assert {:ok, %AppSdkBinding{}} = Apps.delete_app_sdk_binding(app_sdk_binding)
      assert_raise Ecto.NoResultsError, fn -> Apps.get_app_sdk_binding!(app_sdk_binding.id) end
    end

    test "change_app_sdk_binding/1 returns a app_sdk_binding changeset" do
      app_sdk_binding = app_sdk_binding_fixture()
      assert %Ecto.Changeset{} = Apps.change_app_sdk_binding(app_sdk_binding)
    end
  end

  describe "apps" do
    alias Acs.Apps.AppSdkPaymentCallback

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def app_sdk_payment_callback_fixture(attrs \\ %{}) do
      {:ok, app_sdk_payment_callback} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Apps.create_app_sdk_payment_callback()

      app_sdk_payment_callback
    end

    test "list_apps/0 returns all apps" do
      app_sdk_payment_callback = app_sdk_payment_callback_fixture()
      assert Apps.list_apps() == [app_sdk_payment_callback]
    end

    test "get_app_sdk_payment_callback!/1 returns the app_sdk_payment_callback with given id" do
      app_sdk_payment_callback = app_sdk_payment_callback_fixture()
      assert Apps.get_app_sdk_payment_callback!(app_sdk_payment_callback.id) == app_sdk_payment_callback
    end

    test "create_app_sdk_payment_callback/1 with valid data creates a app_sdk_payment_callback" do
      assert {:ok, %AppSdkPaymentCallback{} = app_sdk_payment_callback} = Apps.create_app_sdk_payment_callback(@valid_attrs)
    end

    test "create_app_sdk_payment_callback/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Apps.create_app_sdk_payment_callback(@invalid_attrs)
    end

    test "update_app_sdk_payment_callback/2 with valid data updates the app_sdk_payment_callback" do
      app_sdk_payment_callback = app_sdk_payment_callback_fixture()
      assert {:ok, app_sdk_payment_callback} = Apps.update_app_sdk_payment_callback(app_sdk_payment_callback, @update_attrs)
      assert %AppSdkPaymentCallback{} = app_sdk_payment_callback
    end

    test "update_app_sdk_payment_callback/2 with invalid data returns error changeset" do
      app_sdk_payment_callback = app_sdk_payment_callback_fixture()
      assert {:error, %Ecto.Changeset{}} = Apps.update_app_sdk_payment_callback(app_sdk_payment_callback, @invalid_attrs)
      assert app_sdk_payment_callback == Apps.get_app_sdk_payment_callback!(app_sdk_payment_callback.id)
    end

    test "delete_app_sdk_payment_callback/1 deletes the app_sdk_payment_callback" do
      app_sdk_payment_callback = app_sdk_payment_callback_fixture()
      assert {:ok, %AppSdkPaymentCallback{}} = Apps.delete_app_sdk_payment_callback(app_sdk_payment_callback)
      assert_raise Ecto.NoResultsError, fn -> Apps.get_app_sdk_payment_callback!(app_sdk_payment_callback.id) end
    end

    test "change_app_sdk_payment_callback/1 returns a app_sdk_payment_callback changeset" do
      app_sdk_payment_callback = app_sdk_payment_callback_fixture()
      assert %Ecto.Changeset{} = Apps.change_app_sdk_payment_callback(app_sdk_payment_callback)
    end
  end
end
