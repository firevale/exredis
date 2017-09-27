defmodule Acs.Repo.Migrations.CreateEsMappings do
  use Ecto.Migration

  require Elasticsearch

  def up do
    {:ok, _} = Application.ensure_all_started(:exes)

    Elasticsearch.delete_index("acs")

    mappings = %{
      users: %{
        properties: %{
          id: %{type: :keyword},
          email: %{type: :keyword},
          mobile: %{type: :keyword},
          resident_id: %{type: :keyword},
          resident_name: %{type: :keyword},
          gender: %{type: :keyword},
          age: %{type: :integer},
          nickname: %{type: :text, analyzer: :ik_smart},
          device_id: %{type: :keyword},
          avatar_url: %{type: :keyword},
          inserted_at: %{type: :date},
          updated_at: %{type: :date},
        }
      },
      sdk_users: %{
        _parent: %{type: :users},
        properties: %{
          id: %{type: :keyword},
          sdk: %{type: :keyword},
          user_id: %{type: :keyword},
          nickname: %{type: :text, analyzer: :ik_smart},
        }        
      },
      app_orders: %{
        _parent: %{type: :users},
        properties: %{
          id: %{type: :keyword},
          app_id: %{type: :keyword},
          user_id: %{type: :keyword},
          status: %{type: :keyword},
          goods_id: %{type: :keyword},
          goods_name: %{type: :text, analyzer: :ik_smart},
          goods_price: %{type: :integer},
          goods_icon: %{type: :keyword},
          currency: %{type: :keyword},
          fee: %{type: :integer},
          transaction_currency: %{type: :keyword},
          device_id: %{type: :keyword},
          cp_order_id: %{type: :text},
          transaction_id: %{type: :text},
          app_user_id: %{type: :keyword},
          zone_id: %{type: :keyword},
          platform: %{type: :keyword},
          sdk: %{type: :keyword},
          sdk_user_id: %{type: :keyword},
          inserted_at: %{type: :date},
          paid_at: %{type: :date},
          delivered_at: %{type: :date},
          cp_result: %{type: :text}
        }
      },
      app_users: %{
        _parent: %{type: :users},
        properties: %{
          id: %{type: :keyword},
          app_id: %{type: :keyword},
          zone_id: %{type: :keyword},
          game_user_id: %{type: :keyword},
          game_user_name: %{type: :text, analyzer: :ik_smart},
          game_user_level: %{type: :integer},
          pay_amount:  %{type: :integer},
          platform: %{type: :keyword},
          reg_date: %{type: :date},
          inserted_at: %{type: :date},
          last_active_at:  %{type: :date},
          last_paid_at:  %{type: :date},
          first_paid_at:  %{type: :date},
          updated_at:  %{type: :date},
        }
      },
    }

    Elasticsearch.create_index("acs", %{}, mappings)

    Elasticsearch.delete_index("wcp")

    mappings = %{
      messages: %{
        properties: %{
          app_id: %{type: :keyword},
          msg_type: %{type: :keyword},
          from: %{ properties: %{
            openid: %{type: :keyword},
            nickname:  %{type: :text, analyzer: :ik_smart},
          }},
          to: %{ properties: %{
            openid: %{type: :keyword},
            nickname:  %{type: :text, analyzer: :ik_smart},
          }},
          admin_user: %{ properties: %{
            email: %{type: :keyword},
            nickname:  %{type: :text, analyzer: :ik_smart},
          }},
          content: %{type: :text, analyzer: :ik_smart},
          inserted_at: %{type: :date},
        }
      }
    }

    Elasticsearch.create_index("wcp", %{}, mappings)

    Elasticsearch.delete_index("forum")

    settings = %{
      index: %{
        analysis: %{
          analyzer: %{
            trigram: %{
              type: :custom,
              tokenizer: :ik_smart,
              filter: [:standard, :shingle]
            }
          }
        }
      }
    }

    mappings = %{
      posts: %{
        properties: %{
          id: %{type: :integer},
          forum_id: %{type: :integer},
          user_id: %{type: :integer},
          section_id: %{type: :integer},
          title: %{type: :text, analyzer: :ik_smart,
            fields: %{ 
              suggest: %{type: :text, analyzer: :trigram}
            }
          },
          content: %{type: :text, analyzer: :ik_smart},
          is_top: %{type: :boolean},
          is_hot: %{type: :boolean},
          is_vote: %{type: :boolean},
          reads: %{type: :integer},
          comms: %{type: :integer},
          inserted_at: %{type: :date},
          last_reply_at: %{type: :date},
          active: %{type: :boolean},
          has_pic: %{type: :boolean}
        }
      }
    }
    Elasticsearch.create_index("forum", settings, mappings)

    Elasticsearch.delete_index("mall")

    mappings = %{
      goods: %{
        properties: %{
          id: %{type: :keyword},
          app_id: %{type: :keyword},
          name: %{type: :text, analyzer: :ik_smart},
          description:  %{type: :text, analyzer: :ik_smart},
          user_id: %{type: :integer},
          active: %{type: :boolean},
          inserted_at: %{type: :date}
        }
      },
      orders: %{
        properties: %{
          id: %{type: :keyword},
          goods_name: %{type: :text, analyzer: :ik_smart},
          app_id: %{type: :keyword},
          platform: %{type: :keyword},
          device_id: %{type: :keyword},
          user_ip: %{type: :keyword},
          user_id: %{type: :integer},
          currency: %{type: :keyword},
          paid_type: %{type: :keyword},
          memo: %{type: :text, analyzer: :ik_smart},
          address: %{
            properties: %{
              name: %{type: :keyword},
              mobile: %{type: :keyword},
              address: %{type: :text, analyzer: :ik_smart},
              area: %{type: :text, analyzer: :ik_smart},                 
              area_code: %{type: :keyword}
            }
          },
          transaction_id: %{type: :keyword},
          status: %{type: :integer},
          inserted_at: %{type: :date}
        }
      }
    }

    Elasticsearch.create_index("mall", %{}, mappings)

    Elasticsearch.delete_index("pmall")

    mappings = %{
      orders: %{
        properties: %{
          id: %{type: :keyword},
          goods_name: %{type: :text, analyzer: :ik_smart},
          app_id: %{type: :keyword},
          platform: %{type: :keyword},
          device_id: %{type: :keyword},
          user_ip: %{type: :keyword},
          user_id: %{type: :integer},
          currency: %{type: :keyword},
          paid_type: %{type: :keyword},
          memo: %{type: :text, analyzer: :ik_smart},
          address: %{
            properties: %{
              name: %{type: :keyword},
              mobile: %{type: :keyword},
              address: %{type: :text, analyzer: :ik_smart},
              area: %{type: :text, analyzer: :ik_smart},                 
              area_code: %{type: :keyword}
            }
          },
          transaction_id: %{type: :keyword},
          status: %{type: :integer},
          inserted_at: %{type: :date}
        }
      },
      goods: %{
        properties: %{
          id: %{type: :keyword},
          app_id: %{type: :keyword},
          name: %{type: :text, analyzer: :ik_smart},
          description:  %{type: :text, analyzer: :ik_smart},
          user_id: %{type: :integer},
          active: %{type: :boolean},
          inserted_at: %{type: :date}
        }
      }
    }

    Elasticsearch.create_index("pmall", %{}, mappings)

    Elasticsearch.delete_index("customer_service")

    mappings = %{
      questions: %{
        properties: %{
          id: %{type: :integer},
          app_id: %{type: :keyword},
          platform: %{type: :integer},
          title: %{type: :text, analyzer: :ik_smart},
          answer: %{type: :text, analyzer: :ik_smart},
          active: %{type: :boolean},
          is_hot: %{type: :boolean},
          sort_index: %{type: :integer},
          user_id: %{type: :integer},
          inserted_at: %{type: :date},
          updated_at: %{type: :date},
          reply_at: %{type: :date}
        }
      }
    }
    Elasticsearch.create_index("customer_service", %{}, mappings)
  end
end
