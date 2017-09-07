defmodule Acs.Auth do
  alias Utils.Password
  alias Acs.Cache.CachedUser
  alias Acs.Accounts.User

  def authenticate(account_id, password) when is_bitstring(account_id) and is_bitstring(password) do
    case CachedUser.get(account_id) do
      nil -> {:error, :notfound}
      user = %User{} ->
        if Password.check(password, user.encrypted_password) do
          {:ok, user}
        else
          {:error, :password_dismatch}
        end
    end
  end

end