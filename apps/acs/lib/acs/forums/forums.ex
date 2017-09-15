defmodule Acs.Forums do
  @moduledoc """
  The Forums context.
  """
  use   Timex
  import Ecto.Query, warn: false

  alias Acs.Repo
  alias Acs.Forums.Forum
  alias Acs.Forums.ForumPost
  alias Acs.Forums.ForumSection
  alias Acs.Forums.ForumComment
  alias Acs.Forums.UserFavoritePost

  alias Acs.Cache.CachedForum
  alias Acs.Cache.CachedApp
  alias Acs.Cache.CachedForumSection
  alias Acs.Cache.CachedAdminSetting
  alias Acs.Cache.CachedForumHotPost

  def get_forum(forum_id) do 
    CachedForum.get(forum_id)
  end

  def get_fat_forum(forum_id) do
    CachedForum.get_fat(forum_id)
  end

  def get_app_forum(app_id) do
    CachedForum.get_by(app_id: app_id)
  end

  def fetch_forums(page, records_per_page) do
    total = Repo.one!(from forum in Forum, select: count(forum.id))
    total_page = round(Float.ceil(total / records_per_page))

    query = 
      from forum in Forum,
        left_join: sections in assoc(forum, :sections),
        order_by: [desc: forum.id, desc: sections.sort],
        limit: ^records_per_page,
        offset: ^((page - 1) * records_per_page),
        select: forum,
        preload: [sections: sections]

    forums = Repo.all(query)
    {:ok, forums, total_page}
  end

  def create_forum!(forum_id, title, app_id) do      
    Forum.changeset(%Forum{}, %{id: forum_id, title: title, active: true, app_id: app_id}) |> Repo.insert! 
    ForumSection.changeset(%ForumSection{}, %{title: "综合讨论", sort: 5, active: true, forum_id: forum_id}) |> Repo.insert!
    ForumSection.changeset(%ForumSection{}, %{title: "攻略心得", sort: 4, active: true, forum_id: forum_id}) |> Repo.insert!
    ForumSection.changeset(%ForumSection{}, %{title: "转帖分享", sort: 3, active: true, forum_id: forum_id}) |> Repo.insert!
    ForumSection.changeset(%ForumSection{}, %{title: "玩家原创", sort: 2, active: true, forum_id: forum_id}) |> Repo.insert!
    ForumSection.changeset(%ForumSection{}, %{title: "问题求助", sort: 1, active: true, forum_id: forum_id}) |> Repo.insert!
    CachedForum.refresh(forum_id)
  end

  def update_forum(forum_id, forum_info) do
    case CachedForum.get(forum_id) do
      nil ->
        nil

      %Forum{} = forum ->
        changed = Forum.changeset(forum, forum_info)
        changed |> Repo.update!
        CachedForum.refresh(forum_id)
        {:ok, changed.changes}
    end
  end

  def get_forum_section(forum_section_id) do 
    CachedForumSection.get(forum_section_id)
  end

  def update_forum_section(section) do
    case Repo.get(ForumSection, section.id) do
      nil ->
        case ForumSection.changeset(%ForumSection{}, section) |> Repo.insert do
          {:ok, new_section} ->
            CachedForum.refresh(new_section.forum_id)
            {:ok, new_section}

          {:error, %{errors: errors}} ->
            {:error, errors}
        end

      %ForumSection{} = old_section ->
        changed = ForumSection.changeset(old_section, section)
        case changed |> Repo.update do
          {:ok, new_section} ->
            CachedForum.refresh(new_section.forum_id)
            {:ok, new_section, changed.changes}

          {:error, %{errors: errors}} ->
            {:error, errors}
        end
    end
  end

  def get_paged_post(forum_id, section_id, page, records_per_page, order, author_user_id) do
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
            select: map(p, [:id, :title, :is_top, :is_hot, :is_vote, :reads, :comms, :active, :inserted_at,
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
    posts = Repo.all(query) |> CachedForumHotPost.filter_hot_posts

    {:ok, posts, total_page, total}
  end

  def get_paged_ban_post(forum_id, page, records_per_page) do
    queryTotal = from p in ForumPost, select: count(1), where: p.forum_id == ^forum_id and p.active == false
    
    total = Repo.one!(queryTotal)
    total_page = round(Float.ceil(total / records_per_page))

    query = from p in ForumPost,
            join: u in assoc(p, :user),
            join: s in assoc(p, :section),
            join: f in assoc(p, :forum),
            select: map(p, [:id, :title, :is_top, :is_hot, :is_vote, :reads, :comms, :active, :inserted_at,
                            :last_reply_at, :has_pic, user: [:id, :nickname, :avatar_url], 
                            section: [:id, :title], forum: [:id]]),
            limit: ^records_per_page,
            where: p.forum_id == ^forum_id and p.active == false,
            offset: ^((page - 1) * records_per_page),
            preload: [user: u, section: s, forum: f],
            order_by: [{:desc, p.is_top}, {:desc, p.inserted_at}]

    posts = Repo.all(query) |> CachedForumHotPost.filter_hot_posts

    {:ok, posts, total_page, total}
  end



  def add_post(forum_post, post) do
    {:ok, new_post} = ForumPost.changeset(forum_post, post) |> Repo.update
    Acs.Search.ESForum.index(new_post)
  end

  def add_post(post) do
    ForumPost.changeset(%ForumPost{}, post) |> Repo.insert
  end

  def get_post(post_id) do
    Repo.get(ForumPost, post_id)
  end

  def get_post_detail(post_id, user_id) do
    query = from p in ForumPost,
            join: u in assoc(p, :user),
            join: s in assoc(p, :section),
            where: p.id == ^post_id,
            select: map(p, [:id, :title, :content, :inserted_at, :active, :is_top, :is_hot, :is_vote, :reads,
                            user: [:id, :nickname, :avatar_url], 
                            section: [:id, :title]]),
            preload: [user: u, section: s]

    post = Repo.one(query)
    post = with %UserFavoritePost{} <- Repo.one(from f in UserFavoritePost, select: f,
            where: f.post_id == ^post_id and f.user_id == ^user_id)
    do
      Map.put(post, :is_favorite, true)
    else
    _ ->
      Map.put(post, :is_favorite, false)
    end
    Map.put(post, :is_hot, CachedForumHotPost.is_hot?(post_id))
    add_post_click(post_id, 1)
    
    post
  end

  def get_post_comments(post_id, page, author_id, records_per_page) do
    total = Repo.one!(from c in ForumComment, 
                      select: count(1), 
                      where: c.post_id == ^post_id)
    total_page = round(Float.ceil(total / records_per_page))

    query = from c in ForumComment,
            join: u in assoc(c, :user),
            order_by: [asc: c.id],
            where: c.post_id == ^post_id and c.active == true,
            select: map(c, [:id, :content, :floor, :active, :inserted_at, user: [:id, :nickname, :avatar_url]]),
            limit: ^records_per_page,
            offset: ^((page - 1) * records_per_page),
            preload: [user: u]

    query = if(author_id > 0) do
      query |> where([p], p.user_id == ^author_id)
    else
      query
    end
    comments = Repo.all(query)
    {:ok, comments, total_page, total}
  end

  def get_user_post_comments(forum_id, user_id, page, records_per_page) do
    total = Repo.one!(from c in ForumComment, 
                      join: p in assoc(c, :post), 
                      select: count(1), 
                      where: p.forum_id == ^forum_id and c.user_id == ^user_id and p.active == true)
    total_page = round(Float.ceil(total / records_per_page))

    query = from c in ForumComment,
            join: p in assoc(c, :post),
            join: s in assoc(p, :section),
            order_by: [desc: c.id],
            where: p.forum_id == ^forum_id and c.user_id == ^user_id and p.active == true and c.active == true,
            select: map(c, [:id, :content, :floor, :active, :inserted_at, post: [:id, :title, :comms, :reads, section: [:id, :title]]]),
            limit: ^records_per_page,
            offset: ^((page - 1) * records_per_page),
            preload: [post: {p, section: s}]

    comments = Repo.all(query)
    {:ok, comments, total_page, total}
  end

  def delete_comment(comment_id, user_id, is_forum_admin) do
    case Repo.get(ForumComment, comment_id) do
      nil ->
        nil
      %ForumComment{} = comment ->
        if !is_forum_admin and comment.user_id != user_id do
          :illegal
        else
          with post_id = comment.post_id,
            {:ok, _} <- ForumComment.changeset(comment,
                                              %{active: false,
                                              content: "回复已被删除",
                                              editer_id: user_id }) |> Repo.update()
          do
            queryLast = from c in ForumComment, 
                        order_by: [desc: c.inserted_at],  
                        where: c.post_id == ^comment.post_id and c.active == true,
                        limit: 1,
                        select: map(c, [:inserted_at])
            lastComment = Repo.one(queryLast)
            utc_now = case lastComment do
              nil -> nil
              _ -> lastComment.inserted_at
            end 
            
            post = Repo.get(ForumPost, post_id)
            ForumPost.changeset(post, %{last_reply_at: utc_now}) |> Repo.update()
            :ok
          else
            {:error, %{errors: errors}} ->
              {:error, errors}
            _ ->
              :badrequest
          end
        end
    end
  end

  def toggle_post_favorite(user_id, %{"post_id" => post_id} = post) do
    favorite = Repo.one(from f in UserFavoritePost, select: f, where: f.post_id == ^post_id and f.user_id == ^user_id)
    case favorite do
      nil ->
        # add favorite
        post = Map.put(post, "user_id", user_id)

        case UserFavoritePost.changeset(%UserFavoritePost{}, post) |> Repo.insert do
          {:ok, _} ->
            :ok

          {:error, %{errors: errors}} ->
            {:error, errors}
        end

      %UserFavoritePost{} ->
        # delete favorite
        case Repo.delete(favorite) do
          {:ok, _} ->
            :ok

          {:error, %{errors: errors}} ->
            {:error, errors}
        end

      _ ->
        :badrequest
    end
  end

  def toggle_post_status(user_id, %{"post_id" => post_id} = params) do
    with params = Map.put(params, "editer_id", user_id),
          %ForumPost{} = post <- Repo.get(ForumPost, post_id),
          {:ok, _} <- ForumPost.changeset(post, params) |> Repo.update()
    do
      :ok
    else
      {:error, %{errors: _errors}} ->
        :error
      _ ->
        :badrequest
    end
  end

  def add_comment(comment) do
    ForumComment.changeset(%ForumComment{}, comment) |> Repo.insert
  end

  def get_comment(comment_id) do
    Repo.get(ForumComment, comment_id)
  end

  def add_comment(forum_post, forum_comment, content) do
    {:ok, _comment} = ForumComment.changeset(forum_comment, %{
      content: content,
      active: true,
      floor: _get_max_floor(forum_post.id) + 1
    }) |> Repo.update

    utc_now = DateTime.utc_now()
    ForumPost.changeset(forum_post, %{
      comms: forum_post.comms + 1, 
      last_reply_at: utc_now}) |> Repo.update()

    # check is hot
    hot_hours = CachedAdminSetting.get("forum_post_hot_hours")
    if hot_hours != nil do
      hot_hours = String.to_integer(hot_hours)
      if hot_hours > 0 do
        before_time = Timex.shift(utc_now, hours: -hot_hours)
        query = from c in ForumComment, 
                select: count(1), 
                where: c.post_id == ^(forum_post.id) and c.active == true and c.inserted_at >= ^before_time
        total = Repo.one!(query)
        CachedForumHotPost.check(forum_post.id, total)
      end
    end
    :ok
  end

  def get_user_favorites(user_id, forum_id, page, records_per_page) do
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
    {:ok, favorites, total_page, total}
  end

  def get_user_post_count(user_id, forum_id) do
    Repo.one!(from p in ForumPost, 
              select: count(1), 
              where: p.forum_id == ^forum_id and p.user_id == ^user_id and p.active == true)
  end

  defp add_post_click(post_id, click) do
    post = Repo.get(ForumPost, post_id)
    ForumPost.changeset(post, %{reads: post.reads+click}) |> Repo.update()
  end

  defp _get_max_floor(post_id) do
    Repo.one(from c in ForumComment, where: c.post_id == ^post_id and c.active == true, select: max(c.floor)) || 0
  end

end
