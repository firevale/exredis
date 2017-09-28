defmodule Acs.Apps do
  @moduledoc """
  The Apps context.
  """
  import Ecto.Query, warn: false
  alias Acs.Repo


  alias Acs.Forums
  alias Acs.Forums.Forum

  alias Acs.Malls
  alias Acs.Malls.Mall

  alias Acs.Apps.App
  alias Acs.Apps.AppOrder
  alias Acs.Apps.AppNews
  alias Acs.Apps.AppQuestion
  alias Acs.Apps.AppSdkBinding
  alias Acs.Apps.AppGoods

  alias Acs.Cache.CachedApp
  alias Acs.Cache.CachedAppSdkBinding
  alias Acs.Cache.CachedAppGoods

  def get_app(app_id) do 
    CachedApp.get(app_id)
  end

  def get_fat_app(app_id) do 
    CachedApp.get_fat(app_id)
  end

  def create_app(attr) do 
    cs = App.changeset(%App{}, attr)  

    case Repo.insert(cs) do
      {:ok, app} ->
        CachedApp.refresh(app.id)
        update_app_features!(app)
        {:ok, app}

      v -> v
    end    
  end

  def update_app(%App{} = app, attr) do 
    cs = App.changeset(app, attr)  
    case Repo.update(cs) do
      {:ok, app} ->
        CachedApp.refresh(app.id)
        update_app_features!(app)
        {:ok, app, cs}

      v -> v
    end    
  end

  def list_thin_apps() do
    query = from app in App,
            order_by: [desc: app.inserted_at],
            where: app.active == true,
            select: map(app, [:id, :name, :icon])

    Repo.all(query)
  end

  def get_app_sdk_binding(app_id, sdk) do 
    CachedAppSdkBinding.get(app_id, sdk)
  end

  def add_app_sdk_binding(app_id, sdk, binding) do 
    case AppSdkBinding.changeset(%AppSdkBinding{}, %{app_id: app_id, sdk: sdk, binding: binding}) |> Repo.insert() do 
      {:ok, sdk_binding} ->
        CachedAppSdkBinding.refresh(sdk_binding)
        CachedApp.refresh(app_id) # refresh fat app
        {:ok, sdk_binding}
      v -> v
    end
  end

  def update_app_sdk_binding(%AppSdkBinding{} = sdk_binding, attr) do 
    case AppSdkBinding.changeset(sdk_binding, attr) |> Repo.update() do 
      {:ok, sdk_binding} ->
        CachedAppSdkBinding.refresh(sdk_binding)
        CachedApp.refresh(sdk_binding.app_id) # fat app
        {:ok, sdk_binding}
      v -> v
    end    
  end

  def get_app_goods(goods_id) do 
    CachedAppGoods.get(goods_id)
  end

  def create_app_goods(attr) do 
    case AppGoods.changeset(%AppGoods{}, attr) |> Repo.insert do 
      {:ok, goods} ->
        CachedApp.refresh(goods.app_id)
        CachedAppGoods.refresh(goods.id)
        {:ok, goods}
      v -> v
    end
  end

  def update_app_goods(%AppGoods{} = goods, attr) do 
    changeset = AppGoods.changeset(goods, attr)
    case Repo.update(changeset) do 
      {:ok, new_goods} -> 
        CachedApp.refresh(goods.app_id)
        CachedAppGoods.refresh(goods.id)
        {:ok, new_goods, changeset}
      v -> v
    end
  end

  def del_app_goods(%AppGoods{} = goods) do 
    case Repo.delete(goods) do 
      {:ok, _} -> 
        CachedApp.refresh(goods.app_id)
        CachedAppGoods.refresh(goods.id)
        :ok
      v -> v
    end
  end

  def get_app_order(order_id) do 
    Repo.get(AppOrder, order_id)
  end

  def update_app_order!(%AppOrder{} = order, attr) do 
    AppOrder.changeset(order, attr) |> Repo.update!
  end

  def list_undelivered_app_orders() do 
    query = from order in AppOrder,
      select: order,
      where: order.status == 2 and
            order.try_deliver_counter < 100 and
            order.inserted_at > ago(2, "week")

    Repo.all(query) 
  end

  def add_contact(user_id, app_id, contact) do
    with contact <- contact |> Map.put("user_id", user_id) |> Map.put("app_id", app_id),
         {:ok, contact} <- AppQuestion.changeset(%AppQuestion{}, contact) |> Repo.insert
    do
      Acs.Search.ESQuestion.index(contact)
      :ok
    else
      nil ->
        :illegal
      {:error, %{errors: _errors}} ->
        :error
    end
  end

  def get_paged_questions(app_id, page, records_per_page) do
    total = Repo.one!(from q in AppQuestion, select: count(q.id),where: q.app_id == ^app_id)
    total_page = round(Float.ceil(total / records_per_page))

    query = from question in AppQuestion,
              left_join: user in assoc(question, :user),
              left_join: app in assoc(question, :app),
              limit: ^records_per_page,
              offset: ^((page - 1) * records_per_page),
              select: map(question, [:id, :title, :answer, :is_hot, :active, :inserted_at, :updated_at, user: [:id, :nickname, :avatar_url]]),
              where: question.app_id == ^app_id,
              order_by: [desc: :id],
              preload: [user: user]

    questions = Repo.all(query)
    {:ok, questions, total_page}
  end

  def get_paged_services(user_id, app_id, page, records_per_page) do
    total = Repo.one!(from q in AppQuestion, select: count(q.id), where: q.user_id == ^user_id and q.app_id == ^app_id)
    total_page = round(Float.ceil(total / records_per_page))

    query = from question in AppQuestion,
              left_join: user in assoc(question, :user),
              left_join: app in assoc(question, :app),
              limit: ^records_per_page,
              order_by: [desc: question.inserted_at],
              where: question.user_id == ^user_id and question.app_id == ^app_id,
              offset: ^((page - 1) * records_per_page),
              select: map(question, [:id, :title, :answer, :inserted_at])
    questions = Repo.all(query)
    {:ok, questions, total_page}
  end

  def get_common_issues(app_id) do
    query = from question in AppQuestion,
              select: question.title,
              where: question.app_id == ^app_id and question.is_hot== true

    Repo.all(query)
  end

  def get_top_news(app_id, limit) do
    query = from n in AppNews,
              where: n.app_id == ^app_id and n.group == "news" and n.active == true and n.is_top == true,
              order_by: [desc: n.id],
              limit: ^limit,
              select: map(n, [:id, :title, :content, :pic, :reads, :inserted_at])

    Repo.all(query)
  end

  def get_paged_news(app_id, group, page, records_per_page) do
    total = Repo.one!(from n in AppNews, 
                      select: count(1), 
                      where: n.app_id == ^app_id and n.group == ^group and n.active == true)
    total_page = round(Float.ceil(total / records_per_page))

    fields = case group do 
              "notice" -> 
                [:id, :title, :content, :is_top, :active, :pic, :reads, :inserted_at]
              _ ->
                [:id, :title, :is_top, :active, :pic, :reads, :inserted_at]
             end

    query = from n in AppNews,
              where: n.app_id == ^app_id and n.group == ^group and n.active == true,
              order_by: [desc: n.id],
              limit: ^records_per_page,
              offset: ^((page - 1) * records_per_page),
              select: map(n, ^fields)

    news = Repo.all(query)
    
    {:ok, news, total_page, total}
  end

  def get_paged_news_admin(app_id, group, page, records_per_page) do
    total = Repo.one!(from n in AppNews, select: count(1), where: n.app_id == ^app_id and n.group == ^group)
    total_page = round(Float.ceil(total / records_per_page))

    query = from n in AppNews,
              where: n.app_id == ^app_id and n.group == ^group,
              order_by: [desc: n.id],
              limit: ^records_per_page,
              offset: ^((page - 1) * records_per_page),
              select: map(n, [:id, :app_id, :title, :content, :group, :is_top, :active, :pic, :reads, :inserted_at])

    news = Repo.all(query)
    {:ok, news, total_page, total}
  end

  def get_news(news_id) do
    Repo.get(AppNews, news_id)
  end

  def update_news_pic(news, image_path) do
    AppNews.changeset(news, %{pic: image_path}) |> Repo.update!
  end

  def get_news_detail(news_id) do
    query = from n in AppNews,
          join: u in assoc(n, :user),
          where: n.id == ^news_id,
          order_by: [desc: n.id],
          select: map(n, [:id, :title, :content, :is_top, :active, :pic, :reads, :inserted_at,
                          user: [:id, :nickname, :avatar_url]]),
          preload: [user: u]

    Repo.one(query)
  end

  def add_news_click(news_id, click) do
    news = Repo.get(AppNews, news_id)
    AppNews.changeset(news, %{reads: news.reads + click}) |> Repo.update()
  end

  def update_news(user_id, news) do
    case Repo.get(AppNews, news.news_id) do
      nil ->
        # add new
        news = news |> Map.put("user_id", user_id)
        case AppNews.changeset(%AppNews{}, news) |> Repo.insert do
          {:ok, new_news} ->
            news = news |> Map.put("id", new_news.id) |> Map.put("created_at", new_news.inserted_at)
            {:ok, news}
          {:error, %{errors: _errors}} ->
            :error
        end
        
      %AppNews{} = ns ->
        # update
        changed = AppNews.changeset(ns, %{title: news.title, content: news.content, is_top: news.is_top})
        changed |> Repo.update!
        news = news |> Map.put("id", ns.id) |> Map.put("created_at", ns.inserted_at)
        {:ok, news, changed.changes}
    end
  end

  def toggle_news_status(news_id) do
    case Repo.get(AppNews, news_id) do
      nil ->
        nil
      %AppNews{} = news ->
        AppNews.changeset(news, %{active: !news.active}) |> Repo.update!
        {:ok, !news.active}
    end
  end

  def update_question(app_id, q) do
    with %AppQuestion{} = question <- Repo.get_by(AppQuestion, id: q.id, app_id: app_id),
         {:ok, question} <- AppQuestion.changeset(question,%{title: q.title, answer: q.answer, active: q.active, is_hot: q.is_hot}) |> Repo.update
    do
      Acs.Search.ESQuestion.update(%{ doc: %{ title: q.title, answer: q.answer, active: q.active, is_hot: q.is_hot }}, q.id)
      {:ok, question}
    else
      nil -> nil
      {:error, %{errors: _errors}} -> :error
    end
  end

  def delete_question(app_id, id) do
    with %AppQuestion{id: ^id} = question <- Repo.get_by(AppQuestion, id: id, app_id: app_id),
         {:ok, _}  <- Repo.delete(question)
    do
      Acs.Search.ESQuestion.delete(id)
      :ok
    else
       nil -> nil
       {:error, %{errors: errors}} -> {:error, errors}
    end
  end

  defp update_app_features!(app) do
    update_app_forum!(app)  
    update_app_mall!(app)
  end

  defp update_app_forum!(%{id: app_id, alias: forum_id, has_forum: true} = app) when is_bitstring(forum_id) do 
    case Forums.get_app_forum(app_id) do 
      nil ->
      Forums.create_forum!(forum_id, app.name || app.forum_name, app_id)

      %Forum{app_id: ^app_id} -> 
        Forums.update_forum(forum_id, %{id: forum_id, active: true})
    end
  end
  defp update_app_forum!(%{id: app_id, alias: forum_id, has_forum: false}) do 
    case Forums.get_app_forum(app_id) do 
      nil ->
        :do_nothing

      %Forum{app_id: ^app_id} -> 
        Forums.update_forum(forum_id, %{id: forum_id, active: false})
    end
  end

  defp update_app_mall!(%{id: app_id, alias: mall_id, has_mall: true} = app) when is_bitstring(mall_id) do 
    case Malls.get_app_mall(app_id) do 
      nil ->
        Malls.create_mall!(mall_id, app.name, app_id)

      %Mall{app_id: ^app_id} = mall -> 
        Malls.update_mall!(mall, %{id: mall_id, active: true})
    end
  end
  defp update_app_mall!(%{id: app_id, alias: mall_id, has_mall: false}) do 
    case Malls.get_app_mall(app_id) do 
      nil ->
        :do_nothing

      %Mall{app_id: ^app_id} = mall -> 
        Malls.update_mall!(mall, %{id: mall_id, active: false})
    end
  end

end
