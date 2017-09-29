defmodule Acs.PMallTransaction do
  @moduledoc """
  The PMalls context.
  """

  import Ecto.Query, warn: false
  use Utils.LogAlias

  alias Acs.Repo
  alias Acs.Search

  alias Acs.PMalls
  alias Acs.PMalls.PMallGoods
  alias Acs.PMalls.PointLog

  alias Acs.Cache.CachedAdminSetting

  def add_point(log_type, app_id, wcs_user_id) do
    %Acs.Admin.Setting{} = setting  = CachedAdminSetting.get_fat(app_id, log_type)
    add_point(log_type, app_id, wcs_user_id, setting.value, setting.memo)
  end
  def add_point(log_type, app_id, wcs_user_id, points, memo) when is_bitstring(points) do
    add_point(log_type, app_id, wcs_user_id, String.to_integer(points), memo)
  end
  def add_point(log_type, app_id, wcs_user_id, points, memo) when is_integer(points) do
    log = %{
      app_id: app_id,
      wcs_user_id: wcs_user_id,
      log_type: log_type,
      point: points,
      memo: memo
    }

    PMalls.log_user_points(log)
    total_point = PMalls.get_user_point(app_id, wcs_user_id)

    {:ok, points, total_point}
  end

  def exchange_goods_point(app_id, wcs_user_id, goods) do
    memo = 
      if goods.is_virtual do
        code = PMalls.get_cdkey(app_id, goods.virtual_param, wcs_user_id)
        "#{goods.name}:#{code}"
      else
        goods.name
      end

    log = %{
        app_id: app_id,
        wcs_user_id: wcs_user_id,
        log_type: "point_exchange_goods",
        point: -goods.price,
        memo: memo
    }

    PMalls.log_user_points(log)
    total_point = PMalls.get_user_point(app_id, wcs_user_id)

    {:ok, -goods.price, total_point}
  end


end
