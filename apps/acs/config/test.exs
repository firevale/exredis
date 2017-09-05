use Mix.Config

# Configure your database
config :acs, Acs.Repo,
  adapter: Ecto.Adapters.MySQL,
  username: "root",
  password: "",
  database: "acs_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
