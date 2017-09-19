defmodule AcsWeb.ForumController do
  use AcsWeb, :controller

  plug :fetch_app_id
  plug :fetch_session_user_id  
  plug :fetch_session_user
  plug :check_forum_manager when action in [:delete_comment, :toggle_post_status, :get_paged_ban_post]
  plug :cache_page, [cache_seconds: 10] when action in [:get_paged_post, :get_post_comments, :get_post_detail]
  plug :cache_page, [cache_seconds: 600] when action in [:get_forum_info, :get_paged_forums]
  plug :fetch_post when action in [:add_post, :upload_post_image]
  plug :fetch_comment when action in [:add_comment, :upload_comment_image]
  plug :check_txt when action in [:add_post, :add_comment]

  # fetch_forums
  def fetch_forums(conn, %{"page" => page, "records_per_page" => records_per_page}) do
    fetch_forums(conn, page, records_per_page)
  end
  def fetch_forums(conn, _params) do
    fetch_forums(conn, 1, 100)
  end
  defp fetch_forums(conn, page, records_per_page) do
    {:ok, forums, total_page} = Forums.fetch_forums(page, records_per_page)
    conn |> json(%{success: true, forums: forums, total: total_page})
  end

  def get_app_forum(conn, %{"app_id" => app_id} = _params) do
    conn |> json(%{success: true, forum: Forums.get_app_forum(app_id)})
  end

  def get_fat_forum(conn, %{"forum_id" => forum_id} = _params) do
    conn |> json(%{success: true, forum: Forums.get_fat_forum(forum_id)})
  end

  # get_paged_post
  def get_paged_post(conn, %{"forum_id" => forum_id,
                             "section_id" => section_id,
                             "page" => page,
                             "records_per_page" => records_per_page,
                             "order" => order}) do
    get_paged_post_list(conn, forum_id, section_id, page, records_per_page, order, 0)
  end
  def get_paged_post(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  def get_user_paged_post(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn,
                            %{"forum_id" => forum_id,
                              "page" => page,
                              "records_per_page" => records_per_page}) do
    get_paged_post_list(conn, forum_id, 0, page, records_per_page, "id", user_id)
  end
  def get_user_paged_post(conn, %{"forum_id" => _, "page" => _, "records_per_page" => _}) do
    conn |> json(%{success: false, action: "login", i18n_message: "error.server.needLogin"})
  end
  def get_user_paged_post(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  defp get_paged_post_list(conn, forum_id, section_id, page, records_per_page, order, author_user_id) do
    {:ok, posts, total_page, total} = Forums.get_paged_post(forum_id, section_id, page, records_per_page, order, author_user_id)
    conn |> json(%{success: true, posts: posts, total: total_page, records: total})
  end

  #get_paged_ban_post
  def get_paged_ban_post(%Plug.Conn{private: %{acs_is_forum_admin: _is_admin}} = conn,
                            %{"forum_id" => forum_id,
                             "page" => page,
                             "records_per_page" => records_per_page}) do
    {:ok, posts, total_page, total} = Forums.get_paged_ban_post(forum_id, page, records_per_page) 
    conn |> json(%{success: true, posts: posts, total: total_page, records: total})
  end
  def get_paged_ban_post(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # add_post (forum post is created by fetch_post plug)
  def add_post(%Plug.Conn{private: %{forum_post: forum_post}} = conn, 
               %{"title" => _title,
                 "content" => content} = post) do
      
    check_out = conn.private[:check_txt]
    if(check_out && !check_out.success) do
      conn |> json(check_out)
    else
      post = case Floki.find(content, "img") do
               [] -> post |> Map.put("has_pic", false) |> Map.put("active", true)
               _  -> post |> Map.put("has_pic", true) |> Map.put("active", true)
             end
      Forums.add_post(forum_post, post)
      conn |>json(%{success: true, message: "forum.newPost.addSuccess"})
    end
  end
  def add_post(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # get_post_detail
  def get_post_detail(conn,%{"post_id" => post_id}) do
    user_id = conn.private[:acs_session_user_id]
    post = Forums.get_post_detail(post_id, user_id)
    conn |> json(%{success: true, detail: post})
  end
  def get_post_detail(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # get_post_comments
  def get_post_comments(conn, %{"post_id" => post_id,
                                "page" => page,
                                "author_id" => author_id,
                                "records_per_page" => records_per_page}) do
    {:ok, comments, total_page, total} = Forums.get_post_comments(post_id, page, author_id, records_per_page)
    conn |> json(%{success: true, comments: comments, total: total_page, records: total})
  end
  def get_post_comments(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # get_user_post_comments
  def get_user_post_comments(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn,
                              %{"forum_id" => forum_id,
                                "page" => page,
                                "records_per_page" => records_per_page}) do
    {:ok, comments, total_page, total} = Forums.get_user_post_comments(forum_id, user_id, page, records_per_page)
    conn |> json(%{success: true, comments: comments, total: total_page, records: total})
  end
  def get_user_post_comments(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # delete_comment
  def delete_comment(%Plug.Conn{private: %{acs_session_user_id: user_id,
                                           acs_is_forum_admin: is_forum_admin}} = conn,
                     %{"comment_id" => comment_id}) do
    case Forums.delete_comment(comment_id, user_id, is_forum_admin) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.commentNotFound"})
      :illegal ->
        conn |> json(%{success: false, i18n_message: "error.server.illegal"})
      :ok ->
        conn |> json(%{success: true, i18n_message: "forum.detail.operateSuccess"})
      {:error, errors} ->
        conn |> json(%{success: false, message: translate_errors(errors)})
      _ ->
        conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
    end
  end
  def delete_comment(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # toggle_post_favorite (need user login)
  def toggle_post_favorite(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn,
                           %{"post_id" => _post_id} = post) do
    case Forums.toggle_post_favorite(user_id, post) do
      :ok ->
        conn |> json(%{success: true, i18n_message: "forum.detail.operateSuccess"})
      {:error, errors} ->
        conn |> json(%{success: false, message: translate_errors(errors)})
      _ ->
        conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
    end
  end
  def toggle_post_favorite(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams", action: "login"})
  end

  # toggle post status
  def toggle_post_status(%Plug.Conn{private: %{acs_session_user_id: user_id,
                                               acs_is_forum_admin: is_forum_admin}} = conn,
                         %{"post_id" => _post_id} = params) do
    if is_forum_admin do
      case Forums.toggle_post_status(user_id, params) do
        :ok ->
          conn |> json(%{success: true, i18n_message: "forum.detail.operateSuccess"})
        :error ->
          conn |> json(%{success: false, i18n_message: "error.server.networkError"})
        _ ->
          conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
      end
    else 
      conn |> json(%{success: false, i18n_message: "error.server.illegal"})
    end
  end
  def toggle_post_status(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # add_comment
  def add_comment(%Plug.Conn{private: %{acs_session_user_id: _user_id,
                                        forum_post: forum_post,
                                        forum_comment: forum_comment}} = conn,
                    %{"content" => content}) do

    check_out = conn.private[:check_txt]
    if(check_out && !check_out.success) do
      conn |> json(check_out)
    else
      case Forums.add_comment(forum_post, forum_comment, content) do
        :ok ->
          conn |> json(%{success: true, i18n_message: "forum.writeComment.addSuccess"}) 
        _ ->
          conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
      end
    end    
  end
  def add_comment(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams", action: "login"})
  end

  # get_user_favorites
  def get_user_favorites(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn,
                         %{"forum_id" => forum_id,
                           "page" => page,
                           "records_per_page" => records_per_page}) do
    {:ok, favorites, total_page, total} = Forums.get_user_favorites(user_id, forum_id, page, records_per_page)
    conn |> json(%{success: true, favorites: favorites, total: total_page, records: total})
  end
  def get_user_favorites(conn, _params) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  def search(conn, %{"forum_id" => _forum_id,
                     "keyword" => keyword,
                     "page" => page,
                     "records_per_page" => records_per_page}) do
    case Search.search_forum(keyword, page, records_per_page) do
      {:ok, %{hits: %{hits: hits, total: total}}} ->
        postList = Enum.map(hits, fn(%{
          _id: _id,
          _source: %{
            user_id: user_id,
            forum_id: forum_id,
             section_id: section_id}
            } = hit) ->

          user = case Process.get("user_#{user_id}") do 
                  nil -> 
                    user_db = CachedUser.get(user_id) |> Map.take([:id, :nickname, :avatar_url, :inserted_at])
                    Process.put("user_#{user_id}", user_db)
                    user_db
                  user_cache ->
                    user_cache
                end
                  
          forum = case Process.get("forum_#{forum_id}") do
                    nil ->
                      forum_new = Forums.get_forum(forum_id)
                      Process.put("forum_#{forum_id}", forum_new)
                      forum_new 
                    forum_cache ->
                      forum_cache
                  end

          section = if forum && forum.sections && section_id  do
                      forum.sections[section_id |> to_string |> String.to_atom]
                    end
          %{
            id: hit._id,
            forum_id: forum_id,
            forum:  forum,
            user_id: user_id,
            user: user,
            section_id: section_id,
            section: section,
            title: hit._source.title,
            content: hit._source.content,
            is_top: hit._source.is_top,
            is_hot: hit._source.is_hot,
            is_vote: hit._source.is_vote,
            reads: hit._source.reads,
            comms: hit._source.comms,
            inserted_at: hit._source.inserted_at,
            active: hit._source.active,
            has_pic: hit._source.has_pic
          }

        end)
        total_page = round(Float.ceil(total/records_per_page))
        conn |> json(%{success: true, postList: postList, total: total_page})
      error ->
        error "search failed: #{inspect error, pretty: true}"
        conn |> json(%{success: false})
    end
  end

  # fetch_post (create if not exists) 
  defp fetch_post(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn, _opts) do
    with %{"forum_id" => forum_id,
           "section_id" => section_id} = post <- conn.params,
          forum_id <- String.to_integer("#{forum_id}"),
          section_id <- String.to_integer("#{section_id}"),
          %{sections: sections} <- Forums.get_forum(forum_id),
          %{id: _} <- sections[section_id]
    do 
      case post["post_id"] do 
        x when x in [nil, "undefined", "null"] ->
          post = post 
            |> Map.put("user_id", user_id) 
            |> Map.put("title", "placeholder") 
            |> Map.put("content", "placeholder")
            |> Map.put("active", false)

          {:ok, forum_post} =  Forums.add_post(post)

          conn |> put_private(:forum_post, forum_post)

        post_id ->
          case Forums.get_post(post_id) do 
            %ForumPost{} = forum_post -> 
              conn |> put_private(:forum_post, forum_post)
            _ -> 
              conn
          end
      end
    else 
      _ -> 
        d "fetch_post, params: #{inspect conn.params, pretty: true}"
        conn
    end
  end

  plug :check_upload_image, [
    param_name: "file", 
    format: ["jpg", "jpeg", "png"],
    reformat: "jpeg"] when action in [:upload_post_image, :upload_comment_image]
  plug :convert_base64_image, [param_name: "file"] when action in [:upload_post_image, :upload_comment_image]
  def upload_post_image(%Plug.Conn{private: %{forum_post: forum_post}} = conn, 
                         %{"file" => %{path: image_file_path}}) do
    {:ok, image_path, width, height} = 
      DeployUploadedFile.deploy_image_file_return_size(from: image_file_path, 
        to: "forums/#{forum_post.forum_id}/#{forum_post.id}/", 
        low_quality: true)
    
    check_out = check_img(conn, image_path)
    if (check_out && !check_out.success) do
      conn |> json(check_out)
    else
      conn |> json(%{success: true, post_id: forum_post.id, link: image_path, width: width, height: height})
    end
  end
  def upload_post_image(%Plug.Conn{private: %{image_file_path: image_file_path,
                                              forum_post: forum_post}} = conn, 
                        _) do 
    {:ok, image_path, width, height} = 
      DeployUploadedFile.deploy_image_file_return_size(from: image_file_path, 
        to: "forums/#{forum_post.forum_id}/#{forum_post.id}/", 
        low_quality: true)
    
    check_out = check_img(conn, image_path)
    if(check_out && !check_out.success) do
      conn |> json(check_out)
    else
      conn |> json(%{success: true, post_id: forum_post.id, link: image_path, width: width, height: height})
    end    
  end
  def upload_post_image(conn, _params) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # fetch_comment (create if not exists) 
  defp fetch_comment(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn, _opts) do
    with %{"post_id" => post_id} = params <- conn.params,
          forum_post = %ForumPost{} <- Forums.get_post(post_id)
    do 
      case params["comment_id"] do 
        x when x in [nil, "undefined", "null"] ->

          {:ok, forum_comment} = Forums.add_comment(%{
            content: "placeholder",
            active: false,
            post_id: forum_post.id,
            user_id: user_id,
          })

          conn |> put_private(:forum_comment, forum_comment)
               |> put_private(:forum_post, forum_post)

        comment_id ->

          case Forums.get_comment(comment_id) do 
            %ForumComment{} = forum_comment -> 
              conn |> put_private(:forum_comment, forum_comment)
                   |> put_private(:forum_post, forum_post)
            _ -> conn
          end
      end
    else 
      _ -> conn
    end
  end

  # check text by netease dun
  defp check_txt(%Plug.Conn{private: %{acs_session_user_id: _user_id}} = conn, _opts) do

    check_out = case conn.params["title"] do
      x when x in [nil, "undefined", "null"] ->
        %{success: true}

      title -> case NeteaseDun.check_txt(title) do 
        {:error, label, info} ->
          if label do
            %{success: false, i18n_message: "forum.newPost.titleFilterFail"}
          else
            %{success: false, message: info}
          end

        _ -> %{success: true}
      end
    end
    
    check_out = case check_out.success do
      true -> case NeteaseDun.check_txt(conn.params["content"]) do 
          {:error, label, info} ->
            if label do
              %{success: false, i18n_message: "forum.newPost.contentFilterFail"}
            else
              %{success: false, message: info}
            end

          _ -> %{success: true}
        end

      false -> check_out        
    end

    conn |> put_private(:check_txt, check_out)
  end

  # check image by netease dun
  defp check_img(conn, image_path) do
    image_path = case String.starts_with?(String.downcase(image_path), "http") do
      true -> image_path
      false -> static_url(conn, String.replace(image_path, "/img/", "/images/"))
    end

    info "check_image: #{image_path}"

    images = "[{'name': '#{image_path}', 'type': 1, 'data': '#{image_path}'}]"

    case CachedNeteaseDun.get(image_path) do
      :exist -> 
        %{success: false, i18n_message: "forum.newPost.imageFilterFail"}
      
      :null ->
        case NeteaseDun.check_img(images) do 
          {:error, label, info} ->
            CachedNeteaseDun.refresh(image_path)

            if label do
              %{success: false, i18n_message: "forum.newPost.imageFilterFail"}
            else
              %{success: false, message: info}
            end

          _ -> 
            %{success: true}
        end
    end
  end

  def upload_comment_image(%Plug.Conn{private: %{forum_post: forum_post, 
                                                 forum_comment: forum_comment}} = conn, 
                         %{"file" => %{path: image_file_path}}) do
    {:ok, image_path, width, height} = 
      DeployUploadedFile.deploy_image_file_return_size(from: image_file_path, 
        to: "forums/#{forum_post.forum_id}/#{forum_post.id}/#{forum_comment.id}/", 
        low_quality: true)
    
    check_out = check_img(conn, image_path)

    if (check_out && !check_out.success) do
      conn |> json(check_out)
    else
      conn |> json(%{success: true, comment_id: forum_comment.id, link: image_path, width: width, height: height})
    end 
  end
  def upload_comment_image(%Plug.Conn{private: %{image_file_path: image_file_path,
                                                 forum_post: forum_post,
                                                 forum_comment: forum_comment}} = conn, 
                        _) do 
    {:ok, image_path, width, height} = 
      DeployUploadedFile.deploy_image_file_return_size(from: image_file_path, 
        to: "forums/#{forum_post.forum_id}/#{forum_post.id}/#{forum_comment.id}/", 
        low_quality: true)

    check_out = check_img(conn, image_path)
    if(check_out && !check_out.success) do
      conn |> json(check_out)
    else
      conn |> json(%{success: true, comment_id: forum_comment.id, link: image_path, width: width, height: height})
    end
  end
  def upload_comment_image(conn, _params) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  def get_user_post_count(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn,
                           %{"forum_id" => forum_id}) do 
    total = Forums.get_user_post_count(user_id, forum_id)                         
    conn |> json(%{success: true, post_count: total}) 
  end
 
end
