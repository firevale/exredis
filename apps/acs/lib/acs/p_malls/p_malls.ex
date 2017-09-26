defmodule Acs.PMalls do
  @moduledoc """
  The PMalls context.
  """
  require Timex
  import Ecto.Query, warn: false
  alias Acs.Repo
  alias Acs.Search
  use Utils.LogAlias

  alias Acs.PMallsPoint
  alias Acs.PMalls.PMallGoods
  alias Acs.PMalls.PMallOrder
  alias Acs.PMalls.PMallOrderDetail
  alias Acs.PMalls.PointLog
  alias Acs.PMalls.TaskBar
  alias Acs.PMalls.DayQuestion
  alias Acs.PMalls.LuckyDraw
  alias Acs.Wcp
  alias Acs.Wcp.AppWcpUser
  alias Acs.PMalls.LuckyDrawOrder
  alias Acs.PMalls.SignWcpUser
  alias Acs.Accounts
  alias Acs.Accounts.UserAddress
  alias Acs.PMalls.LuckyDrawOrder

  alias Acs.Cache.CachedPMallGoods
  alias Acs.Cache.CachedPMallTaskBar
  alias Acs.Cache.CachedAppWcpUser
  alias Acs.Cache.CachedAdminSetting

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
    total_query = from pl in PointLog, where: pl.app_id == ^app_id, select: count(pl.id)
    total_query = case String.length(wcp_user_id) do
      0 -> total_query
      _ -> where(total_query, [pl], pl.wcp_user_id == ^wcp_user_id)
    end
    total_page = round(Float.ceil(Repo.one!(total_query) / records_per_page))

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
    total_query = from pl in PointLog, where: pl.app_id == ^app_id and pl.wcp_user_id == ^wcp_user_id, select: count(pl.id)
    total_page = round(Float.ceil(Repo.one!(total_query) / records_per_page))

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
    total_query =
      from pl in PointLog,
        where: pl.app_id == ^app_id and pl.wcp_user_id == ^wcp_user_id and pl.log_type == "point_exchange_goods",
        select: count(pl.id)
    total_page = round(Float.ceil(Repo.one!(total_query) / records_per_page))

    query =
      from pl in PointLog,
        select: map(pl, [:id, :log_type, :point, :memo, :inserted_at]),
        limit: ^records_per_page,
        where: pl.app_id == ^app_id and pl.wcp_user_id == ^wcp_user_id and pl.log_type == "point_exchange_goods",
        offset: ^((page - 1) * records_per_page),
        order_by: [desc: pl.id]

    logs = Repo.all(query)
    {:ok, logs, total_page}
  end

  def count_exchange_goods(app_id, wcp_user_id, goods_id) do
    query =
      from order in PMallOrder,
        left_join: details in assoc(order, :details),
        where: order.app_id == ^app_id and order.wcp_user_id == ^wcp_user_id and details.pmall_goods_id == ^goods_id,
        select: count(order.id)

    Repo.one!(query)
  end

  def exchange_goods(app_id, wcp_user_id, goods_id, address \\ %{}) do
    Repo.transaction(fn ->
      goods = get_pmall_goods(goods_id)
      exchange_count =  count_exchange_goods(app_id, wcp_user_id, goods_id)
      points = get_user_point(app_id, wcp_user_id)
      cond do
        not goods.active ->
          Repo.rollback(%{i18n_message: "pmall.exchange.unactive"})
        goods.stock <= 0  ->
          Repo.rollback(%{i18n_message: "pmall.exchange.soldout"})
        DateTime.compare(goods.begin_time, DateTime.utc_now()) == :gt ->
          Repo.rollback(%{i18n_message: "pmall.exchange.expired"})
        DateTime.compare(goods.end_time, DateTime.utc_now()) == :lt ->
          Repo.rollback(%{i18n_message: "pmall.exchange.expired"})
        points < goods.price ->
          Repo.rollback(%{i18n_message: "pmall.exchange.pointless"})
        exchange_count >= 1 ->
          Repo.rollback(%{i18n_message: "pmall.exchange.limit"})
        true ->
          with {:ok, order_id} <- _create_pmall_order(app_id, wcp_user_id, goods, address),
               {:ok, add_point, total_point} <-  PMallsPoint.exchange_goods_point(app_id, wcp_user_id, goods)
          do
            CachedPMallGoods.refresh(goods.id)
            %{order_id: order_id, add_point: add_point, total_point: total_point,i18n_message: "pmall.exchange.success"}
          else
            _ ->
              Repo.rollback(%{i18n_message: "pmall.exchange.failed"})
          end
      end
    end)
  end

  defp _create_order_id(wcp_user_id) do
   Integer.to_string(Utils.unix_timestamp) <> String.slice(Integer.to_string(wcp_user_id), -4, 4)
  end
  defp _create_pmall_order(app_id, wcp_user_id, goods, address) do
      # goods stock
      new_goods = PMallGoods.changeset(goods, %{stock: goods.stock - 1, sold: goods.sold + 1}) |> Repo.update()

      # add order
      order_id = _create_order_id(wcp_user_id)
      mapGoods = Map.from_struct(goods) |> Map.drop([:__meta__, :app, :user])
      snapshots = Map.put(%{}, goods.id, mapGoods)
      new_order = %{"id": order_id, "goods_name": goods.name, "price": goods.price,
        "discount": 0, "final_price": goods.price, "app_id": app_id, "wcp_user_id": wcp_user_id,
        "address": address, "snapshots": snapshots
      }

     PMallOrder.changeset(%PMallOrder{}, new_order) |> Repo.insert!

      # add order detail
      order_detail = %{"goods_name": goods.name, "goods_pic": goods.pic, "price": goods.price,
         "amount": 1, "pmall_goods_id": goods.id, "pmall_order_id": order_id
      }

      PMallOrderDetail.changeset(%PMallOrderDetail{}, order_detail) |> Repo.insert!
      {:ok, order_id}
  end

  def update_order_address(wcp_user_id, order_id, address) do
    with %PMallOrder{} = order  <- Repo.get(PMallOrder, order_id),
      true <- wcp_user_id == order.wcp_user_id,
      false <- Map.has_key?(order.address, "name")
    do
      PMallOrder.changeset(order, %{address: address}) |> Repo.update()
    else
      nil ->
        {:error, "pmall.address.invalidOrder"}
      false ->
        {:error, "pmall.address.illegal"}
      true ->
        {:error, "pmall.address.illegal"}
      %UserAddress{} ->
        {:error, "pmall.address.illegal"}
      other ->
        d "#{inspect other}"
        {:error, "pmall.address.failed"}
    end

  end

  # 签到
  def _sign_cache_key(app_id, wcp_user_id), do: "pmall:sign:#{app_id}:#{Timex.today}:#{wcp_user_id}"
  def _sign_cache_key_before(app_id, wcp_user_id), do: "pmall:sign:#{app_id}:#{Timex.shift(Timex.today, days: -1)}:#{wcp_user_id}"
  def _sign_cache_key_times(app_id, wcp_user_id), do: "pmall:signtimes:#{app_id}:#{wcp_user_id}"
  def _sign_cache_key_users(app_id), do: "pmall:sign:users:#{app_id}:#{Timex.today}"
  def _sign_cache_key_calendar(app_id, group_name), do: "pmall:sign:calendar:#{app_id}:#{group_name}:#{Timex.today}"
  def sign(app_id, wcp_user_id) do
    sign_key = _sign_cache_key(app_id, wcp_user_id)
    signed = Exredis.incr(sign_key)
    case signed do
      1 ->
         _sign(app_id, wcp_user_id)
      _ ->
        {:error, %{i18n_message: "pmall.sign.signed"}}
    end
  end
  defp _sign(app_id, wcp_user_id) do
    sign_key = _sign_cache_key(app_id, wcp_user_id)
    sign_key_before = _sign_cache_key_before(app_id, wcp_user_id)
    sign_key_times = _sign_cache_key_times(app_id, wcp_user_id)

    ## 连续签到次数
    times  =
      case Exredis.exists(sign_key_before) do
        1 ->
          Exredis.incr(sign_key_times)
        _ ->
          Exredis.set(sign_key_times, 1)
          1
      end

    ## 过期设置
    Exredis.expire(sign_key, 172800)
    Exredis.expire(sign_key_times, 172800)

    ## 添加积分
   {:ok, add_point, total_point} = Acs.PMallsPoint.add_point("point_day_sign", app_id, wcp_user_id)
   {:ok, %{sign_times: times, add_point: add_point, total_point: total_point}}

  end

  def add_sign_user(app_id, open_id) do
    sign_key_users = _sign_cache_key_users(app_id)
    score = DateTime.utc_now() |> DateTime.to_unix
    Exredis.zadd(sign_key_users, score, open_id)
    Exredis.expire(sign_key_users, 172800)
  end

  def get_sign_users(app_id) do
    sign_key_users = _sign_cache_key_users(app_id)
    total = Exredis.zcard(sign_key_users)
    open_ids = Exredis.zrange(sign_key_users, 0, 20)
    wcp_users =
      Enum.map(open_ids, fn open_id ->
        wcp_user = CachedAppWcpUser.get(app_id, open_id)
        Map.take(wcp_user, [:id, :nickname, :avatar_url])
      end)
    {total, wcp_users}
  end

  def get_sign_info(app_id, wcp_user_id) do
    sign_key = _sign_cache_key(app_id, wcp_user_id)
    sign_key_times = _sign_cache_key_times(app_id, wcp_user_id)

    signed = if Exredis.exists(sign_key) == 1, do: true, else: false
    sign_times = _get_sign_times(sign_key_times)

    pic = _get_sign_calendar(app_id, "signPic")
    terms =  _get_sign_calendar(app_id, "signLunar")
      
    {:ok, signed, sign_times, pic, terms}
  end
  defp _get_sign_times(sign_key_times) do
    case  Exredis.get(sign_key_times) do
      nil -> 0
      times -> String.to_integer(times)
    end
  end

  defp _get_sign_calendar(app_id, groun_name) do
    cache_key = _sign_cache_key_calendar(app_id, groun_name)
    case  Exredis.get(cache_key) do
      nil ->
          values = Acs.Admin.get_settings_by_group(app_id, groun_name)
          index = Date.utc_today |> Date.days_in_month
          value = Enum.at(values, Integer.mod(index, Enum.count(values)))
          encode_value = value |> :erlang.term_to_binary |> Base.encode64
          Exredis.set(cache_key, encode_value)
          value
      raw ->
          raw |> Base.decode64! |> :erlang.binary_to_term
    end
    
  end

  # 积分
  def add_point(log) do
    case PointLog.changeset(%PointLog{}, log) |> Repo.insert do
      {:ok, new_log} ->
        log = Map.put(log, "id", new_log.id) |> Map.put("inserted_at", new_log.inserted_at)
        {:ok, log}

      {:error, %{errors: errors}} ->
        {:error, errors}
    end
  end

  def get_user_point(app_id, wcp_user_id) do
    total_query = from log in PointLog, select: sum(log.point), where: log.app_id == ^app_id and log.wcp_user_id == ^wcp_user_id
    Decimal.to_integer(Repo.one!(total_query))
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

  def get_question(id) do
    Repo.get(DayQuestion, id)
  end

  def get_daily_question(app_id) do
    case Exredis.get(_answer_cache_key(app_id)) do
      nil ->
        max_id = :rand.uniform(Repo.one!(from q in DayQuestion, select: max(q.id), where: q.app_id == ^app_id))
        query = from q in DayQuestion,
                where: q.app_id == ^app_id and q.id >= ^max_id,
                limit: 1,
                order_by: [asc: q.inserted_at],
                select: map(q, [:id, :question, :correct, :a1, :a2, :a3, :a4, :a5, :a6, :reads, :bingo, :app_id])

        question = Repo.one(query)
        {:ok, question}
      question_id ->
        query = from q in DayQuestion,
                where: q.id == ^String.to_integer(question_id),
                select: map(q, [:id, :question, :correct, :a1, :a2, :a3, :a4, :a5, :a6, :reads, :bingo, :app_id])

        question = Repo.one(query)
        {:ok, question}
    end
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

  # 答题
  def _answer_cache_key(app_id), do: "acs.pmall_answer_#{app_id}_#{Timex.today}"
  def _answer_cache_key_user(app_id, wcp_user_id), do: "acs.pmall_answer_#{app_id}_#{wcp_user_id}_#{Timex.today}"

  def exists_answer(app_id) do
    answer_key = _answer_cache_key(app_id)
    Exredis.exists(answer_key)
  end

  def exists_answer_user(app_id, wcp_user_id) do
    answer_key_user = _answer_cache_key_user(app_id, wcp_user_id)
    Exredis.exists(answer_key_user)
  end
  
  defp add_answer(app_id, question_id) do
    answer_key = _answer_cache_key(app_id)
    Exredis.set(answer_key, question_id)
    Exredis.expire(answer_key, 86400)
  end

  defp add_answer_user(app_id, wcp_user_id,question_id) do
    answer_key_user = _answer_cache_key_user(app_id, wcp_user_id)
    Exredis.set(answer_key_user, question_id)
    Exredis.expire(answer_key_user, 86400)
  end

  def answer_question(question_id, app_id, wcp_user_id, correct) do
    Repo.transaction(fn ->
      case exists_answer_user(app_id, wcp_user_id) do
        1 ->
          Repo.rollback(%{i18n_message: "pmall.question.exists"})
        _ ->
          case get_question(question_id) do
            nil ->
              Repo.rollback(%{i18n_message: "pmall.question.nonexists"})
            %DayQuestion{} = question ->
              if(exists_answer(app_id) == 0) do
                add_answer(app_id, question_id)
              end

              with {:ok, add_point, total_point} <-  PMallsPoint.add_point("point_day_question", app_id, wcp_user_id) do
                if(question.correct == correct) do
                  DayQuestion.changeset(question, %{reads: question.reads + 1 , bingo: question.bingo + 1}) |> Repo.update!
                
                  add_answer_user(app_id, wcp_user_id, question_id)
                  %{add_point: add_point, total_point: total_point,i18n_message: "pmall.question.answer.success", answer: true}
                else
                  DayQuestion.changeset(question, %{reads: question.reads + 1}) |> Repo.update!
                  add_answer_user(app_id, wcp_user_id, question_id)

                  %{add_point: add_point, total_point: total_point,i18n_message: "pmall.question.answer.failed", answer: false}
                end
              else
                _ ->
                  Repo.rollback(%{i18n_message: "pmall.question.answer.failed"})
              end
          end
        end
      end)
  end

  def list_pmall_draws(app_id) do
    query = from d in LuckyDraw,
      where: d.app_id == ^app_id,
      select: map(d, [:id, :name, :pic, :num, :rate, :app_id]),
      order_by: [desc: d.inserted_at]
    Repo.all(query)
  end

  def update_pmall_draw(draw) do
    case Repo.get(LuckyDraw, draw["id"]) do
    nil ->
      # add new
      case check_pmall_draw_rate(draw["app_id"], String.to_integer(draw["rate"])) do
        true ->
          case LuckyDraw.changeset(%LuckyDraw{}, draw) |> Repo.insert do
            {:ok, new_draw} ->
              draw = Map.put(draw, "id", new_draw.id)
              {:addok, draw}
            {:error, %{errors: _errors}} ->
              :error
          end
        false ->
          :overflow
      end

    %LuckyDraw{} = q ->
      # update
      case check_pmall_draw_rate(draw["app_id"], String.to_integer(draw["rate"])-q.rate) do
        true ->
          changed = LuckyDraw.changeset(q, %{name: draw["name"], num: draw["num"], rate: draw["rate"]})
          changed |> Repo.update!
          draw = Map.put(draw, "id", q.id)
          {:updateok, draw, changed.changes}
        false ->
          :overflow
      end
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

  def get_draw(draw_id) do
    Repo.get(LuckyDraw, draw_id)
  end

  def update_draw_pic(draw, image_path) do
    LuckyDraw.changeset(draw, %{pic: image_path}) |> Repo.update!
  end

  def create_draw_order(order) do
    LuckyDrawOrder.changeset(%LuckyDrawOrder{}, order) |> Repo.insert
  end

  def is_draw_exists?(app_id, wcp_user_id, lucky_draw_id) do
    query = from log in LuckyDrawOrder,
      select: count(1),
      where: log.app_id == ^app_id and log.wcp_user_id == ^wcp_user_id and log.lucky_draw_id == ^lucky_draw_id
    Repo.one!(query) > 0
  end

  # 抽奖
  def luck_draw(app_id, wcp_user_id, log_type, address \\ %{}) do
    Repo.transaction(fn ->
      index = :rand.uniform(8)
      draw = get_draw(index)
      if(draw == nil) do
        Repo.rollback(%{i18n_message: "pmall.draw.nonsetting"})
      end

      setting  = CachedAdminSetting.get_fat(app_id, log_type)
      user_point = get_user_point(app_id, wcp_user_id)
      case setting do
        nil ->
          Repo.rollback(%{i18n_message: "pmall.draw.nonsetting"})
        _ ->
          cond do
            user_point < String.to_integer(setting.value) * -1 || user_point <= 0 ->
              Repo.rollback(%{i18n_message: "pmall.draw.pointless"})
            draw.num <= 0  ->
                Repo.rollback(%{i18n_message: "pmall.draw.soldout"})
            true ->
              draw_order = %{"name": draw.name, "pic": draw.pic, "status": 0,
              "app_id": app_id, "wcp_user_id": wcp_user_id, "lucky_draw_id": draw.id, "address": address
              }
              # 扣除积分
              with {:ok, add_point, total_point} <-  PMallsPoint.add_point(log_type, app_id, wcp_user_id) do
                # 减奖品数
                LuckyDraw.changeset(draw, %{num: draw.num - 1}) |> Repo.update!
                # 创建抽奖订单
                case create_draw_order(draw_order) do
                  {:error, %{errors: _errors}} ->
                    Repo.rollback(%{i18n_message: "pmall.draw.failed"})
                  {:ok, order} ->
                    %{add_point: add_point, total_point: total_point,i18n_message: "pmall.draw.success",  index: index, order: order, draw_name: draw.name}
                end
              else
                _ ->
                  Repo.rollback(%{i18n_message: "pmall.draw.failed"})
              end
          end
      end
    end)
  end

  def update_draw_address(wcp_user_id, order_id, address) do
    with %LuckyDrawOrder{} = order  <- Repo.get(LuckyDrawOrder, order_id),
      true <- wcp_user_id == order.wcp_user_id,
      false <- Map.has_key?(order.address, "name")
    do
      LuckyDrawOrder.changeset(order, %{address: address}) |> Repo.update()
    else
      nil ->
        {:error, "pmall.address.invalidOrder"}
      false ->
        {:error, "pmall.address.illegal"}
      true ->
        {:error, "pmall.address.illegal"}
      %UserAddress{} ->
        {:error, "pmall.address.illegal"}
      other ->
        d "#{inspect other}"
        {:error, "pmall.address.failed"}
    end

  end

  def count_draw_orders(app_id, wcp_user_id, draw_id) do
    query =
      from log in LuckyDrawOrder,
        where: log.app_id == ^app_id and log.wcp_user_id == ^wcp_user_id and log.lucky_draw_id == ^draw_id,
        select: count(log.id)

    Repo.one!(query)
  end

  defp check_pmall_draw_rate(app_id, rate) do
    total = Repo.one(from d in LuckyDraw, select: sum(d.rate), where: d.app_id == ^app_id) || 0
    case is_integer(total) do
      true ->
        (total + rate) <= 100
      false ->
        (Decimal.to_integer(total) + rate) <= 100
    end
  end

  # 绑定手机
  def bind_mobile(app_id, open_id, mobile) do
    Repo.transaction(fn ->
      case Wcp.get_app_wcp_user(app_id, openid: open_id) do
        nil ->
          Repo.rollback(%{i18n_message: "pmall.bindMobile.notFound"})

        %AppWcpUser{} = wcp_user ->
          is_bind = Accounts.exists?(mobile)
          if(is_bind) do
            Repo.rollback(%{i18n_message: "pmall.bindMobile.hasBind"})
          end

          if(wcp_user.user_id == nil) do
              new_user = Accounts.create_user!(mobile , String.slice(mobile, 5..10))
              Wcp.update_app_wcp_user!(wcp_user, %{user_id: new_user.id})
          else
            user = Accounts.get_user(wcp_user.user_id)
            Accounts.update_user!(user, %{mobile: mobile})
          end

          with {:ok, add_point, total_point} <-  PMallsPoint.add_point("point_bind_mobile", app_id, wcp_user.id) do
            %{add_point: add_point, total_point: total_point,i18n_message: "pmall.bindMobile.success"}
          else
            _ ->
              Repo.rollback(%{i18n_message: "pmall.bindMobile.failed"})
          end
      end
    end)
  end

  def list_pmall_draw_orders(app_id, page, records_per_page) do
    total = Repo.one!(from q in LuckyDrawOrder, select: count(1), where: q.app_id == ^app_id)
    total_page = round(Float.ceil(total / records_per_page))

    query = from q in LuckyDrawOrder,
      join: user in assoc(q, :wcp_user),
      where: q.app_id == ^app_id,
      order_by: [desc: q.inserted_at],
      limit: ^records_per_page,
      offset: ^((page - 1) * records_per_page),
      select: map(q, [:id, :name, :pic, :status, :address, :paid_at, :deliver_at, :close_at, :app_id, :lucky_draw_id, wcp_user: [:id, :nickname, :avatar_url]]),
      preload: [wcp_user: user]

    orders = Repo.all(query)
    {:ok, orders, total_page}
  end

  def update_pmall_draw_order(draw_order) do
    case Repo.get(LuckyDrawOrder, draw_order["order_id"]) do
      nil ->
        nil
      %LuckyDrawOrder{} = order ->
        LuckyDrawOrder.changeset(order, %{status: draw_order["status"], address: draw_order["address"], deliver_at: draw_order["deliver_at"], close_at: draw_order["close_at"]}) |> Repo.update!
        :ok
    end
  end

end
