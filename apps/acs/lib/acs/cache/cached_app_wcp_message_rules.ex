defmodule Acs.Cache.CachedAppWcpMessageRule do
  require Exredis
  require Excache

  alias   Acs.Repo
  alias   Acs.Wcp.AppWcpMessageRule

  import  Ecto.Query

  def get_all(app_id) when is_bitstring(app_id) do
    Excache.get!(key(app_id), fallback: fn(redis_key) ->    
      case Exredis.get(redis_key) do
        nil -> 
          case refresh(app_id) do 
            [] -> {:ignore, []}
            rules -> {:commit, rules}
          end
        raw ->
          {:commit, raw |> Base.decode64! |> :erlang.binary_to_term}
      end
    end)
  end

  def refresh(app_id) when is_bitstring(app_id) do
    Excache.del(key(app_id))

    query = from r in AppWcpMessageRule,
            select: r,
            where: r.app_id == ^app_id

    case Repo.all(query) do 
      [] -> []

      rules when is_list(rules) ->
        rules = Enum.map(rules, fn(rule) ->
          rule.keywords 
            |> String.split([",", " ", "，"], trim: true)
            |> Enum.map(fn(kw) ->
              {kw, rule.response}
            end)
        end) |> List.flatten |> Enum.into(%{})
        Exredis.set(key(app_id), rules |> :erlang.term_to_binary |> Base.encode64)
        rules

      _ -> []
    end
  end

  defp key(app_id) do 
    "acs.app_wcp_message_rules.#{app_id}"
  end

end
