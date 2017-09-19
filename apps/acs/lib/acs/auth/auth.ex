defmodule Acs.Auth do
  alias Utils.Password

  alias Acs.Accounts
  alias Acs.Accounts.User
  alias Acs.Auth.AccessToken

  def authenticate(account_id, password) when is_bitstring(account_id) and is_bitstring(password) do
    case Accounts.get_user(account_id) do
      nil -> {:error, :notfound}
      user = %User{} ->
        if Password.check(password, user.encrypted_password) do
          {:ok, user}
        else
          {:error, :password_dismatch}
        end
    end
  end

  def create_access_token(params), do: AccessToken.create(params)
  def del_access_token(%AccessToken{} = token), do: AccessToken.delete(token)
  def get_access_token(access_token_id), do: AccessToken.get(access_token_id)
  def access_token_exists?(access_token_id), do: AccessToken.exists?(access_token_id)

end