defmodule Acs.ForumController do
  use Acs.Web, :controller

  alias   Acs.RedisForum
  alias   Acs.RedisSetting
  require Floki
  import  Acs.UploadImagePlugs 

  plug :fetch_app_id
  plug :fetch_session_user_id  
  plug :fetch_session_user
  plug :check_forum_manager when action in [:delete_comment, :toggle_post_status]
  plug :cache_page, [cache_seconds: 10] when action in [:get_paged_post, :get_post_comments, :get_post_detail]
  plug :cache_page, [cache_seconds: 600] when action in [:get_forum_info, :get_paged_forums]
  plug :no_emoji, [param_name: "title"] when action == :add_post

  # fetch_forums
  def fetch_forums(conn, %{"page" => page, "records_per_page" => records_per_page}) do
    fetch_forums(conn, page, records_per_page)
  end
  def fetch_forums(conn, _params) do
    fetch_forums(conn, 1, 100)
  end
  defp fetch_forums(conn, page, records_per_page) do
    total = Repo.one!(from forum in Forum, select: count(forum.id))
    total_page = round(Float.ceil(total / records_per_page))

    query = from forum in Forum,
              left_join: sections in assoc(forum, :sections),
              order_by: [desc: forum.id, desc: sections.sort],
              limit: ^records_per_page,
              offset: ^((page - 1) * records_per_page),
              select: forum,
              preload: [sections: sections]

    forums = Repo.all(query)
    conn |> json(%{success: true, forums: forums, total: total_page})
  end

  # update_forum_icon
  def update_forum_icon(conn, %{"forum_id" => forum_id, "file" => %{} = upload_file} = params) do
    case Repo.get(Forum, forum_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.forumNotFound", i18n_message_object: %{forum_id: forum_id}})

      %Forum{} = forum ->
        case Mogrify.open(upload_file.path) |> Mogrify.verbose do
          %{width: width, height: height} = upload_image ->
            if width == height do 
              if width >= 128 do 
                if upload_image.format == "png" do
                  Mogrify.open(upload_file.path) |> Mogrify.resize("128x128") |> Mogrify.save(in_place: true)
                  {md5sum_result, 0} = System.cmd("md5sum", [upload_file.path])
                  [file_md5 | _] = String.split(md5sum_result)
                  static_path = Application.app_dir(:acs, "priv/static/")
                  url_path = "/images/forum_icons/"
                  {_, 0} = System.cmd("mkdir", ["-p", Path.join(static_path, url_path)])
                  {_, 0} = System.cmd("cp", ["-f", upload_file.path, Path.join(static_path, Path.join(url_path, "/#{file_md5}.png"))])
                  icon_url = static_url(conn, Path.join(url_path, "/#{file_md5}.png"))
                  Forum.changeset(forum, %{icon: icon_url}) |> Repo.update!
                  RedisForum.refresh(forum_id)
                  conn |> json(%{success: true, icon_url: icon_url})
                else
                  conn |> json(%{success: false, i18n_message: "error.server.imageFormatPNG"})
                end
              else 
                conn |> json(%{success: false, i18n_message: "error.server.imageMinWidth", i18n_message_object: %{minWdith: 128}})
              end
            else 
              conn |> json(%{success: false, i18n_message: "error.server.imageShouldBeSquare"})
            end
          _ ->
            conn |> json(%{success: false, i18n_message: "error.server.imageSize128x128"})
        end
      _ ->
        conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
    end
  end

  # update_forum_info
  def update_forum_info(conn, %{"forum" => %{"id" => forum_id} = forum_info}) do
    case Repo.get(Forum, forum_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.forumNotFound"})

      %Forum{} = forum ->
        Forum.changeset(forum, forum_info) |> Repo.update!
        RedisForum.refresh(forum_id)
        conn |> json(%{success: true, i18n_message: "admin.serverSuccess.forumUpdated"})
    end
  end

  # update_section_info
  def update_section_info(conn, %{"section" => %{"title" => ""}}) do
    conn |> json(%{success: false, i18n_message: "error.server.emptySectionTitle"})
  end
  def update_section_info(conn, %{"section" => %{"forum_id" => ""}}) do
    conn |> json(%{success: false, i18n_message: "error.server.emptyForumId"})
  end
  def update_section_info(conn, %{"section" => %{
      "id" => id,
      "title" => title,
      "sort" => sort,
      "active" => active,
      "forum_id" => forum_id,
    } = section}) do
    case Repo.get(ForumSection, id) do
      nil ->
        case ForumSection.changeset(%ForumSection{}, section) |> Repo.insert do
          {:ok, new_section} ->
            RedisForum.refresh(new_section.forum_id)
            conn |> json(%{success: true, section: new_section })

          {:error, %{errors: errors}} ->
            conn |> json(%{success: false, message: translate_errors(errors)})
        end

      %ForumSection{} = old_section ->
        case ForumSection.changeset(old_section, section) |> Repo.update do
          {:ok, new_section} ->
            RedisForum.refresh(new_section.forum_id)
            conn |> json(%{success: true, section: new_section })

          {:error, %{errors: errors}} ->
            conn |> json(%{success: false, message: translate_errors(errors)})
        end
    end
  end

  # get_paged_forums
  def get_paged_forums(conn, %{"page" => page, "records_per_page" => records_per_page}) do
    _fetch_forums(conn, page, records_per_page)
  end
  def get_paged_forums(conn, _params) do
    _fetch_forums(conn, 1, 100)
  end
  defp _fetch_forums(conn, page, records_per_page) do
    total = Repo.one!(from forum in Forum, select: count(forum.id))
    total_page = round(Float.ceil(total / records_per_page))

    query = from forum in Forum,
              left_join: sections in assoc(forum, :sections),
              order_by: [desc: forum.id, desc: sections.sort],
              limit: ^records_per_page,
              offset: ^((page - 1) * records_per_page),
              select: forum,
              preload: [sections: sections]

    forums = Repo.all(query)
    conn |> json(%{success: true, forums: forums, total: total_page})
  end  

  # get_forum_info
  def get_forum_info(conn, %{"forum_id" => forum_id}) do
    case get_forum_info_by_id(forum_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.forumNotExist"})
      %Forum{} = forum ->
        conn |> json(%{success: true, forum: forum})
    end
  end
  def get_forum_info(%Plug.Conn{private: %{acs_app_id: app_id}} = conn, _) do
    case check_exist_by_appid(app_id) do
      {:ok, forum_id}  ->
        case get_forum_info_by_id(forum_id) do
          nil ->
            conn |> json(%{success: false, i18n_message: "error.server.forumNotExist"})
          %Forum{} = forum ->
            conn |> json(%{success: true, forum: forum})
        end
      _ ->
        conn |> json(%{success: false, i18n_message: "error.server.forumNotExist"})
    end
  end
  def get_forum_info(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end
  defp get_forum_info_by_id(forum_id) do
    query = from f in Forum,
            left_join: s in assoc(f, :sections),
            order_by: [desc: f.id, desc: s.sort],
            where: f.id == ^forum_id,
            select: f,
            preload: [sections: s]
    Repo.one(query)
  end

  def get_forum_info_with_keyword(conn, %{"forum_id" => forum_id}) do
    case get_forum_info_by_id(forum_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.forumNotExist"})
      %Forum{} = forum ->
        case RedisSetting.find("keyword")  do
          nil -> 
            conn |> json(%{success: true, forum: forum, keyword: ""})
          keyword ->
            conn |> json(%{success: true, forum: forum, keyword: keyword})
        end        
    end
  end
  def get_forum_info_with_keyword(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
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
    queryTotal = from p in ForumPost, select: count(1), where: p.forum_id == ^forum_id and p.active == true
    queryTotal = if(is_integer(section_id) and section_id > 0) do
      queryTotal |> where([p], p.section_id == ^section_id)
    else
      queryTotal
    end
    queryTotal = if(is_integer(author_user_id) and author_user_id > 0) do
      queryTotal |> where([p], p.user_id == ^author_user_id)
    else
      queryTotal
    end

    total = Repo.one!(queryTotal)
    total_page = round(Float.ceil(total / records_per_page))
    order = String.to_atom(order)

    query = from p in ForumPost,
              join: u in assoc(p, :user),
              join: s in assoc(p, :section),
              join: f in assoc(p, :forum),
              select: map(p, [:id, :title, :is_top, :is_hot, :is_vote, :reads, :comms, :inserted_at,
                              :last_reply_at, :has_pic, user: [:id, :nickname, :avatar_url], 
                              section: [:id, :title], forum: [:id]]),
              limit: ^records_per_page,
              where: p.forum_id == ^forum_id and p.active == true,
              offset: ^((page - 1) * records_per_page),
              preload: [user: u, section: s, forum: f],
              order_by: [{:desc, p.is_top}, {:desc, ^order}]

    query = if (is_integer(section_id) and section_id > 0) do
      query |> where([p], p.section_id == ^section_id)
    else
      query
    end
    query = if(is_integer(author_user_id) and author_user_id > 0) do
      query |> where([p], p.user_id == ^author_user_id)
    else
      query
    end
    posts = Repo.all(query) |> RedisForum.filterHotList
    
    conn |> json(%{success: true, posts: posts, total: total_page, records: total})
  end

  # add_post
  def add_post(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn, %{
                "forum_id" => forum_id,
                "title" => title,
                "content" => content,
                "section_id" => section_id} = post) do

      post = case Floki.find(content, "img") do
               [] -> post |> Map.put("user_id", user_id) |> Map.put("has_pic", false)
               _ -> post |> Map.put("user_id", user_id) |> Map.put("has_pic", true)
             end
      
      query = from f in Forum,
              join: s in assoc(f, :sections),
              where: f.id == ^forum_id and s.id == ^section_id,
              preload: [sections: s]

      with %Forum{} <- Repo.one(query),
        {:ok, new_post} <- ForumPost.changeset(%ForumPost{}, post) |> Repo.insert
      do
          Elasticsearch.index(%{
            index: "forum",
            type: "posts",
            doc: %{
              forum_id: forum_id,
              section_id: section_id,
              user_id: user_id,
              title: title,
              content: content,
              is_top: false,
              is_hot: false,
              is_vote: false,
              active: true,
              has_pic: post["has_pic"],
              reads: 0,
              comms: 0,
              inserted_at: Timex.format!(new_post.inserted_at, "{YYYY}-{0M}-{0D}T{h24}:{0m}:{0s}+00:00"),
              last_reply_at: Timex.format!(new_post.inserted_at, "{YYYY}-{0M}-{0D}T{h24}:{0m}:{0s}+00:00"),
            },
            params: nil,
            id: new_post.id
          })

          conn |>json(%{success: true, message: "forum.newPost.addSuccess"})
      else
        nil ->
            conn |> json(%{success: false, message: "error.server.illegal"})
        {:error, %{errors: errors}} ->
          d "errs: #{inspect errors, pretty: true}"
          conn |> json(%{success: false, message: "error.server.networkError"})
      end
  end
  def add_post(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams", action: "login"})
  end

  # get_post_detail
  def get_post_detail(conn,%{"post_id" => post_id}) do
    query = from p in ForumPost,
            join: u in assoc(p, :user),
            join: s in assoc(p, :section),
            where: p.id == ^post_id,
            select: map(p, [:id, :title, :content, :inserted_at, :active, :is_top, :is_hot, :is_vote, :reads,
                            user: [:id, :nickname, :avatar_url], 
                            section: [:id, :title]]),
            preload: [user: u, section: s]

    post = Repo.one(query)
    post = with user_id when is_integer(user_id) <- conn.private[:acs_session_user_id],
                 %UserFavoritePost{} <- Repo.one(from f in UserFavoritePost, select: f,
                 where: f.post_id == ^post_id and f.user_id == ^user_id)
    do
      Map.put(post, :is_favorite, true)
    else
      _ ->
        Map.put(post, :is_favorite, false)
    end

    Map.put(post, :is_hot, RedisForum.checkIsHot(post_id))

    add_post_click(post_id, 1)

    conn |> json(%{success: true, detail: post})
  end
  def get_post_detail(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # get_post_comments
  def get_post_comments(conn, %{"post_id" => post_id,
                                "page" => page,
                                "records_per_page" => records_per_page}) do
    total = Repo.one!(from c in ForumComment, 
                      select: count(1), 
                      where: c.post_id == ^post_id)
    total_page = round(Float.ceil(total / records_per_page))

    query = from c in ForumComment,
            join: u in assoc(c, :user),
            order_by: [asc: c.id],
            where: c.post_id == ^post_id,
            select: map(c, [:id, :content, :active, :inserted_at, user: [:id, :nickname, :avatar_url]]),
            limit: ^records_per_page,
            offset: ^((page - 1) * records_per_page),
            preload: [user: u]

    comments = Repo.all(query)

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
    total = Repo.one!(from c in ForumComment, 
                      join: p in assoc(c, :post), 
                      select: count(1), 
                      where: p.forum_id == ^forum_id and c.user_id == ^user_id and c.active == true and p.active == true)
    total_page = round(Float.ceil(total / records_per_page))

    query = from c in ForumComment,
            join: p in assoc(c, :post),
            join: s in assoc(p, :section),
            order_by: [desc: c.id],
            where: p.forum_id == ^forum_id and c.user_id == ^user_id and c.active == true and p.active == true,
            select: map(c, [:id, :content, :inserted_at, post: [:id, :title, :comms, :reads, section: [:id, :title]]]),
            limit: ^records_per_page,
            offset: ^((page - 1) * records_per_page),
            preload: [post: {p, section: s}]

    comments = Repo.all(query)

    conn |> json(%{success: true, comments: comments, total: total_page, records: total})
  end
  def get_user_post_comments(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # delete_comment
  def delete_comment(%Plug.Conn{private: %{acs_session_user_id: user_id,
                                          acs_is_forum_admin: is_admin}} = conn,
                     %{"comment_id" => comment_id}) do
    case Repo.get(ForumComment, comment_id) do
      nil ->
        conn |> json(%{success: false, i18n_message: "error.server.commentNotFound"})
      %ForumComment{} = comment ->
        if(!is_admin and comment.user_id != user_id) do
          conn |> json(%{success: false, i18n_message: "error.server.illegal"})
        else
          with post_id = comment.post_id,
            {:ok, _} <- ForumComment.changeset(comment,
                                              %{active: false,
                                              content: "回复已被删除",
                                              editer_id: user_id }) |> Repo.update()
          do
            post = Repo.get(ForumPost, post_id)
            ForumPost.changeset(post, %{comms: post.comms-1}) |> Repo.update()

            conn |> json(%{success: true, i18n_message: "forum.detail.operateSuccess"})
          else
            {:error, %{errors: errors}} ->
              conn |> json(%{success: false, message: translate_errors(errors)})
            _ ->
              conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
          end
        end
    end
  end
  def delete_comment(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # toggle_post_favorite (need user login)
  def toggle_post_favorite(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn,
                           %{"post_id" => post_id} = post) do
    favorite = Repo.one(from f in UserFavoritePost, select: f, where: f.post_id == ^post_id and f.user_id == ^user_id)
    case favorite do
      nil ->
        # add favorite
        post = Map.put(post, "user_id", user_id)

        case UserFavoritePost.changeset(%UserFavoritePost{}, post) |> Repo.insert do
          {:ok, _} ->
            conn |> json(%{success: true, i18n_message: "forum.detail.operateSuccess"})

          {:error, %{errors: errors}} ->
            conn |> json(%{success: false, message: translate_errors(errors)})
        end

      %UserFavoritePost{} ->
        # delete favorite
        case Repo.delete(favorite) do
          {:ok, _} ->
            conn |> json(%{success: true, i18n_message: "forum.detail.operateSuccess"})

          {:error, %{errors: errors}} ->
            conn |> json(%{success: false, message: translate_errors(errors)})
        end

      _ ->
        conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})

    end
  end
  def toggle_post_favorite(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams", action: "login"})
  end

  # toggle post status
  def toggle_post_status(%Plug.Conn{private: %{acs_session_user_id: user_id,
                                               acs_is_forum_admin: is_admin}} = conn,
                         %{"post_id" => post_id} = params) do
    case is_admin do
      true ->
        with params = Map.put(params, "editer_id", user_id),
             %ForumPost{} = post <- Repo.get(ForumPost, post_id),
             {:ok, _} <- ForumPost.changeset(post, params) |> Repo.update()
        do
          conn |> json(%{success: true, i18n_message: "forum.detail.operateSuccess"})
        else
          {:error, %{errors: errors}} ->
            conn |> json(%{success: false, i18n_message: "error.server.networkError"})
          _ ->
            conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
        end
      false ->
        conn |> json(%{success: false, i18n_message: "error.server.illegal"})
    end
  end
  def toggle_post_status(conn, _) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  # add_comment
  def add_comment(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn,
                    %{"content" => content,
                      "post_id" => post_id} = comment) do

      with  comment <- comment |> Map.put("user_id", user_id),
            {:ok, comment} <- ForumComment.changeset(%ForumComment{}, comment) |> Repo.insert
      do
        post = Repo.get(ForumPost, post_id)
        now_time = DateTime.utc_now()
        ForumPost.changeset(post, %{comms: post.comms+1, last_reply_at: now_time}) |> Repo.update()

        # check is hot
        hot_hours = RedisSetting.find("forum_post_hot_hours")
        if(hot_hours != nil) do
          hot_hours = String.to_integer(hot_hours)
          if(hot_hours > 0) do
            before_time = Timex.shift(now_time, hours: -hot_hours)
            query = from c in ForumComment, select: count(1), where: c.post_id == ^post_id and c.active == true and c.inserted_at >= ^before_time
            total = Repo.one!(query)
            RedisForum.checkIsHot(post_id, total)
          end
        end

        conn |>json(%{success: true, i18n_message: "forum.writeComment.addSuccess"})
      else
        nil ->
          conn |> json(%{success: false, i18n_message: "error.server.illegal"})
        {:error, %{errors: errors}} ->
          conn |> json(%{success: false, i18n_message: "error.server.networkError"})
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
    queryTotal = from f in UserFavoritePost, join: p in assoc(f, :post), select: count(1), where: f.user_id == ^user_id and p.active == true
    total = Repo.one!(queryTotal)
    total_page = round(Float.ceil(total / records_per_page))

    query = from f in UserFavoritePost,
            join: p in assoc(f, :post),
            join: s in assoc(p, :section),
            select: map(f, [:id, post: [:id, :inserted_at, :title, :comms, :reads, section: [:id, :title]]]),
            limit: ^records_per_page,
            where: p.forum_id == ^forum_id and f.user_id == ^user_id and p.active == true,
            offset: ^((page - 1) * records_per_page),
            preload: [post: {p, section: s}],
            order_by: [{:desc, f.id}]
    favorites = Repo.all(query)

    conn |> json(%{success: true, favorites: favorites, total: total_page, records: total})
  end
  def get_user_favorites(conn, _params) do
    conn |> json(%{success: false, i18n_message: "error.server.badRequestParams"})
  end

  defp add_post_click(post_id, click) do
    post = Repo.get(ForumPost, post_id)
    ForumPost.changeset(post, %{reads: post.reads+click}) |> Repo.update()
  end

  defp check_exist_by_appid(app_id) do
    case Repo.get_by(Forum, app_id: app_id) do
      nil ->
        {:error, i18n_message: "error.server.forumNotExist"}
      %Forum{} = forum ->
        {:ok, forum.id}
    end
  end

  def search(conn, %{"forum_id" => forum_id,
                     "keyword" => keyword,
                     "page" => page,
                     "records_per_page" => records_per_page}) do
    query = %{
      query: %{
        bool: %{
          must: %{multi_match: %{
          query: keyword,
          fields: [:title, :content],
        }},
          filter: %{ term: %{active: true} }
        }
      },
      from: ((page - 1) * records_per_page),
      size: if records_per_page>30 do 30 else records_per_page end
    }

    case Elasticsearch.search(%{index: "forum", type: "posts", query: query, params: %{timeout: "1m"}}) do
      {:ok, %{hits: %{hits: hits, total: total}}} ->
        postList = Enum.map(hits, fn(%{
          _id: id,
          _source: %{
            user_id: user_id,
            forum_id: forum_id,
             section_id: section_id}
            } = hit) ->
          user = case Process.get("user_#{user_id}") do 
                  nil -> 
                    user_db = RedisUser.find(user_id) |> Map.take([:id, :nickname, :avatar_url, :inserted_at])
                    Process.put("user_#{user_id}", user_db)
                    user_db
                  user_cache ->
                    user_cache
                end
                  
          forum = case Process.get("forum_#{forum_id}") do
                    nil ->
                      forum_new = RedisForum.find(forum_id)
                      Process.put("forum_#{forum_id}", forum_new)
                      forum_new 
                    forum_cache ->
                      forum_cache
                  end

          section = if forum && forum.sections && section_id  do
                      forum.sections |> Enum.find(&(&1.id == section_id))
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

  plug :check_upload_image, [
    param_name: "file", 
    format: ["jpg", "jpeg", "png"],
    reformat: "jpg",
    resize_to_limit: [width: 600, height: 600]] when action == :upload_post_image
  def upload_post_image(conn, %{"forum_id" => forum_id, "file" => %{path: image_file_path}}) do
    relative_path = "/images/forum_#{forum_id}/posts"
    static_path = Application.app_dir(:acs, "priv/static/") 
    {:ok, dest_file_name} = Utils.cp_file_to_md5_name(image_file_path, Path.join(static_path, relative_path), "jpg")
    url = static_url(conn, Path.join(relative_path, "/#{dest_file_name}"))
    conn |> json(%{success: true, link: url})
  end

  def get_user_post_count(%Plug.Conn{private: %{acs_session_user_id: user_id}} = conn,
                           %{"forum_id" => forum_id}) do 
    total = Repo.one!(from p in ForumPost, 
                      select: count(1), 
                      where: p.forum_id == ^forum_id and p.user_id == ^user_id and p.active == true)
    conn |> json(%{success: true, post_count: total}) 
  end

 
end
