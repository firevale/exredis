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

  end

end
