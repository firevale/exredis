defmodule Acs.Wcs do
  @moduledoc """
  The Wcp context.
  """
  alias Utils.Httpc
  use   Utils.LogAlias

  import Ecto.Query, warn: false
  alias Acs.Repo

  alias Acs.Accounts
  alias Acs.Accounts.User

  alias Acs.Wcs.WcsUser
  alias Acs.Cache.CachedWcsUser

  alias Acs.Search.ESWcsUser

  @cfg Application.get_env(:acs, WCS, [wcs_app_id: "wx093580929e0bb276", wcs_app_secret:  "1d9a8ddcb737e29b3ac048451b7d329f"])
  @wcs_app_id @cfg[:wcs_app_id]
  @wcs_app_secret @cfg[:wcs_app_secret]

  def get_request_code_url(redirect_url, state) do 
    "https://open.weixin.qq.com/connect/oauth2/authorize?appid=#{@wcs_app_id}&redirect_uri=#{redirect_url}&response_type=code&scope=snsapi_userinfo&state=#{state}#wechat_redirect"
  end

  def get_wcs_user_id_from_authorize_code(app_id, code) do 
    with {:ok, %{access_token: access_token, openid: openid}} <- get_api_weixin_access_token(code),
         {:ok, user_info} <- get_api_weixin_user_info(access_token, openid) 
    do
      case get_wcs_user(app_id: app_id, openid: openid) do 
        nil ->
          wcs_user = create_wcs_user!(%{
            openid: openid,
            unionid: Map.get(user_info, :unionid, nil),
            nickname: Map.get(user_info, :nickname, ""), 
            sex: Map.get(user_info, :sex, 0),
            avatar_url: Map.get(user_info, :headimgurl, nil) |> Utils.remove_url_scheme(),
            city: Map.get(user_info, :city, "未知"),
            country: Map.get(user_info, :country, "CN")
          })  
          {:ok, wcs_user.id}
        v ->
          {:ok, v.id}
      end
    else
      v -> v
    end
  end

  defp get_api_weixin_access_token(code) do 
    response = Httpc.get("https://api.weixin.qq.com/sns/oauth2/access_token?appid=#{@wcs_app_id}&secret=#{@wcs_app_secret}&code=#{code}&grant_type=authorization_code ")
    if Httpc.success?(response) do 
      case Poison.decode(response.body, keys: :atoms) do 
        {:ok, %{access_token: _, openid: _} = result} ->
          {:ok, result}
        _ ->
          error "receive invalid response from weixin: #{inspect response}"
          {:error, "invalid response from api.weixin.qq.com"}
      end
    else
      {:error, "http request failed visiting api.weixin.qq.com"}
    end    
  end

  defp get_api_weixin_user_info(access_token, openid) do 
    response = Httpc.get("https://api.weixin.qq.com/sns/userinfo?access_token=#{access_token}&openid=#{openid}&lang=zh_CN ")
    if Httpc.success?(response) do 
      case Poison.decode(response.body, keys: :atoms) do 
        {:ok, %{openid: ^openid} = result} ->
          {:ok, result}
        _ ->
          {:error, "invalid response from api.weixin.qq.com"}
      end
    else
      {:error, "http request failed visiting api.weixin.qq.com"}
    end    
  end

  def get_wcs_user(app_id: app_id, openid: openid) do 
    CachedWcsUser.get_by_openid(app_id, openid)
  end
  def get_wcs_user(wcs_user_id) do 
    CachedWcsUser.get(wcs_user_id)
  end

  def create_wcs_user!(attr) do 
    wcs_user = WcsUser.changeset(%WcsUser{}, attr) |> Repo.insert!  
    ESWcsUser.index(wcs_user)
    CachedWcsUser.refresh(wcs_user)
  end

  def update_wcs_user!(%WcsUser{} = wcs_user, attr) do 
    new_wcs_user = WcsUser.changeset(wcs_user, attr) |> Repo.update!  
    ESWcsUser.index(wcs_user)
    CachedWcsUser.refresh(new_wcs_user)
  end

  def list_wcs_users(app_id, keyword, page, records_per_page) do
    {:ok, total, users} = Acs.Search.search_wcs_user(
      keyword: keyword, 
      app_id: app_id, 
      page: page, 
      records_per_page: records_per_page)
    total_page = round(Float.ceil(total / records_per_page))
    users = for user <- users do 
      Map.put(user, :point, Acs.PMalls.get_user_point(user.app_id, user.id))
    end
    {:ok, users, total_page}
  end

  def bind_mobile(wcs_user_id, mobile) do
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