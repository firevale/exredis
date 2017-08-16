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
      alias  Acs.StatsRepo 
    end
  end

  def controller do
    quote do
      use     Phoenix.Controller, namespace: Acs.Web
      use     LogAlias

      import  Ecto
      import  Ecto.Query

      import  Acs.Web.Router.Helpers
      import  Acs.Web.Gettext
      import  Acs.Web.ErrorHelpers

      import  Acs.Plugs

      require Redis

      require Utils

      alias   Utils.JSON
      alias   Utils.Httpc

      alias  Acs.Repo
      alias  Acs.StatsRepo 

      alias  Acs.RedisApp
      alias  Acs.RedisAppOrder
      alias  Acs.RedisUser
      alias  Acs.RedisDevice
      alias  Acs.RedisAppUser
      alias  Acs.RedisAccessToken
      alias  Acs.RedisForum
      alias  Acs.RedisLoginCode

      alias  Acs.App
      alias  Acs.AdminUser
      alias  Acs.User
      alias  Acs.UserFavoritePost
      alias  Acs.UserAddress
      alias  Acs.AppSdkBinding
      alias  Acs.AppOrder
      alias  Acs.AppGoods
      alias  Acs.AppGoodsProductId
      alias  Acs.AppLoginCode
      alias  Acs.Stats.Device
      alias  Acs.Stats.AppDevice
      alias  Acs.Stats.DeviceInfo
      alias  Acs.Stats.AppDeviceDailyActivity
      alias  Acs.Stats.AppUser
      alias  Acs.Stats.AppUserDailyActivity
      alias  Acs.Stats.DailyReport
      alias  Acs.Stats.DailyUserRetention
      alias  Acs.Stats.DailyUserTiming
      alias  Acs.Stats.DailyDeviceRetention
      alias  Acs.Stats.DailyDeviceTiming
      alias  Acs.AppNews

      alias  Acs.Question
      alias  Acs.Forum
      alias  Acs.ForumSection
      alias  Acs.ForumPost
      alias  Acs.ForumManager
      alias  Acs.ForumComment

      alias  Acs.PaymentHelper
      alias  Acs.ChaoxinNotifier

      alias  Acs.Mall
      alias  Acs.MallGoods
      alias  Acs.MallOrder
      alias  Acs.MallOrderDetail
      alias  Acs.MallOPLog

      alias  Acs.OperateLog
    end
  end

  def view do
    quote do
      use Phoenix.View, root: "lib/acs/web/templates", namespace: Acs.Web
      use LogAlias

      # Import convenience functions from controllers
      import Phoenix.Controller, only: [get_csrf_token: 0, get_flash: 2, view_module: 1]

      # Use all HTML functionality (forms, tags, etc)
      use Phoenix.HTML

      import Acs.Web.Router.Helpers
      import Acs.Web.ErrorHelpers
      import Acs.Web.Gettext

      require Logger

      alias   Utils.JSON
    end
  end

  def router do
    quote do
      use Phoenix.Router
      import Acs.Plugs
      import Acs.PlugsPipeline
    end
  end

  def channel do
    quote do
      use Phoenix.Channel
      use LogAlias

      alias Acs.Repo
      alias Acs.StatsRepo 

      import Ecto
      import Ecto.Query
      import Acs.Web.Gettext

      alias  Acs.RedisApp
      alias  Acs.RedisAppOrder
      alias  Acs.RedisUser
      alias  Acs.RedisAppUser
      alias  Acs.RedisAccessToken

      alias  Acs.App
      alias  Acs.User
      alias  Acs.AppSdkBinding
      alias  Acs.AppOrder
      alias  Acs.AppGoods
      alias  Acs.AppGoodsProductId
      alias  Acs.Stats.Device
      alias  Acs.Stats.AppDevice
      alias  Acs.Stats.AppUser
      alias  Acs.Stats.AppUserDailyActivity
      alias  Acs.Stats.AppDeviceDailyActivity
    end
  end

  @doc """
  When used, dispatch to the appropriate controller/view/etc.
  """
  defmacro __using__(which) when is_atom(which) do
    apply(__MODULE__, which, [])
  end
end
