defmodule Acs.Search.ESAppUser do 
    require Elasticsearch
    alias AcsStats.Users.AppUser

    def index(%AppUser{} = app_user, user_id) do
        Elasticsearch.index(%{index: "acs",
        type: "app_users",
        params: %{parent: user_id},
        id: app_user.id,
        doc: %{
          id: app_user.id,
          app_id: app_user.app_id,
          # app_id: "3E4125B15C4FE2AB3BA00CB1DC1A0EE5",
          zone_id: app_user.zone_id,
          game_user_id: app_user.app_user_id,
          game_user_name: app_user.app_user_name,
          game_user_level: app_user.app_user_level,
          pay_amount:  app_user.pay_amount,
          inserted_at: app_user.inserted_at,
          reg_date: app_user.reg_date,
          last_active_at: app_user.last_active_at,
          last_paid_at: app_user.last_paid_at,
          first_paid_at: app_user.first_paid_at,
          platform: app_user.platform,
          updated_at: app_user.updated_at
        }})
    end

end