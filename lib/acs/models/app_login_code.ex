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

  use Utils.Redisable
  use Timex
  require Redis
  require Cachex
  require Poison
  alias   Acs.Repo
  import  Ecto.Query

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
        :undefined -> 
          {:commit, refresh_stats_info(app_id)}
        raw -> 
          {:commit, raw |> Base.decode64! |> :erlang.binary_to_term}
      end
    end)
  end

  def find_by_openid(app_id, openid) do 
    key = "_acs.login_codes.owns.#{app_id}.#{openid}"
    Cachex.get!(:default, "_acs.login_codes.owns.#{app_id}.#{openid}", fallback: fn(redis_key) -> 
      case Redis.get(redis_key) do 
        :undefined -> 
          owner = "openid.#{openid}"
          query = from c in __MODULE__,
                    select: c,
                    where: c.owner == ^owner

          case Repo.one(query) do 
            %__MODULE__{code: code, owner: ^owner} ->
              Redis.set(redis_key, code)
              {:commit, code}
            
            _ -> 
              {:ignore, nil}
          end
        
        code -> 
          {:commit, code}
      end
    end)
  end

  def refresh_stats_info(app_id) do 
    Cachex.del(:default, stats_key(app_id))

    total = Redis.scard("_acs.login_codes.all.#{app_id}")
    available = Redis.scard("_acs.login_codes.available.#{app_id}")
    assigned = Redis.scard("_acs.login_codes.assigned.#{app_id}")

    query = from c in __MODULE__,
            select: count(1),
            where: c.app_id == ^app_id,
            where: not is_nil(c.owner),
            where: not is_nil(c.user_id)

    used = Repo.one(query)

    info = %{
      total: total,
      available: available,
      assigned: assigned,
      used: used
    }

    Redis.set(stats_key(app_id), info |> :erlang.term_to_binary |> Base.encode64)

    info
  end

  def daily_chart_data(app_id, ndays) do 
    Cachex.get!(:default, daily_chart_key(app_id, ndays), fallback: fn(redis_key) -> 
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

  def import_mysql_codes() do 
    query = from c in __MODULE__,
            select: {c.code, c.app_id}
    
    Repo.all(query) |> Enum.each(fn({code, app_id}) -> 
      Redis.sadd("_acs.login_codes.all.#{app_id}", code)
    end)

    query = from c in __MODULE__,
            select: {c.code, c.app_id},
            where: is_nil(c.owner)  

    Repo.all(query) |> Enum.each(fn({code, app_id}) -> 
      Redis.sadd("_acs.login_codes.available.#{app_id}", code)
    end)

    query = from c in __MODULE__,
            select: {c.code, c.app_id},
            where: not is_nil(c.owner)  

    Repo.all(query) |> Enum.each(fn({code, app_id}) -> 
      Redis.sadd("_acs.login_codes.assigned.#{app_id}", code)
    end)
  end

  def refresh_daily_chart_data(app_id, ndays) do 
    key = daily_chart_key(app_id, ndays)
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
  
  defp stats_key(app_id) do 
    "_acs.login_code.stats_info.#{app_id}"
  end

  defp daily_chart_key(app_id, ndays) do 
    "_acs.login_code.daily_chart_data.#{app_id}.#{ndays}"
  end


end
