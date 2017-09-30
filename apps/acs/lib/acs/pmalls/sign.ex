defmodule Acs.PMallSign do
  require Timex
  import Ecto.Query, warn: false
  alias Acs.Repo
  alias Acs.Wcs
  alias Acs.PMallTransaction
  alias Acs.Cache.CachedAdminSetting
  use Utils.LogAlias

  @key_base  "acs.pmall"

  # 签到
  def local_date() , do: Timex.to_date(Timex.local())
  def local_yesterday(), do: Timex.to_date(Timex.shift(Timex.local(),days: -1))
  def _sign_cache_key(app_id, wcs_user_id), do: "#{@key_base}:sign:#{app_id}:#{local_date()}:#{wcs_user_id}"
  def _sign_cache_key_before(app_id, wcs_user_id), do: "#{@key_base}:sign:#{app_id}:#{local_yesterday()}:#{wcs_user_id}"
  def _sign_cache_key_times(app_id, wcs_user_id), do: "#{@key_base}:signtimes:#{app_id}:#{wcs_user_id}"
  def _sign_cache_key_users(app_id), do: "#{@key_base}:sign_users:#{app_id}:#{local_date()}"
  def _sign_cache_key_calendar(app_id, group_name), do: "#{@key_base}:sign_calendar:#{app_id}:#{group_name}:#{local_date()}"
  def _sign_cache_key_awards(app_id, wcs_user_id), do: "#{@key_base}:sign_awards:#{app_id}:#{wcs_user_id}"
  def sign(app_id, wcs_user_id) do
    sign_key = _sign_cache_key(app_id, wcs_user_id)
    sign_count = Exredis.incr(sign_key)
    case sign_count do
      1 ->
         _sign(app_id, wcs_user_id)
      _ ->
        {:error, %{i18n_message: "pmall.sign.signed"}}
    end
  end
  defp _sign(app_id, wcs_user_id) do
    sign_key = _sign_cache_key(app_id, wcs_user_id)
    sign_key_before = _sign_cache_key_before(app_id, wcs_user_id)
    sign_key_times = _sign_cache_key_times(app_id, wcs_user_id)
    sign_key_users = _sign_cache_key_users(app_id)
    ## 连续签到次数
    times  =
      case Exredis.exists(sign_key_before) do
        1 ->
          Exredis.incr(sign_key_times)
        _ ->
          Exredis.set(sign_key_times, 1)
          1
      end
    ## 签到用户
    score = DateTime.utc_now() |> DateTime.to_unix
    Exredis.zadd(sign_key_users, score, wcs_user_id)

    ## 过期设置
    Exredis.expire(sign_key, 172800)
    Exredis.expire(sign_key_times, 172800)
    Exredis.expire(sign_key_users, 172800)

    ## 添加积分
   {:ok, add_point, total_point} = PMallTransaction.add_user_point("point_day_sign", app_id, wcs_user_id)
   {:ok, %{sign_times: times, add_point: add_point, total_point: total_point}}

  end

  def get_sign_users(app_id, start, count \\ 5) do
    sign_key_users = _sign_cache_key_users(app_id)
    total = Exredis.zcard(sign_key_users)
    open_ids = Exredis.zrange(sign_key_users, start, start + count)
    wcp_users =
      Enum.map(open_ids, fn wcs_user_id ->
        wcs_user = Wcs.get_wcs_user(wcs_user_id)
        Map.take(wcs_user, [:id, :nickname, :avatar_url])
      end)
    {total, wcp_users}
  end

  def get_sign_info(app_id, wcs_user_id) do
    sign_key = _sign_cache_key(app_id, wcs_user_id)

    signed = if Exredis.exists(sign_key) == 1, do: true, else: false
    sign_times = _get_sign_times(app_id, wcs_user_id)

    pic = _get_sign_calendar(app_id, "signPic")
    terms =  _get_sign_calendar(app_id, "signLunar")
    awards = _get_sign_awards(app_id, wcs_user_id)
    
    {:ok, signed, sign_times, pic, terms, awards}
  end

  defp _get_sign_times(app_id, wcs_user_id) do
    sign_key_times = _sign_cache_key_times(app_id, wcs_user_id)
    case  Exredis.get(sign_key_times) do
      nil -> 0
      times -> String.to_integer(times)
    end
  end

  defp _get_sign_calendar(app_id, groun_name) do
    cache_key = _sign_cache_key_calendar(app_id, groun_name)
    record =
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
     Poison.decode!(record[:value])
  end
  
  defp _get_sign_awards(app_id, wcs_user_id) do
    cache_key = _sign_cache_key_awards(app_id, wcs_user_id)
    my_awards = Exredis.hgetall(cache_key)
    awards_raw = CachedAdminSetting.list_group(app_id, "signAward")
    Enum.map(awards_raw, fn raw -> 
      award = Poison.decode!(raw)
      got = Map.has_key?(my_awards, award["days"])
      Map.put(award, "got", got)
    end)
  end

  def take_sign_award(app_id, wcs_user_id, days) do
    sign_times = _get_sign_times(app_id, wcs_user_id)
    my_awards = _get_sign_awards(app_id, wcs_user_id)

    with true <- sign_times >= String.to_integer(days),
        %{"got" => got, "point" => point} = Enum.find(my_awards, nil, fn award -> award["days"] == days end),
        false <- got
    do
      cache_key = _sign_cache_key_awards(app_id, wcs_user_id)
      Exredis.hset(cache_key, days, 1)
      PMallTransaction.add_user_point("point_day_sign", app_id, wcs_user_id, point, "连续签到#{days}天奖励")
    else
      false ->
        {:error, "pmall.award.unreached"}
      nil ->
        {:error, "pmall.award.illegal"}
      true ->
        {:error, "pmall.award.got"}
    end
  end
end