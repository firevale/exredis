use Mix.Config

config :acs, Acs.Repo,
  adapter: Ecto.Adapters.MySQL,
  charset: "utf8mb4",
  pool: Ecto.Adapters.SQL.Sandbox
