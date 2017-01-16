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

      defmacrop info(msg) do 
        quote do 
          Logger.info(unquote(msg))
        end
      end

      defmacrop warn(msg) do 
        quote do 
          Logger.warn(unquote(msg))
        end
      end

      defmacrop error(msg) do 
        quote do 
          Logger.error(unquote(msg))
        end
      end

    end
  end

end