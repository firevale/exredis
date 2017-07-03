defmodule Acs.RedisAppWcpMessageRule do
  require Redis
  require Cachex

  alias   Utils.JSON
  alias   Acs.Repo
  alias   Acs.AppWcpMessageRule
  
  import  Ecto.Query

  def get_all(app_id) when is_bitstring(app_id) do
    Cachex.get!(:default, key(app_id), fallback: fn(redis_key) ->    
      case Redis.get(redis_key) do
        :undefined -> 
          case refresh(app_id) do 
            nil -> {:ignore, nil}
            rules -> {:commit, rules}
          end
        raw ->
          {:commit, raw |> JSON.decode!}
      end
    end)
  end

  def refresh(app_id) when is_bitstring(app_id) do
    Cachex.del(:default, key(app_id))
    query = from r in AppWcpMessageRule,
            select: r,
            where: r.app_id == ^app_id

    case Repo.all(query) do 
      [] -> nil

      rules when is_list(rules) ->
        rules = Enum.map(rules, fn(rule) ->
          rule.keywords 
            |> String.split([",", " ", "，"], trim: true)
            |> Enum.map(fn(kw) ->
              %{keyword: kw, response: rule.response}
            end)
        end) |> List.flatten
        Redis.set(key(app_id), JSON.encode(rules))
        rules

      _ -> nil
    end
  end

  defp key(app_id) do 
    "acs.app_wcp_message_rules.#{app_id}"
  end

end
