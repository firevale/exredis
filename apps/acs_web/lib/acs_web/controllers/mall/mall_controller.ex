defmodule AcsWeb.MallController do
  use AcsWeb, :controller

  plug :fetch_app_id
  plug :fetch_access_token
  plug :fetch_session_user_id
  plug :fetch_session_user
  # plug :check_forum_manager when action in [:delete_comment, :toggle_post_status]
  plug :cache_page, [cache_seconds: 10] when action in [:fetch_malls, :get_active_goods_paged]
  # plug :cache_page, [cache_seconds: 600] when action in [:get_forum_info, :get_paged_forums]
  plug :check_is_admin when action in [:update_goods, :update_goods_pic, :toggle_goods_status, :delete_goods]

  # fetch_malls
  def fetch_malls(conn, %{"page" => page, "records_per_page" => records_per_page}) do
    fetch_malls(conn, page, records_per_page)
  end
  def fetch_malls(conn, %{"app_id" => app_id}) do
    malls = Malls.fetch_malls(app_id)
    conn |> json(%{success: true, malls: malls})
  end  
  def fetch_malls(conn, _params) do
    fetch_malls(conn, 1, 100)
  end
  defp fetch_malls(conn, page, records_per_page) do
    {:ok, malls, total_page} = Malls.fetch_malls(page, records_per_page)
    conn |> json(%{success: true, malls: malls, total: total_page})
  end

  # fetch_goods
  def fetch_goods(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, 
                                      %{"page" => page, 
                                      "records_per_page" => records_per_page,
                                      "keyword" => keyword}) do
    case Malls.fetch_goods(app_id, page, records_per_page, keyword) do
      :zero ->
        conn |> json(%{success: true, total: 0, goodses: []})
      {:ok, goodses, total_page} ->
        conn |> json(%{success: true, goodses: goodses, total: total_page})
    end
  end
  def fetch_goods(conn, _params) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  #  show active_mall_goods
  def get_active_goods_paged(conn, %{"page" => page,
                        "records_per_page" => records_per_page,
                        "app_id" => app_id}) do
    {:ok, goodses, total_page} = Malls.get_active_goods_paged(app_id, page, records_per_page)
    conn |> json(%{success: true, goodses: goodses, total: total_page})
  end

  def get_goods_stock(conn,%{"goods_id" => goods_id})do
    stock = Malls.get_goods_stock(goods_id)
    conn |> json(%{success: true, stock: stock})
  end

  def get_mall_detail(conn,%{"app_id" => app_id})do
    mall = Malls.get_mall_detail(app_id)
    conn |> json(%{success: true, mall: mall})
  end

  def get_goods_detail(conn,%{"goods_id" =>goods_id})do
    goods = Malls.get_goods_detail(goods_id)
    conn |> json(%{success: true, goods: goods})
  end

  def get_user_addresses(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn,_)do
    addresses = Malls.get_user_addresses(user_id)
    conn |> json(%{success: true, addresses: addresses})
  end

  def delete_address(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn,%{"address_id" => address_id}) do
    case Malls.delete_address(user_id, address_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.addressNotFound"})
      :ok ->
        conn |> json(%{success: true, i18n_message: "mall.address.deleteSuccess"})
      {:error, errors} ->
        conn |> json(%{success: false, message: translate_errors(errors)})
      :badrequest ->
        conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
    end
  end

  def set_default_address(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn,%{"address_id" => address_id})do
    case Malls.set_default_address(user_id, address_id) do
      :zero ->
        conn |> json(%{success: false, i18n_message: "error.server.addressNotFound"})
      :ok ->
        conn |>json(%{success: true, i18n_message: "mall.address.setDefaultSuccess"})
    end
  end

  def get_default_address(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn, _) do
    case Malls.get_default_address(user_id) do
      nil ->
        conn |> json(%{success: false})
      {:ok, address} ->
        conn |> json(%{success: true, address: address})
    end
  end

  def get_address_detail(%Plug.Conn{private: %{acs_session_user_id: _user_id}} = conn,%{"address_id" => address_id}) do
    case Malls.get_address_detail(address_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.addressNotFound"})
      {:ok, address} ->
        conn |> json(%{success: true, address: address})
    end
  end

  def insert_address(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn, %{
                "name" => _name,
                "mobile" => _mobile,
                "area" => _area,
                "address" => _address,
                "area_code" => _area_code} = us_address)do
    case insert_address(user_id, us_address) do
      {:ok, us_address} ->
        conn |> json(%{success: true, address: us_address, i18n_message: "mall.address.addSuccess"})
      :error ->
        conn |> json(%{success: false, i18n_message: "error.server.networkError"})
    end
  end

  def update_address(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn, %{
                                          "id" => _id,
                                          "name" => _name,
                                          "mobile" => _mobile,
                                          "area" => _area,
                                          "address" => _address,
                                          "area_code" => _area_code,
                                          "is_default" => _is_default} = address)do
    case update_address(user_id, address) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.addressNotFound"})
      :illegal ->
        conn |> json(%{success: false, i18n_message: "error.server.illegal"})
      :ok ->
        conn |> json(%{success: true, i18n_message: "mall.address.updateSuccess"})
    end
  end

end
