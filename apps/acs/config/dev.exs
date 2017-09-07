use Mix.Config

# Configure your database
config :acs, Acs.Repo,
  adapter: Ecto.Adapters.MySQL,
  username: "root",
  password: "",
  database: "acs_dev",
  hostname: "localhost",
  pool_size: 10
