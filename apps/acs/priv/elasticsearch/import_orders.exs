
alias Acs.Accounts.User
import Ecto.Query, warn: false

count = Acs.Repo.one!(from user in User, select: count(user.id))
limit = 500 

Enum.map_every(0..count, limit, fn(offset) ->
  IO.puts "limit: #{limit}, offset: #{offset}"
  query =
    from user in User,
    select: user,
    limit: ^limit,
    offset: ^offset, 
    order_by: [user.id]

  Acs.Repo.all(query) |> Enum.each(fn(user) -> 
    Acs.Search.ESUser.index(user)
  end) 
end)