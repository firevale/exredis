defmodule Acs.Web do
  @moduledoc """
  A module that keeps using definitions for controllers,
  views and so on.

  This can be used in your application as:

      use Acs.Web, :controller
      use Acs.Web, :view

  The definitions below will be executed for every view,
  controller, etc, so keep them short and clean, focused
  on imports, uses and aliases.

  Do NOT define functions inside the quoted expressions
  below.
  """

  def model do
    quote do
      use Ecto.Schema

      import Ecto
      import Ecto.Changeset
      import Ecto.Query

      alias  Acs.Repo
    end
  end

  def controller do
    quote do
      use     Phoenix.Controller

      alias   Acs.Repo
      import  Ecto
      import  Ecto.Query

      import  Acs.Router.Helpers
      import  Acs.Gettext

      import  Acs.Plugs

      require Utils
      require Logger

      alias   Utils.JSON
      alias   Utils.Httpc

      alias  Acs.RedisApp
      alias  Acs.RedisAppOrder
      alias  Acs.RedisUser
      alias  Acs.RedisAppUser
      alias  Acs.RedisAccessToken

      alias  Acs.App
      alias  Acs.AppSdkBinding
      alias  Acs.AppUser
      alias  Acs.AppOrder
      alias  Acs.AppGoods
      alias  Acs.AppGoodsProductId

      alias  Acs.PaymentHelper
    end
  end

  def view do
    quote do
      use Phoenix.View, root: "web/templates"

      # Import convenience functions from controllers
      import Phoenix.Controller, only: [get_csrf_token: 0, get_flash: 2, view_module: 1]

      # Use all HTML functionality (forms, tags, etc)
      use Phoenix.HTML

      import Acs.Router.Helpers
      import Acs.ErrorHelpers
      import Acs.Gettext
    end
  end

  def router do
    quote do
      use Phoenix.Router
    end
  end

  def channel do
    quote do
      use Phoenix.Channel

      alias Acs.Repo
      import Ecto
      import Ecto.Query
      import Acs.Gettext
    end
  end

  @doc """
  When used, dispatch to the appropriate controller/view/etc.
  """
  defmacro __using__(which) when is_atom(which) do
    apply(__MODULE__, which, [])
  end
end
