
alias Acs.Accounts.User
alias AcsStats.Users.AppUser

max_id = AcsStats.Repo.one!(from app_user in AppUser, select: max(app_user.id))

Enum.map_every(0..max_id, 100, fn current_id ->
  query =
    from app_user in AppUser,
    select: map(app_user, [:id, :app_id, :user_id, :app_user_id, :app_user_name, :app_user_level, :zone_id, :pay_amount, :inserted_at,
    :reg_date, :last_active_at, :last_paid_at, :first_paid_at, :platform, :updated_at]),
    where: app_user.id >= ^current_id,
    limit: 100,
    order_by: [app_user.id]

  users = AcsStats.Repo.all(query)

  if users && users != [] do
    Enum.map(users, fn app_user ->
      case Acs.Accounts.get_user(app_user.user_id) do
        %User{} = user ->
          Elasticsearch.index(%{index: "acs",
            type: "users",
            params: nil,
            id: user.id,
            doc: user})

          Elasticsearch.index(%{index: "acs",
            type: "app_users",
            params: %{parent: user.id},
            id: app_user.id,
            doc: %{
              id: app_user.id,
              app_id: app_user.app_id,
              zone_id: app_user.zone_id,
              game_user_id: app_user.app_user_id,
              game_user_name: app_user.app_user_name,
              game_user_level: app_user.app_user_level,
              pay_amount:  app_user.pay_amount,
              inserted_at: app_user.inserted_at,
              reg_date: app_user.reg_date,
              last_active_at: app_user.last_active_at,
              last_paid_at: app_user.last_paid_at,
              first_paid_at: app_user.first_paid_at,
              platform: app_user.platform,
              updated_at: app_user.updated_at
            }})
        _ ->
        :nothing
        end
    end)
  end
end)