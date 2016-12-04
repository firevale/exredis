defmodule LogAlias do 

  defmacro __using__(_) do 
    quote do 
      require Logger
      case Mix.env do 
        :dev ->
          defmacrop d(msg) do 
            quote do 
              Logger.debug(unquote(msg))
            end
          end
        _ ->
          defmacrop d(msg) do 
          end
      end
    end
  end

end