defmodule Utils.JSON do
  require :jiffy

  def encode(v) do 
    try do 
      {:ok, :jiffy.encode(v, [:uescape, :force_utf8])}
    rescue 
      e ->
        {:error, e}
    end
  end

  def encode!(v) do 
    :jiffy.encode(v, [:uescape, :force_utf8])
  end 

  def encode_to_iodata!(v) do 
    :jiffy.encode(v, [:uescape, :force_utf8])
  end 

  def decode(v, opt \\ []) do 
    try do 
      result = case opt[:keys] do 
        :atoms -> 
          :jiffy.decode(v, [:return_maps, :atomize_map_key, :use_nil])
        _ ->
          :jiffy.decode(v, [:return_maps, :use_nil])
      end

      case opt[:as] do 
        nil -> {:ok, result}
        module when is_atom(module) ->
          {:ok, Map.put(result, :__struct__, module)}
        _ -> {:ok, result}
      end
    rescue
      e ->
        {:error, e}
    end
  end

  def decode!(v, opt \\ []) do 
    result = case opt[:keys] do 
      :atoms -> 
        :jiffy.decode(v, [:return_maps, :atomize_map_key, :use_nil])
      _ ->
        :jiffy.decode(v, [:return_maps, :use_nil])
    end

    case opt[:as] do 
      nil -> result
      module when is_atom(module) ->
        Map.put(result, :__struct__, module)
      _ -> result
    end
  end
end