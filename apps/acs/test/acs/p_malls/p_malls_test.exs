defmodule Acs.PMallsTest do
  use Acs.DataCase

  alias Acs.PMalls

  describe "pmall_orders" do
    alias Acs.PMalls.PMallOrder

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def p_mall_order_fixture(attrs \\ %{}) do
      {:ok, p_mall_order} =
        attrs
        |> Enum.into(@valid_attrs)
        |> PMalls.create_p_mall_order()

      p_mall_order
    end

    test "list_pmall_orders/0 returns all pmall_orders" do
      p_mall_order = p_mall_order_fixture()
      assert PMalls.list_pmall_orders() == [p_mall_order]
    end

    test "get_p_mall_order!/1 returns the p_mall_order with given id" do
      p_mall_order = p_mall_order_fixture()
      assert PMalls.get_p_mall_order!(p_mall_order.id) == p_mall_order
    end

    test "create_p_mall_order/1 with valid data creates a p_mall_order" do
      assert {:ok, %PMallOrder{} = p_mall_order} = PMalls.create_p_mall_order(@valid_attrs)
    end

    test "create_p_mall_order/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = PMalls.create_p_mall_order(@invalid_attrs)
    end

    test "update_p_mall_order/2 with valid data updates the p_mall_order" do
      p_mall_order = p_mall_order_fixture()
      assert {:ok, p_mall_order} = PMalls.update_p_mall_order(p_mall_order, @update_attrs)
      assert %PMallOrder{} = p_mall_order
    end

    test "update_p_mall_order/2 with invalid data returns error changeset" do
      p_mall_order = p_mall_order_fixture()
      assert {:error, %Ecto.Changeset{}} = PMalls.update_p_mall_order(p_mall_order, @invalid_attrs)
      assert p_mall_order == PMalls.get_p_mall_order!(p_mall_order.id)
    end

    test "delete_p_mall_order/1 deletes the p_mall_order" do
      p_mall_order = p_mall_order_fixture()
      assert {:ok, %PMallOrder{}} = PMalls.delete_p_mall_order(p_mall_order)
      assert_raise Ecto.NoResultsError, fn -> PMalls.get_p_mall_order!(p_mall_order.id) end
    end

    test "change_p_mall_order/1 returns a p_mall_order changeset" do
      p_mall_order = p_mall_order_fixture()
      assert %Ecto.Changeset{} = PMalls.change_p_mall_order(p_mall_order)
    end
  end

  describe "point_logs" do
    alias Acs.PMalls.PointLog

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def point_log_fixture(attrs \\ %{}) do
      {:ok, point_log} =
        attrs
        |> Enum.into(@valid_attrs)
        |> PMalls.create_point_log()

      point_log
    end

    test "list_point_logs/0 returns all point_logs" do
      point_log = point_log_fixture()
      assert PMalls.list_point_logs() == [point_log]
    end

    test "get_point_log!/1 returns the point_log with given id" do
      point_log = point_log_fixture()
      assert PMalls.get_point_log!(point_log.id) == point_log
    end

    test "create_point_log/1 with valid data creates a point_log" do
      assert {:ok, %PointLog{} = point_log} = PMalls.create_point_log(@valid_attrs)
    end

    test "create_point_log/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = PMalls.create_point_log(@invalid_attrs)
    end

    test "update_point_log/2 with valid data updates the point_log" do
      point_log = point_log_fixture()
      assert {:ok, point_log} = PMalls.update_point_log(point_log, @update_attrs)
      assert %PointLog{} = point_log
    end

    test "update_point_log/2 with invalid data returns error changeset" do
      point_log = point_log_fixture()
      assert {:error, %Ecto.Changeset{}} = PMalls.update_point_log(point_log, @invalid_attrs)
      assert point_log == PMalls.get_point_log!(point_log.id)
    end

    test "delete_point_log/1 deletes the point_log" do
      point_log = point_log_fixture()
      assert {:ok, %PointLog{}} = PMalls.delete_point_log(point_log)
      assert_raise Ecto.NoResultsError, fn -> PMalls.get_point_log!(point_log.id) end
    end

    test "change_point_log/1 returns a point_log changeset" do
      point_log = point_log_fixture()
      assert %Ecto.Changeset{} = PMalls.change_point_log(point_log)
    end
  end

  describe "pmall_goods" do
    alias Acs.PMalls.PMallGoods

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def p_mall_goods_fixture(attrs \\ %{}) do
      {:ok, p_mall_goods} =
        attrs
        |> Enum.into(@valid_attrs)
        |> PMalls.create_p_mall_goods()

      p_mall_goods
    end

    test "list_pmall_goods/0 returns all pmall_goods" do
      p_mall_goods = p_mall_goods_fixture()
      assert PMalls.list_pmall_goods() == [p_mall_goods]
    end

    test "get_p_mall_goods!/1 returns the p_mall_goods with given id" do
      p_mall_goods = p_mall_goods_fixture()
      assert PMalls.get_p_mall_goods!(p_mall_goods.id) == p_mall_goods
    end

    test "create_p_mall_goods/1 with valid data creates a p_mall_goods" do
      assert {:ok, %PMallGoods{} = p_mall_goods} = PMalls.create_p_mall_goods(@valid_attrs)
    end

    test "create_p_mall_goods/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = PMalls.create_p_mall_goods(@invalid_attrs)
    end

    test "update_p_mall_goods/2 with valid data updates the p_mall_goods" do
      p_mall_goods = p_mall_goods_fixture()
      assert {:ok, p_mall_goods} = PMalls.update_p_mall_goods(p_mall_goods, @update_attrs)
      assert %PMallGoods{} = p_mall_goods
    end

    test "update_p_mall_goods/2 with invalid data returns error changeset" do
      p_mall_goods = p_mall_goods_fixture()
      assert {:error, %Ecto.Changeset{}} = PMalls.update_p_mall_goods(p_mall_goods, @invalid_attrs)
      assert p_mall_goods == PMalls.get_p_mall_goods!(p_mall_goods.id)
    end

    test "delete_p_mall_goods/1 deletes the p_mall_goods" do
      p_mall_goods = p_mall_goods_fixture()
      assert {:ok, %PMallGoods{}} = PMalls.delete_p_mall_goods(p_mall_goods)
      assert_raise Ecto.NoResultsError, fn -> PMalls.get_p_mall_goods!(p_mall_goods.id) end
    end

    test "change_p_mall_goods/1 returns a p_mall_goods changeset" do
      p_mall_goods = p_mall_goods_fixture()
      assert %Ecto.Changeset{} = PMalls.change_p_mall_goods(p_mall_goods)
    end
  end
end
