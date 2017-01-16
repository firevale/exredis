defmodule Acs.Endpoint do
  use Phoenix.Endpoint, otp_app: :acs
  import Acs.Plugs

  socket "/socket", Acs.UserSocket
 
  @allow_origin Application.get_env(:acs, :allow_origin, "//*.firevale.com")
  @valid_static_pattern ~w(js css images assets fonts favicon.ico robots.txt verify-68e4f3a600bb881fa4ef46bbfff0.txt)

  # check origin
  plug :allow_origin, @allow_origin

  # Serve at "/" the static files from "priv/static" directory.
  #
  # You should set gzip to true if you are running phoenix.digest
  # when deploying your static files in production.
  if Mix.env == :dev or Mix.env == :test do 
    plug Plug.Static,
      at: "/", from: :acs, 
      cache_control_for_etags: "no-cache, no-store, must-revalidate",
      cache_control_for_vsn_requests: "no-cache, no-store, must-revalidate",
      only: @valid_static_pattern
  else 
    plug Plug.Static,
      at: "/", from: :acs, 
      gzip: true,
      cache_control_for_etags: "public, max-age=31536000",
      cache_control_for_vsn_requests: "public, max-age=31536000",
      only: @valid_static_pattern
  end

  # Code reloading can be explicitly enabled under the
  # :code_reloader configuration of your endpoint.
  if code_reloading? do
    socket "/phoenix/live_reload/socket", Phoenix.LiveReloader.Socket
    plug Phoenix.LiveReloader
    plug Phoenix.CodeReloader
  end

  plug Plug.RequestId
  plug Plug.Logger

  plug Plug.Parsers,
    parsers: [:urlencoded, :multipart, :json],
    pass: ["*/*"],
    json_decoder: Poison

  plug Plug.MethodOverride
  plug Plug.Head

  # The session will be stored in the cookie and signed,
  # this means its contents can be read but not tampered with.
  # Set :encryption_salt if you would also like to encrypt it.
  plug Plug.Session,
    store: :cookie,
    key: "_acs_key",
    signing_salt: "xPmjtHMg",
    encryption_salt: "NW3SXpkS"

  plug :no_cache
  
  plug Acs.Router
end
