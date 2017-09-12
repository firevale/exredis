defmodule Acs.Apps do
  @moduledoc """
  The Apps context.
  """

  import Ecto.Query, warn: false
  alias Acs.Repo


  alias Acs.Apps.App
  alias Acs.Apps.AppOrder

  def update_app_order!(%AppOrder{} = order, attr) do 
    AppOrder.changeset(order, attr) |> Repo.update!
  end
end
