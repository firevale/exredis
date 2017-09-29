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
  alias Acs.PMalls.UserPoints

  alias Acs.Search.ESPMallPointLog

  alias Acs.Cache.CachedAdminSetting
  alias Acs.Cache.CachedPMallUserPoints

  def add_user_point(log_type, app_id, wcs_user_id) do
    %Acs.Admin.Setting{} = setting  = CachedAdminSetting.get_fat(app_id, log_type)
    add_user_point(log_type, app_id, wcs_user_id, setting.value, setting.memo)
  end
  def add_user_point(log_type, app_id, wcs_user_id, points, memo) when is_bitstring(points) do
    add_user_point(log_type, app_id, wcs_user_id, String.to_integer(points), memo)
  end
  def add_user_point(log_type, app_id, wcs_user_id, points, memo) when is_integer(points) do
    ESPMallPointLog.index(%{
      app_id: app_id,
      wcs_user_id: wcs_user_id,
      log_type: log_type,
      point: points,
      memo: memo,
      inserted_at: DateTime.utc_now(),
    })

    user_points = CachedPMallUserPoints.get(app_id, wcs_user_id) 
    new_user_points = UserPoints.changeset(user_points, %{
      point: max(user_points.point + points, 0)
    }) |> Repo.update!

    CachedPMallUserPoints.refresh(new_user_points) 

    {:ok, points, new_user_points.point}
  end

  def exchange_goods_point(app_id, wcs_user_id, goods) do
    memo = 
      if goods.is_virtual do
        code = PMalls.get_cdkey(app_id, goods.virtual_param, wcs_user_id)
        "#{goods.name}:#{code}"
      else
        goods.name
      end

    add_user_point("point_exchange_goods", app_id, wcs_user_id, -goods.price, memo) 
  end


end
