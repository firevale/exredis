defmodule Excache do
  def get(key, options \\ []), do: Cachex.get(:default, key, options)
  def get!(key, options \\ []), do: Cachex.get!(:default, key, options)
  def get_and_update(key, update_function, options \\ []), do: Cachex.get_and_update(:default, key, update_function, options)
  def get_and_update!(key, update_function, options \\ []), do: Cachex.get_and_update!(:default, key, update_function, options)
  def set(key, value, options \\ []), do: Cachex.set(:default, key, value, options)
  def set!(key, value, options \\ []), do: Cachex.set!(:default, key, value, options)
  def update(key, value, options \\ []), do: Cachex.update(:default, key, value, options)
  def update!(key, value, options \\ []), do: Cachex.update!(:default, key, value, options)
  def clear(options \\ []), do: Cachex.clear(:default, options)
  def clear!(options \\ []), do: Cachex.clear!(:default, options)
  def count(options \\ []), do: Cachex.count(:default, options)
  def decr(key, options \\ []), do: Cachex.decr(:default, key, options)
  def decr!(key, options \\ []), do: Cachex.decr!(:default, key, options)
  def incr(key, options \\ []), do: Cachex.incr(:default, key, options)
  def incr!(key, options \\ []), do: Cachex.incr!(:default, key, options)
  def dump(path, options \\ []), do: Cachex.dump(:default, path, options)
  def empty?(options \\ []), do: Cachex.empty?(:default, options)
  def inspect(options \\ []), do: Cachex.inspect(:default, options)
  def exists?(key, options \\ []), do: Cachex.exists?(:default, key, options)
  def expire(key, expiration, options \\ []), do: Cachex.expire(:default, key, expiration, options)
  def expire_at(key, timestamp, options \\ []), do: Cachex.expire_at(:default, key, timestamp, options)
  def keys(options \\ []), do: Cachex.keys(:default, options)

  def del(key, options \\ []) do
    result = Cachex.del(:default, key, options)
    payload = :erlang.term_to_binary(%{action: :del, key: key, node: System.get_env("NODE")})
    Redix.PubSub.Fastlane.publish(Excache.PubSub.Redis, "cachex", payload)
    result
  end

  def del!(key, options \\ []) do 
    result = Cachex.del!(:default, key, options)
    payload = :erlang.term_to_binary(%{action: :del, key: key, node: System.get_env("NODE")})
    Redix.PubSub.Fastlane.publish(Excache.PubSub.Redis, "cachex", payload)
    result
  end
end
