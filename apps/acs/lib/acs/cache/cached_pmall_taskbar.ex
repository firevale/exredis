defmodule Acs.CachePMallTaskBar do
  require Exredis
  require Excache
  import  Ecto.Query

  alias   Acs.Repo
  alias   Acs.PMalls.TaskBar

  @key_base    "acs.pmall_task_bars"

  def get(app_id)  do
    Excache.get!(key(app_id), fallback: fn(redis_key) -> 
      case Exredis.get(redis_key) do
        nil ->
          case refresh(app_id) do
            nil -> {:ignore, nil}
            v -> {:commit, v}
          end
        raw ->
          {:commit, raw }
      end
    end)
  end

  def refresh(app_id)  do
    key(app_id) |> Excache.del

    query = from tb in TaskBar,
      order_by: [desc: tb.sort],
      where: tb.app_id == ^app_id and tb.active == true,
      select: map(tb, [:id, :name, :pic, :sub_name, :point, :path])

    task_bars = Repo.all(query)
    Exredis.set(key(app_id), task_bars)
    Excache.del(key(app_id))
    task_bars
  end

  defp key(app_id), do: "#{@key_base}.#{app_id}"
end
