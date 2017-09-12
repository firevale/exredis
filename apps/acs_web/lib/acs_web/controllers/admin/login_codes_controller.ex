defmodule AcsWeb.Admin.LoginCodesController do
  use AcsWeb, :controller

  def gen_codes(%Plug.Conn{private: %{acs_admin_id: acs_admin_id}} = conn, %{"app_id" => app_id, "number" => number}) do 
    1..number |> Enum.reduce(3, fn(_n, code_length) -> 
      gen_uniq_code(app_id, code_length)
    end)
  
    AdminController.add_operate_log(acs_admin_id, app_id, "gen_codes", %{"number" => number})
    LoginCodes.refresh_stats_info(app_id)

    conn |> json(%{success: true})
  end

  defp gen_uniq_code(app_id, code_length, n \\ 1) do 
    code = Utils.generate_token(code_length)

    case Exredis.sadd("_acs.login_codes.all.#{app_id}", code) do 
      1 -> 
        Exredis.sadd("_acs.login_codes.available.#{app_id}", code)
        code_length
      0 ->
        if n <= 10 do 
          gen_uniq_code(app_id, code_length, n + 1)
        else
          gen_uniq_code(app_id, code_length + 1, 1)
        end
    end
  end

  def del_codes(%Plug.Conn{private: %{acs_admin_id: acs_admin_id}} = conn, %{"app_id" => app_id, "number" => number}) do 
    number = "#{number}" |> String.to_integer
    available_number = Exredis.scard("_acs.login_codes.available.#{app_id}")

    if available_number > number do 
      removed = Exredis.spop("_acs.login_codes.available.#{app_id}", number)
      Exredis.srem("_acs.login_codes.all.#{app_id}", removed)
    else 
      removed = Exredis.spop("_acs.login_codes.available.#{app_id}", available_number)
      Exredis.srem("_acs.login_codes.all.#{app_id}", removed)
      assigned_number = Exredis.scard("_acs.login_codes.assigned.#{app_id}") 
      assigned_number = if (number - available_number) <= assigned_number do 
                          number - available_number
                        else
                          assigned_number
                        end
      removed = Exredis.spop("_acs.login_codes.assigned.#{app_id}", assigned_number)
      Exredis.srem("_acs.login_codes.all.#{app_id}", removed)
    end

    AdminController.add_operate_log(acs_admin_id, app_id, "del_codes", %{"number" => number})
    LoginCodes.refresh_stats_info(app_id)

    conn |> json(%{success: true})
  end

  def stats_info(conn, %{"app_id" => app_id}) do 
    conn |> json(%{
      success: true,
      stats: LoginCodes.stats_info(app_id),
      daily_chart: LoginCodes.daily_chart_data(app_id, 30),
    })
  end

  def assign_codes(%{private: %{acs_admin_id: admin_user_id}} = conn, %{"app_id" => app_id, "number" => number}) do
    owner = "admin.#{admin_user_id}"

    query = from c in AppLoginCode,
      select: count(1),
      where: c.app_id == ^app_id and c.owner == ^owner
    
    assigned = Repo.one(query)

    if number + assigned > 500 do 
      conn |> json(%{success: false, i18n_message: "error.server.assignTooManyCodes"})
    else 
      now = DateTime.utc_now

      available_number = Exredis.scard("_acs.login_codes.available.#{app_id}")
      number = min(number, available_number)
      codes = Exredis.spop("_acs.login_codes.available.#{app_id}", number)
      Exredis.sadd("_acs.login_codes.assigned.#{app_id}", codes)

      Repo.transaction(fn -> 
        codes |> Enum.each(fn(code) -> 
          AppLoginCode.changeset(%AppLoginCode{}, %{
            code: code,
            owner: owner,
            assigned_at: now,
            app_id: app_id
          }) |> Repo.insert!
        end)
      end)

      query = from c in AppLoginCode,
        select: c,
        where: c.app_id == ^app_id and c.owner == ^owner

      codes = Repo.all(query)

      AdminController.add_operate_log(admin_user_id, app_id, "assign_codes", %{"number" => number})
      LoginCodes.refresh_stats_info(app_id)
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