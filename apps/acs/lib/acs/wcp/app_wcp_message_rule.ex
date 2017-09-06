defmodule Acs.Wcp.AppWcpMessageRule do
  use Ecto.Schema
  import Ecto.Changeset
  alias Acs.Wcp.AppWcpMessageRule


  schema "app_wcp_message_rules" do

    timestamps()
  end

  @doc false
  def changeset(%AppWcpMessageRule{} = app_wcp_message_rule, attrs) do
    app_wcp_message_rule
    |> cast(attrs, [])
    |> validate_required([])
  end
end
