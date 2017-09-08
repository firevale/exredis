use Mix.Config

# Configure your database
config :acs_stats, AcsStats.Repo,
  adapter: Ecto.Adapters.MySQL,
  charset: "utf8mb4",
  pool: Ecto.Adapters.SQL.Sandbox
