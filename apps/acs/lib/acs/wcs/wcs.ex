defmodule Acs.Wcs do
  @moduledoc """
  The Wcp context.
  """

  import Ecto.Query, warn: false
  alias Acs.Repo

  alias Acs.Accounts
  alias Acs.Accounts.User

  alias Acs.Wcs.WcsUser
  alias Acs.Cache.CachedAcsUser

  def get_wcs_user(openid: openid) do 
    CachedWcsUser.get_by_openid(openid)
  end
  def get_wcs_user(wcp_user_id) do 
    CachedWcsUser.get(wcp_user_id)
  end

  def create_wcs_user!(attr) do 
    wcs_user = WcsUser.changeset(%WcsUser{}, attr) |> Repo.insert!  
    CachedWcsUser.refresh(wcs_user)
  end

  def update_wcs_user!(%WcsUser{} = wcs_user, attr) do 
    new_wcp_user = WcsUser.changeset(wcs_user, attr) |> Repo.update!  
    CachedWcsUser.refresh(new_wcp_user)
  end

  def acs_user_bind_mobile(wcs_user_id, mobile) do
    with wcs_user = %WcsUser{} <- get_wcs_user(wcs_user_id),
         nil <- wcs_user.user_id
    do 
      case Accounts.get_user(mobile) do 
        nil ->
          new_user = Accounts.create_user!(mobile , String.slice(mobile, 5..10))
          update_wcs_user!(wcs_user, %{
            user_id: new_user.id
          })

        %User{id: user_id} ->
          update_wcs_user!(wcs_user, %{
            user_id: user_id
          })
      end

      :ok
    else 
      nil ->
        {:error, %{i18n_message: "pmall.bindMobile.notFound"}}
      _ -> 
        {:error, %{i18n_message: "pmall.bindMobile.hasBind"}}
    end
  end

end