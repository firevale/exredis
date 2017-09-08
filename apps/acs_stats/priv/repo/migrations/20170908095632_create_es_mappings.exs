defmodule Acs.Repo.Migrations.CreateEsMappings do
  use Ecto.Migration

  require Elasticsearch

  def up do
    unless Elasticsearch.is_type?("acs", "app_users") do
      mapping =  %{
        _parent: %{type: "user" },
        properties: %{
          app_id: %{type: :keyword},
          zone_id: %{type: :keyword},
          game_user_id: %{type: :keyword},
          game_user_name: %{type: :text, analyzer: :ik_smart},
          game_user_level: %{type: :integer},
          pay_amount:  %{type: :integer}
        }
      }

      Elasticsearch.put_mapping(%{index: "acs", type: "app_users", mapping: mapping, params: nil})
     end
  end
end
