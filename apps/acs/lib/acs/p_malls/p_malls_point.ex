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
    point = 5
    memo = "积分测试"
    
    log = %{
      app_id: app_id,
      wcp_user_id: wcp_user_id,
      log_type: log_type,
      point: point,
      memo: memo
    }
   
    PMalls.add_point(log)
  end

end
