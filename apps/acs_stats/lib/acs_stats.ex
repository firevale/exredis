defmodule AcsStats do
  @moduledoc """
  Acs keeps the contexts that define your domain
  and business logic.

  Contexts are also responsible for managing your data, regardless
  if it comes from the database, an external API or others.
  """

  ### onlines
  defdelegate add_online_user(node, app_id, platform, user_id), to: AcsStats.Onlines
  defdelegate remove_online_user(node, app_id, platform, user_id), to: AcsStats.Onlines
  defdelegate remove_online_node(node), to: AcsStats.Onlines
  defdelegate get_online_user_number(app_id), to: AcsStats.Onlines
  defdelegate get_online_user_number(app_id, platform), to: AcsStats.Onlines

  ### users
  defdelegate log_app_login_user(date, app_id, user_id, platform), to: AcsStats.Users
  defdelegate log_app_user(date, app_id, zone_id, user_id, platform, sdk, game_user_id, game_user_name, game_user_level), to: AcsStats.Users
  defdelegate log_app_user_activity(date, app_id, zone_id, user_id, active_seconds), to: AcsStats.Users
  defdelegate log_app_user_payment(date, app_id, zone_id, user_id, platform, fee), to: AcsStats.Users


  ### devices
  defdelegate log_device_info(device_id, platform, device_model, os_ver, device_memory_size), to: AcsStats.Devices
  defdelegate log_app_device(date, app_id, device_id, platform, sdk), to: AcsStats.Devices
  defdelegate log_app_device_activity(date, app_id, device_id, active_seconds), to: AcsStats.Devices


  ### realtime metrics
  defdelegate get_app_user_number(app_id), to: AcsStats.RealtimeMetrics
  defdelegate clear_realtime_metrics(date), to: AcsStats.RealtimeMetrics

  def get_realtime_metrics(date, app_id) do 

  end

  # import AcsStats.RealtimeMetrics, only: [
  #   get_app_user_number: 1,
  #   get_app_dlu: 2,
  #   get_app_dlu: 3,
  #   get_app_dlnu: 2,
  #   get_app_dlnu: 3,
  #   get_app_dau: 2,
  #   get_app_dau: 3,
  #   get_app_danu: 2,
  #   get_app_danu: 3,
  #   get_app_yesterday_danu: 2,
  #   get_app_yesterday_danu: 3,
  #   get_app_dru: 2,
  #   get_app_dru: 3,

  #   get_app_dad: 3,
  #   get_app_dand: 3,
  #   get_app_yesterday_dand: 3,
  #   get_app_drd: 3,

  #   clear_realtime_metrics: 1,
  #  ]

end
