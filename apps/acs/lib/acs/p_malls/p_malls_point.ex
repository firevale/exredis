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

  def add_point(log_type, app_id, wcp_user_id, minus \\ false) do
    %Acs.Admin.Setting{} = setting  = CachedAdminSetting.get_fat(app_id, log_type)
    point = unless minus, do: setting.value, else: -setting.value
    log = %{
      app_id: app_id,
      wcp_user_id: wcp_user_id,
      log_type: log_type,
      point: point,
      memo: setting.memo
    }

    PMalls.add_point(log)

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
  end

end
