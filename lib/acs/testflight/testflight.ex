defmodule Acs.TestFlight do 
  use LogAlias

  alias Acs.RedisItcApp
  alias Acs.TestFlight.Worker
  

  def is_tester?(app_id, email) do 
    itc_app_id = RedisItcApp.active_itc_app_id_of(app_id)
    Worker.is_tester?(itc_app_id, email)
  end

  def invite(app_id, email, nickname) do 
    itc_app_id = RedisItcApp.active_itc_app_id_of(app_id)
    Worker.add_tester!(itc_app_id, email, nickname)
  end

  def remove(app_id, email) do 
    itc_app_id = RedisItcApp.active_itc_app_id_of(app_id)
    Worker.del_tester!(itc_app_id, email)
  end

end