defmodule ExredisLockError do
  defexception message: "lock redis key error"
end

defmodule Exredis do
  @moduledoc """
  High-level API
  """

  import Exredis.Helper

  defredis(:append, [:key, :value], &int_reply/1)
  defredis(:auth, [:password])
  defredis(:bgrewriteaof, [])
  defredis(:bgsave, [])
  defredis(:bitcount, [:key, :start, :end], &int_reply/1)
  defredis(:bitcount, [:key], &int_reply/1)
  # , ...]
  defredis(:bitop, [:operation, :destkey, :key])
  defredis(:blpop, [:key, :timeout])
  defredis(:brpop, [:key, :timeout])
  defredis(:brpoplpush, [:source, :destination, :timeout])
  defredis(:dbsize, [])
  defredis(:decr, [:key], &int_reply/1)
  defredis(:decrby, [:key, :decrement], &int_reply/1)
  defredis(:del, [:key], &int_reply/1)
  defredis(:discard, [])
  defredis(:dump, [:key])
  defredis(:echo, [:message])
  defredis(:eval, [:script, :numkeys, :keys, :args])
  defredis(:evalsha, [:scriptsha, :numkeys, :keys, :args])
  defredis(:exec, [])
  defredis(:exists, [:key], &int_reply/1)
  defredis(:expire, [:key, :seconds], &int_reply/1)
  defredis(:expireat, [:key, :timestamp], &int_reply/1)
  defredis(:flushall, [], &sts_reply/1)
  defredis(:flushdb, [])
  defredis(:get, [:key])
  defredis(:getbit, [:key, :offset], &int_reply/1)
  defredis(:getrange, [:key, :start, :end])
  defredis(:getset, [:key, :value])
  # , ...]
  defredis(:hdel, [:key, :field], &int_reply/1)
  defredis(:hexists, [:key, :field], &int_reply/1)
  defredis(:hget, [:key, :field])

  defredis(:hgetall, [:key], fn x ->
    Enum.chunk_every(x, 2)
    |> Enum.map(fn [a, b] -> {a, b} end)
    |> Enum.into(Map.new())
  end)

  defredis(:hincrby, [:key, :field, :increment], &int_reply/1)
  defredis(:hincrbyfloat, [:key, :field, :increment])
  defredis(:hkeys, [:key])
  defredis(:hlen, [:key], &int_reply/1)
  # , ...]
  defredis(:hmget, [:key, :field])
  defredis(:hmset, [:key, :vals], &sts_reply/1)
  defredis(:hset, [:key, :field, :value], &int_reply/1)
  defredis(:hsetnx, [:key, :field, :value], &int_reply/1)
  defredis(:hvals, [:key])
  defredis(:incr, [:key], &int_reply/1)
  defredis(:incrby, [:key, :increment], &int_reply/1)
  defredis(:incrbyfloat, [:key, :increment])
  defredis(:info, [:key])
  defredis(:keys, [:pattern])
  defredis(:lastsave, [])
  defredis(:lindex, [:key, :index])
  defredis(:linsert, [:key, :before_after, :pivot, :value])
  defredis(:llen, [:key])
  defredis(:lpop, [:key])
  # , ...]
  defredis(:lpush, [:key, :value])
  defredis(:lpushx, [:key, :value])
  defredis(:lrange, [:key, :start, :stop])
  defredis(:lrem, [:key, :count, :value])
  defredis(:lset, [:key, :index, :value])
  defredis(:ltrim, [:key, :start, :stop])
  # , ...]
  defredis(:mget, [:key], &sts_reply/1)
  # defredis :migrate
  defredis(:monitor, [])
  defredis(:move, [:key, :db])
  # , ...]
  defredis(:mset, [:vals], &sts_reply/1)
  # , ...]
  defredis(:msetnx, [:key, :value])
  defredis(:multi, [])
  # defredis :object, []
  defredis(:persist, [:key], &int_reply/1)
  defredis(:pexpire, [:key, :milliseconds], &int_reply/1)
  defredis(:pexpireat, [:key, :milli_timestamp], &int_reply/1)
  defredis(:ping, [])
  defredis(:psetex, [:key, :milliseconds, :value])
  # , ...]
  defredis(:psubscribe, [:pattern])
  # defredis :pubsub, [:subcommand]
  defredis(:pttl, [:key], &int_reply/1)
  defredis(:publish, [:channel, :message], &int_reply/1)
  # , ...]
  defredis(:punsubscribe, [:pattern])
  defredis(:quit, [])
  defredis(:randomkey, [])
  defredis(:rename, [:key, :newkey], &sts_reply/1)
  defredis(:renamenx, [:key, :newkey], &int_reply/1)
  defredis(:restore, [:key, :ttl, :serialized_value])
  defredis(:rpop, [:key])
  defredis(:rpoplpush, [:source, :destination])
  # , ...]
  defredis(:rpush, [:key, :value])
  # , ...]
  defredis(:rpushx, [:key, :value])
  defredis(:sadd, [:key, :member], &int_reply/1)
  defredis(:save, [])
  defredis(:scard, [:key], &int_reply/1)
  defredis([:script, :exists], [:shasum], &multi_int_reply/1)
  defredis([:script, :flush], [], &sts_reply/1)
  defredis([:script, :kill], [])
  defredis([:script, :load], [:script])
  # , ...]
  defredis(:sdiff, [:key])
  # , ...]
  defredis(:sdiffstore, [:destination, :key])
  defredis(:select, [:index])
  defredis(:set, [:key, :value], &sts_reply/1)
  defredis(:setbit, [:key, :offset, :value], &int_reply/1)
  defredis(:setex, [:key, :seconds, :value], &sts_reply/1)
  defredis(:setnx, [:key, :value], &int_reply/1)
  defredis(:setrange, [:key, :offset, :value], &int_reply/1)
  # defredis :shutdown, [:nosave, :save]
  # , ...]
  defredis(:sinter, [:key])
  # , ...]
  defredis(:sinterstore, [:destination, :key])
  defredis(:sismember, [:key, :member])
  defredis(:slaveof, [:host, :port])
  # , :argument]
  defredis(:slowlog, [:subcommand])
  defredis(:smembers, [:key])
  defredis(:smove, [:source, :destination, :member])
  # , :by_pattern]
  defredis(:sort, [:key])
  defredis(:spop, [:key])
  defredis(:spop, [:key, :count])
  # , :count]
  defredis(:srandmember, [:key])
  defredis(:srandmember, [:key, :count])
  # , ...]
  defredis(:srem, [:key, :member])
  defredis(:strlen, [:key], &int_reply/1)
  # , ...]
  defredis(:subscribe, [:channel])
  # , ...]
  defredis(:sunion, [:key])
  # , ...]
  defredis(:sunionstore, [:destination, :key])
  defredis(:sync, [])
  defredis(:time, [])
  defredis(:ttl, [:key], &int_reply/1)
  defredis(:type, [:key])
  # , ...]
  defredis(:unsubscribe, [:channel])
  defredis(:unwatch, [])
  # , ...]
  defredis(:watch, [:key])
  # , ...]
  defredis(:zadd, [:key, :score, :member])
  defredis(:zcard, [:key])
  defredis(:zcount, [:key, :min, :max])
  defredis(:zincrby, [:key, :increment, :member])
  # , ...]
  defredis(:zinterstore, [:destination, :numkeys, :key])
  defredis(:zrange, [:key, :start, :stop])
  defredis(:zrangebyscore, [:key, :start, :stop])
  defredis(:zrank, [:key, :member])
  # , ...]
  defredis(:zrem, [:key, :member])
  defredis(:zremrangebyrank, [:key, :start, :stop])
  defredis(:zremrangebyscore, [:key, :min, :max])
  defredis(:zrevrange, [:key, :start, :stop])
  defredis(:zrevrangebyscore, [:key, :min, :max])
  defredis(:zrevrank, [:key, :member])
  defredis(:zscore, [:key, :member])
  # , ...]
  defredis(:zunionstore, [:destination, :key])
  # defredis :scan, [:cursor]
  # defredis :sscan, [:key, :cursor]
  # defredis :hscan, [:key, :cursor]
  # defredis :zscan, [:key, :cursor]

  defp withscores(command_name, key, start, stop) do
    command = [command_name, key, start, stop, "WITHSCORES"]
    {:ok, res} = Exredis.Helper.command(command)

    res
    |> Enum.chunk_every(2)
    |> Enum.map(fn [a, b] -> {a, String.to_integer(b)} end)
  end

  @spec zrangewithscores(String.t() | atom(), integer(), integer()) :: [{String.t(), integer()}]
  def zrangewithscores(key, start, stop) do
    withscores("ZRANGE", to_string(key), to_string(start), to_string(stop))
  end

  @spec zrevrangewithscores(String.t() | atom(), integer(), integer()) :: [
          {String.t(), integer()}
        ]
  def zrevrangewithscores(key, start, stop) do
    withscores("ZREVRANGE", to_string(key), to_string(start), to_string(stop))
  end

  defp int_reply(reply) do
    try do
      reply |> String.to_integer()
    rescue
      _ in ArgumentError -> reply
    end
  end

  defp multi_int_reply(reply), do: reply |> Enum.map(&int_reply/1)
  defp sts_reply("OK"), do: :ok
  defp sts_reply(reply), do: reply

  ################################################################################
  # redis lock
  ################################################################################
  defmodule Redis.LockFailed do
    @moduledoc """
    Raised at compilation time when the query cannot be compiled.
    """
    defexception [:message]
  end

  def lock_for!(resource, fun, ttl \\ 60) do
    case Redlock.transaction(resource, ttl, fun) do
      {:error, :lock_failure} ->
        raise Redis.LockFailed, message: "lock #{resource} failed"

      result ->
        result
    end
  end
end

defmodule Exredis.Script do
  alias Exredis.Helper

  defmacro defredis_script(name, file_path: file_path) do
    case File.read(file_path) do
      {:ok, content} ->
        quote do: defredis_script(unquote(name), unquote(content))

      _ ->
        :erlang.error("Script file is missing at #{file_path}")
    end
  end

  defmacro defredis_script(name, script) do
    script_sha = :crypto.hash(:sha, script) |> Base.encode16()

    quote bind_quoted: [script_sha: script_sha, name: name, script: script] do
      def unquote(name)(keys \\ [], argv \\ []) do
        query_args = [length(keys)] ++ keys ++ argv

        try do
          {:ok, val} = Helper.command(["EVALSHA", unquote(script_sha)] ++ query_args)
          val
        catch
          :error, %Redix.Error{message: "NOSCRIPT No matching script. Please use EVAL."} ->
            load_script(unquote(script))
            unquote(name)(keys, argv)
        end
      end
    end
  end

  def load_script(script) do
    case Helper.command(["SCRIPT", "LOAD", script]) do
      <<"ERR", error::binary>> ->
        throw(error)

      reply ->
        reply
    end
  end
end
