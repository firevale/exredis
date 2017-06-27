defmodule Acs.Web.Admin.LoginCodesController do
  use Acs.Web, :controller

  alias   Ecto.Adapters.SQL

  def gen_codes(conn, %{"app_id" => app_id, "number" => number}) do 
    1..number |> Enum.reduce(3, fn(_n, code_length) -> 
      gen_uniq_code(app_id, code_length)
    end)

    conn |> json(%{success: true})
  end

  defp gen_uniq_code(app_id, code_length, n \\ 1) do 
    code = Utils.generate_token(code_length)

    case AppLoginCode.changeset(%AppLoginCode{}, %{app_id: app_id, code: code}) |> Repo.insert do 
      {:ok, _} -> code_length
      {:error, %{errors: [code: _]}} ->
        if n <= 10 do 
          gen_uniq_code(app_id, code_length, n + 1)
        else
          gen_uniq_code(app_id, code_length + 1, 1)
        end
      _ -> code_length
    end
  end

  def del_codes(conn, %{"app_id" => app_id, "number" => number}) do 
    Repo.transaction(fn -> 
      {:ok, _} = SQL.query(Repo, "delete from app_login_codes where app_id = ? \
        and owner is null and user_id is null order by inserted_at desc limit ?", 
        [app_id, number])
    end)
    conn |> json(%{success: true})
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

  def assign_codes(%{private: %{acs_admin_id: admin_user_id}} = conn, %{"app_id" => app_id, "number" => number}) do
    owner = "admin.#{admin_user_id}"

    query = from c in AppLoginCode,
      select: count(1),
      where: c.app_id == ^app_id and c.owner == ^owner
    
    assigned = Repo.one(query)

    if number + assigned > 100 do 
      conn |> json(%{success: false, i18n_message: "error.server.assignTooManyCodes"})
    else 
      now = DateTime.utc_now
      Repo.transaction(fn -> 
        {:ok, _} = SQL.query(Repo, "update app_login_codes set owner = ?, assigned_at = ? where app_id = ? \
          and owner is null and user_id is null order by inserted_at desc limit ?", 
          [owner, now, app_id, number])
      end)

      query = from c in AppLoginCode,
        select: c,
        where: c.app_id == ^app_id and c.owner == ^owner

      codes = Repo.all(query)

      conn |> json(%{success: true, codes: codes})
    end
  end

  def fetch_my_codes(%{private: %{acs_admin_id: admin_user_id}} = conn, %{"app_id" => app_id}) do
    owner = "admin.#{admin_user_id}"
    
    query = from c in AppLoginCode,
      select: c,
      where: c.app_id == ^app_id and c.owner == ^owner

    codes = Repo.all(query)

    conn |> json(%{success: true, codes: codes})    
  end



end