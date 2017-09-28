defmodule Acs.Cache.CachedPMallTaskBar do
  import  Ecto.Query
  alias   Acs.Repo

  require Exredis
  require Excache

  alias   Utils.JSON
  alias   Acs.PMalls.TaskBar

  @key_base    "acs.pmall_task"

  def get(task_id) do
    Excache.get!(key(task_id), fallback: fn(redis_key) -> 
      case Exredis.get(redis_key) do
        nil ->
          case refresh(task_id) do
            nil -> 
              {:ignore, nil}
            v -> 
              {:commit, v}
          end
        raw ->
          {:commit, TaskBar.from_redis(raw)}
      end
    end)
  end

  def list(app_id) do 
    Excache.get!(list_key(app_id), fallback: fn(redis_key) -> 
      case Exredis.get(redis_key) do
        nil ->
          query = from tb in TaskBar,
            select: tb.id,
            where: tb.app_id == ^app_id,
            where: tb.active == true,
            order_by: [asc: tb.sort]

          task_ids = Repo.all(query)

          tasks = for id <- task_ids do 
            get(id)
          end

          Exredis.set(list_key(app_id), Poison.encode!(task_ids))

          {:commit, tasks}
          
        raw ->
          task_ids = Poison.decode!(raw)

          tasks = for id <- task_ids, do: get(id)

          {:commit, tasks}
      end
    end)    
  end

  def refresh(%TaskBar{} = task) do 
    Exredis.set(key(task.id), TaskBar.to_redis(task))
    Excache.del(key(task.id))

    refresh_list(task.app_id)

    task
  end

  def refresh(task_id)  do
    key(task_id) |> Excache.del

    case Repo.get(TaskBar, task_id) do 
      nil -> nil
      %TaskBar{} = task ->
        refresh(task)
    end
  end

  def del(%TaskBar{} = task) do 
    Exredis.del(key(task.id))
    Excache.del(key(task.id))    

    refresh_list(task.app_id)
  end


  defp refresh_list(app_id) do 
    Exredis.del(list_key(app_id))
    Excache.del(list_key(app_id))
  end

  defp key(task_id), do: "#{@key_base}.#{task_id}"
  defp list_key(app_id), do: "#{@key_base}.__all__.#{app_id}"
end
