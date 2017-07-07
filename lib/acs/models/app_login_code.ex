defmodule Acs.AppLoginCode do
  use Acs.Web, :model

  @derive {Poison.Encoder, except: [:user, :app, :__meta__]}

  schema "app_login_codes" do
    field :code, :string
    field :owner, :string

    field :assigned_at, :utc_datetime
    field :used_at, :utc_datetime

    belongs_to :app, Acs.App, type: :string
    belongs_to :user, Acs.User, type: :integer

    timestamps()
  end

  use Utils.Jsonable
  use Timex
  require Redis
  require Cachex
  require Poison

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:code, :owner, :assigned_at, :used_at, :app_id, :user_id])
    |> validate_required([:app_id, :code])
    |> unique_constraint(:code, name: :app_login_codes_app_id_code_index)
  end

  def stats_info(app_id) do 
    Cachex.get!(:default, stats_key(app_id), fallback: fn(redis_key) -> 
      case Redis.get(redis_key) do 
        :undefined -> {:commit, refresh_stats_info(app_id)}
        raw -> {:commit, Poison.decode!(raw, keys: :atoms)}
      end
    end)
  end

  def refresh_stats_info(app_id) do 
    Cachex.del(:default, stats_key(app_id))

    query = from c in __MODULE__,
            select: count(1),
            where: c.app_id == ^app_id

    total = Repo.one(query)

    query1 = query |> where([c], is_nil(c.owner))

    available = Repo.one(query1)

    query2 = query |> where([c], not is_nil(c.owner) and not is_nil(c.user_id))

    used = Repo.one(query2)

    info = %{
      total: total,
      available: available,
      assigned: total - available,
      used: used
    }

    Redis.set(stats_key(app_id), Poison.encode!(info))

    info
  end

  defp stats_key(app_id) do 
    key = "login_code.stats_info.#{app_id}"
  end

  def daily_chart_data(app_id, ndays) do 
    key = "login_code.daily_chart_data.#{app_id}.#{ndays}"

    Cachex.get!(:default, key, fallback: fn(redis_key) -> 
      case Redis.get(redis_key) do 
        :undefined ->
          now = Timex.local
          chart = refresh_daily_chart_data(app_id, ndays)
          Redis.set(redis_key, Poison.encode!(chart))
          Redis.expireat(redis_key, Timex.end_of_day(now) |> Timex.to_unix) 
          {:commit, chart}
        
        raw ->
          {:commit, Poison.decode!(raw, keys: :atoms)}
      end
    end)
  end

  def refresh_daily_chart_data(app_id, ndays) do 
    key = "login_code.daily_chart_data.#{app_id}.#{ndays}"
    Redis.del(key)
    Cachex.del(:default, key)
    with dates <- latest_dates(ndays),
         assigned_data <- daily_assigned_data(app_id, ndays, dates),
         used_data <- daily_used_data(app_id, ndays, dates)
    do 
      %{
        labels: dates,
        datasets: [
          %{
            label: "已分配(用户)",
            data: assigned_data,
          },
          %{
            label: "已使用(用户)",
            data: used_data
          }
        ]
       }
    end
  end

  defp daily_assigned_data(app_id, ndays, dates) do 
    query = from c in __MODULE__, 
      select: {fragment("date_format(date(convert_tz(?, '+00:00', '+08:00')), '%Y-%m-%d')", c.assigned_at), count(c.code)}, 
      group_by: fragment("date_format(date(convert_tz(?, '+00:00', '+08:00')), '%Y-%m-%d')", c.assigned_at), 
      where: c.app_id == ^app_id and not is_nil(c.assigned_at) and c.assigned_at > ago(^ndays, "day"),
      where: not like(c.owner, "admin.%")
    
    counters = case Repo.all(query) do 
      l when is_list(l) -> Enum.into(l, %{})
      _ -> %{}
    end

    dates |> Enum.map(fn(date) -> 
      Map.get(counters, date, 0)
    end)
  end

  defp daily_used_data(app_id, ndays, dates) do 
    query = from c in __MODULE__, 
      select: {fragment("date_format(date(convert_tz(?, '+00:00', '+08:00')), '%Y-%m-%d')", c.used_at), count(c.code)}, 
      group_by: fragment("date_format(date(convert_tz(?, '+00:00', '+08:00')), '%Y-%m-%d')", c.used_at), 
      where: c.app_id == ^app_id and not is_nil(c.used_at) and c.used_at > ago(^ndays, "day"), 
      where: not like(c.owner, "admin.%")
    
    counters = case Repo.all(query) do 
      l when is_list(l) -> Enum.into(l, %{})
      _ -> %{}
    end

    dates |> Enum.map(fn(date) -> 
      Map.get(counters, date, 0)
    end)
  end

  defp latest_dates(ndays) do 
    now = Timex.local 
    0..ndays |> Enum.map(fn(n) -> 
      now |> Timex.shift(days: -n) |> Timex.to_date |> to_string 
    end) |> Enum.reverse 
  end
  

end
