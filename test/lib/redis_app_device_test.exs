defmodule Acs.RedisAppDeviceTest do
  use Acs.Web.ConnCase

  require Redis
  alias   Acs.StatsRepo
  alias   Acs.Device
  alias   Acs.AppDevice
  alias   Acs.AppDeviceDailyActivity
  alias   Acs.RedisAppDevice
  alias   Acs.RedisAppDeviceDailyActivity

  @app_id   "978A7D84040FE589ED0C76295131E43D"
  @device_id "1234567890"

  setup %{conn: conn} = tags do
    _device = Device.changeset(%Device{}, %{
          id: @device_id,
          model: "iphone6",
          platform: "ios",
          os: "ios"
        }) |> StatsRepo.insert(on_conflict: :nothing)

    {:ok, %{tags | conn: conn}}
  end

  test "find" do
    app_device = RedisAppDevice.find(@app_id, "86", @device_id)
    assert app_device != nil
  end

  test "find_daily" do
    utc_now = %DateTime{year: 2000, month: 1, day: 29, zone_abbr: "AMT",
                        hour: 23, minute: 0, second: 7, microsecond: {0, 0},
                        utc_offset: -14400, std_offset: 0, time_zone: "America/Manaus"}
    deviceDa = AppDevice.changeset(%AppDevice{}, %{
          active_seconds: 30,
          pay_amount: 99,
          app_id: @app_id,
          zone_id: "86",
          last_active_at: utc_now,
          last_paid_at: utc_now,
          device_id: @device_id,
          reg_date: utc_now
        }) |> StatsRepo.insert!(on_conflict: :replace_all)

    IO.inspect deviceDa, pretty: true

    _deviceDaA = AppDeviceDailyActivity.changeset(%AppDeviceDailyActivity{}, %{
          date: "2000-01-29",
          active_seconds: 30,
          pay_amount: 99,
          app_device_id: deviceDa.id 
        }) |> StatsRepo.insert!(on_conflict: :nothing)

    appDeviceDA = RedisAppDeviceDailyActivity.find(deviceDa.id, "2000-01-29")
    assert appDeviceDA = _deviceDaA
  end

end
