defmodule Acs.Web.PointMallController do
  use Acs.Web, :controller
  
  alias   Acs.RedisApp
  import  Acs.UploadImagePlugs

  plug :fetch_app_id
  plug :fetch_access_token
  plug :fetch_session_user_id
  plug :fetch_session_user
  plug :cache_page, [cache_seconds: 10] when action in [:fetch_malls, :get_active_goods_paged]
  plug :check_is_admin when action in [:update_goods, :update_goods_pic, :toggle_goods_status, :delete_goods]





end
