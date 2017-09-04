defmodule Acs.Web.PointController do
  use Acs.Web, :controller

  def get_point_logs(%Plug.Conn{private: %{acs_session_user_id: _user_id, acs_app_id: app_id}} = conn, 
                                         %{"user_id" => user_id, "page" => page, "records_per_page" => records_per_page}) do
    totalQuery = from pl in PointLog, where: pl.app_id == ^app_id, select: count(pl.id)
    totalQuery = case String.length(user_id) do
      0 -> totalQuery
      _ -> where(totalQuery, [pl], pl.user_id == ^user_id)
    end
    total_page = round(Float.ceil(Repo.one!(totalQuery) / records_per_page))

    query = from pl in PointLog,
              join: u in assoc(pl, :user),
              select: map(pl, [:id, :log_type, :point, :memo, :user_id, :inserted_at, user: [:id, :email]]),
              limit: ^records_per_page,
              where: pl.app_id == ^app_id,
              offset: ^((page - 1) * records_per_page),
              order_by: [desc: pl.id],
              preload: [user: u]
    query = case String.length(user_id) do
      0 -> query
      _ -> where(query, [pl], pl.user_id == ^user_id)
    end
    logs = Repo.all(query)

    conn |> json(%{success: true, logs: logs, total: total_page})
  end

  def admin_add_point(%Plug.Conn{private: %{acs_session_user_id: user_id, acs_app_id: app_id}} = conn, %{"point" => point, "memo" => memo} = log) do
    log = Map.put(log, "app_id", app_id) |> Map.put("user_id", user_id) |> Map.put("log_type", "admin_op")
    add_point(conn, log)
  end

  def add_point(conn, log) do
    case PointLog.changeset(%PointLog{}, log) |> Repo.insert do
      {:ok, new_log} ->
        log = Map.put(log, "id", new_log.id) |> Map.put("inserted_at", new_log.inserted_at)
        conn |> json(%{success: true, log: log})

      {:error, %{errors: errors}} ->
        conn |> json(%{success: false, message: translate_errors(errors)})
    end
  end
  
  defp check_user_point(user_id) do
    
  end
end
