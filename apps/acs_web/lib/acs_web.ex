defmodule AcsWeb do
  @moduledoc """
  The entrypoint for defining your web interface, such
  as controllers, views, channels and so on.

  This can be used in your application as:

      use AcsWeb, :controller
      use AcsWeb, :view

  The definitions below will be executed for every view,
  controller, etc, so keep them short and clean, focused
  on imports, uses and aliases.

  Do NOT define functions inside the quoted expressions
  below. Instead, define any helper function in modules
  and import those modules here.
  """

  def controller do
    quote do
      use Phoenix.Controller, namespace: AcsWeb
      use Utils.LogAlias
      
      import Plug.Conn
      import AcsWeb.Router.Helpers
      import AcsWeb.Gettext

      require Exredis
      require Utils

      import Ecto
      import Ecto.Query
    end
  end

  def view do
    quote do
      use Phoenix.View, root: "lib/acs_web/templates",
                        namespace: AcsWeb
      use Utils.LogAlias

      # Import convenience functions from controllers
      import Phoenix.Controller, only: [get_flash: 2, view_module: 1]

      # Use all HTML functionality (forms, tags, etc)
      use Phoenix.HTML

      import AcsWeb.Router.Helpers
      import AcsWeb.ErrorHelpers
      import AcsWeb.Gettext

      alias  Utils.JSON

      import Ecto
      import Ecto.Query
    end
  end

  def router do
    quote do
      use Phoenix.Router
      use Utils.LogAlias

      import Plug.Conn
      import Phoenix.Controller

      import AcsWeb.Plugs
      import AcsWeb.PlugsPipeline
      import AcsWeb.UploadImagePlugs
    end
  end

  def channel do
    quote do
      use Phoenix.Channel
      use Utils.LogAlias

      import AcsWeb.Gettext

      import Ecto
      import Ecto.Query
    end
  end

  @doc """
  When used, dispatch to the appropriate controller/view/etc.
  """
  defmacro __using__(which) when is_atom(which) do
    apply(__MODULE__, which, [])
  end
end
