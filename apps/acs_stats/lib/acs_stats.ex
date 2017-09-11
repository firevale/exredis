defmodule AcsStats do
  @moduledoc """
  Acs keeps the contexts that define your domain
  and business logic.

  Contexts are also responsible for managing your data, regardless
  if it comes from the database, an external API or others.
  """
  import AcsStats.Onlines
  import AcsStats.Users
  import AcsStats.Devices
  import AcsStats.Search

  import AcsStats.RealtimeMetrics, only: [
    get_app_user_number: 1,
    get_app_dlu: 2,
    get_app_dlu: 3,
    get_app_dlnu: 2,
    get_app_dlnu: 3,
    get_app_dau: 2,
    get_app_dau: 3,
    get_app_danu: 2,
    get_app_danu: 3,
    get_app_yesterday_danu: 2,
    get_app_yesterday_danu: 3,
    get_app_dru: 2,
    get_app_dru: 3,

    get_app_dad: 3,
    get_app_dand: 3,
    get_app_yesterday_dand: 3,
    get_app_drd: 3,

    clear_realtime_metrics: 1,
   ]

end
