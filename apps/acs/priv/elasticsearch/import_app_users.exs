
import Ecto.Query, warn: false

alias AcsStats.Users.AppUser

count = AcsStats.Repo.one!(from app_user in AppUser, select: count(1))

limit = 500 

Enum.map_every(0..count, limit, fn(offset) ->
  IO.puts "limit: #{limit}, offset: #{offset}"
  query =
    from au in AppUser,
    select: au,
    limit: ^limit,
    offset: ^offset, 
    order_by: [au.id]

  AcsStats.Repo.all(query) |> Enum.each(fn(au) -> 
    AcsStats.Search.ESAppUser.index(au)
  end) 
end)