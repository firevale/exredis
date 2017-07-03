defmodule Acs.WcpLoginCodeResponse do 
  alias Acs.AppWcpConfig
  alias Acs.RedisAppWcpConfig
  alias Acs.AppLoginCode

  alias   Acs.Repo
  import  Ecto.Query

  def build_reply_content(app_id, from) do 
    case RedisAppWcpConfig.find(app_id) do 
      %AppWcpConfig{} = cfg ->
        owner = "openid.#{from}"
        query = from c in AppLoginCode,
                  select: c,
                  where: c.owner == ^owner

        case Repo.one(query) do 
          %AppLoginCode{code: code, owner: ^owner} ->
            _build_content(cfg.owned_code_template, code)
          
          _ ->
            case SQL.query(Repo, "update app_login_codes set owner = ?, \
                                  assigned_at = ? \
                                  where app_id = ? \
                                  and owner is null and user_id is null \
                                  order by inserted_at limit ?", [owner, DateTime.utc_now(), app_id, 1]) do 

              {:ok, %{num_rows: 1}} -> 
                %{code: code} = Repo.one(query) 
                _build_content(cfg.new_code_template, code)
            
              _ ->
                cfg.no_code_template
            end
        end
      _ -> 
        nil
    end
  end

  defp _build_content(nil, code), do: code
  defp _build_content(response, code) do 
    String.replace(response, "#code", code)
  end
end