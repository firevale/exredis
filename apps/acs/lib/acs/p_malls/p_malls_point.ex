defmodule Acs.PMallsPoint do
  @moduledoc """
  The PMalls context.
  """

  import Ecto.Query, warn: false
  alias Acs.Repo
  alias Acs.Search
  use Utils.LogAlias

  alias Acs.PMalls
  alias Acs.PMalls.PMallGoods
  alias Acs.PMalls.PointLog

  alias Acs.Cache.CachedAdminSetting

  def add_point(log_type, app_id, wcp_user_id) do
    %Acs.Admin.Setting{} = setting  = CachedAdminSetting.get_fat(app_id, log_type)
    log = %{
      app_id: app_id,
      wcp_user_id: wcp_user_id,
      log_type: log_type,
      point: setting.value,
      memo: setting.memo
    }

    PMalls.add_point(log)
    total_point = PMalls.get_user_point(app_id, wcp_user_id)

    {:ok, String.to_integer(setting.value), total_point}
  end

  def exchange_goods_point(app_id, wcp_user_id, goods) do
    log = %{
      app_id: app_id,
      wcp_user_id: wcp_user_id,
      log_type: "point_exchange_goods",
      point: -goods.price,
      memo: goods.name
    }

    PMalls.add_point(log)
    total_point = PMalls.get_user_point(app_id, wcp_user_id)

    {:ok, -goods.price, total_point}
  end

  def take_award_point(app_id, wcp_user_id, days, points) do
    log = %{
      app_id: app_id,
      wcp_user_id: wcp_user_id,
      log_type: "point_sign_award",
      point: points,
      memo: "连续签到#{days}天奖励"
    }

    PMalls.add_point(log)
    total_point = PMalls.get_user_point(app_id, wcp_user_id)

    {:ok, points, total_point}
  end

end
