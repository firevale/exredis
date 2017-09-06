defmodule Acs.Wcp.AppWcpUser do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Wcp.AppWcpUser


  schema "app_wcp_uesers" do

    timestamps()
  end

  @doc false
  def changeset(%AppWcpUser{} = app_wcp_user, attrs) do
    app_wcp_user
    |> cast(attrs, [])
    |> validate_required([])
  end
end
