defmodule Acs.Web.Admin.LoginCodesController do
  use Acs.Web, :controller

  def gen_codes(conn, %{"sdk" => sdk}) do 
    conn
  end

  def stats_info(conn, %{"app_id" => app_id}) do 
    query = from c in AppLoginCode,
            select: count(1),
            where: c.app_id == ^app_id

    total = Repo.one(query)

    query1 = query |> where([c], is_nil(c.owner))

    available = Repo.one(query1)

    query2 = query |> where([c], not is_nil(c.owner) and not is_nil(c.user_id))

    used = Repo.one(query2)

    conn |> json(%{
      success: true,
      stats: %{
        total: total,
        available: available,
        assigned: total - available,
        used: used
      }
    })
  end

end