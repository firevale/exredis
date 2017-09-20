defmodule Acs.Accounts do
  @moduledoc """
  The Accounts context.
  """

  import Ecto.Query, warn: false
  alias Acs.Repo

  alias Acs.Accounts.User
  alias Acs.Accounts.UserAddress
  alias Acs.Accounts.UserSdkBinding
  alias Acs.Cache.CachedUser
  alias Utils.Password
  alias Acs.Search.ESUser

  def create_user!(account_id, password) when is_bitstring(account_id) and is_bitstring(password) do 
    user = User.changeset(%User{}, gen_user_attr!(account_id, password)) |> Repo.insert!
    CachedUser.refresh(user)
    ESUser.index(user)
    user
  end

  def update_user!(%User{} = user, attr) do 
    user = User.changeset(user, attr) |> Repo.update!
    CachedUser.refresh(user)
    ESUser.index(user)
    user    
  end

  def get_user(user_id) when is_integer(user_id) do 
    CachedUser.get(user_id)
  end
  def get_user(account_id) when is_bitstring(account_id) do 
    CachedUser.get_by(parse_account_id(account_id), account_id)
  end

  def get_user!(user_id) when is_integer(user_id) do 
    CachedUser.get!(user_id)
  end
  def get_user!(account_id) when is_bitstring(account_id) do 
    CachedUser.get_by!(parse_account_id(account_id), account_id)
  end

  def exists?(account_id) when is_bitstring(account_id) do 
    CachedUser.get_by(parse_account_id(account_id), account_id) != nil 
  end

  def fetch_anonymous_user(device_id) do 
    case CachedUser.get_by(:device, device_id) do 
      nil -> User.changeset(%User{}, %{device_id: device_id, nickname: gen_nickname()}) |> Repo.insert!
      user = %User{} -> user
    end
  end

  def bind_anonymous_user(device_id, account_id, password) do 
    case CachedUser.get_by(:device, device_id) do 
      nil -> nil
      user = %User{} ->
        attr = gen_user_attr!(account_id, password) |> Map.put(:device_id, nil) 
        new_user = User.changeset(user, attr) |> Repo.update!        
        CachedUser.del_device_index(device_id)
        CachedUser.refresh(new_user)
        new_user
    end
  end

  def bind_sdk_user(%{
    sdk: sdk,
    mobile: mobile,
    email: email,
    sdk_user_id: sdk_user_id}) do
    case CachedUser.get_by(:sdk, sdk, sdk_user_id) do 
      nil -> 
        case CachedUser.get_by(:email, email) || CachedUser.get_by(:mobile, mobile) do
          nil -> 
            Repo.transaction(fn -> 
              user = User.changeset(%User{}, %{nickname: gen_nickname()}) |> Repo.insert!
              UserSdkBinding.changeset(%UserSdkBinding{}, %{
                sdk: sdk, 
                user_id: user.id, 
                sdk_user_id: sdk_user_id}) |> Repo.insert!
            end)
          user = %User{} ->
            UserSdkBinding.changeset(%UserSdkBinding{}, %{
              sdk: sdk, 
              user_id: user.id, 
              sdk_user_id: sdk_user_id}) |> Repo.insert!            
        end

      %User{} = user ->
        user 
    end
  end

  def is_nickname_exists?(nickname, user_id) do 
    query = from u in User,
      select: count(1),
      where: u.nickname == ^nickname and u.id != ^user_id
    Repo.one!(query) > 0
  end

  def is_mobile_exists?(mobile, user_id) do 
    query = from u in User,
      select: count(1),
      where: u.mobile == ^mobile and u.id != ^user_id
    Repo.one!(query) > 0
  end

  def get_user_addresses(user_id) do
    query = from us in UserAddress,
              where: us.user_id == ^user_id,
              order_by: [desc: us.is_default, desc: us.inserted_at],
              select: map(us, [:id, :name, :mobile, :area, :area_code, :address, :is_default])
    Repo.all(query)
  end
  
  def delete_address(user_id, address_id) do
    case Repo.get(UserAddress, address_id) do
      nil ->
        nil
      %UserAddress{} = address ->
        if(address.is_default)do
          queryTotal = from us in UserAddress, select: count(1), where: us.user_id == ^user_id
          count = Repo.one!(queryTotal)
          if(count <= 1 )do
            case Repo.delete(address) do
              {:ok, _} ->
                :ok
              {:error, %{errors: errors}} ->
                {:error, errors}
            end          
          else
            queryLast = from us in UserAddress, 
                        where: us.user_id == ^user_id and us.id != ^address_id,
                        order_by: [desc: us.inserted_at],  
                        limit: 1,
                        select: map(us, [:id])
            lastAddress = Repo.one(queryLast)

            Repo.transaction(fn ->
              from(us in UserAddress, where: us.id == ^address_id) |> Repo.delete_all
              from(us in UserAddress, 
                  where: us.id == ^lastAddress.id) 
              |> Repo.update_all(set: [is_default: true])
              end)
            :ok
          end
        else 
          case Repo.delete(address) do
              {:ok, _} ->
                :ok
              {:error, %{errors: errors}} ->
                {:error, errors}
            end
        end         
      _ ->
        :badrequest
    end
  end

  def set_default_address(user_id, address_id) do
    queryTotal = from us in UserAddress, select: count(1), where: us.user_id == ^user_id
    case Repo.one!(queryTotal) do
      0 -> :zero
      _ ->
        Repo.transaction(fn ->
          # set all default false
          from(us in UserAddress, where: us.user_id == ^user_id) |> Repo.update_all(set: [is_default: false])
          # set current default true
          from(us in UserAddress, where: us.id == ^address_id) |> Repo.update_all(set: [is_default: true])
        end)
        :ok
    end
  end

  def get_default_address(user_id) do
    query = from ua in UserAddress,
              select: map(ua,[:id, :name, :mobile, :area, :address, :area_code, :is_default]),
              where: ua.user_id == ^user_id and ua.is_default == true

    case address = Repo.one(query) do
      nil -> nil
      _ -> {:ok, address}
    end
  end

  def get_address_detail(address_id) do
    query = from ads in UserAddress,
              select: map(ads,[:id, :name, :mobile, :area, :address, :area_code, :is_default]),
              where: ads.id == ^address_id

    case address = Repo.one!(query) do
      nil -> nil
      _ -> {:ok, address}
    end
  end

  def insert_address(user_id, us_address) do
    us_address = us_address |> Map.put("user_id", user_id)
    queryCount = from us in UserAddress,select: count(1), where: us.user_id == ^user_id
    count = Repo.one!(queryCount)
    us_address = case count do
      0 -> us_address |> Map.put("is_default",true)
      _ -> us_address
    end

    case UserAddress.changeset(%UserAddress{}, us_address) |> Repo.insert do
      {:ok, new_address} ->
        us_address = us_address |> Map.put("id", new_address.id)
        {:ok, us_address}
      {:error, %{errors: _errors}} ->
        :error
    end
  end

  def update_address(user_id, address) do
    case Repo.get(UserAddress, address.id) do
      nil ->
        nil
      %UserAddress{} = us ->
        if(us.user_id !== user_id)do
          :illegal
        else
          UserAddress.changeset(us, address) |> Repo.update!
          :ok
        end
    end
  end

  defp gen_user_attr!(account_id, password) when is_bitstring(account_id) and is_bitstring(password) do 
    attr = %{encrypted_password: Password.hash(password), nickname: gen_nickname()}
    case parse_account_id(account_id) do 
      :mobile -> Map.put(attr, :mobile, account_id)
      :email -> Map.put(attr, :email, account_id)
      :device -> Map.put(attr, :device_id, account_id)
      _ -> 
        raise "account id: #{account_id} unknown type"
    end
  end

  defp parse_account_id(account_id) when is_bitstring(account_id) do
    cond do
      Regex.match?(~r/^([^@]+)@([^@]+)/, account_id) -> :email
      Regex.match?(~r/^(idfa|idfv|android_id)\.(.*)/, account_id) -> :device
      Regex.match?(~r/^1\d{10}$/, account_id) -> :mobile
      true -> :unknown
    end
  end

  defp gen_nickname() do 
    "fvu#{Utils.generate_token(5) |> String.downcase}"
  end

end
