defmodule Acs.Search do 
  use     Utils.LogAlias
  require Elasticsearch

  alias  Acs.Repo
  import Ecto.Query, warn: false

  alias Acs.Apps.AppOrder
  alias Acs.Cache.CachedUser
  alias Acs.Cache.CachedForum
  
  def search_app_order(keyword: keyword, app_id: app_id, page: page, records_per_page: records_per_page) do 
    query = %{
      query: %{
        bool: %{
          must: [
            %{term: %{app_id: app_id}}
          ],
          should: [
            %{term: %{user_id: keyword}},
            %{term: %{goods_id: keyword}},
            %{term: %{device_id: keyword}},
            %{term: %{app_user_id: keyword}},
            %{term: %{sdk_user_id: keyword}},
            %{match: %{cp_order_id: keyword}},
            %{match: %{transaction_id: keyword}},
          ],
          minimum_should_match: 1,
          boost: 1.0,
        },
      },
      sort: %{inserted_at: %{order: :desc}},
      from: (page - 1) * records_per_page,
      size: records_per_page,
    }

    case Elasticsearch.search(%{index: "acs", type: "orders", query: query, params: %{timeout: "1m"}}) do
      {:ok, %{hits: %{hits: hits, total: total}}} ->
        ids = Enum.map(hits, &(&1._id))

        query = from order in AppOrder,
                  select: order,
                  where: order.id in ^ids,
                  order_by: [desc: order.inserted_at]

        {:ok, total, Repo.all(query)}

      e ->
        error "search orders failed: #{inspect e, pretty: true}"
        e
    end    
  end

  def search_user(keyword: "", app_id: app_id, page: page, records_per_page: records_per_page) do 
    query = %{
      query: %{
        has_child: %{
          child_type: "app_users",
          query:  %{term: %{app_id: app_id}}
        }
      },
      from: (page - 1) * records_per_page,
      size: records_per_page,
      sort: %{ inserted_at: %{ order: :desc} }
    }
    _search_user(query)
  end

  def search_user(keyword: keyword, app_id: app_id, page: page, records_per_page: records_per_page) do 
    query = %{
      query: %{
        bool: %{
          must: %{
            has_child: %{
              child_type: "app_users",
              query: %{
                bool: %{
                  must: %{term: %{app_id: app_id}}
                }
              },
          }},
          should: [
            %{term: %{id: keyword}},
            %{term: %{email: keyword}},
            %{term: %{mobile: keyword}},
            %{match: %{nickname: keyword}},
            %{has_child: %{
              child_type: "app_users",
              query: %{
                bool: %{
                  should: [
                    %{match: %{game_user_name: keyword}},
                    %{term: %{game_user_id: keyword}}
                  ],
                  minimum_should_match: 1
              }}
            }}
          ],
          minimum_should_match: 1,
          boost: 1.0,
        },
      },
      from: (page - 1) * records_per_page,
      size: records_per_page,
    }

    _search_user(query)
  end

  defp _search_user(query) do
    case Elasticsearch.search(%{index: "acs", type: "user", query: query, params: %{timeout: "1m"}}) do
      {:ok, %{hits: %{hits: hits, total: total}}} ->
        ids = Enum.map(hits, &(&1._id))
        # TODO: return user info directly from elasticsearch
        #       don't call get_users_by_ids anymore
        {:ok, total, ids }

      error ->
        raise "search failed: #{inspect error}"
    end
  end

  def search_wcp_message(keyword: keyword, app_id: app_id, sorts: sorts, page: page, records_per_page: records_per_page) do
    build_sort =
      fn (key, exp) ->
        order_by = Map.get(sorts, key)
        Map.put_new(exp, key, %{order: order_by})
      end

    sort = Enum.reduce(Map.keys(sorts), %{}, build_sort)

    query = %{
      query: %{
        bool: %{
          must: [ %{term: %{app_id: app_id}}, %{exists: %{field: "from.openid"}}],
          should: [],
          minimum_should_match: 0,
          boost: 1.0,
        },
      },
      sort: sort,
      from: (page - 1) * records_per_page,
      size: records_per_page,
    }

    query =
      if String.length(keyword) > 0 do
        query1 = update_in(query.query.bool.minimum_should_match, fn _v -> 1 end)
        update_in(query1.query.bool.should, fn should ->
          condition =
            [
              %{match: %{content: keyword}},
              %{term: %{"from.openid": keyword}},
              %{match: %{"from.nickname": keyword}},
              %{match: %{"to.nickname": keyword}},
              %{term: %{"to.openid": keyword}}
            ]
          should ++ condition
        end)
      else
        query
      end

    case Elasticsearch.search(%{index: "wcp", type: "messages", query: query, params: %{timeout: "1m"}}) do
      {:ok, %{hits: %{hits: hits, total: total}}} ->
        messages = Enum.map(hits, fn(%{_id: id, _source: %{} = message}) -> Map.put(message, :id, id) end)
        {:ok, total, messages}
      e ->
         error("search failed: #{inspect e, pretty: true}")
         e
    end
  end

  def search_user_wcp_message(app_id: app_id, openid: openid) do 
    query = %{
      query: %{
        bool: %{
          must: %{term: %{app_id: app_id}},
          should: [
            %{term: %{"from.openid": openid}},
            %{term: %{"to.openid": openid}}
          ],
          minimum_should_match: 1,
          boost: 1.0,
        },
      },
      sort: %{inserted_at: %{order: :asc}},
      size: 100,
    }
    case Elasticsearch.search(%{index: "wcp", type: "messages", query: query, params: %{timeout: "1m"}}) do
      {:ok, %{hits: %{hits: hits, total: total}}} ->
        messages = Enum.map(hits, fn(%{_id: _id, _source: %{} = message}) -> message end)
        {:ok, total, messages}

      e ->
         error("search failed: #{inspect e, pretty: true}")
         e
    end
  end

  def search_forum(keyword, page, records_per_page) do
    query = %{
      query: %{
        bool: %{
          must: %{multi_match: %{
          query: keyword,
          fields: [:title, :content],
        }},
          filter: %{ term: %{active: true} }
        }
      },
      from: ((page - 1) * records_per_page),
      size: min(30, records_per_page)
    }

    case Elasticsearch.search(%{index: "forum", type: "posts", query: query, params: %{timeout: "1m"}}) do
      {:ok, %{hits: %{hits: hits, total: total}}} ->
        postList = Enum.map(hits, fn(%{
          _id: _id,
          _source: %{
            user_id: user_id,
            forum_id: forum_id,
             section_id: section_id}
            } = hit) ->

          user = case Process.get("user_#{user_id}") do 
                  nil -> 
                    user_db = CachedUser.get(user_id) |> Map.take([:id, :nickname, :avatar_url, :inserted_at])
                    Process.put("user_#{user_id}", user_db)
                    user_db
                  user_cache ->
                    user_cache
                end
                  
          forum = case Process.get("forum_#{forum_id}") do
                    nil ->
                      forum_new = CachedForum.get(forum_id)
                      Process.put("forum_#{forum_id}", forum_new)
                      forum_new 
                    forum_cache ->
                      forum_cache
                  end

          section = if forum && forum.sections && section_id  do
                      forum.sections[section_id |> to_string |> String.to_atom]
                    end
          %{
            id: hit._id,
            forum_id: forum_id,
            forum: forum,
            user_id: user_id,
            user: user,
            section_id: section_id,
            section: section,
            title: hit._source.title,
            content: hit._source.content,
            is_top: hit._source.is_top,
            is_hot: hit._source.is_hot,
            is_vote: hit._source.is_vote,
            reads: hit._source.reads,
            comms: hit._source.comms,
            inserted_at: hit._source.inserted_at,
            active: hit._source.active,
            has_pic: hit._source.has_pic
          }

        end)
        total_page = round(Float.ceil(total/records_per_page))
        {:ok, postList, total_page}
      error ->
        error "search failed: #{inspect error, pretty: true}"
        throw(error)
    end
  end

  def search_mall_orders(keyword: keyword, app_id: app_id, page: page, records_per_page: records_per_page) do
    if String.length(keyword) > 0 do
      query = %{
        query: %{
          bool: %{
            must: %{term: %{app_id: app_id}},
            should: [
              %{term: %{id: keyword}},
              %{match: %{goods_name: keyword}},
              %{term: %{app_id: keyword}},
              %{term: %{user_ip: keyword}},
              %{match: %{memo: keyword}},
              %{match: %{"address.name": keyword}},
              %{term: %{"address.mobile": keyword}},
              %{term: %{transaction_id: keyword}}
            ],
            minimum_should_match: 1,
            boost: 1.0,
          },
        },
        sort: %{inserted_at: %{order: :desc}},
        from: (page - 1) * records_per_page,
        size: records_per_page,
      }

      query = 
        case Integer.parse(keyword) do
          {int_keyword, ""} ->
            update_in(query.query.bool.should, &(&1++[ %{term: %{user_id: int_keyword}}]))
          _ ->
            query
        end

      case Elasticsearch.search(%{index: "mall", type: "orders", query: query, params: %{timeout: "1m"}}) do
        {:ok, %{hits: %{hits: hits, total: total}}} ->
          ids = Enum.map(hits, &(&1._id))
          {:ok, total, ids }
        error ->
          error "search orders failed: #{inspect error}"
          {:error, error}
      end
    else
      {:ok, 0, []}
    end
  end

  def search_mall_goods(keyword, page, records_per_page) do
    if String.length(keyword)>0 do
      query = %{
        query: %{
          bool: %{
            should: [
              %{term: %{id: keyword}},
              %{term: %{app_id: keyword}},
              %{match: %{name: keyword}},
              %{match: %{description: keyword}},
            ],
            minimum_should_match: 1,
            boost: 1.0,
          },
        },
        sort: %{inserted_at: %{order: :desc}},
        from: (page - 1) * records_per_page,
        size: records_per_page,
      }

      case Elasticsearch.search(%{index: "mall", type: "goods", query: query, params: %{timeout: "1m"}}) do
        {:ok, %{hits: %{hits: hits, total: total}}} ->
          ids = Enum.map(hits, &(&1._id))
          {:ok, total, ids }
        error ->
          throw(error)
      end
    else
      {:ok, 0, {}}
    end
  end

  def search_pmall_orders(app_id,keyword,page,records_per_page) do
    if String.length(keyword)>0 do
      query = %{
        query: %{
          bool: %{
            must: %{term: %{app_id: app_id}},
            should: [
              %{term: %{id: keyword}},
              %{match: %{goods_name: keyword}},
              %{term: %{app_id: keyword}},
              %{term: %{user_ip: keyword}},
              %{match: %{memo: keyword}},
              %{match: %{"address.name": keyword}},
              %{term: %{"address.mobile": keyword}},
              %{term: %{transaction_id: keyword}}
            ],
            minimum_should_match: 1,
            boost: 1.0,
          },
        },
        sort: %{inserted_at: %{order: :desc}},
        from: (page - 1) * records_per_page,
        size: records_per_page,
      }

      query = 
        case Integer.parse(keyword) do
          {int_keyword,""} ->
              update_in(query.query.bool.should,&(&1++[ %{term: %{user_id: int_keyword}}]))
            _ ->
              query
        end

      case Elasticsearch.search(%{index: "pmall", type: "orders", query: query, params: %{timeout: "1m"}}) do
        {:ok, %{hits: %{hits: hits, total: total}}} ->
          ids = Enum.map(hits, &(&1._id))
          {:ok, total, ids }
        error ->
          error "search orders failed: #{inspect error, pretty: true}"
          throw(error)
      end
    else
      {:ok, 0, {}}
    end
  end

  def search_pmall_goods(keyword, page, records_per_page, is_admin) do
    if String.length(keyword)>0 do
          query = %{
            query: %{
              bool: %{
                should: [
                  %{term: %{id: keyword}},
                  %{term: %{app_id: keyword}},
                  %{match: %{name: keyword}},
                  %{match: %{description: keyword}},
                ],
                filter: [],
                minimum_should_match: 1,
                boost: 1.0,
              },
            },
            sort: %{inserted_at: %{order: :desc}},
            from: (page - 1) * records_per_page,
            size: records_per_page,
          }

          query =
          if !is_admin do
            update_in(query.query.bool.filter, &(&1++[ %{term: %{active: true}}]))
          else
            query
          end

          case Elasticsearch.search(%{index: "pmall", type: "goods", query: query, params: %{timeout: "1m"}}) do
            {:ok, %{hits: %{hits: hits, total: total}}} ->
              ids = Enum.map(hits, &(&1._id))
              {:ok, total, ids }
            error ->
             throw(error)
          end
        else
          {:ok,0, {}}
        end
  end

  def search_question(keyword, page, records_per_page) do
    query = %{
      query: %{
        bool: %{
          must: %{multi_match: %{
          query: keyword,
          fields: [:title],
        }},
          filter: %{term: %{active: true} }
        }
      },
      from: ((page - 1) * records_per_page),
      size: if records_per_page>30 do 30 else records_per_page end
    }

    case Elasticsearch.search(%{index: "customer_service", type: "questions", query: query, params: %{timeout: "1m"}}) do
      {:ok, %{hits: %{hits: hits, total: total}}} ->
        questions = Enum.map(hits, fn(%{_id: _id} = hit) ->
          %{
            id: hit._source.id,
            title: hit._source.title,
            answer:  hit._source.answer,
            active: hit._source.active,
            inserted_at: hit._source.inserted_at
          }
        end)
        total_page = round(Float.ceil(total/records_per_page))
        {:ok, questions, total_page}
      error ->
        error "search failed: #{inspect error}"
        throw(error)
    end
  end

end