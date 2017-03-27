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
      use LogAlias

      import Ecto
      import Ecto.Changeset
      import Ecto.Query

      alias  Acs.Repo
    end
  end

  def controller do
    quote do
      use     Phoenix.Controller
      use     LogAlias

      import  Ecto
      import  Ecto.Query

      import  Acs.Router.Helpers
      import  Acs.Gettext
      import  Acs.ErrorHelpers

      import  Acs.Plugs

      require Redis

      require Utils

      alias   Utils.JSON
      alias   Utils.Httpc

      alias  Acs.Repo
      alias  Acs.RedisApp
      alias  Acs.RedisAppOrder
      alias  Acs.RedisUser
      alias  Acs.RedisAppUser
      alias  Acs.RedisAccessToken

      alias  Acs.App
      alias  Acs.User
      alias  Acs.UserFavoritePost
      alias  Acs.Device
      alias  Acs.AppSdkBinding
      alias  Acs.AppUser
      alias  Acs.AppOrder
      alias  Acs.AppGoods
      alias  Acs.AppGoodsProductId
      alias  Acs.AppUserDailyActivity
      alias  Acs.AppDevice
      alias  Acs.AppDeviceDailyActivity

      alias  Acs.Forum
      alias  Acs.ForumSection
      alias  Acs.ForumPost
      alias  Acs.ForumManager
      alias  Acs.ForumComment

      alias  Acs.PaymentHelper
      alias  Acs.ChaoxinNotifier
    end
  end

  def view do
    quote do
      use Phoenix.View, root: "web/templates"
      use LogAlias

      # Import convenience functions from controllers
      import Phoenix.Controller, only: [get_csrf_token: 0, get_flash: 2, view_module: 1]

      # Use all HTML functionality (forms, tags, etc)
      use Phoenix.HTML

      import Acs.Router.Helpers
      import Acs.ErrorHelpers
      import Acs.Gettext

      require Logger

      alias   Utils.JSON
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
      use LogAlias

      alias Acs.Repo
      import Ecto
      import Ecto.Query
      import Acs.Gettext

      alias  Acs.RedisApp
      alias  Acs.RedisAppOrder
      alias  Acs.RedisUser
      alias  Acs.RedisAppUser
      alias  Acs.RedisAccessToken

      alias  Acs.App
      alias  Acs.User
      alias  Acs.Device
      alias  Acs.AppSdkBinding
      alias  Acs.AppUser
      alias  Acs.AppOrder
      alias  Acs.AppGoods
      alias  Acs.AppGoodsProductId
      alias  Acs.AppUserDailyActivity
      alias  Acs.AppDevice
      alias  Acs.AppDeviceDailyActivity
    end
  end

  @doc """
  When used, dispatch to the appropriate controller/view/etc.
  """
  defmacro __using__(which) when is_atom(which) do
    apply(__MODULE__, which, [])
  end
end
