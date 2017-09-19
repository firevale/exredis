defmodule AcsWeb.LazyTinypng do 
  require Exredis
  
  @redis_cache_key "acsweb.tinypng_files"

  def add_to_list(image_file_path) do 
    Exredis.sadd(@redis_cache_key, image_file_path)
  end

  def remove_from_list(image_file_path) do 
    Exredis.srem(@redis_cache_key, image_file_path)
  end

  def list_files() do 
    Exredis.smembers(@redis_cache_key)
  end

  def count() do 
    Exredis.scard(@redis_cache_key)
  end
end