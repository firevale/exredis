
alias Acs.Apps.AppOrder
import Ecto.Query, warn: false

count = Acs.Repo.one!(from order in AppOrder, select: count(1))
limit = 500 

Enum.map_every(0..count, limit, fn(offset) ->
  IO.puts "limit: #{limit}, offset: #{offset}"
  query =
    from order in AppOrder,
    select: order,
    limit: ^limit,
    offset: ^offset, 
    order_by: [order.id]

  Acs.Repo.all(query) |> Enum.each(fn(order) -> 
    Acs.Search.ESOrder.index(order)
  end) 
end)