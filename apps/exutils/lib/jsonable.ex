defmodule Utils.Jsonable do 
  defmacro __using__(_opts) do
    quote do
      alias Utils.JSON

      def to_json(%__MODULE__{} = json_object) do 
        JSON.encode!(json_object) 
      end

      def from_json(json_string) when is_bitstring(json_string) do 
        JSON.decode!(json_string, as: %__MODULE__{}, keys: :atoms) 
      end
    end
  end
end