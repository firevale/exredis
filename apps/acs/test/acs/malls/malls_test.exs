defmodule Acs.MallsTest do
  use Acs.DataCase

  alias Acs.Malls

  describe "malls" do
    alias Acs.Malls.Mall

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def mall_fixture(attrs \\ %{}) do
      {:ok, mall} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Malls.create_mall()

      mall
    end

    test "list_malls/0 returns all malls" do
      mall = mall_fixture()
      assert Malls.list_malls() == [mall]
    end

    test "get_mall!/1 returns the mall with given id" do
      mall = mall_fixture()
      assert Malls.get_mall!(mall.id) == mall
    end

    test "create_mall/1 with valid data creates a mall" do
      assert {:ok, %Mall{} = mall} = Malls.create_mall(@valid_attrs)
    end

    test "create_mall/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Malls.create_mall(@invalid_attrs)
    end

    test "update_mall/2 with valid data updates the mall" do
      mall = mall_fixture()
      assert {:ok, mall} = Malls.update_mall(mall, @update_attrs)
      assert %Mall{} = mall
    end

    test "update_mall/2 with invalid data returns error changeset" do
      mall = mall_fixture()
      assert {:error, %Ecto.Changeset{}} = Malls.update_mall(mall, @invalid_attrs)
      assert mall == Malls.get_mall!(mall.id)
    end

    test "delete_mall/1 deletes the mall" do
      mall = mall_fixture()
      assert {:ok, %Mall{}} = Malls.delete_mall(mall)
      assert_raise Ecto.NoResultsError, fn -> Malls.get_mall!(mall.id) end
    end

    test "change_mall/1 returns a mall changeset" do
      mall = mall_fixture()
      assert %Ecto.Changeset{} = Malls.change_mall(mall)
    end
  end

  describe "mall_orders" do
    alias Acs.Malls.MallOrder

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def mall_order_fixture(attrs \\ %{}) do
      {:ok, mall_order} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Malls.create_mall_order()

      mall_order
    end

    test "list_mall_orders/0 returns all mall_orders" do
      mall_order = mall_order_fixture()
      assert Malls.list_mall_orders() == [mall_order]
    end

    test "get_mall_order!/1 returns the mall_order with given id" do
      mall_order = mall_order_fixture()
      assert Malls.get_mall_order!(mall_order.id) == mall_order
    end

    test "create_mall_order/1 with valid data creates a mall_order" do
      assert {:ok, %MallOrder{} = mall_order} = Malls.create_mall_order(@valid_attrs)
    end

    test "create_mall_order/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Malls.create_mall_order(@invalid_attrs)
    end

    test "update_mall_order/2 with valid data updates the mall_order" do
      mall_order = mall_order_fixture()
      assert {:ok, mall_order} = Malls.update_mall_order(mall_order, @update_attrs)
      assert %MallOrder{} = mall_order
    end

    test "update_mall_order/2 with invalid data returns error changeset" do
      mall_order = mall_order_fixture()
      assert {:error, %Ecto.Changeset{}} = Malls.update_mall_order(mall_order, @invalid_attrs)
      assert mall_order == Malls.get_mall_order!(mall_order.id)
    end

    test "delete_mall_order/1 deletes the mall_order" do
      mall_order = mall_order_fixture()
      assert {:ok, %MallOrder{}} = Malls.delete_mall_order(mall_order)
      assert_raise Ecto.NoResultsError, fn -> Malls.get_mall_order!(mall_order.id) end
    end

    test "change_mall_order/1 returns a mall_order changeset" do
      mall_order = mall_order_fixture()
      assert %Ecto.Changeset{} = Malls.change_mall_order(mall_order)
    end
  end

  describe "mall_order_details" do
    alias Acs.Malls.MallOrderDetail

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def mall_order_detail_fixture(attrs \\ %{}) do
      {:ok, mall_order_detail} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Malls.create_mall_order_detail()

      mall_order_detail
    end

    test "list_mall_order_details/0 returns all mall_order_details" do
      mall_order_detail = mall_order_detail_fixture()
      assert Malls.list_mall_order_details() == [mall_order_detail]
    end

    test "get_mall_order_detail!/1 returns the mall_order_detail with given id" do
      mall_order_detail = mall_order_detail_fixture()
      assert Malls.get_mall_order_detail!(mall_order_detail.id) == mall_order_detail
    end

    test "create_mall_order_detail/1 with valid data creates a mall_order_detail" do
      assert {:ok, %MallOrderDetail{} = mall_order_detail} = Malls.create_mall_order_detail(@valid_attrs)
    end

    test "create_mall_order_detail/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Malls.create_mall_order_detail(@invalid_attrs)
    end

    test "update_mall_order_detail/2 with valid data updates the mall_order_detail" do
      mall_order_detail = mall_order_detail_fixture()
      assert {:ok, mall_order_detail} = Malls.update_mall_order_detail(mall_order_detail, @update_attrs)
      assert %MallOrderDetail{} = mall_order_detail
    end

    test "update_mall_order_detail/2 with invalid data returns error changeset" do
      mall_order_detail = mall_order_detail_fixture()
      assert {:error, %Ecto.Changeset{}} = Malls.update_mall_order_detail(mall_order_detail, @invalid_attrs)
      assert mall_order_detail == Malls.get_mall_order_detail!(mall_order_detail.id)
    end

    test "delete_mall_order_detail/1 deletes the mall_order_detail" do
      mall_order_detail = mall_order_detail_fixture()
      assert {:ok, %MallOrderDetail{}} = Malls.delete_mall_order_detail(mall_order_detail)
      assert_raise Ecto.NoResultsError, fn -> Malls.get_mall_order_detail!(mall_order_detail.id) end
    end

    test "change_mall_order_detail/1 returns a mall_order_detail changeset" do
      mall_order_detail = mall_order_detail_fixture()
      assert %Ecto.Changeset{} = Malls.change_mall_order_detail(mall_order_detail)
    end
  end

  describe "mall_goods" do
    alias Acs.Malls.MallGoods

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def mall_goods_fixture(attrs \\ %{}) do
      {:ok, mall_goods} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Malls.create_mall_goods()

      mall_goods
    end

    test "list_mall_goods/0 returns all mall_goods" do
      mall_goods = mall_goods_fixture()
      assert Malls.list_mall_goods() == [mall_goods]
    end

    test "get_mall_goods!/1 returns the mall_goods with given id" do
      mall_goods = mall_goods_fixture()
      assert Malls.get_mall_goods!(mall_goods.id) == mall_goods
    end

    test "create_mall_goods/1 with valid data creates a mall_goods" do
      assert {:ok, %MallGoods{} = mall_goods} = Malls.create_mall_goods(@valid_attrs)
    end

    test "create_mall_goods/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Malls.create_mall_goods(@invalid_attrs)
    end

    test "update_mall_goods/2 with valid data updates the mall_goods" do
      mall_goods = mall_goods_fixture()
      assert {:ok, mall_goods} = Malls.update_mall_goods(mall_goods, @update_attrs)
      assert %MallGoods{} = mall_goods
    end

    test "update_mall_goods/2 with invalid data returns error changeset" do
      mall_goods = mall_goods_fixture()
      assert {:error, %Ecto.Changeset{}} = Malls.update_mall_goods(mall_goods, @invalid_attrs)
      assert mall_goods == Malls.get_mall_goods!(mall_goods.id)
    end

    test "delete_mall_goods/1 deletes the mall_goods" do
      mall_goods = mall_goods_fixture()
      assert {:ok, %MallGoods{}} = Malls.delete_mall_goods(mall_goods)
      assert_raise Ecto.NoResultsError, fn -> Malls.get_mall_goods!(mall_goods.id) end
    end

    test "change_mall_goods/1 returns a mall_goods changeset" do
      mall_goods = mall_goods_fixture()
      assert %Ecto.Changeset{} = Malls.change_mall_goods(mall_goods)
    end
  end

  describe "mall_order_logs" do
    alias Acs.Malls.MallOrderLog

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def mall_order_log_fixture(attrs \\ %{}) do
      {:ok, mall_order_log} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Malls.create_mall_order_log()

      mall_order_log
    end

    test "list_mall_order_logs/0 returns all mall_order_logs" do
      mall_order_log = mall_order_log_fixture()
      assert Malls.list_mall_order_logs() == [mall_order_log]
    end

    test "get_mall_order_log!/1 returns the mall_order_log with given id" do
      mall_order_log = mall_order_log_fixture()
      assert Malls.get_mall_order_log!(mall_order_log.id) == mall_order_log
    end

    test "create_mall_order_log/1 with valid data creates a mall_order_log" do
      assert {:ok, %MallOrderLog{} = mall_order_log} = Malls.create_mall_order_log(@valid_attrs)
    end

    test "create_mall_order_log/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Malls.create_mall_order_log(@invalid_attrs)
    end

    test "update_mall_order_log/2 with valid data updates the mall_order_log" do
      mall_order_log = mall_order_log_fixture()
      assert {:ok, mall_order_log} = Malls.update_mall_order_log(mall_order_log, @update_attrs)
      assert %MallOrderLog{} = mall_order_log
    end

    test "update_mall_order_log/2 with invalid data returns error changeset" do
      mall_order_log = mall_order_log_fixture()
      assert {:error, %Ecto.Changeset{}} = Malls.update_mall_order_log(mall_order_log, @invalid_attrs)
      assert mall_order_log == Malls.get_mall_order_log!(mall_order_log.id)
    end

    test "delete_mall_order_log/1 deletes the mall_order_log" do
      mall_order_log = mall_order_log_fixture()
      assert {:ok, %MallOrderLog{}} = Malls.delete_mall_order_log(mall_order_log)
      assert_raise Ecto.NoResultsError, fn -> Malls.get_mall_order_log!(mall_order_log.id) end
    end

    test "change_mall_order_log/1 returns a mall_order_log changeset" do
      mall_order_log = mall_order_log_fixture()
      assert %Ecto.Changeset{} = Malls.change_mall_order_log(mall_order_log)
    end
  end
end
