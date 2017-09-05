use Mix.Config

# Configure your database
config :acs_stats, Acs.StatsRepo,
  adapter: Ecto.Adapters.MySQL,
  username: "root",
  password: "",
  database: "acs_dev",
  hostname: "localhost",
  pool_size: 10
