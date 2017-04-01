defmodule Acs.CustomerServiceController do
  use Acs.Web, :controller

  alias   Acs.RedisForum
  alias   Acs.RedisSetting
  alias   Acs.RedisForum
  require Floki

  plug :fetch_app_id
  plug :fetch_session_user_id  
  plug :fetch_session_user
  plug :check_forum_manager when action in [:delete_comment, :toggle_post_status]
  plug :cache_page, [cache_seconds: 10] when action in [:get_paged_post, :get_post_comments, :get_post_detail]
  plug :cache_page, [cache_seconds: 600] when action in [:get_forum_info, :get_paged_forums]

 
  def test(conn, _) do
    conn |> json(%{success: false, i18n_message: "forum.serverError.badRequestParams"})
  end 
 
end
