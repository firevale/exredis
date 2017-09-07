defmodule Acs.Accounts do
  @moduledoc """
  The Accounts context.
  """

  import Ecto.Query, warn: false
  alias Acs.Repo

  alias Acs.Accounts.User
  alias Acs.Accounts.UserSdkBinding
  alias Acs.Cache.CachedUser
  alias Utils.Password

  def create_user!(account_id, password) when is_bitstring(account_id), is_bitstring(password) do 
    User.changeset(%User{}, gen_user_attr!(account_id, password)) |> Repo.insert!
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
        new_user = User.changeset(user) |> Repo.update!        
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

  defp gen_user_attr!(account_id, password) when is_bitstring(account_id), is_bitstring(password) do 
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
