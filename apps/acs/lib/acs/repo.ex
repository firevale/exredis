defmodule Acs.Repo do
  use Ecto.Repo, otp_app: :acs

  @doc """
  Dynamically loads the repository url from the
  DATABASE_URL environment variable.
  """
  def init(_, opts) do
    {:ok, Keyword.put(opts, :url, System.get_env("ACS_DATABASE_URL"))}
  end
end
