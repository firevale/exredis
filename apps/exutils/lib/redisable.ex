defmodule Utils.Redisable do 
  defmacro __using__(_opts) do
    quote do
      def to_redis(%__MODULE__{} = obj) do 
        obj |> :erlang.term_to_binary |> Base.encode64
      end

      def from_redis(bin) when is_binary(bin) do 
        Map.merge(%__MODULE__{}, bin |> Base.decode64! |> :erlang.binary_to_term)
      end
    end
  end
end