defmodule Acs.Wcp.AppWcpMessage do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Wcp.AppWcpMessage


  schema "app_wcp_messages" do

    timestamps()
  end

  @doc false
  def changeset(%AppWcpMessage{} = app_wcp_message, attrs) do
    app_wcp_message
    |> cast(attrs, [])
    |> validate_required([])
  end
end
