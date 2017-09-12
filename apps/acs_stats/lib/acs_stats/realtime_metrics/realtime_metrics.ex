defmodule AcsStats.RealtimeMetrics do
  require Exredis

  def get_app_user_number(app_id) do 
    Exredis.bitcount("acs.rtm.app_users.#{app_id}")
  end

  def get_app_paid_user_number(app_id) do 
    Exredis.bitcount("acs.rtm.app_paid_users.#{app_id}")
  end

  def get_app_dlu(date, app_id) do 
    Exredis.bitcount(dlu_key(date, app_id))  
  end
  def get_app_dlu(date, app_id, platform) do 
    Exredis.bitcount(dlu_key(date, app_id, platform))
  end

  def get_app_dlnu(date, app_id) do 
    Exredis.bitcount(dlnu_key(date, app_id))  
  end
  def get_app_dlnu(date, app_id, platform) do 
    Exredis.bitcount(dlnu_key(date, app_id, platform))
  end

  def get_app_dau(date, app_id) do 
    Exredis.bitcount(dau_key(date, app_id))  
  end
  def get_app_dau(date, app_id, platform) do 
    Exredis.bitcount(dau_key(date, app_id, platform))
  end

  def get_app_danu(date, app_id) do 
    Exredis.bitcount(danu_key(date, app_id))  
  end
  def get_app_danu(date, app_id, platform) do 
    Exredis.bitcount(danu_key(date, app_id, platform))
  end

  def get_app_yesterday_danu(date, app_id) do 
    yesterday = date |> Timex.shift(days: -1) 
    Exredis.bitcount(danu_key(yesterday, app_id))  
  end
  def get_app_yesterday_danu(date, app_id, platform) do 
    yesterday = date |> Timex.shift(days: -1) 
    Exredis.bitcount(danu_key(yesterday, app_id, platform))
  end

  def get_app_dru(date, app_id) do 
    Exredis.bitcount(dru_key(date, app_id))  
  end
  def get_app_dru(date, app_id, platform) do 
    Exredis.bitcount(dru_key(date, app_id, platform))
  end

  def get_app_dad(date, app_id, platform) do 
    Exredis.bitcount(dad_key(date, app_id, platform))
  end

  def get_app_dand(date, app_id, platform) do 
    Exredis.bitcount(dand_key(date, app_id, platform))
  end

  def get_app_yesterday_dand(date, app_id, platform) do 
    yesterday = date |> Timex.shift(days: -1) 
    Exredis.bitcount(dand_key(yesterday, app_id, platform))
  end

  def get_app_drd(date, app_id, platform) do 
    Exredis.bitcount(drd_key(date, app_id, platform))
  end

  def add_app_user(app_id, user_id) do 
    Exredis.setbit("acs.rtm.app_users.#{app_id}", user_id, 1)
  end

  def is_new_app_user?(app_id, user_id) do 
    Exredis.getbit("acs.rtm.app_users.#{app_id}", user_id) == 0
  end

  def add_app_paid_user(app_id, user_id) do 
    Exredis.setbit("acs.rtm.app_paid_users.#{app_id}", user_id, 1)
  end

  def is_new_app_paid_user?(app_id, user_id) do 
    Exredis.getbit("acs.rtm.app_paid_users.#{app_id}", user_id) == 0
  end

  def add_login_user(date, app_id, platform, user_id) do 
    Exredis.setbit(dlu_key(date, app_id), user_id, 1)      
    Exredis.setbit(dlu_key(date, app_id, platform), user_id, 1)      
  end

  def add_new_login_user(date, app_id, platform, user_id) do 
    Exredis.setbit(dlnu_key(date, app_id), user_id, 1)      
    Exredis.setbit(dlnu_key(date, app_id, platform), user_id, 1)      
  end

  def add_active_user(date, app_id, platform, user_id) do 
    Exredis.setbit(dau_key(date, app_id), user_id, 1)      
    Exredis.setbit(dau_key(date, app_id, platform), user_id, 1)      
  end  

  def add_new_active_user(date, app_id, platform, user_id) do 
    Exredis.setbit(danu_key(date, app_id), user_id, 1)      
    Exredis.setbit(danu_key(date, app_id, platform), user_id, 1)      
  end  

  def is_yesterday_new_app_user?(date, app_id, user_id) do 
    yesterday = date |> Timex.shift(days: -1) 
    Exredis.getbit(danu_key(yesterday, app_id), user_id) == 1
  end
  def is_yesterday_new_app_user?(date, app_id, platform, user_id) do 
    yesterday = date |> Timex.shift(days: -1) 
    Exredis.getbit(danu_key(yesterday, app_id, platform), user_id) == 1
  end

  def add_retention_user(date, app_id, user_id) do 
    Exredis.setbit(dru_key(date, app_id), user_id, 1)      
  end
  def add_retention_user(date, app_id, platform, user_id) do 
    Exredis.setbit(dru_key(date, app_id, platform), user_id, 1)      
  end

  def add_active_device(date, app_id, platform, app_device_id) do 
    Exredis.setbit(dad_key(date, app_id, platform), app_device_id, 1)      
  end

  def add_new_active_device(date, app_id, platform, app_device_id) do 
    Exredis.setbit(dand_key(date, app_id, platform), app_device_id, 1)      
  end

  def is_yesterday_new_app_device?(date, app_id, platform, app_device_id) do 
    yesterday = date |> Timex.shift(days: -1) 
    Exredis.getbit(dand_key(yesterday, app_id, platform), app_device_id) == 1
  end

  def add_retention_device(date, app_id, platform, app_device_id) do 
    Exredis.setbit(drd_key(date, app_id, platform), app_device_id, 1)      
  end

  def add_paid_user(date, app_id, platform, user_id) do 
    Exredis.setbit(dapu_key(date, app_id), user_id, 1)      
    Exredis.setbit(dapu_key(date, app_id, platform), user_id, 1)      
  end  

  def add_new_paid_user(date, app_id, platform, user_id) do 
    Exredis.setbit(danpu_key(date, app_id), user_id, 1)      
    Exredis.setbit(danpu_key(date, app_id, platform), user_id, 1)      
  end  

  def add_paid_fee(date, app_id, platform, fee) do 
    Exredis.incrby(dpf_key(date, app_id, platform), fee)      
  end  

  def clear_realtime_metrics(date) do 
    for key <- Exredis.keys("acs.rtm.*.#{date}.*") do 
      Exredis.del(key)  
    end
  end

  defp dlu_key(date, app_id) do 
    "acs.rtm.dlu.#{date}.#{app_id}"
  end
  defp dlu_key(date, app_id, platform) do 
    "acs.rtm.dlu.#{date}.#{app_id}.#{platform}"
  end

  defp dlnu_key(date, app_id) do 
    "acs.rtm.dlnu.#{date}.#{app_id}"
  end
  defp dlnu_key(date, app_id, platform) do 
    "acs.rtm.dlnu.#{date}.#{app_id}.#{platform}"
  end

  defp dau_key(date, app_id) do 
    "acs.rtm.dau.#{date}.#{app_id}"
  end
  defp dau_key(date, app_id, platform) do 
    "acs.rtm.dau.#{date}.#{app_id}.#{platform}"
  end

  defp danu_key(date, app_id) do 
    "acs.rtm.danu.#{date}.#{app_id}"
  end
  defp danu_key(date, app_id, platform) do 
    "acs.rtm.danu.#{date}.#{app_id}.#{platform}"
  end

  defp dru_key(date, app_id) do 
    "acs.rtm.dru.#{date}.#{app_id}"
  end
  defp dru_key(date, app_id, platform) do 
    "acs.rtm.dru.#{date}.#{app_id}.#{platform}"
  end

  defp dld_key(date, app_id, platform) do 
    "acs.rtm.dld.#{date}.#{app_id}.#{platform}"
  end

  defp dad_key(date, app_id, platform) do 
    "acs.rtm.dad.#{date}.#{app_id}.#{platform}"
  end

  defp dand_key(date, app_id, platform) do 
    "acs.rtm.dand.#{date}.#{app_id}.#{platform}"
  end

  defp drd_key(date, app_id, platform) do 
    "acs.rtm.drd.#{date}.#{app_id}.#{platform}"
  end

  defp dapu_key(date, app_id) do 
    "acs.rtm.dapu.#{date}.#{app_id}"
  end
  defp dapu_key(date, app_id, platform) do 
    "acs.rtm.dapu.#{date}.#{app_id}.#{platform}"
  end

  defp danpu_key(date, app_id) do 
    "acs.rtm.danpu.#{date}.#{app_id}"
  end
  defp danpu_key(date, app_id, platform) do 
    "acs.rtm.danpu.#{date}.#{app_id}.#{platform}"
  end

  defp dpf_key(date, app_id, platform) do 
    "acs.rtm.dpf.#{date}.#{app_id}.#{platform}"
  end

end
