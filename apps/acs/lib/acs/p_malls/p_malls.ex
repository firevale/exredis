defmodule Acs.PMalls do
  @moduledoc """
  The PMalls context.
  """

  import Ecto.Query, warn: false
  alias Acs.Repo
  alias Acs.Search
  use Utils.LogAlias

  alias Acs.PMalls.PMallGoods
  alias Acs.PMalls.PointLog
  alias Acs.PMalls.TaskBar
  alias Acs.PMalls.DayQuestion
  alias Acs.PMalls.LuckyDraw

  alias Acs.Cache.CachedPMallGoods
  alias Acs.Cache.CachedPMallTaskBar

  def get_pmall_goods(goods_id) do
    Repo.get(PMallGoods, goods_id)
  end

  def get_pmall_goods_detail(goods_id) do
    CachedPMallGoods.get(goods_id)
  end

  def list_pmall_goods(app_id, page, records_per_page, keyword) do
    {:ok, searchTotal, ids} = Search.search_pmall_goods(keyword, page, records_per_page, false)

    queryTotal = from g in PMallGoods, select: count(1), where: g.app_id == ^app_id and g.active == true
    total = if String.length(keyword)>0 , do: searchTotal, else: Repo.one!(queryTotal)

    if total == 0 do
      :zero
    else
      total_page = round(Float.ceil(total / records_per_page))
      query = from g in PMallGoods,
                where: g.app_id == ^app_id and g.active == true,
                order_by: [desc: g.inserted_at],
                limit: ^records_per_page,
                offset: ^((page - 1) * records_per_page),
                select: map(g, [:id, :name, :currency, :pic, :price, :original_price, :postage, :stock, :sold, :active, :is_virtual, :begin_time, :end_time])

      query = if(String.length(keyword)>0) do
        query |> where([p], p.id in ^ids)
      else
        query
      end

      goodses = Repo.all(query)
      {:ok, goodses, total_page}
    end
  end

  def list_pmall_goods_admin(app_id, page, records_per_page, keyword) do
    {:ok, searchTotal, ids} = Search.search_pmall_goods(keyword, page, records_per_page, true)

    queryTotal = from g in PMallGoods, select: count(1), where: g.app_id == ^app_id
    total = if String.length(keyword)>0 , do: searchTotal, else: Repo.one!(queryTotal)

    if total == 0 do
      :zero
    else
      total_page = round(Float.ceil(total / records_per_page))
      query = from g in PMallGoods,
                where: g.app_id == ^app_id,
                order_by: [desc: g.inserted_at],
                limit: ^records_per_page,
                offset: ^((page - 1) * records_per_page),
                select: map(g, [:id, :name, :currency, :pic, :price, :original_price, :postage, :stock, :sold, :active, :is_virtual, :begin_time, :end_time])

      query = if(String.length(keyword)>0) do
        query |> where([p], p.id in ^ids)
      else
        query
      end

      goodses = Repo.all(query)
      {:ok, goodses, total_page}
    end
  end

  def update_pmall_goods_pic(goods, image_path) do
    PMallGoods.changeset(goods, %{pic: image_path}) |> Repo.update!
    CachedPMallGoods.refresh(goods)
  end

  def update_pmall_goods(user_id, goods) do
    case goods["is_new"] do
      true ->
        # add new
        count = Repo.one!(from g in PMallGoods, select: count(1), where: g.app_id == ^goods["app_id"] and g.id == ^goods["id"])
        if(count > 0) do
          :exist
        else
          goods = goods |> Map.put("user_id", user_id)
          case PMallGoods.changeset(%PMallGoods{}, goods) |> Repo.insert do
            {:ok, new_goods} ->
              goods = Map.put(goods, "inserted_at", new_goods.inserted_at) |> Map.put("active", false)
              CachedPMallGoods.refresh(goods["id"])
              {:add_ok, goods}
            {:error, %{errors: _errors}} ->
              :error
          end
        end

      false ->
        # update
        case Repo.get(PMallGoods, goods["id"]) do
          nil ->
            nil

          %PMallGoods{} = mg ->
            goods = Map.put(goods, "user_id", user_id)
            changed = PMallGoods.changeset(mg, %{name: goods["name"],
                                                description: goods["description"],
                                                pic: goods["pic"],
                                                price: goods["price"],
                                                postage: goods["postage"],
                                                stock: goods["stock"],
                                                is_virtual: goods["is_virtual"],
                                                begin_time: goods["begin_time"],
                                                end_time: goods["end_time"]})
            changed |> Repo.update!
            CachedPMallGoods.refresh(goods["id"])
            {:update_ok, goods, changed.changes}
        end
    end
  end

  def toggle_pmall_goods_status(goods_id) do
    case Repo.get(PMallGoods, goods_id) do
      nil ->
        nil
      %PMallGoods{} = goods ->
        PMallGoods.changeset(goods, %{active: !goods.active}) |> Repo.update!
        {:ok, !goods.active}
    end
  end

  def delete_pmall_goods(goods_id) do
    case Repo.get(PMallGoods, goods_id) do
      nil ->
        nil
      %PMallGoods{} = goods ->
        if(goods.sold > 0) do
          :sold
        else
          case Repo.delete(goods) do
            {:ok, _} ->
              CachedPMallGoods.del(goods_id)
              :ok

            {:error, %{errors: errors}} ->
              {:error, errors}
          end
        end
    end
  end

  def list_pmall_point_logs(app_id, wcp_user_id, page, records_per_page) do
    totalQuery = from pl in PointLog, where: pl.app_id == ^app_id, select: count(pl.id)
    totalQuery = case String.length(wcp_user_id) do
      0 -> totalQuery
      _ -> where(totalQuery, [pl], pl.wcp_user_id == ^wcp_user_id)
    end
    total_page = round(Float.ceil(Repo.one!(totalQuery) / records_per_page))

    query = from pl in PointLog,
              join: u in assoc(pl, :wcp_user),
              select: map(pl, [:id, :log_type, :point, :memo, :wcp_user_id, :inserted_at, wcp_user: [:id, :nickname]]),
              limit: ^records_per_page,
              where: pl.app_id == ^app_id,
              offset: ^((page - 1) * records_per_page),
              order_by: [desc: pl.id],
              preload: [wcp_user: u]

    query = case String.length(wcp_user_id) do
      0 -> query
      _ -> where(query, [pl], pl.wcp_user_id == ^wcp_user_id)
    end
    logs = Repo.all(query)
    {:ok, logs, total_page}
  end

  def list_my_points(app_id, wcp_user_id, page, records_per_page) do
    totalQuery = from pl in PointLog, where: pl.app_id == ^app_id and pl.wcp_user_id == ^wcp_user_id, select: count(pl.id)
    total_page = round(Float.ceil(Repo.one!(totalQuery) / records_per_page))

    query =
      from pl in PointLog,
        select: map(pl, [:id, :log_type, :point, :memo, :inserted_at]),
        limit: ^records_per_page,
        where: pl.app_id == ^app_id and pl.wcp_user_id == ^wcp_user_id,
        offset: ^((page - 1) * records_per_page),
        order_by: [desc: pl.id]

    logs = Repo.all(query)
    {:ok, logs, total_page}
  end

  def list_my_exchanges(app_id, wcp_user_id, page, records_per_page) do
    totalQuery = from pl in PointLog, where: pl.app_id == ^app_id and pl.wcp_user_id == ^wcp_user_id, select: count(pl.id)
    total_page = round(Float.ceil(Repo.one!(totalQuery) / records_per_page))

    query =
      from pl in PointLog,
        select: map(pl, [:id, :log_type, :point, :memo, :inserted_at]),
        limit: ^records_per_page,
        where: pl.app_id == ^app_id and pl.wcp_user_id == ^wcp_user_id,
        # where: pl.app_id == ^app_id and pl.wcp_user_id == ^wcp_user_id and pl.log_type == "point_exchange_goods",
        offset: ^((page - 1) * records_per_page),
        order_by: [desc: pl.id]

    logs = Repo.all(query)
    {:ok, logs, total_page}
  end

  def add_point(log) do
    case PointLog.changeset(%PointLog{}, log) |> Repo.insert do
      {:ok, new_log} ->
        log = Map.put(log, "id", new_log.id) |> Map.put("inserted_at", new_log.inserted_at)
        {:ok, log}

      {:error, %{errors: errors}} ->
        {:error, errors}
    end
  end

  def get_user_point(wcp_user_id) do
    total_query = from log in PointLog, select: sum(log.point), where: log.wcp_user_id == ^wcp_user_id
    Repo.one!(total_query)
  end

  def admin_add_pmall_point(wcp_user_id, app_id, log) do
    log = Map.put(log, "app_id", app_id) |> Map.put("wcp_user_id", wcp_user_id) |> Map.put("log_type", "admin_op")
    add_point(log)
  end

  def add_goods_click(goods_id, click) do
    goods = Repo.get(PMallGoods, goods_id)
    PMallGoods.changeset(goods, %{reads: goods.reads+click}) |> Repo.update()
    CachedPMallGoods.refresh(goods)
  end

  def get_task(task_id) do
    Repo.get(TaskBar, task_id)
  end

  def get_task_list(app_id) do
    query = from tb in TaskBar,
              select: map(tb, [:id, :pic, :name, :sub_name, :point, :path, :active, :sort]),
              where: tb.app_id == ^app_id,
              order_by: [asc: tb.sort]

    Repo.all(query)
  end

  def update_task_pic(task, image_path) do
    TaskBar.changeset(task, %{pic: image_path}) |> Repo.update!
  end

  # update_task
  def update_task(task) do
    case Repo.get(TaskBar, task["id"]) do
    nil ->
      # add new
      case TaskBar.changeset(%TaskBar{}, task) |> Repo.insert do
        {:ok, new_task} ->
          task = Map.put(task, "id", new_task.id) |> Map.put("inserted_at", new_task.inserted_at) |> Map.put("sort", new_task.id)
          TaskBar.changeset(new_task, %{sort: new_task.id}) |> Repo.update!
          {:addok, task}
        {:error, %{errors: _errors}} ->
          :error
      end

    %TaskBar{} = ns ->
      # update
      TaskBar.changeset(ns, %{name: task["name"], sub_name: task["sub_name"], point: task["point"], path: task["path"], active: task["active"], sort: task["sort"]}) |> Repo.update!
      task = Map.put(task, "id", ns.id) |> Map.put("inserted_at", ns.inserted_at)
      {:updateok, task}
    end
  end

  def toggle_task_status(task_id) do
    case Repo.get(TaskBar, task_id) do
      nil ->
        nil

      %TaskBar{} = task ->
        TaskBar.changeset(task, %{active: !task.active}) |> Repo.update!
        :ok
    end
  end

  def delete_task(task_id) do
    case Repo.get(TaskBar, task_id) do
      nil ->
        nil
      %TaskBar{} = task ->
        case Repo.delete(task) do
          {:ok, _} ->
            CachedPMallTaskBar.del(task.app_id)
            :ok

          {:error, %{errors: _errors}} ->
            :error
        end
    end
  end

  def change_taskbars_sort(need_change) do
    changes = String.split(need_change, ",", trim: true)
    Enum.map(changes, fn x ->
        [a, b] = String.split(x, "=")
        task = Repo.get(TaskBar, String.to_integer(a))
        TaskBar.changeset(task, %{sort: String.to_integer(b)}) |> Repo.update!
        CachedPMallTaskBar.refresh(task.app_id)
      end)
    :ok
  end

  def list_pmall_questions(app_id, page, records_per_page) do
    total = Repo.one!(from q in DayQuestion, select: count(1), where: q.app_id == ^app_id)
    total_page = round(Float.ceil(total / records_per_page))

    query = from q in DayQuestion,
      where: q.app_id == ^app_id,
      order_by: [desc: q.inserted_at],
      limit: ^records_per_page,
      offset: ^((page - 1) * records_per_page),
      select: map(q, [:id, :question, :correct, :a1, :a2, :a3, :a4, :a5, :a6, :reads, :bingo, :app_id])

    questions = Repo.all(query)
    {:ok, questions, total_page}
  end

  def update_pmall_question(question) do
    case Repo.get(DayQuestion, question["id"]) do
    nil ->
      # add new
      case DayQuestion.changeset(%DayQuestion{}, question) |> Repo.insert do
        {:ok, new_question} ->
          question = Map.put(question, "id", new_question.id) |> Map.put("reads", 0) |> Map.put("bingo", 0)
          {:addok, question}
        {:error, %{errors: _errors}} ->
          :error
      end

    %DayQuestion{} = q ->
      # update
      changed = DayQuestion.changeset(q, %{question: question["question"], correct: question["correct"],
                                    a1: question["a1"], a2: question["a2"], a3: question["a3"],
                                    a4: question["a4"], a5: question["a5"], a6: question["a6"]})
      changed |> Repo.update!
      question = Map.put(question, "id", q.id)
      {:updateok, question, changed.changes}
    end
  end

  def delete_pmall_question(question_id) do
    case Repo.get(DayQuestion, question_id) do
      nil ->
        nil
      %DayQuestion{} = question ->
        case Repo.delete(question) do
          {:ok, _} ->
            :ok

          {:error, %{errors: _errors}} ->
            :error
        end
    end
  end

  def list_pmall_draws(app_id) do
    query = from d in LuckyDraw,
      where: d.app_id == ^app_id,
      order_by: [desc: d.inserted_at]
    Repo.all(query)
  end

  def update_pmall_draw(draw) do
    case Repo.get(LuckyDraw, draw["id"]) do
    nil ->
      # add new
      case LuckyDraw.changeset(%LuckyDraw{}, draw) |> Repo.insert do
        {:ok, new_draw} ->
          draw = Map.put(draw, "id", new_draw.id)
          {:addok, draw}
        {:error, %{errors: _errors}} ->
          :error
      end

    %LuckyDraw{} = q ->
      # update
      changed = LuckyDraw.changeset(q, %{name: draw["name"], num: draw["num"], rate: draw["rate"]})
      changed |> Repo.update!
      draw = Map.put(draw, "id", q.id)
      {:updateok, draw, changed.changes}
    end
  end

  def delete_pmall_draw(draw_id) do
    case Repo.get(LuckyDraw, draw_id) do
      nil ->
        nil
      %LuckyDraw{} = draw ->
        case Repo.delete(draw) do
          {:ok, _} ->
            :ok

          {:error, %{errors: _errors}} ->
            :error
        end
    end
  end

end
