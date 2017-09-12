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
      import AcsWeb.ErrorHelpers
      import AcsWeb.Gettext
      import AcsWeb.Plugs
      import Acs.UploadImagePlugs

      require Exredis
      require Utils
      require Floki

      import Ecto
      import Ecto.Query

      alias Acs.Apps.App
      alias Acs.Apps.AppNews
      alias Acs.Apps.AppSdkBinding
      alias Acs.Apps.AppGoods
      alias Acs.Apps.AppGoodsProductId
      alias Acs.Apps.AppOrder
      alias Acs.Apps.AppQuestion
      alias Acs.AppWcpResponse
      alias Acs.AppWcpMessage
      alias Acs.AppWcpUser
      alias Acs.LoginCodes.AppLoginCode

      alias Acs.Forums.Forum
      alias Acs.Forums.ForumSection
      alias Acs.Forums.ForumPost
      alias Acs.Forums.ForumComment
      alias Acs.Forums.UserFavoritePost
      alias Acs.Malls.Mall
      alias Acs.Malls.MallOrder
      alias Acs.Malls.MallGoods
      alias Acs.Malls.MallOrderDetail
      alias Acs.Malls.MallOrderLog

      alias Acs.Admin.OpLog
      alias Acs.Wcp.AppWcpConfig
      alias Acs.Wcp.AppWcpMessage
      alias Acs.Wcp.AppWcpMessageRule
      alias Acs.Wcp.AppWcpUser

      alias Acs.PMalls.PointLog
      alias Acs.PMalls.TaskBar
      alias Acs.PMalls.PMallGoods
      alias Acs.Accounts.User
      alias Acs.Accounts.UserAddress
      alias Acs.Admin.AdminUser

      alias Acs.Auth
      alias Acs.Auth.AccessToken
      alias Acs.Cache.CachedApp
      alias Acs.Cache.CachedUser
      alias Acs.Cache.CachedAdminUser
      alias Acs.Cache.CachedAppWcpConfig
      alias Acs.Cache.CachedAppWcpMessageRule
      alias Acs.Cache.CachePMallTaskBar
      alias Acs.Cache.CachePMallGoods
      alias Acs.Cache.CachedNeteaseDun

      alias AcsStats.Cache.CachedDeviceInfo
      alias AcsStats.Cache.CachedDevice
      alias AcsStats.Devices.Device
      alias AcsStats.Devices.DeviceInfo
      alias AcsStats.Devices.AppDevice
      alias AcsStats.Devices.AppDeviceDailyActivity
      alias AcsStats.Users.AppUser
      alias AcsStats.Users.AppUserDailyActivity 
      
      alias Exwcp.Menu
    end
  end

  def view do
    quote do
      use Phoenix.View, root: "lib/acs_web/templates",
                        namespace: AcsWeb
      use Utils.LogAlias

      # Import convenience functions from controllers
      import Phoenix.Controller, only: [get_csrf_token: 0, get_flash: 2, view_module: 1]

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
