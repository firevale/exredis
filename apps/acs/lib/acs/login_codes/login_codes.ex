defmodule Acs.LoginCodes do
  @moduledoc """
  The LoginCodes context.
  """

  import Ecto.Query, warn: false
  alias Acs.Repo

  alias Acs.LoginCodes.AppLoginCode
  alias Acs.Cache.CachedLoginCode 

  require Exredis
  require Excache
  require Timex

  defmodule Scripts do
    import Exredis.Script

    defredis_script :rand_code, file_path: "lua/rand_code.lua"
  end

  def get_login_code(app_id, code: code) do 
    CachedLoginCode.get(app_id, code: code)
  end
  def get_login_code(app_id, user_id: user_id) do 
    CachedLoginCode.get(app_id, user_id: user_id)
  end
  def get_login_code(app_id, owner: owner) do 
    CachedLoginCode.get(app_id, owner: owner)
  end
  def get_login_code(app_id, openid: openid) do 
    CachedLoginCode.get(app_id, owner: "openid.#{openid}")
  end

  def update_login_code!(%AppLoginCode{} = code, attr) do 
    new_code = AppLoginCode.changeset(code, attr) |> Repo.update!
    CachedLoginCode.refresh(new_code)
    new_code
  end

  def gen_codes(app_id, number) do 
    1..number |> Enum.reduce(3, fn(_n, code_length) -> 
      gen_uniq_code(app_id, code_length)
    end)
  end

  defp gen_uniq_code(app_id, code_length, n \\ 1) do 
    code = Utils.generate_token(code_length)

    case Exredis.sadd("_acs.login_codes.all.#{app_id}", code) do 
      1 -> 
        Exredis.sadd("_acs.login_codes.available.#{app_id}", code)
        code_length
      0 ->
        if n <= 10 do 
          gen_uniq_code(app_id, code_length, n + 1)
        else
          gen_uniq_code(app_id, code_length + 1, 1)
        end
    end
  end

  def del_codes(app_id, number) do 
    available_number = Exredis.scard("_acs.login_codes.available.#{app_id}")
    remove_number = min(available_number, number)
    removed = Exredis.spop("_acs.login_codes.available.#{app_id}", remove_number)
    Exredis.srem("_acs.login_codes.all.#{app_id}", removed)
    remove_number
  end

  def assign_code(app_id, openid: openid) do
    case Scripts.rand_code([app_id], [openid]) do 
      "undefined" ->
        nil
      code ->
        AppLoginCode.changeset(%AppLoginCode{}, %{
          code: code,
          owner: "openid.#{openid}",
          assigned_at: DateTime.utc_now(),
          app_id: app_id
        }) |> Repo.insert!
        code
    end
  end

  def assign_admin_codes(admin_user_id, app_id, number) do 
    owner = "admin.#{admin_user_id}"
    
    query = from c in AppLoginCode,
      select: count(1),
      where: c.app_id == ^app_id and c.owner == ^owner
    
    assigned = Repo.one(query)

    if number + assigned > 500 do 
      {:error, :assigned_limit} 
    else 
      now = DateTime.utc_now

      available_number = Exredis.scard("_acs.login_codes.available.#{app_id}")
      number = min(number, available_number)
      codes = Exredis.spop("_acs.login_codes.available.#{app_id}", number)
      Exredis.sadd("_acs.login_codes.assigned.#{app_id}", codes)

      Repo.transaction(fn -> 
        codes |> Enum.each(fn(code) -> 
          AppLoginCode.changeset(%AppLoginCode{}, %{
            code: code,
            owner: owner,
            assigned_at: now,
            app_id: app_id
          }) |> Repo.insert!
        end)
      end)

      query = from c in AppLoginCode,
        select: c,
        where: c.app_id == ^app_id and c.owner == ^owner

      codes = Repo.all(query)

      Exredis.set("_acs.admin_login_codes.#{app_id}.#{admin_user_id}", codes |> :erlang.term_to_binary() |> Base.encode64())
      Excache.del("_acs.admin_login_codes.#{app_id}.#{admin_user_id}")

      {:ok, codes}
    end
  end

  def list_admin_codes(app_id, admin_user_id) do 
    Excache.get!("_acs.admin_login_codes.#{app_id}.#{admin_user_id}", fallback: fn(redis_key) -> 
      case Exredis.get(redis_key) do 
        nil -> 
          query = 
            from c in AppLoginCode,
              select: c,
              where: c.app_id == ^app_id and c.owner == ^"admin.#{admin_user_id}" 

          codes = Repo.all(query)
          Exredis.set(redis_key, codes |> :erlang.term_to_binary() |> Base.encode64())
          {:commit, codes}
    
        raw -> 
          {:commit, raw |> Base.decode64! |> :erlang.binary_to_term}
      end
    end)    
  end

  def stats_info(app_id) do 
    Excache.get!(stats_key(app_id), fallback: fn(redis_key) -> 
      case Exredis.get(redis_key) do 
        nil -> 
          {:commit, refresh_stats_info(app_id)}
        raw -> 
          {:commit, raw |> Base.decode64! |> :erlang.binary_to_term}
      end
    end)
  end

  def clear_stats_cache(app_id) do 
    key = "_acs.login_code.stats_info.#{app_id}"
    Exredis.del(key)
    Excache.del(key)
  end

  def refresh_stats_info(app_id) do 
    Excache.del(stats_key(app_id))

    total = Exredis.scard("_acs.login_codes.all.#{app_id}")
    available = Exredis.scard("_acs.login_codes.available.#{app_id}")
    assigned = Exredis.scard("_acs.login_codes.assigned.#{app_id}")

    query = from c in AppLoginCode,
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

    Exredis.set(stats_key(app_id), info |> :erlang.term_to_binary() |> Base.encode64())

    info
  end

  def daily_chart_data(app_id, ndays) do 
    Excache.get!(daily_chart_key(app_id, ndays), fallback: fn(redis_key) -> 
      case Exredis.get(redis_key) do 
        nil ->
          now = Timex.local
          chart = refresh_daily_chart_data(app_id, ndays)
          Exredis.set(redis_key, Poison.encode!(chart))
          Exredis.expireat(redis_key, Timex.end_of_day(now) |> Timex.to_unix) 
          {:commit, chart}
        
        raw ->
          {:commit, Poison.decode!(raw, keys: :atoms)}
      end
    end)
  end

  def refresh_daily_chart_data(app_id, ndays) do 
    key = daily_chart_key(app_id, ndays)
    Exredis.del(key)
    Excache.del(key)
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
    query = from c in AppLoginCode, 
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
    query = from c in AppLoginCode, 
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
