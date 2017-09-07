defmodule Utils.JSON do
  require Poison

  def encode(value, options \\ []) do 
    Poison.encode(value, options)
  end

  def encode!(value, options \\ []) do 
    Poison.encode!(value, options)
  end 

  def encode_to_iodata(value, options \\ []) do 
    Poison.encode_to_iodata(value, options)
  end 

  def encode_to_iodata!(value, options \\ []) do 
    Poison.encode_to_iodata!(value, options)
  end 

  def decode(value, options \\ []) do 
    Poison.decode(value, options)
  end

  def decode!(value, options \\ []) do 
    Poison.decode!(value, options)
  end
end